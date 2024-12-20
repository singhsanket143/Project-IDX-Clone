export const commonStyles = {
  section: {
    padding: '80px 24px',
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 48,
    textAlign: 'center',
    color: 'black',
  },
  gradientBg: {
    background: 'linear-gradient(180deg, #1a1a1a 0%, #141414 100%)',
  },
  card: {
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    background: '#1E1E1E',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    filter: 'blur(150px)',
    borderRadius: '50%',
    opacity: 0.15,
  },
  text: {
    color: '#fff',
  },
  secondaryText: {
    color: 'rgba(255, 255, 255, 0.65)',
  },
};