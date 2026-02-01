import { motion } from 'framer-motion';

const YesButton = ({ onClick, size = 1 }) => {
  return (
    <motion.button
      style={{
        ...styles.button,
        transform: `scale(${size})`,
      }}
      whileHover={{
        scale: size * 1.08,
        boxShadow: '0 8px 30px rgba(255, 107, 138, 0.5)',
      }}
      whileTap={{ scale: size * 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: size }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 15,
        delay: 0.8,
      }}
      onClick={onClick}
    >
      <motion.span
        style={styles.text}
        animate={{
          textShadow: [
            '0 0 10px rgba(255,255,255,0.5)',
            '0 0 20px rgba(255,255,255,0.8)',
            '0 0 10px rgba(255,255,255,0.5)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Yes!
      </motion.span>
      <motion.span
        style={styles.heart}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      >
        ♥
      </motion.span>
    </motion.button>
  );
};

const styles = {
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px 48px',
    fontSize: '1.4rem',
    fontFamily: "'Baloo 2', cursive",
    fontWeight: 700,
    color: 'white',
    background: 'linear-gradient(135deg, #FF6B8A 0%, #FF8BA0 50%, #FF6B8A 100%)',
    backgroundSize: '200% 200%',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 6px 25px rgba(255, 107, 138, 0.4), inset 0 -3px 0 rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  text: {
    position: 'relative',
    zIndex: 1,
  },
  heart: {
    fontSize: '1.2rem',
    display: 'inline-block',
  },
};

export default YesButton;
