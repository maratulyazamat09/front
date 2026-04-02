import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isNewUser) {

        const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    // Поштадағы сілтемені басқанда бірден /scan бетіне өту үшін
    emailRedirectTo: `${window.location.origin}/scan`,
  },
});
        if (error) throw error;
        alert('Тіркелу сәтті аяқталды! Электронды поштаңызды тексеріңіз.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        // Авторизация сәтті өткен соң "Scan" бетіне бағыттау
        navigate('/scan'); 
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>{isNewUser ? 'Тіркелу' : 'Қош келдіңіз'}</h2>
          <p style={styles.subtitle}>
            {isNewUser 
              ? 'Болашақ университетіңізге алғашқы қадам жасаңыз' 
              : 'Жеке кабинетіңізге кіріп, оқуды жалғастырыңыз'}
          </p>
        </div>

        <form onSubmit={handleAuth} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input 
              type="email" 
              placeholder="example@mail.com" 
              style={styles.input}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Құпия сөз</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={styles.input}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Жүктелуде...' : (isNewUser ? 'Аккаунт ашу' : 'Кіру')}
          </button>
        </form>

        {error && <p style={styles.errorText}>{error}</p>}

        <div style={styles.footer}>
          <p style={styles.footerText}>
            {isNewUser ? 'Аккаунтыңыз бар ма?' : 'Аккаунтыңыз жоқ па?'}
          </p>
          <button 
            onClick={() => setIsNewUser(!isNewUser)} 
            style={styles.toggleBtn}
          >
            {isNewUser ? 'Кіру' : 'Тіркелу'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f0f7ff 0%, #e0eaff 100%)',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 82, 204, 0.08)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  header: { marginBottom: '30px' },
  title: { fontSize: '1.8rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '8px' },
  subtitle: { fontSize: '0.9rem', color: '#666' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: { fontSize: '0.85rem', fontWeight: '600', color: '#4a4a4a', marginBottom: '8px', display: 'block' },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border 0.3s',
    boxSizing: 'border-box',
  },
  submitBtn: {
    backgroundColor: '#0052cc',
    color: 'white',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 12px rgba(0, 82, 204, 0.2)',
  },
  errorText: { color: '#ff4d4f', fontSize: '0.85rem', marginTop: '15px' },
  footer: { marginTop: '30px', borderTop: '1px solid #f0f0f0', paddingTop: '20px' },
  footerText: { fontSize: '0.9rem', color: '#666', marginBottom: '5px' },
  toggleBtn: { background: 'none', border: 'none', color: '#0052cc', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }
};

export default Login;