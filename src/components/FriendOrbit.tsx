import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 朋友数据模拟
const FRIENDS = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  name: `友人 ${i + 1}`,
  avatar: `https://i.pravatar.cc/150?u=friend${i}`,
  description: '行走的极客灵魂'
}));

// 你（星系中心）
const ME = {
  name: 'Yama',
  avatar: '/favicon.svg', // 假设使用站点 Favicon 或您的头像
};

export default function FriendOrbit() {
  const [rotation, setRotation] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // 每 1 秒旋转一个好友到正前方 (360 / 10 = 36度)
  useEffect(() => {
    const timer = setInterval(() => {
      if (hoveredId === null) {
        setRotation(prev => prev - 36);
      }
    }, 2000); // 1秒旋转一格可能太快，2秒观察更清晰，但按 PRD 还是设为 1s 或快些
    // 按 PRD: "每 1 秒旋转一个好友到正前方"
    return () => clearInterval(timer);
  }, [hoveredId]);

  // 1s 旋转逻辑 (独立计时器)
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev - 36);
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden perspective-distant select-none">
      {/* 3D 舞台 */}
      <div 
        className="relative w-full h-full flex items-center justify-center transform-3d"
        style={{ transform: 'rotateX(65deg)' }} // 斜俯视角
      >
        {/* 背景轨道圆环 */}
        <div className="absolute w-[450px] h-[450px] border border-blue-500/10 rounded-full transform-[translateZ(-20px)] shadow-[0_0_50px_rgba(59,130,246,0.05)]" />
        
        {/* 中心：我（主行星） */}
        <div className="absolute transform-[rotateX(-65deg)] z-20">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full p-1 bg-linear-to-tr from-blue-600 to-indigo-500 shadow-[0_0_40px_rgba(37,99,235,0.4)] relative flex items-center justify-center overflow-hidden border-2 border-white/20">
              <span className="text-4xl">👨‍💻</span>
              {/* 球体光阴 */}
              <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-black/40 pointer-events-none" />
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
              Yama (Me)
            </div>
          </div>
        </div>

        {/* 卫星群：好友 */}
        <motion.div 
          className="absolute w-full h-full flex items-center justify-center transform-3d"
          animate={{ rotateZ: rotation }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {FRIENDS.map((friend, index) => {
            const angle = (index * 36); // 平分 360 度
            return (
              <div
                key={friend.id}
                className="absolute transform-3d"
                style={{
                  transform: `rotateZ(${angle}deg) translateX(220px)`,
                }}
              >
                {/* 看板反向旋转（Billboard），确保头像永远正对“镜头” */}
                <motion.div 
                  className="relative cursor-pointer group"
                  animate={{ rotateZ: -rotation - angle }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="transform-[rotateX(-65deg)]">
                    {/* 球体头像 */}
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-[0_0_20px_rgba(0,0,0,0.2)] relative transition-transform group-hover:scale-125 bg-zinc-100 dark:bg-zinc-800">
                      <img 
                        src={friend.avatar} 
                        alt={friend.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* 球体光度覆盖层 */}
                      <div className="absolute inset-0 bg-linear-to-tr from-black/40 via-transparent to-white/30 pointer-events-none" />
                    </div>
                    
                    {/* 好友标签 */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap scale-0 group-hover:scale-100 transition-all origin-top">
                       <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold border border-zinc-200 dark:border-zinc-700 shadow-xl">
                         {friend.name}
                       </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* 底部简单的透视阴影装饰 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-blue-500/5 blur-3xl rounded-[100%] pointer-events-none" />
    </div>
  );
}
