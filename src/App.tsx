import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;
  
  const hearts = Array.from({ length: 20 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((_, i) => {
        const size = Math.random() * 20 + 15;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 15;
        return (
          <motion.div
            key={i}
            className="absolute bottom-[-50px] text-red-400/30"
            initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
            animate={{ 
              y: "-120vh", 
              x: Math.random() * 100 - 50,
              opacity: [0, 0.8, 0],
              rotate: 360 
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ left: `${left}%` }}
          >
            <Heart size={size} fill="currentColor" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [stage, setStage] = useState(0);
  const [q1Answer, setQ1Answer] = useState<string | null>(null);
  const [q2Answer, setQ2Answer] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleUntie = () => {
    setStage(1);
  };

  const handleQ1 = (ans: string) => {
    setQ1Answer(ans);
    setStage(2);
    setTimeout(() => {
      setStage(3);
    }, 4500);
  };

  const handleQ2 = (ans: string) => {
    setQ2Answer(ans);
    setStage(4);
    setTimeout(() => {
      setStage(5);
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-love flex items-center justify-center p-4 overflow-hidden relative">
      {/* Soft dark overlay for better contrast and dreamy feel */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
      
      <FloatingHearts />

      {/* Romantic Background Music */}
      <audio 
        ref={audioRef} 
        src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Chopin_Nocturne_Op_9_No_2_E_flat_major.ogg" 
        loop 
      />

      <div className="relative z-10 paper-texture p-6 md:p-12 rounded-sm max-w-2xl w-full text-center min-h-[400px] md:min-h-[500px] flex flex-col justify-center items-center shadow-2xl">
        
        {/* Decorative borders for the card */}
        <div className="absolute inset-2 border border-[#D4AF37]/20 pointer-events-none"></div>
        <div className="absolute inset-3 border border-[#D4AF37]/10 pointer-events-none"></div>

        {/* Wax Seal Overlay (Stage 0) */}
        <AnimatePresence>
          {stage === 0 && (
            <motion.div 
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/30 rounded-sm backdrop-blur-sm"
              exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.8 } }}
            >
              {/* Envelope Flap Illusion */}
              <div className="absolute top-0 left-0 w-full h-1/2 border-b border-[#D4AF37]/20 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>

              <div className="mb-12 text-gold-light font-serif italic text-2xl md:text-3xl tracking-widest drop-shadow-lg">
                For Akshaya
              </div>
              
              {/* The Wax Seal */}
              <motion.button
                onClick={handleUntie}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full wax-seal flex items-center justify-center cursor-pointer focus:outline-none"
              >
                <Heart className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37] drop-shadow-md" fill="#D4AF37" />
              </motion.button>

              <div className="mt-12 text-gold-light font-serif italic text-base md:text-lg animate-pulse drop-shadow-md">
                Tap the seal to open
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Content */}
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div
              key="q1"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="w-full"
            >
              <h1 className="font-serif italic text-2xl md:text-4xl text-gold mb-6 leading-relaxed">
                Akshaya... before you open your letter, tell me...
              </h1>
              <h2 className="font-serif italic text-xl md:text-3xl text-gold-light mb-10">
                Are you always this amazing, or is today just a special occasion?
              </h2>
              <div className="flex flex-col gap-4 justify-center items-center w-full px-4">
                <button
                  onClick={() => handleQ1('always')}
                  className="w-full max-w-xs px-6 py-3 rounded-sm border border-[#D4AF37]/60 text-gold-solid font-serif italic text-lg md:text-xl hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300"
                >
                  I'm always this amazing 💁‍♀️
                </button>
                <button
                  onClick={() => handleQ1('today')}
                  className="w-full max-w-xs px-6 py-3 rounded-sm border border-[#D4AF37]/60 text-gold-solid font-serif italic text-lg md:text-xl hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300"
                >
                  Just for today 😉
                </button>
              </div>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="a1"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 1 }}
              className="w-full"
            >
              <h2 className="font-serif italic text-2xl md:text-5xl text-gold leading-tight drop-shadow-2xl">
                {q1Answer === 'always' ? (
                  <>
                    I knew it.
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="text-xl md:text-3xl mt-6 block text-gold-light"
                    >
                      Confidence looks absolutely gorgeous on you.
                    </motion.span>
                  </>
                ) : (
                  <>
                    Well, today is definitely your day to shine.
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                      className="text-xl md:text-3xl mt-6 block text-gold-light"
                    >
                      But let's be honest, you're amazing every single day.
                    </motion.span>
                  </>
                )}
              </h2>
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="q2"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <h1 className="font-serif italic text-2xl md:text-4xl text-gold mb-6 leading-relaxed">
                One more question...
              </h1>
              <h2 className="font-serif italic text-xl md:text-3xl text-gold-light mb-10">
                Do you think you are beautiful?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <button
                  onClick={() => handleQ2('yes')}
                  className="w-full sm:w-auto px-10 py-3 rounded-sm border border-[#D4AF37]/60 text-gold-solid font-serif italic text-lg md:text-xl hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleQ2('no')}
                  className="w-full sm:w-auto px-10 py-3 rounded-sm border border-[#D4AF37]/60 text-gold-solid font-serif italic text-lg md:text-xl hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300"
                >
                  No
                </button>
              </div>
            </motion.div>
          )}

          {stage === 4 && (
            <motion.div
              key="a2"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 1 }}
              className="w-full"
            >
              <h2 className="font-serif italic text-2xl md:text-5xl text-gold leading-tight drop-shadow-2xl">
                {q2Answer === 'yes' ? (
                  <>
                    I love that confidence.
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="text-xl md:text-3xl mt-6 block text-gold-light"
                    >
                      And you are absolutely right—you are the most beautiful girl I have ever seen.
                    </motion.span>
                  </>
                ) : (
                  <>
                    Shut up!
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                      className="text-xl md:text-3xl mt-6 block text-gold-light"
                    >
                      When did you start lying... You are an absolute angel.
                    </motion.span>
                  </>
                )}
              </h2>
            </motion.div>
          )}

          {stage === 5 && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
              className="w-full"
              style={{ transformPerspective: 1000 }}
            >
              {/* Corner ornaments for the letter */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-[#D4AF37]/60"></div>
              <div className="absolute top-4 right-4 md:top-6 md:right-6 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-[#D4AF37]/60"></div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-[#D4AF37]/60"></div>
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-[#D4AF37]/60"></div>

              <div className="text-center mb-6 md:mb-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Heart className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37] mx-auto mb-3 md:mb-4" fill="#D4AF37" fillOpacity={0.3} strokeWidth={1.5} />
                </motion.div>
                <h1 className="font-serif italic text-3xl md:text-5xl text-gold tracking-widest uppercase">Happy Birthday</h1>
              </div>

              <div className="font-serif italic text-[#FFF8E7] drop-shadow-md text-base md:text-lg leading-relaxed md:leading-loose space-y-4 md:space-y-6 text-center md:text-left px-2 md:px-8 font-medium">
                <p className="text-xl md:text-2xl mb-4 text-[#FFE55C] drop-shadow-lg font-semibold">
                  My dearest Akshaya,
                </p>
                <p>
                  You are amazing in so many ways. You are strong and brave, but also incredibly sweet and caring. You have this beautiful confidence and style, and your sense of humor lights up every room you walk into.
                </p>
                <p>
                  You bring so much joy to everyone around you. My biggest wish for you today is that you stay exactly as you are, no matter where life takes you.
                </p>
                <p>
                  People like you don't come around every day. <span className="text-[#FFE55C] font-bold drop-shadow-lg">You</span> are truly one of a kind.
                </p>
                <p className="text-center mt-8 md:mt-10 text-[#FFE55C] text-xl md:text-2xl drop-shadow-lg font-semibold">
                  With all my love,
                  <br />
                  <span className="block mt-2 text-lg md:text-xl text-[#FFF8E7]">Yours truly, Ur Shishiro</span>
                </p>
                <p className="text-center mt-6 text-sm md:text-base text-[#FFF8E7]/80">
                  Please upload that video today atleast 😭😂
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
