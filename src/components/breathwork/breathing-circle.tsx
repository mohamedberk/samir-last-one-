"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function BreathingCircle() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.5, 1.5, 1],
      opacity: [0.3, 0.6, 0.6, 0.3],
      transition: {
        duration: 8,
        times: [0, 0.4, 0.6, 1], // Inhale 4s, Hold 2s, Exhale 2s
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <div className="relative w-96 h-96">
      {/* Base glow */}
      <div className="absolute inset-0 bg-[#A45C40]/10 rounded-full blur-[100px]" />
      
      {/* Outer glow rings */}
      <motion.div
        animate={controls}
        className="absolute inset-0 rounded-full bg-[#A45C40]/20 blur-xl"
      />
      
      {/* Main circle */}
      <motion.div
        animate={controls}
        className="absolute inset-0 rounded-full border border-white/10 backdrop-blur-sm
                 bg-gradient-to-r from-[#A45C40]/10 to-[#4A5043]/10"
      />
      
      {/* Inner circle */}
      <motion.div
        animate={controls}
        className="absolute inset-8 rounded-full border border-white/5 backdrop-blur-sm
                 bg-gradient-to-r from-[#A45C40]/5 to-[#4A5043]/5"
      />
      
      {/* Rotating rings */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            rotate: {
              duration: 40 + i * 20,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }
          }}
          className={`absolute rounded-full border
                     ${i === 0 ? 'inset-[-1rem] border-[#A45C40]/10' :
                                'inset-[-2rem] border-[#4A5043]/10'}`}
        />
      ))}
      
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-2 h-2 rounded-full bg-[#A45C40]"
        />
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full 
                     ${i % 2 === 0 ? 'bg-[#A45C40]/30' : 'bg-[#4A5043]/30'}`}
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "100%", "0%"],
            opacity: [0, 0.8, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * -1,
          }}
          style={{
            left: `${50 + 30 * Math.cos(i * Math.PI / 4)}%`,
            top: `${50 + 30 * Math.sin(i * Math.PI / 4)}%`,
          }}
        />
      ))}

      {/* Breathing guide text */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full text-center space-y-2">
        <motion.p
          animate={{ opacity: [0.4, 1, 1, 0.4] }}
          transition={{
            duration: 8,
            times: [0, 0.4, 0.6, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-white/90 text-lg font-medium tracking-wide"
        >
          Follow Your Breath
        </motion.p>
        <p className="text-white/50 text-sm">
          Inhale 4s • Hold 2s • Exhale 2s
        </p>
      </div>
    </div>
  );
} 