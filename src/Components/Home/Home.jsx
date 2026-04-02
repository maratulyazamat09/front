import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Home = ({ session }) => {
  const navigate = useNavigate();

  const handleMainAction = () => {
    if (session) {
      navigate('/scan');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={styles.container}>
      {/* --- НАВИГАЦИЯ --- */}
      <nav style={styles.nav}>
        <div style={styles.logo}>Bolashaq<span style={styles.accent}>AI</span></div>
        <div>
          {session ? (
            <button onClick={() => supabase.auth.signOut()} style={styles.secondaryBtn}>Шығу</button>
          ) : (
            <button onClick={() => navigate('/login')} style={styles.secondaryBtn}>Кіру</button>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header style={styles.hero}>
        <div style={styles.badge}>🇰🇿 Қазақстан студенттеріне арналған</div>
        <h1 style={styles.title}>
          Шетелдік университетке түсу <br />
          <span style={styles.gradientText}>енді әлдеқайда оңай</span>
        </h1>
        <p style={styles.subtitle}>
          Біздің платформа сіздің жетістіктеріңізді сараптап, әлемдік деңгейдегі 
          оқу орындарына түсудің жеке жоспарын құрып береді.
        </p>
        
        <div style={styles.ctaGroup}>
          <button onClick={handleMainAction} style={styles.mainButton}>
            {session ? 'Талдауды жалғастыру' : 'Тегін тексеруден өту'}
          </button>
          <p style={styles.subtext}>* Жүйе сіздің GPA және IELTS балыңызды ескереді</p>
        </div>
      </header>

      {/* --- ҚАДАМДАР (WORKFLOW) --- */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Бұл қалай жұмыс істейді?</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardNumber}>01</div>
            <h3>Цифрлық сканерлеу</h3>
            <p>Бағаларыңыз бен қызығушылықтарыңызды енгізіңіз. Жүйе сіздің әлеуетіңізді бірден есептейді.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardNumber}>02</div>
            <h3>Университет таңдау</h3>
            <p>Мыңдаған бағдарламалардың ішінен сізге грант ұту мүмкіндігі ең жоғары оқу орындарын табамыз.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardNumber}>03</div>
            <h3>Портфолио жинау</h3>
            <p>Motivation Letter мен CV-ді халықаралық талаптарға сай дайындап, қабылдау комиссиясын таң қалдырыңыз.</p>
          </div>
        </div>
      </section>

      {/* --- ТӨМЕНГІ БӨЛІМ (BANNER) --- */}
      <section style={styles.banner}>
        <div style={styles.bannerContent}>
          <h2>Арман қуып, әлемді бағындыр</h2>
          <p>Биылғы оқу жылына үлгеру үшін қазірден бастаңыз.</p>
          <button onClick={handleMainAction} style={styles.bannerBtn}>Бастау</button>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© 2026 Bolashaq AI. Білім жолындағы сенімді серігіңіз.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    margin: 0,
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 5%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    position: 'fixed',
    top: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 1000,
  },
  logo: { fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-1px' },
  accent: { color: '#0066FF' },
  hero: {
    textAlign: 'center',
    padding: '160px 20px 100px',
    background: 'radial-gradient(circle at top, #f0f7ff 0%, #ffffff 70%)',
  },
  badge: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#e6f0ff',
    color: '#0066FF',
    borderRadius: '100px',
    fontSize: '0.85rem',
    fontWeight: '700',
    marginBottom: '20px',
  },
  title: { fontSize: '3.5rem', fontWeight: '800', marginBottom: '25px', lineHeight: '1.1' },
  gradientText: {
    background: 'linear-gradient(90deg, #0066FF, #00C2FF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: { fontSize: '1.2rem', color: '#555', maxWidth: '700px', margin: '0 auto 40px' },
  mainButton: {
    padding: '20px 50px',
    fontSize: '1.1rem',
    fontWeight: '700',
    backgroundColor: '#0066FF',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 10px 25px rgba(0, 102, 255, 0.25)',
  },
  secondaryBtn: {
    padding: '10px 20px',
    background: 'none',
    border: '1px solid #ddd',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  subtext: { fontSize: '0.8rem', color: '#999', marginTop: '15px' },
  section: { padding: '100px 5%', maxWidth: '1200px', margin: '0 auto' },
  sectionTitle: { textAlign: 'center', fontSize: '2rem', marginBottom: '60px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  card: {
    padding: '40px',
    borderRadius: '24px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #eee',
    position: 'relative',
    overflow: 'hidden',
  },
  cardNumber: {
    fontSize: '4rem',
    fontWeight: '900',
    color: 'rgba(0, 102, 255, 0.05)',
    position: 'absolute',
    top: '-10px',
    right: '10px',
  },
  banner: { padding: '0 5% 100px' },
  bannerContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: '30px',
    padding: '60px',
    textAlign: 'center',
    color: 'white',
  },
  bannerBtn: {
    padding: '15px 40px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: 'white',
    color: '#1a1a1a',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '25px',
  },
  footer: { textAlign: 'center', padding: '40px', borderTop: '1px solid #eee', color: '#888' },
};

export default Home;