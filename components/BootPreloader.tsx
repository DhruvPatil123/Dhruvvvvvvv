"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playAmbientPad } from '@/lib/sounds';

const BOOT_SEQUENCE = [
  { text: "INITIALIZING CORE SYSTEM...", delay: 0 },
  { text: "MAPPING COGNITIVE LAYERS...", delay: 0.6 },
  { text: "SYNCHRONIZING NEURAL INTERFACE...", delay: 1.2 },
  { text: "DECRYPTING SECURE ASSETS...", delay: 1.8 },
  { text: "ESTABLISHING HOLOGRAPHIC LINK...", delay: 2.4 },
  { text: "CORE SYSTEMS ONLINE [OK]", delay: 3.0 },
];

const ScrambledText = ({ text, delay }: { text: string; delay: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
      let iterations = 0;

      const interval = setInterval(() => {
        setDisplayText(
          text.split("").map((char, index) => {
            if (char === " ") return " ";
            if (iterations > 10 && index < iterations) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        iterations++;

        if (iterations > text.length) {
          clearInterval(interval);
          setDisplayText(text);
          setIsResolved(true);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <div className="font-mono text-sm mb-2 h-5 flex items-center">
      <span className="text-emerald-500 mr-2">{">"}</span>
      <span className={`${isResolved ? "text-white" : "text-emerald-400/60"} transition-colors duration-500`}>
        {displayText || " "}
      </span>
    </div>
  );
};

export default function BootPreloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    // Simulate boot progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small delay before exit
      setTimeout(() => {
        playAmbientPad();
        setIsVisible(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 800);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 bg-black z-[9999] flex flex-col justify-between p-8 md:p-12 font-mono text-white select-none"
        >
          <div className="flex justify-between items-start">
            <div className="text-xs text-white/30 uppercase tracking-widest">
              System Boot v4.0.1<br />
              Auth: Verified_User<br />
              Node: Root_Primary
            </div>
            <div className="text-right text-xs text-white/30 uppercase tracking-widest">
              Encryption: AES-256<br />
              Kernel: Neural_v2.1<br />
              Status: Initializing
            </div>
          </div>

          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              {BOOT_SEQUENCE.map((line, i) => (
                <ScrambledText key={i} text={line.text} delay={line.delay} />
              ))}
            </div>

            <div className="relative h-1 w-full bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-0 bg-emerald-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-white/40 uppercase tracking-tighter">
              <span>Loading Modules</span>
              <span>{progress}% Complete</span>
            </div>
          </div>

          <div className="text-center text-[10px] text-white/20 uppercase tracking-widest">
            Press any key to skip sequence
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
