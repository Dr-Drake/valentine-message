import { motion } from 'framer-motion';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import Mascot from './Mascot';

const Celebration = ({ name, customMessage }) => {
  // Process custom message - replace {name} placeholder with actual name
  const displayMessage = customMessage
    ? customMessage.replace(/\{name\}/gi, name)
    : `This Valentine's Day is all about you, ${name}! 💕`;
  useEffect(() => {
    // Initial burst
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#FF6B8A', '#FFE4E9', '#FFCBA4', '#FF4D6D', '#FFB6C1'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Big initial burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });

    frame();

    // Heart-shaped confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5, x: 0.5 },
        colors,
        shapes: ['circle'],
        scalar: 2,
      });
    }, 500);
  }, []);

  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    size: 20 + Math.random() * 30,
  }));

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating hearts background */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          style={{
            ...styles.floatingHeart,
            left: `${heart.x}%`,
            fontSize: heart.size,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-100vh', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 4,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ♥
        </motion.div>
      ))}

      <motion.div
        style={styles.content}
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
      >
        <Mascot isExcited={true} />

        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Yay! 🎉
        </motion.h1>

        <motion.p
          style={styles.message}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          You just made me the happiest!
        </motion.p>

        <motion.p
          style={styles.subMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {displayMessage}
        </motion.p>

        <motion.div
          style={styles.heartContainer}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <motion.span
            style={styles.bigHeart}
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ❤️
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, #FFF9F5 0%, #FFE4E9 50%, #FFE5D0 100%)',
    overflow: 'hidden',
    zIndex: 100,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px',
    position: 'relative',
    zIndex: 10,
  },
  title: {
    fontFamily: "'Baloo 2', cursive",
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    fontWeight: 800,
    color: '#FF6B8A',
    margin: '20px 0 10px',
    textShadow: '0 4px 20px rgba(255, 107, 138, 0.3)',
  },
  message: {
    fontFamily: "'Baloo 2', cursive",
    fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
    fontWeight: 600,
    color: '#4A3540',
    margin: '10px 0',
  },
  subMessage: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
    fontWeight: 500,
    color: '#8B7080',
    margin: '10px 0 20px',
    maxWidth: '400px',
  },
  heartContainer: {
    marginTop: '10px',
  },
  bigHeart: {
    fontSize: 'clamp(3rem, 10vw, 5rem)',
    display: 'block',
    filter: 'drop-shadow(0 4px 20px rgba(255, 77, 109, 0.4))',
  },
  floatingHeart: {
    position: 'absolute',
    color: '#FF6B8A',
    opacity: 0.6,
    pointerEvents: 'none',
    zIndex: 1,
  },
};

export default Celebration;
