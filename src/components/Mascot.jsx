import { motion } from 'framer-motion';

const Mascot = ({ isHappy = false, isExcited = false }) => {
  return (
    <motion.div
      style={styles.container}
      animate={
        isExcited
          ? {
              y: [0, -20, 0],
              rotate: [0, -5, 5, -5, 0],
            }
          : isHappy
          ? { y: [0, -8, 0] }
          : { y: [0, -5, 0] }
      }
      transition={{
        duration: isExcited ? 0.5 : 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        style={styles.svg}
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <motion.ellipse
          cx="90"
          cy="105"
          rx="65"
          ry="60"
          fill="#FFCBA4"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Inner body (belly) */}
        <ellipse cx="90" cy="115" rx="45" ry="40" fill="#FFE5D0" />

        {/* Left Ear */}
        <motion.ellipse
          cx="45"
          cy="50"
          rx="22"
          ry="25"
          fill="#FFCBA4"
          animate={{ rotate: isExcited ? [-5, 5, -5] : [0, 0, 0] }}
          transition={{ duration: 0.3, repeat: isExcited ? Infinity : 0 }}
          style={{ transformOrigin: '45px 70px' }}
        />
        <ellipse cx="45" cy="50" rx="14" ry="16" fill="#FF6B8A" opacity="0.5" />

        {/* Right Ear */}
        <motion.ellipse
          cx="135"
          cy="50"
          rx="22"
          ry="25"
          fill="#FFCBA4"
          animate={{ rotate: isExcited ? [5, -5, 5] : [0, 0, 0] }}
          transition={{ duration: 0.3, repeat: isExcited ? Infinity : 0 }}
          style={{ transformOrigin: '135px 70px' }}
        />
        <ellipse cx="135" cy="50" rx="14" ry="16" fill="#FF6B8A" opacity="0.5" />

        {/* Head */}
        <circle cx="90" cy="75" r="50" fill="#FFCBA4" />

        {/* Blush Left */}
        <motion.ellipse
          cx="55"
          cy="85"
          rx="12"
          ry="8"
          fill="#FF6B8A"
          opacity="0.4"
          animate={{ opacity: isHappy || isExcited ? [0.4, 0.6, 0.4] : 0.4 }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Blush Right */}
        <motion.ellipse
          cx="125"
          cy="85"
          rx="12"
          ry="8"
          fill="#FF6B8A"
          opacity="0.4"
          animate={{ opacity: isHappy || isExcited ? [0.4, 0.6, 0.4] : 0.4 }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Eyes */}
        {isExcited ? (
          <>
            {/* Happy closed eyes */}
            <motion.path
              d="M65 72 Q72 65, 79 72"
              stroke="#4A3540"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              d="M101 72 Q108 65, 115 72"
              stroke="#4A3540"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 0.3 }}
            />
          </>
        ) : (
          <>
            {/* Normal eyes */}
            <circle cx="72" cy="70" r="8" fill="#4A3540" />
            <circle cx="108" cy="70" r="8" fill="#4A3540" />
            {/* Eye shine */}
            <circle cx="74" cy="68" r="3" fill="white" />
            <circle cx="110" cy="68" r="3" fill="white" />
          </>
        )}

        {/* Nose */}
        <ellipse cx="90" cy="82" rx="5" ry="4" fill="#E85A78" />

        {/* Mouth */}
        {isExcited ? (
          <motion.path
            d="M80 92 Q90 105, 100 92"
            stroke="#4A3540"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : isHappy ? (
          <path
            d="M82 90 Q90 98, 98 90"
            stroke="#4A3540"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M85 92 Q90 96, 95 92"
            stroke="#4A3540"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Arms */}
        <motion.ellipse
          cx="35"
          cy="110"
          rx="15"
          ry="20"
          fill="#FFCBA4"
          animate={isExcited ? { rotate: [-20, 20, -20] } : { rotate: 0 }}
          transition={{ duration: 0.3, repeat: isExcited ? Infinity : 0 }}
          style={{ transformOrigin: '50px 110px' }}
        />
        <motion.ellipse
          cx="145"
          cy="110"
          rx="15"
          ry="20"
          fill="#FFCBA4"
          animate={isExcited ? { rotate: [20, -20, 20] } : { rotate: 0 }}
          transition={{ duration: 0.3, repeat: isExcited ? Infinity : 0 }}
          style={{ transformOrigin: '130px 110px' }}
        />

        {/* Feet */}
        <ellipse cx="65" cy="155" rx="18" ry="12" fill="#FFCBA4" />
        <ellipse cx="115" cy="155" rx="18" ry="12" fill="#FFCBA4" />

        {/* Heart (when excited) */}
        {isExcited && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: 1, y: [0, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
          >
            <text
              x="140"
              y="40"
              fontSize="24"
              fill="#FF4D6D"
            >
              ♥
            </text>
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    filter: 'drop-shadow(0 10px 30px rgba(255, 107, 138, 0.3))',
  },
  svg: {
    width: 'clamp(120px, 30vw, 180px)',
    height: 'clamp(120px, 30vw, 180px)',
  },
};

export default Mascot;
