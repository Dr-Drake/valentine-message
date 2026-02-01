import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import Mascot from './components/Mascot';
import Question from './components/Question';
import YesButton from './components/YesButton';
import NoButton from './components/NoButton';
import Celebration from './components/Celebration';
import Creator from './components/Creator';
import './App.css';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [mascotMood, setMascotMood] = useState('normal');

  // Get name and message from URL parameters (base64 encoded)
  const { valentineName, customMessage } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('v');

    if (!encoded) {
      return { valentineName: null, customMessage: null };
    }

    try {
      // Decode from URL-safe base64
      const base64 = encoded
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(encoded.length + (4 - (encoded.length % 4)) % 4, '=');

      const decoded = decodeURIComponent(atob(base64));
      const data = JSON.parse(decoded);

      return {
        valentineName: data.n || null,
        customMessage: data.m || null,
      };
    } catch (e) {
      console.error('Failed to decode valentine data:', e);
      return { valentineName: null, customMessage: null };
    }
  }, []);

  const handleYes = useCallback(() => {
    setAccepted(true);
  }, []);

  const handleNoAttempt = useCallback(() => {
    setNoAttempts((prev) => prev + 1);
    setMascotMood('sad');
    setTimeout(() => {
      setMascotMood('normal');
    }, 1000);
  }, []);

  // Yes button grows slightly with each "no" attempt
  const yesButtonSize = 1 + noAttempts * 0.08;

  // If no name in URL, show the creator page
  if (!valentineName) {
    return (
      <div style={styles.app}>
        <FloatingHearts />
        <Creator />
      </div>
    );
  }

  // Show the Valentine experience
  return (
    <div style={styles.app}>
      <AnimatePresence mode="wait">
        {accepted ? (
          <Celebration
            key="celebration"
            name={valentineName}
            customMessage={customMessage}
          />
        ) : (
          <motion.div
            key="question"
            style={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <FloatingHearts />

            <motion.div
              style={styles.card}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
            >
              <Mascot
                isHappy={mascotMood === 'happy'}
                isExcited={false}
              />

              <Question name={valentineName} />

              <motion.div
                style={styles.buttons}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <YesButton onClick={handleYes} size={yesButtonSize} />
                <NoButton onAttempt={handleNoAttempt} />
              </motion.div>

              {noAttempts > 0 && noAttempts < 5 && (
                <motion.p
                  style={styles.hint}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {noAttempts < 3
                    ? "Hmm, are you sure? 🥺"
                    : "The Yes button is looking pretty good right now... 💕"}
                </motion.p>
              )}

              {noAttempts >= 5 && (
                <motion.p
                  style={styles.hint}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  There's really only one answer here! 😊❤️
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  app: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 30px',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    boxShadow: '0 20px 60px rgba(255, 107, 138, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5)',
    maxWidth: '500px',
    width: '90%',
    position: 'relative',
    zIndex: 10,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
    flexWrap: 'wrap',
    minHeight: '80px',
  },
  hint: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '0.95rem',
    color: '#8B7080',
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default App;
