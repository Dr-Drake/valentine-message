import { motion } from 'framer-motion';
import { useMemo } from 'react';

const FloatingHearts = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
      size: 12 + Math.random() * 20,
      opacity: 0.15 + Math.random() * 0.25,
    }));
  }, []);

  return (
    <div style={styles.container}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          style={{
            ...styles.heart,
            left: `${heart.x}%`,
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
          initial={{ y: '100vh', rotate: -20 }}
          animate={{
            y: '-100vh',
            rotate: 20,
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: heart.duration / 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 0,
  },
  heart: {
    position: 'absolute',
    color: '#FF6B8A',
    filter: 'blur(1px)',
  },
};

export default FloatingHearts;
