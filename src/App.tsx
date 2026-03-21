/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Heart, ChevronRight, Volume2, VolumeX, RefreshCw, Sparkles, Terminal, Flower2, Play } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const MESSAGES = [
  {
    id: 1,
    title: "Library Wali Shanti 📚",
    content: "Library ki wo shanti... tera bag uthana (chhota sa flex 😉), aur wo baatein. Pata nahi kyun, par teri company se mahaul badal jata tha. ✨",
  },
  {
    id: 2,
    title: "Exam Wala Stress ✍️",
    content: "Exams ki wahi tension aur prep ka stress... par building ke bahar wala best-of-luck exchange kaafi wholesome tha. Aisa laga chalo, sirf mai hi akela struggle nahi kar raha hu! 😄 📖",
  },
  {
    id: 3,
    title: "Valorant & Pizza 🎮",
    content: "Our little banter... Tera 'secret pro' wala tag aur wo hit-and-trial pizza experiments. Pata hai? 🫣 terse baat karna day ka best part hota tha.🍕",
  },
  {
    id: 4,
    title: "Pav Bhaji Ka Mystery 🥘",
    content: "Wo 'Chef' phase kaise bhool sakta hu? Maine kaha tha Pav Bhaji favorite hai, aur next day tu banane wali thi... Recipe ka toh pata nahi, par umeed hai tune kitchen jalaya nahi hoga! 😂 🔥",
  },
  {
    id: 5,
    title: "Esa Kya Dekha? 👀",
    content: "Jab tune pucha tha ‘esa kya dekha?’ aur kaha ki teri life mein chaos hai... Honestly, wahi toh magic hai. Sabko shor dikhta hai, par tujhme ek aisi stability hai jo naturally calmness feel kara deti hai. Tera ye simple rehna hi tujhe sabse alag banata hai. ✨",
  },
  {
    id: 6,
    title: "The Long Silence... 🤐",
    content: "Pichle kuch time se 'Incognito' on tha... 🕵️♂️ Par jab database mein memories itni solid ho, toh kabhi na kabhi 'System Refresh' toh banta hai! Aaj wahi purana data recover kar raha hu, bas thode naye animations ke saath! 😉 ⏳",
  },
  {
    id: 7,
    title: "Naye Goals & Sapne 🌿",
    content: "Life bhot fast chal rahi hai goals, internships.... par genuinely hope karta hu tum jahan bhi jao, wahan tumhe woh calm aur confidence mile jo tum deserve karti ho.🌸",
  },
];

const FINAL_WISH = {
  title: "Aaj Tera Din Hai! 🎂",
  content: "19th March... is din ko toh quietly nahi jaane de sakta tha 😙. I wish tera ye birthday aur aane wala saal tere saare chaos ko 'fun' mein badal de. Stay amazing! Happy Birthday! ✨",
  image: "/pic.jpg"
};

const TypewriterText = ({ text, onComplete, isPaused = false, justify = "justify-center", delay = 40, className = "" }: { text: string; onComplete?: () => void; isPaused?: boolean; justify?: string; delay?: number; className?: string }) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const characters = Array.from(text);

  useEffect(() => {
    if (isPaused) return;
    
    if (visibleChars < characters.length) {
      const timeout = setTimeout(() => {
        setVisibleChars(prev => prev + 1);
      }, delay); 
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [visibleChars, characters.length, isPaused, onComplete, delay]);

  useEffect(() => {
    setVisibleChars(0);
  }, [text]);

  const words = text.split(/(\s+)/); 
  let globalCharIndex = 0;

  return (
    <motion.div className={`flex flex-wrap ${justify} select-none cursor-default ${className}`}>
      {words.map((word, wordIdx) => {
        const wordChars = Array.from(word);
        const isSpace = /^\s+$/.test(word);
        
        return (
          <span key={wordIdx} className={isSpace ? "" : "inline-block whitespace-nowrap"}>
            {wordChars.map((char, charIdx) => {
              const isVisible = globalCharIndex < visibleChars;
              globalCharIndex++;
              return (
                <motion.span
                  key={`${wordIdx}-${charIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </motion.div>
  );
};

const HeartParticle = ({ delay }: { delay: number }) => {
  const x = Math.random() * 100;
  const size = 10 + Math.random() * 20;
  
  return (
    <motion.div
      initial={{ y: '110vh', x: `${x}vw`, opacity: 0, scale: 0 }}
      animate={{ 
        y: '-10vh', 
        opacity: [0, 0.4, 0.4, 0],
        scale: [0, 1.2, 1.2, 0.6],
        rotate: [0, 45, -45, 0]
      }}
      transition={{ 
        duration: 10 + Math.random() * 8, 
        delay, 
        repeat: Infinity,
        ease: "linear"
      }}
      className="fixed pointer-events-none text-rose-400/50 z-20"
      style={{ fontSize: size }}
    >
      <Heart fill="currentColor" />
    </motion.div>
  );
};

const StarField = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="star"
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: Math.random() * 100 + 'vh',
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.2
          }}
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
            x: [null, (Math.random() - 0.5) * 50 + 'px'],
            y: [null, (Math.random() - 0.5) * 50 + 'px']
          }}
          transition={{ 
            duration: 3 + Math.random() * 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ 
            width: Math.random() * 3 + 'px', 
            height: Math.random() * 3 + 'px',
            backgroundColor: i % 2 === 0 ? '#fbbf24' : '#ffffff'
          }}
        />
      ))}
    </div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#fdfbf7] flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-xs">
        <div className="h-1 w-full bg-stone-200 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-rose-400"
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[10px] text-stone-400 uppercase tracking-[0.3em] text-center">
          Preparing something special...
        </div>
      </div>
    </motion.div>
  );
};

const Atmosphere = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-indigo-50 to-amber-50" />
      <StarField />
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-indigo-200/50 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-rose-200/50 blur-[150px] animate-float-slower" />
      <div className="absolute top-[20%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-violet-200/50 blur-[100px] animate-float-fastest" />
      <div className="absolute bottom-[20%] left-[5%] w-[50vw] h-[50vw] rounded-full bg-teal-100/40 blur-[130px] animate-float-slow" style={{ animationDelay: '-5s' }} />
      <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-amber-100/40 blur-[90px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/feTurbulence%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

const BirthdayCap = () => (
  <motion.div 
    initial={{ y: -50, opacity: 0, rotate: -20 }}
    animate={{ y: 0, opacity: 1, rotate: 0 }}
    transition={{ delay: 2, duration: 1, type: "spring" }}
    className="absolute -top-10 -right-10 z-20 w-32 h-32 pointer-events-none"
  >
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <path d="M50 10 L20 80 L80 80 Z" fill="#fb7185" />
      <circle cx="50" cy="10" r="5" fill="#fff" />
      <path d="M20 80 Q50 90 80 80" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="35" cy="40" r="3" fill="#fff" opacity="0.6" />
      <circle cx="65" cy="60" r="3" fill="#fff" opacity="0.6" />
      <circle cx="50" cy="55" r="3" fill="#fff" opacity="0.6" />
    </svg>
  </motion.div>
);

const BirthdayMala = () => {
  const chars = "HAPPY BIRTHDAY".split("");
  return (
    <div className="absolute top-10 left-0 w-full flex justify-center gap-1 z-20 pointer-events-none px-4">
      {chars.map((char, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5 + i * 0.1, type: "spring" }}
          className="w-8 h-10 bg-rose-400/90 rounded-b-lg flex items-center justify-center text-white font-bold text-xs shadow-md border-t-2 border-rose-300"
        >
          {char}
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<'loading' | 'intro' | 'messages' | 'final' | 'feedback'>('loading');
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTitleFinished, setIsTitleFinished] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- MICROSOFT CLARITY SCRIPT INJECTION ---
  useEffect(() => {
    const clarityScript = document.createElement("script");
    clarityScript.type = "text/javascript";
    clarityScript.innerHTML = `
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "vzduxdg53o");
    `;
    document.head.appendChild(clarityScript);

    return () => {
      // Optional: Clean up if needed, though usually not required for analytics
      document.head.removeChild(clarityScript);
    };
  }, []);
  // ------------------------------------------

  useEffect(() => {
    setIsTitleFinished(false);
  }, [currentMsgIndex, step]);

  const musicUrl = "/song.mp3"; 

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startExperience = () => {
    setStep('messages');
    setCurrentMsgIndex(0);
    setIsPaused(false);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const prevMessage = () => {
    clearTimer();
    if (currentMsgIndex > 0) {
      setCurrentMsgIndex(prev => prev - 1);
    }
  };

  const nextMessage = () => {
    clearTimer();
    if (currentMsgIndex < MESSAGES.length - 1) {
      setCurrentMsgIndex(prev => prev + 1);
    } else {
      setStep('final');
    }
  };

  const handleMessageComplete = () => {
    if (isPaused) return;
    timerRef.current = setTimeout(() => {
      nextMessage();
    }, 3000); 
  };

  const handleFinalComplete = () => {
    if (isPaused) return;
    timerRef.current = setTimeout(() => {
      setStep('feedback');
    }, 3000); 
  };

  const togglePause = () => {
    if (!isPaused) {
      clearTimer();
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  };

  useEffect(() => {
    if (isPaused) return;
    return () => clearTimer();
  }, [step, isPaused]);

  const reset = () => {
    setStep('intro');
    setCurrentMsgIndex(0);
  };

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center font-sans selection:bg-rose-200/50 bg-gradient-to-br from-rose-50/50 via-white to-indigo-50/50 px-4 relative overflow-hidden">
      <audio ref={audioRef} src={musicUrl} loop />
      <Atmosphere />
      
      <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-12 opacity-30 z-10">
        <span className="rail-text text-[10px] uppercase tracking-[0.5em] font-mono text-stone-900">Memories // 2026</span>
        <div className="w-px h-24 bg-stone-300" />
        <span className="rail-text text-[10px] uppercase tracking-[0.5em] font-mono text-stone-900">Chapter {currentMsgIndex + 1}</span>
      </div>

      <AnimatePresence>
        {step === 'loading' && <Preloader onComplete={() => setStep('intro')} />}
      </AnimatePresence>

      {step !== 'final' && [...Array(20)].map((_, i) => (
        <div key={`heart-${i}`}>
          <HeartParticle delay={i * 2} />
        </div>
      ))}
      
      {step !== 'intro' && step !== 'loading' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={toggleMusic}
            className="fixed top-8 right-8 z-50 p-4 rounded-full glass hover:bg-black/5 transition-all"
          >
            {isPlaying ? <Volume2 size={18} className="text-stone-600" /> : <VolumeX size={18} className="text-stone-400" />}
          </motion.button>
      )}

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center px-6 max-w-4xl"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-12"
            >
              <Sparkles className="mx-auto text-rose-300" size={24} />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight text-stone-900 mb-20 italic text-glow">
              A Special Message <br /> for Madam ji
            </h1>
            
            <button
              onClick={startExperience}
              className="group relative px-12 py-5 rounded-full glass text-stone-500 hover:text-stone-900 transition-all duration-700 font-mono text-[10px] tracking-[0.5em] uppercase overflow-hidden"
            >
              <span className="relative z-10">Start ✨</span>
              <motion.div 
                className="absolute inset-0 bg-black/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
              />
            </button>
          </motion.div>
        )}

        {step === 'messages' && (
          <motion.div
            key={`msg-${currentMsgIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl w-full px-6 py-12 text-center relative rounded-[2rem] mx-auto"
          >
            <div className="mb-16" key={`title-${currentMsgIndex}`}>
              <TypewriterText 
                text={MESSAGES[currentMsgIndex].title}
                delay={50}
                justify="justify-center"
                className="text-4xl md:text-6xl font-serif font-medium italic text-glow text-stone-900"
                onComplete={() => setIsTitleFinished(true)}
              />
            </div>
            
            <div className="text-2xl md:text-3xl text-stone-700 leading-relaxed font-serif font-light mb-20 min-h-[200px] mask-fade relative group/content">
              <div key={`text-wrapper-${currentMsgIndex}`}>
                {isTitleFinished && (
                  <TypewriterText 
                    text={MESSAGES[currentMsgIndex].content} 
                    onComplete={handleMessageComplete}
                    isPaused={isPaused}
                    delay={45}
                  />
                )}
              </div>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                onClick={togglePause}
                className="absolute -right-4 -top-12 p-3 text-stone-500 hover:text-rose-500 transition-all bg-white/40 backdrop-blur-md rounded-full shadow-sm z-30"
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? <Play size={18} fill="currentColor" /> : <div className="flex gap-1.5"><div className="w-1 h-4 bg-current rounded-full" /><div className="w-1 h-4 bg-current rounded-full" /></div>}
              </motion.button>
            </div>
            
            <div className="flex items-center justify-center gap-12">
              <button
                onClick={prevMessage}
                disabled={currentMsgIndex === 0}
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-stone-900 opacity-20 hover:opacity-100 disabled:opacity-0 transition-opacity"
              >
                Prev
              </button>

              <button
                onClick={togglePause}
                className="w-16 h-16 rounded-full glass flex items-center justify-center text-stone-600 opacity-30 hover:opacity-100 hover:scale-110 transition-all group shadow-lg"
              >
                {isPaused ? <Play size={24} fill="currentColor" className="ml-1" /> : <div className="flex gap-1.5"><div className="w-1 h-5 bg-current rounded-full" /><div className="w-1 h-5 bg-current rounded-full" /></div>}
              </button>

              <button
                onClick={nextMessage}
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-stone-900 opacity-20 hover:opacity-100 transition-opacity"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl w-full px-8 py-12 flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[100dvh] relative"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:w-1/2 max-h-[70vh] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative group"
            >
              <BirthdayCap />
              <BirthdayMala />
              
              <img 
                src={FINAL_WISH.image} 
                alt="A special moment" 
                className="w-full h-full object-contain bg-black/20 transition-all duration-[3000ms]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/romantic/800/1000";
                }}
              />
            </motion.div>
            
            <div className="w-full lg:w-1/2 text-left">
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.5 }}
              >
                <div className="flex items-center gap-6 mb-8">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Heart className="text-rose-400" fill="currentColor" size={32} />
                  </motion.div>
                </div>
                
                <div className="mb-8">
                  <TypewriterText 
                    text={FINAL_WISH.title}
                    delay={50}
                    justify="justify-start"
                    className="text-5xl md:text-7xl font-serif font-medium italic leading-tight text-glow text-stone-900"
                    onComplete={() => setIsTitleFinished(true)}
                  />
                </div>
                
                <div className="text-xl md:text-2xl text-stone-700 leading-relaxed font-serif font-light mb-12 relative">
                  {isTitleFinished && (
                    <TypewriterText 
                      text={FINAL_WISH.content} 
                      isPaused={isPaused} 
                      justify="justify-start"
                      onComplete={handleFinalComplete}
                      delay={45}
                    />
                  )}
                  
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    onClick={togglePause}
                    className="absolute -right-12 top-0 p-3 text-stone-500 hover:text-rose-500 transition-all bg-white/40 backdrop-blur-md rounded-full shadow-sm z-30"
                    title={isPaused ? "Resume" : "Pause"}
                  >
                    {isPaused ? <Play size={16} fill="currentColor" /> : <div className="flex gap-1.5"><div className="w-1 h-4 bg-current rounded-full" /><div className="w-1 h-4 bg-current rounded-full" /></div>}
                  </motion.button>
                </div>
                
                <div className="flex items-center gap-8 opacity-30">
                  <div className="h-px w-24 bg-stone-900" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.6em] text-stone-900">
                    Always yours.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === 'feedback' && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center px-8 max-w-3xl py-20"
          >
            <p className="text-4xl md:text-5xl text-stone-800 font-serif font-light leading-relaxed mb-20 italic text-glow">
              "Chalo abb jaldi bata kesa laga? 😙 Agar doobara dekhna hai to watch again par click karo." 💖
            </p>
            <button
              onClick={reset}
              className="group flex items-center gap-6 mx-auto px-12 py-5 rounded-full glass text-stone-600 hover:text-stone-900 hover:bg-black/5 transition-all duration-700 font-mono text-[10px] tracking-[0.5em] uppercase shadow-lg"
            >
              <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-1000" />
              Watch it again? 🔄
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  );
}
