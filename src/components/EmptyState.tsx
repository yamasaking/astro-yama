import { motion } from 'framer-motion';

interface EmptyStateProps {
  title?: string;
  message?: string;
  imagePath?: string;
}

export default function EmptyState({ 
  title = "正在建设中", 
  message = "我们正忙着为您打磨新内容，请稍等片刻，很快就会见面啦！",
  imagePath = "/images/construction.png"
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          delay: 0.2
        }}
        className="relative mb-10 group"
      >
        <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
        <img 
          src={imagePath} 
          alt="Under Construction" 
          className="relative w-72 h-72 object-contain drop-shadow-2xl hover:rotate-3 transition-transform duration-500"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
          {message}
        </p>
        
        <motion.div 
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: i * 0.2,
                }}
                className="w-3 h-3 bg-blue-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
