import { motion } from 'framer-motion';

const Question = ({ name }) => {
  const text = `${name}, will you be my Valentine?`;

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <motion.h1 style={styles.question}>
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.5 + index * 0.03,
            }}
            style={char === '?' ? styles.questionMark : undefined}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '0 20px',
  },
  question: {
    fontFamily: "'Baloo 2', cursive",
    fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
    fontWeight: 700,
    color: '#4A3540',
    textShadow: '0 2px 10px rgba(255, 107, 138, 0.2)',
    lineHeight: 1.3,
    margin: 0,
  },
  questionMark: {
    color: '#FF6B8A',
    display: 'inline-block',
  },
};

export default Question;
