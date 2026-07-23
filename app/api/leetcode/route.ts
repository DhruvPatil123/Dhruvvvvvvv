import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes Cache TTL

function calculateStreakFromCalendar(submissionCalendar: any): number {
  if (!submissionCalendar) return 0;
  
  let calendarObj: Record<string, number> = {};
  if (typeof submissionCalendar === 'string') {
    try {
      calendarObj = JSON.parse(submissionCalendar);
    } catch (e) {
      return 0;
    }
  } else if (typeof submissionCalendar === 'object') {
    calendarObj = submissionCalendar;
  }

  const activeDates = new Set<string>();
  for (const [timestampStr, count] of Object.entries(calendarObj)) {
    if (count > 0) {
      const timestampMs = parseInt(timestampStr, 10) * 1000;
      if (!isNaN(timestampMs)) {
        const dateStr = new Date(timestampMs).toISOString().split('T')[0];
        activeDates.add(dateStr);
      }
    }
  }

  if (activeDates.size === 0) return 0;

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const validDates = Array.from(activeDates)
    .filter(dateStr => dateStr <= todayStr)
    .sort();

  if (validDates.length === 0) return 0;

  const mostRecentStr = validDates[validDates.length - 1];

  const d1 = new Date(todayStr + "T00:00:00Z");
  const d2 = new Date(mostRecentStr + "T00:00:00Z");
  const diffTime = d1.getTime() - d2.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 1) {
    return 0;
  }

  let currentStreak = 0;
  let checkDate = new Date(mostRecentStr + "T00:00:00Z");

  while (true) {
    const checkStr = checkDate.toISOString().split('T')[0];
    if (activeDates.has(checkStr)) {
      currentStreak++;
      checkDate.setUTCDate(checkDate.getUTCDate() - 1);
    } else {
      break;
    }
  }

  return currentStreak;
}

function generateMockSubmissionCalendar(): string {
  const cal: Record<string, number> = {};
  const now = Math.floor(Date.now() / 1000);
  const daySec = 86400;
  for (let i = 0; i < 100; i++) {
    if (Math.random() > 0.4) {
      const timestamp = now - i * daySec;
      cal[timestamp.toString()] = Math.floor(Math.random() * 5) + 1;
    }
  }
  return JSON.stringify(cal);
}

const fallbackData = {
  username: "Dhruv_Patil_18",
  ranking: 226317,
  streak: 36,
  solvedTotal: 472,
  solvedEasy: 121,
  solvedMedium: 265,
  solvedHard: 86,
  submissionCalendar: generateMockSubmissionCalendar()
};

// Memory-based cache initialized with complete fallback data
let cachedLeetcode: any = {
  ...fallbackData,
  source: "initial-cache"
};
let cacheTimestamp: number = 0;

async function fetchLeetcodeFromAPIs(username: string): Promise<any> {
  const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeoutMs = 4000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (err: any) {
      clearTimeout(id);
      throw err;
    }
  };

  // 1. Alfa API
  try {
    const response = await fetchWithTimeout(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, { cache: 'no-store' }, 4000);
    if (response.ok) {
      const data = await response.json();
      if (data && (data.totalSolved !== undefined || data.easySolved !== undefined)) {
        const calendar = typeof data.submissionCalendar === 'string'
          ? data.submissionCalendar
          : (data.submissionCalendar ? JSON.stringify(data.submissionCalendar) : fallbackData.submissionCalendar);
        
        const calculatedStreak = calculateStreakFromCalendar(calendar);

        return {
          username,
          ranking: data.ranking || fallbackData.ranking,
          streak: calculatedStreak > 0 ? calculatedStreak : (data.streak || fallbackData.streak),
          solvedTotal: data.totalSolved || data.solvedProblem || fallbackData.solvedTotal,
          solvedEasy: data.easySolved || fallbackData.solvedEasy,
          solvedMedium: data.mediumSolved || fallbackData.solvedMedium,
          solvedHard: data.hardSolved || fallbackData.solvedHard,
          submissionCalendar: calendar,
          source: "alfa-api"
        };
      }
    }
  } catch (_e) {
    // Ignore external proxy errors quietly
  }

  // 2. Faisal Shohag API
  try {
    const response = await fetchWithTimeout(`https://leetcode-api-faisalshohag.vercel.app/${username}`, { cache: 'no-store' }, 3000);
    if (response.ok) {
      const data = await response.json();
      if (data && (data.totalSolved !== undefined || data.easySolved !== undefined)) {
        const calendar = typeof data.submissionCalendar === 'string'
          ? data.submissionCalendar
          : (data.submissionCalendar ? JSON.stringify(data.submissionCalendar) : fallbackData.submissionCalendar);

        const calculatedStreak = calculateStreakFromCalendar(calendar);

        return {
          username,
          ranking: data.ranking || fallbackData.ranking,
          streak: calculatedStreak > 0 ? calculatedStreak : (data.streak || fallbackData.streak),
          solvedTotal: data.totalSolved || fallbackData.solvedTotal,
          solvedEasy: data.easySolved || fallbackData.solvedEasy,
          solvedMedium: data.mediumSolved || fallbackData.solvedMedium,
          solvedHard: data.hardSolved || fallbackData.solvedHard,
          submissionCalendar: calendar,
          source: "faisal-api"
        };
      }
    }
  } catch (_e) {
    // Ignore external proxy errors quietly
  }

  // 3. Direct GraphQL
  try {
    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
          userCalendar {
            streak
            submissionCalendar
          }
        }
      }
    `;

    const response = await fetchWithTimeout("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Referer": "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    }, 3000);

    if (response.ok) {
      const json = await response.json();
      if (!json.errors) {
        const matchedUser = json.data?.matchedUser;
        if (matchedUser) {
          const submitStats = matchedUser.submitStats?.acSubmissionNum || [];
          const solvedTotal = submitStats.find((s: any) => s.difficulty === "All")?.count || fallbackData.solvedTotal;
          const solvedEasy = submitStats.find((s: any) => s.difficulty === "Easy")?.count || fallbackData.solvedEasy;
          const solvedMedium = submitStats.find((s: any) => s.difficulty === "Medium")?.count || fallbackData.solvedMedium;
          const solvedHard = submitStats.find((s: any) => s.difficulty === "Hard")?.count || fallbackData.solvedHard;

          const ranking = matchedUser.profile?.ranking || fallbackData.ranking;
          const streak = matchedUser.userCalendar?.streak || fallbackData.streak;
          const submissionCalendar = matchedUser.userCalendar?.submissionCalendar || fallbackData.submissionCalendar;

          const calculatedStreak = calculateStreakFromCalendar(submissionCalendar);

          return {
            username,
            ranking,
            streak: calculatedStreak > 0 ? calculatedStreak : (streak || fallbackData.streak),
            solvedTotal,
            solvedEasy,
            solvedMedium,
            solvedHard,
            submissionCalendar,
            source: "live"
          };
        }
      }
    }
  } catch (_e) {
    // Ignore GraphQL timeout/network error
  }

  // Final fallback
  return {
    ...fallbackData,
    source: "fallback"
  };
}

async function fetchAndUpdateLeetcode(username: string): Promise<any> {
  try {
    const data = await fetchLeetcodeFromAPIs(username);
    if (data) {
      cachedLeetcode = data;
      cacheTimestamp = Date.now();
    }
    return cachedLeetcode;
  } catch (_e) {
    return cachedLeetcode;
  }
}

export async function GET(_req: NextRequest) {
  const username = "Dhruv_Patil_18";
  const now = Date.now();

  // Synchronously fetch live data if initial request or cache TTL expired
  if (cacheTimestamp === 0 || now - cacheTimestamp > CACHE_TTL) {
    await fetchAndUpdateLeetcode(username);
  }

  return NextResponse.json({
    ...cachedLeetcode,
    cacheStatus: now - cacheTimestamp < CACHE_TTL ? "HIT_FRESH" : "HIT_STALE",
    cacheAgeMs: now - cacheTimestamp
  }, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
    }
  });
}
