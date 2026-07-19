"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music, Music2 } from 'lucide-react';
import { useAudioStore } from '@/store/useAudioStore';
import { setDroneMute, startAmbientDrone, stopAmbientDrone } from '@/lib/sounds';

export default function AudioDock() {
  const { isMuted, isPlayingAmbient, toggleMute, toggleAmbient } = useAudioStore();

  const handleAmbientToggle = () => {
    toggleAmbient();
    if (!isPlayingAmbient) {
      startAmbientDrone();
    } else {
      stopAmbientDrone();
    }
  };

  const handleMuteToggle = () => {
    toggleMute();
    setDroneMute(!isMuted ? true : false); // logic reversed because toggleMute flips state first
  };

  // Custom a-sync mute handler to ensure it reflects the NEW state
  const onMuteClick = () => {
    const newState = !isMuted;
    setDroneMute(newState);
    toggleMute();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect border border-white/10 rounded-2xl p-3 bg-black/40 backdrop-blur-xl flex items-center gap-4 shadow-2xl"
      >
        {/* Visualizer */}
        <div className="flex items-end gap-1 h-4 w-12">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                height: isMuted ? 2 : [4, 16, 8, 12, 4],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
              className="w-1 bg-emerald-500 rounded-full"
            />
          ))}
        </div>

        <div className="h-6 w-px bg-white/10" />

        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={onMuteClick}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            title="Mute Audio"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            onClick={handleAmbientToggle}
            className={`p-2 rounded-xl transition-all ${
              isPlayingAmbient
                ? "bg-emerald-500/20 text-emerald-400"
                : "hover:bg-white/10 text-white/70 hover:text-white"
            }`}
            title="Ambient Drone"
          >
            {isPlayingAmbient ? <Music2 size={18} /> : <Music size={18} />}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
