import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

const NoButton = ({ onAttempt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [isHiding, setIsHiding] = useState(false);

  const runAway = useCallback(() => {
    const maxX = window.innerWidth / 4;
    const maxY = window.innerHeight / 4;

    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;

    setPosition({ x: newX, y: newY });
    setAttempts((prev) => prev + 1);
    onAttempt?.();

    // After 5 attempts, make the button smaller
    if (attempts >= 4) {
      setIsHiding(true);
    }
  }, [attempts, onAttempt]);

  const buttonScale = isHiding ? Math.max(0.3, 1 - (attempts - 4) * 0.15) : 1;

  return (
    <motion.button
      style={{
        ...styles.button,
        transform: `scale(${buttonScale})`,
      }}
      animate={{
        x: position.x,
        y: position.y,
        scale: buttonScale,
        opacity: buttonScale < 0.4 ? 0.5 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 25,
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: buttonScale * 0.95 }}
      onMouseEnter={runAway}
      onTouchStart={runAway}
      onClick={(e) => {
        e.preventDefault();
        runAway();
      }}
    >
      <span style={styles.text}>
        {attempts === 0
          ? 'No'
          : attempts < 3
          ? 'Nope!'
          : attempts < 5
          ? "Can't catch me!"
          : attempts < 7
          ? '🙈'
          : '...'}
      </span>
    </motion.button>
  );
};

const styles = {
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 36px',
    fontSize: '1.1rem',
    fontFamily: "'Quicksand', sans-serif",
    fontWeight: 600,
    color: '#8B7080',
    background: 'white',
    border: '2px solid #FFE4E9',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.2s ease',
    position: 'relative',
  },
  text: {
    position: 'relative',
    zIndex: 1,
  },
};

export default NoButton;
