import { useState } from 'react';
import { motion } from 'framer-motion';

const Creator = ({ onGenerate }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const defaultMessage = "This Valentine's Day is all about you, {name}! 💕";

  const handleGenerate = () => {
    if (!name.trim()) return;

    // Create data object
    const data = { n: name.trim() };
    if (message.trim() && message.trim() !== defaultMessage.replace('{name}', name.trim())) {
      data.m = message.trim();
    }

    // Encode to base64 (URL-safe)
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const link = `${window.location.origin}${window.location.pathname}?v=${encoded}`;
    setGeneratedLink(link);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generatedLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePreview = () => {
    if (generatedLink) {
      window.location.href = generatedLink;
    }
  };

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.div
          style={styles.iconContainer}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          💌
        </motion.div>

        <h1 style={styles.title}>Create Your Valentine</h1>
        <p style={styles.subtitle}>
          Make a personalized Valentine's message and share the link with your special someone!
        </p>

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Their Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter their name..."
              style={styles.input}
              maxLength={30}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Custom Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Default: "${defaultMessage}"`}
              style={styles.textarea}
              maxLength={100}
              rows={3}
            />
            <span style={styles.hint}>Use {'{name}'} to include their name</span>
          </div>

          <motion.button
            style={{
              ...styles.generateButton,
              opacity: name.trim() ? 1 : 0.5,
            }}
            whileHover={name.trim() ? { scale: 1.03 } : {}}
            whileTap={name.trim() ? { scale: 0.97 } : {}}
            onClick={handleGenerate}
            disabled={!name.trim()}
          >
            Generate Link ✨
          </motion.button>
        </div>

        {generatedLink && (
          <motion.div
            style={styles.linkSection}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <label style={styles.label}>Your Shareable Link</label>
            <div style={styles.linkBox}>
              <input
                type="text"
                value={generatedLink}
                readOnly
                style={styles.linkInput}
              />
              <motion.button
                style={styles.copyButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </motion.button>
            </div>

            <motion.button
              style={styles.previewButton}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePreview}
            >
              Preview Valentine 💕
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const styles = {
  container: {
    width: '100%',
    minHeight: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '32px 24px',
    maxWidth: '480px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(255, 107, 138, 0.15)',
    margin: 'auto',
  },
  iconContainer: {
    fontSize: '48px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  title: {
    fontFamily: "'Baloo 2', cursive",
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#4A3540',
    textAlign: 'center',
    margin: '0 0 8px',
  },
  subtitle: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '0.95rem',
    color: '#8B7080',
    textAlign: 'center',
    margin: '0 0 28px',
    lineHeight: 1.5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#4A3540',
  },
  input: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '1rem',
    padding: '14px 16px',
    border: '2px solid #FFE4E9',
    borderRadius: '12px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    backgroundColor: 'white',
  },
  textarea: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '0.95rem',
    padding: '12px 14px',
    border: '2px solid #FFE4E9',
    borderRadius: '12px',
    outline: 'none',
    resize: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: 'white',
  },
  hint: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '0.75rem',
    color: '#8B7080',
  },
  generateButton: {
    fontFamily: "'Baloo 2', cursive",
    fontSize: '1.1rem',
    fontWeight: 600,
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #FF6B8A 0%, #FF8BA0 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(255, 107, 138, 0.35)',
    marginTop: '8px',
  },
  linkSection: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #FFE4E9',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  linkBox: {
    display: 'flex',
    gap: '8px',
  },
  linkInput: {
    flex: 1,
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '0.85rem',
    padding: '12px',
    border: '2px solid #FFE4E9',
    borderRadius: '10px',
    backgroundColor: '#FFF9F5',
    color: '#4A3540',
    outline: 'none',
  },
  copyButton: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,
    padding: '12px 16px',
    background: 'white',
    color: '#FF6B8A',
    border: '2px solid #FF6B8A',
    borderRadius: '10px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  previewButton: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 600,
    padding: '12px 20px',
    background: 'white',
    color: '#4A3540',
    border: '2px solid #FFE4E9',
    borderRadius: '50px',
    cursor: 'pointer',
    marginTop: '4px',
  },
};

export default Creator;
