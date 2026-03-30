import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Box, User, Target, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

type Cell = 'wall' | 'empty' | 'box' | 'target' | 'box-on-target' | 'player' | 'player-on-target';

const LEVEL_MAP: Cell[][] = [
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
  ['wall', 'empty', 'box', 'empty', 'empty', 'empty', 'wall'],
  ['wall', 'wall', 'wall', 'empty', 'empty', 'box', 'wall'],
  ['wall', 'empty', 'box', 'empty', 'box', 'empty', 'wall'],
  ['wall', 'empty', 'target', 'target', 'target', 'target', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
];

const INITIAL_PLAYER = { x: 1, y: 1 };

export default function SokobanGame() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [player, setPlayer] = useState(INITIAL_PLAYER);
  const [isPaused, setIsPaused] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [moves, setMoves] = useState(0);

  // 初始化游戏
  const initGame = useCallback(() => {
    const newGrid = LEVEL_MAP.map(row => [...row]);
    newGrid[INITIAL_PLAYER.y][INITIAL_PLAYER.x] = 'player';
    setGrid(newGrid);
    setPlayer(INITIAL_PLAYER);
    setIsWin(false);
    setIsPaused(false);
    setMoves(0);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // 移动逻辑
  const move = useCallback((dx: number, dy: number) => {
    if (isPaused || isWin) return;

    setGrid(prev => {
      const nextX = player.x + dx;
      const nextY = player.y + dy;
      const nextCell = prev[nextY][nextX];

      // 撞墙
      if (nextCell === 'wall') return prev;

      // 推箱子
      if (nextCell === 'box' || nextCell === 'box-on-target') {
        const beyondX = nextX + dx;
        const beyondY = nextY + dy;
        const beyondCell = prev[beyondY][beyondX];

        if (beyondCell === 'empty' || beyondCell === 'target') {
          const newGrid = prev.map(row => [...row]);
          
          // 移动箱子
          newGrid[beyondY][beyondX] = beyondCell === 'target' ? 'box-on-target' : 'box';
          
          // 移动玩家到原箱子位
          newGrid[nextY][nextX] = nextCell === 'box-on-target' ? 'player-on-target' : 'player';
          
          // 原玩家位变空
          const currentCell = newGrid[player.y][player.x];
          newGrid[player.y][player.x] = currentCell === 'player-on-target' ? 'target' : 'empty';

          setPlayer({ x: nextX, y: nextY });
          setMoves(m => m + 1);
          return newGrid;
        }
        return prev;
      }

      // 直接移动
      const newGrid = prev.map(row => [...row]);
      newGrid[nextY][nextX] = nextCell === 'target' ? 'player-on-target' : 'player';
      const currentCell = newGrid[player.y][player.x];
      newGrid[player.y][player.x] = currentCell === 'player-on-target' ? 'target' : 'empty';

      setPlayer({ x: nextX, y: nextY });
      setMoves(m => m + 1);
      return newGrid;
    });
  }, [player, isPaused, isWin]);

  // 胜利检测
  useEffect(() => {
    if (grid.length === 0) return;
    const hasBoxesLeft = grid.some(row => row.includes('box'));
    if (!hasBoxesLeft && grid.some(row => row.includes('box-on-target'))) {
      setIsWin(true);
    }
  }, [grid]);

  // 键盘支持
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w': e.preventDefault(); move(0, -1); break;
        case 'ArrowDown':
        case 's': e.preventDefault(); move(0, 1); break;
        case 'ArrowLeft':
        case 'a': e.preventDefault(); move(-1, 0); break;
        case 'ArrowRight':
        case 'd': e.preventDefault(); move(1, 0); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [move]);

  return (
    <div className="flex flex-col gap-6">
      {/* 预留切换节点 */}
      <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 self-start">
        <button className="px-4 py-2 bg-white dark:bg-zinc-800 shadow-sm rounded-xl text-xs font-bold text-blue-500">推箱子 Sokoban</button>
        <button className="px-4 py-2 text-zinc-400 dark:text-zinc-500 text-xs font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">坦克大战 (Lock)</button>
        <button className="px-4 py-2 text-zinc-400 dark:text-zinc-500 text-xs font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">扫雷 (Lock)</button>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-200/50 dark:border-zinc-800/50 p-6 md:p-10 flex flex-col md:flex-row gap-10 items-center justify-center relative overflow-hidden">
        {/* 游戏网格 */}
        <div className="relative p-4 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-3xl border-4 border-zinc-300 dark:border-zinc-700 shadow-inner group">
          <div className="grid grid-cols-7 gap-1">
            {grid.map((row, y) => row.map((cell, x) => (
              <motion.div 
                key={`${x}-${y}`} 
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all ${
                  cell === 'wall' ? 'bg-zinc-400 dark:bg-zinc-600 shadow-md' : 
                  cell === 'target' ? 'bg-blue-500/10 border-2 border-dashed border-blue-500/30' :
                  'bg-white dark:bg-zinc-700/30 shadow-sm'
                }`}
                layout
              >
                {cell === 'player' && <User size={24} className="text-blue-500 drop-shadow-lg" />}
                {cell === 'player-on-target' && <User size={24} className="text-blue-400 drop-shadow-lg" />}
                {cell === 'box' && <Box size={24} className="text-amber-600 drop-shadow-md" />}
                {cell === 'box-on-target' && <Box size={24} className="text-green-500 drop-shadow-md" />}
                {cell === 'target' && <div className="w-2 h-2 rounded-full bg-blue-500/40" />}
              </motion.div>
            )))}
          </div>

          <AnimatePresence>
            {isWin && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-10"
              >
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                  <Play size={32} />
                </div>
                <h3 className="text-2xl font-black text-green-600 tracking-tighter">SUCCESS!</h3>
                <p className="text-zinc-500 text-sm mt-1">Moves: {moves}</p>
                <button onClick={initGame} className="mt-6 px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-xs font-bold hover:scale-105 transition-transform active:scale-95">REPLAY</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 控制面板 */}
        <div className="flex flex-col gap-8 w-full md:w-48">
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Level 01</h4>
            <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-end justify-between">
              <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{moves}</span>
              <span className="text-[10px] text-zinc-400 mb-1">Moves</span>
            </div>
          </div>

          {/* 虚拟按键 */}
          <div className="grid grid-cols-3 gap-2 p-2 bg-zinc-100 dark:bg-zinc-800/50 rounded-3xl border border-zinc-200 dark:border-zinc-700">
             <div />
             <button onClick={() => move(0, -1)} className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-zinc-700 rounded-xl flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-sm active:scale-90"><ChevronUp size={20} /></button>
             <div />
             <button onClick={() => move(-1, 0)} className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-zinc-700 rounded-xl flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-sm active:scale-90"><ChevronLeft size={20} /></button>
             <button onClick={() => move(0, 1)} className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-zinc-700 rounded-xl flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-sm active:scale-90"><ChevronDown size={20} /></button>
             <button onClick={() => move(1, 0)} className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-zinc-700 rounded-xl flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-sm active:scale-90"><ChevronRight size={20} /></button>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="flex-1 p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
            </button>
            <button 
              onClick={initGame}
              className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all border border-zinc-200 dark:border-zinc-700"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
