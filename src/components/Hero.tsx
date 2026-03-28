import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-10 flex flex-col items-center justify-center text-center px-4 shrink-0 transition-all duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <div className="flex justify-center mb-8">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 md:w-28 md:h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-2xl shadow-blue-500/20"
          >
            <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[inherit] flex items-center justify-center text-4xl md:text-5xl">
              🚀
            </div>
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-4 transition-colors duration-500">
          你好，我是 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400">Yama</span>
        </h1>
        
        <p className="text-lg md:text-xl font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto transition-colors duration-500">
          全栈开发者 · 数字游民 · <span className="text-zinc-900 dark:text-zinc-100 italic">追求极致的代码美学</span>
        </p>
      </motion.div>
    </section>
  );
}
