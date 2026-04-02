import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Scan = ({ session }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // 1. Жеке
    full_name: '',
    current_grade: '11', // 11, 12, Graduate
    // 2. Академиялық
    gpa: '',
    ielts: 'Әзірге тапсырмадым',
    sat: 'Жоқ',
    // 3. Мамандық (Икемді)
    major_interest: '',
    career_goal: '',
    uncertain_major: false,
    // 4. География
    preferred_regions: [], // Europe, USA, Asia, etc.
    preferred_countries: '',
    // 5. Қаржы (Бюджет)
    budget_type: 'full_grant', // full_grant, partial, self_funded
    max_annual_budget: '0', 
    // 6. Жетістіктер
    extra_activities: ''
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleRegion = (region) => {
    const updated = formData.preferred_regions.includes(region)
      ? formData.preferred_regions.filter(r => r !== region)
      : [...formData.preferred_regions, region];
    setFormData({...formData, preferred_regions: updated});
  };

 const handleSubmit = async () => {
  setLoading(true);
  
  try {
    // 1. FastAPI backend-іне деректерді жіберу
    const response = await fetch('https://your-fastapi-url.com/analyze-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Авторизация үшін Supabase токенін жіберуге болады
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    // 2. Нәтиже дайын болғанда нәтиже бетіне өту
    navigate('/results', { state: { aiResponse: result } });
    
  } catch (error) {
    console.error("Талдау кезінде қате кетті:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <div style={styles.header}>
          <div style={styles.stepBadge}>{step} / 6 қадам</div>
          <div style={styles.progressBase}><div style={{...styles.progressFill, width: `${(step/6)*100}%`}}></div></div>
        </div>

        {/* 1. НЕГІЗГІ МӘЛІМЕТТЕР */}
        {step === 1 && (
          <div style={styles.stepContent}>
            <h2>Біраз танысайық</h2>
            <p>AI сіздің қазіргі деңгейіңізді түсінуі керек.</p>
            <input style={styles.input} placeholder="Толық аты-жөніңіз" onChange={e => setFormData({...formData, full_name: e.target.value})} />
            <select style={styles.input} onChange={e => setFormData({...formData, current_grade: e.target.value})}>
              <option value="11">11-сынып оқушысы</option>
              <option value="12">12-сынып (NIS/IB) оқушысы</option>
              <option value="graduate">Мектеп бітірген / Колледж</option>
            </select>
            <button onClick={handleNext} style={styles.nextBtn}>Бастаймыз</button>
          </div>
        )}

        {/* 2. АКАДЕМИЯЛЫҚ КӨРСЕТКІШТЕР */}
        {step === 2 && (
          <div style={styles.stepContent}>
            <h2>Академиялық жетістіктер</h2>
            <p>Егер нақты балыңыз болмаса, болжамды балл жазыңыз.</p>
            <input style={styles.input} placeholder="GPA (мысалы: 4.9/5.0)" onChange={e => setFormData({...formData, gpa: e.target.value})} />
            <input style={styles.input} placeholder="IELTS / Duolingo балы (немесе 'Жоқ')" onChange={e => setFormData({...formData, ielts: e.target.value})} />
            <div style={styles.btnRow}>
              <button onClick={handleBack} style={styles.backBtn}>Артқа</button>
              <button onClick={handleNext} style={styles.nextBtn}>Келесі</button>
            </div>
          </div>
        )}

        {/* 3. МАМАНДЫҚ ТАҢДАУ */}
        {step === 3 && (
          <div style={styles.stepContent}>
            <h2>Қандай саланы қалайсыз?</h2>
            <input style={styles.input} placeholder="Мамандық (IT, Бизнес, Өнер...)" disabled={formData.uncertain_major} onChange={e => setFormData({...formData, major_interest: e.target.value})} />
            <label style={styles.checkboxLabel}>
              <input type="checkbox" onChange={e => setFormData({...formData, uncertain_major: e.target.checked})} />
              Әлі нақты шешім қабылдамадым (AI көмегі керек)
            </label>
            <div style={styles.btnRow}>
              <button onClick={handleBack} style={styles.backBtn}>Артқа</button>
              <button onClick={handleNext} style={styles.nextBtn}>Келесі</button>
            </div>
          </div>
        )}

        {/* 4. ГЕОГРАФИЯ (АЙМАҚТАР) */}
        {step === 4 && (
          <div style={styles.stepContent}>
            <h2>Қай аймақта оқығыңыз келеді?</h2>
            <p>Бірнешеуін таңдауға болады:</p>
            <div style={styles.tagCloud}>
              {['Еуропа', 'АҚШ/Канада', 'Азия (Корея, Қытай)', 'Түркия', 'Ұлыбритания'].map(r => (
                <button 
                  key={r} 
                  style={formData.preferred_regions.includes(r) ? styles.tagActive : styles.tag}
                  onClick={() => toggleRegion(r)}
                >
                  {r}
                </button>
              ))}
            </div>
            <div style={styles.btnRow}>
              <button onClick={handleBack} style={styles.backBtn}>Артқа</button>
              <button onClick={handleNext} style={styles.nextBtn}>Келесі</button>
            </div>
          </div>
        )}

        {/* 5. БЮДЖЕТ ЖӘНЕ ГРАНТТАР */}
        {step === 5 && (
          <div style={styles.stepContent}>
            <h2>Қаржылық жоспар</h2>
            <p>Бұл университеттерді сүзгіден өткізуге көмектеседі.</p>
            <select style={styles.input} onChange={e => setFormData({...formData, budget_type: e.target.value})}>
              <option value="full_grant">Тек 100% грант (Full Ride)</option>
              <option value="partial">Жартылай жеңілдік (Financial Aid)</option>
              <option value="self_funded">Ақылы оқуға дайынмын</option>
            </select>
            {formData.budget_type !== 'full_grant' && (
              <input style={styles.input} placeholder="Жылына шамамен қанша ($-мен)?" onChange={e => setFormData({...formData, max_annual_budget: e.target.value})} />
            )}
            <div style={styles.btnRow}>
              <button onClick={handleBack} style={styles.backBtn}>Артқа</button>
              <button onClick={handleNext} style={styles.nextBtn}>Келесі</button>
            </div>
          </div>
        )}

        {/* 6. ҚОСЫМША ЖЕТІСТІКТЕР */}
        {step === 6 && (
          <div style={styles.stepContent}>
            <h2>Портфолио негізі</h2>
            <p>Олимпиадалар, волонтерлік немесе спорттық жетістіктеріңіз туралы қысқаша жазыңыз.</p>
            <textarea style={{...styles.input, height: '120px'}} placeholder="Мысалы: Шахматтан қалалық жарыс жеңімпазымын..." onChange={e => setFormData({...formData, extra_activities: e.target.value})} />
            <div style={styles.btnRow}>
              <button onClick={handleBack} style={styles.backBtn}>Артқа</button>
              <button onClick={handleSubmit} style={styles.finishBtn}>Профильді талдау</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#f8faff', padding: '60px 20px', fontFamily: "'Montserrat', sans-serif" },
  formCard: { maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '30px', boxShadow: '0 15px 50px rgba(0,0,0,0.05)' },
  header: { marginBottom: '30px' },
  stepBadge: { fontSize: '0.8rem', fontWeight: '800', color: '#0066FF', marginBottom: '10px' },
  progressBase: { width: '100%', height: '4px', background: '#eee', borderRadius: '2px' },
  progressFill: { height: '100%', background: '#0066FF', borderRadius: '2px', transition: '0.3s' },
  title: { fontSize: '1.6rem', fontWeight: '800' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '20px', fontSize: '1rem', boxSizing: 'border-box' },
  btnRow: { display: 'flex', gap: '10px' },
  nextBtn: { flex: 1, padding: '16px', background: '#0066FF', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' },
  backBtn: { padding: '16px 25px', background: '#f0f0f0', borderRadius: '12px', border: 'none', cursor: 'pointer' },
  finishBtn: { flex: 1, padding: '16px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' },
  tagCloud: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' },
  tag: { padding: '10px 15px', border: '1px solid #ddd', borderRadius: '10px', background: '#fff', cursor: 'pointer', fontSize: '0.9rem' },
  tagActive: { padding: '10px 15px', background: '#0066FF', color: '#fff', border: '1px solid #0066FF', borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem' },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#666', marginBottom: '20px' }
};

export default Scan;