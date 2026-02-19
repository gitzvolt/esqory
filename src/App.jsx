import React, { useState, useEffect } from 'react';

// --- БАЗА ЗНАНИЙ (УРОКИ) - БЕЗ ИЗМЕНЕНИЙ ---
const LESSONS_DATA = [
  {
    id: 1,
    title: "Хочу vs Надо",
    desc: "Учимся тратить деньги с умом",
    content: "Деньги конечны, а желаний всегда много. Все траты делятся на две кучи:\n\n1. НАДО (Needs) — это то, без чего нельзя жить (еда, проезд, одежда).\n2. ХОЧУ (Wants) — это развлечения (игры, чипсы, кино).\n\nПравило: Сначала платим за «Надо», и только потом за «Хочу».",
    quiz: {
      question: "У тебя порвались зимние ботинки. Это «Хочу» или «Надо»?",
      options: [
        { text: "Это «Хочу», можно ходить в кроссовках", isCorrect: false },
        { text: "Это «Надо», здоровье важнее всего", isCorrect: true }
      ]
    }
  },
  {
    id: 2,
    title: "Откуда берутся деньги?",
    desc: "Почему банкомат не печатает их просто так?",
    content: "Многие думают, что деньги живут в карточке. Но на самом деле деньги — это оплата за ТРУД.\n\nМама и папа тратят свое время и силы, чтобы заработать.\n1 час работы = 1 обед в столовой.\nПоэтому каждая монета имеет цену времени.",
    quiz: {
      question: "Ты нашел в игре кнопку «Получить 1000$ бесплатно», но просят номер маминой карты. Что сделаешь?",
      options: [
        { text: "Введу номер, это же бесплатно!", isCorrect: false },
        { text: "Закрою и расскажу родителям. Бесплатный сыр только в мышеловке.", isCorrect: true }
      ]
    }
  },
  {
    id: 3,
    title: "Финансовая цель",
    desc: "Как накопить на мечту быстрее?",
    content: "Копить — это значит не тратить всё сразу. Чтобы накопить на велосипед, нужно откладывать понемногу каждый день.\n\nСекрет: Откладывай деньги СРАЗУ, как они появились, а не то, что осталось в конце дня.",
    quiz: {
      question: "Тебе подарили 5000 тенге. Ты хочешь накопить на телефон. Что лучше?",
      options: [
        { text: "Отложить 2000 в копилку, а 3000 взять на расходы", isCorrect: true },
        { text: "Потратить все на сладости, накоплю потом", isCorrect: false }
      ]
    }
  }
];

// --- СТИЛИ ---
const theme = {
  bg: '#0B0E14', card: '#151A23', cardGlass: 'rgba(21,26,35,0.6)',
  primary: '#3B82F6', violet: '#8B5CF6', accent: '#8B5CF6',
  success: '#10B981', danger: '#EF4444', text: '#FFFFFF',
  textSecondary: '#94A3B8', textTertiary: '#64748B',
  border: '#1E293B', borderLight: '#334155'
};

// --- МЕНЕДЖЕР ДАННЫХ ---
const Storage = {
  getUserData: (username) => {
    const data = localStorage.getItem(`esqory_user_${username}`);
    return data ? JSON.parse(data) : null;
  },
  saveUserData: (username, data) => {
    localStorage.setItem(`esqory_user_${username}`, JSON.stringify(data));
  }
};

// --- КОМПОНЕНТЫ ---

// 1. ГЛАВНАЯ (LANDING) - ПРЕМИУМ ВЕРСИЯ
const Landing = ({ onStart }) => {
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: theme.bg, color: 'white', overflowX: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* --- HEADER --- */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)', background: 'rgba(11, 14, 20, 0.8)' }}>
        <div style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', cursor: 'pointer' }} onClick={() => onStart('landing')}>
          <span style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.violet})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Esqory</span>
        </div>
        <nav className="nav-links" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#about" style={{ color: theme.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>О нас</a>
          <a href="#features" style={{ color: theme.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>Возможности</a>
          <a href="#parents" style={{ color: theme.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>Родителям</a>
          <button onClick={() => onStart('kids')} className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px', height: '40px' }}>Войти</button>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="hero-section" style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: `linear-gradient(135deg, ${theme.primary}20, ${theme.violet}20)`, border: `1px solid ${theme.primary}30`, color: theme.primary, marginBottom: '24px', letterSpacing: '1px' }}>🚀 ФИНТЕХ ДЛЯ НОВОГО ПОКОЛЕНИЯ</div>
        <h1 className="hero-title" style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-1px' }}>
          Подготовьте ребёнка<br />к{' '}
          <span style={{ background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #3B82F6 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 3s linear infinite' }}>
            цифровой экономике
          </span>.
        </h1>
        <p style={{ color: theme.textSecondary, fontSize: '18px', maxWidth: '600px', margin: '0 auto 50px', lineHeight: '1.7' }}>
          От первой копилки до расчёта налогов — безопасная платформа, где дети осваивают реальные финансовые навыки через интерактивные симуляции.
        </p>

        {/* КАРТОЧКИ ВЫБОРА */}
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
          <div onClick={() => onStart('kids')} style={heroCardStyle} className="hero-card">
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}>👶</div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>Я учусь</h3>
                <p style={{ fontSize: '13px', color: theme.textSecondary, margin: 0 }}>7-13 лет</p>
              </div>
            </div>
            <div style={{ color: theme.textSecondary }}>→</div>
          </div>
          <div onClick={() => onStart('teens')} style={heroCardStyle} className="hero-card">
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>🚀</div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>Я подросток</h3>
                <p style={{ fontSize: '13px', color: theme.textSecondary, margin: 0 }}>14+ лет</p>
              </div>
            </div>
            <div style={{ color: theme.textSecondary }}>→</div>
          </div>
        </div>
      </section>

      {/* --- ДЛЯ РОДИТЕЛЕЙ (TRUST SECTION) --- */}
      <section id="parents" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: `linear-gradient(135deg, ${theme.success}20, ${theme.success}10)`, border: `1px solid ${theme.success}30`, color: theme.success, marginBottom: '16px', letterSpacing: '1px' }}>ДЛЯ РОДИТЕЛЕЙ</div>
          <h2 className="section-title" style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>Безопасно. Полезно. Эффективно.</h2>
          <p style={{ color: theme.textSecondary, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Мы строим реальные финансовые привычки для будущего страны. <b>Безопасная симуляция:</b> никаких реальных денег, только полезные навыки.
          </p>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div className="glass" style={{ borderRadius: '24px', padding: '30px', transition: 'transform 0.3s ease' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', marginBottom: '18px', background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🛡</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Safe Simulation</h3>
            <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: '1.6', margin: 0 }}>Ребёнок учится на виртуальной валюте. <b>No real money</b> — полная безопасность для вашего Kaspi и семейного бюджета.</p>
          </div>
          <div className="glass" style={{ borderRadius: '24px', padding: '30px', transition: 'transform 0.3s ease' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', marginBottom: '18px', background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🇰🇿</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Будущее Казахстана</h3>
            <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: '1.6', margin: 0 }}>Налоговые режимы РК, пенсионные отчисления и правила рынка — готовим к жизни в современных реалиях Казахстана.</p>
          </div>
          <div className="glass" style={{ borderRadius: '24px', padding: '30px', transition: 'transform 0.3s ease' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', marginBottom: '18px', background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(245,158,11,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🧠</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Правильные привычки</h3>
            <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: '1.6', margin: 0 }}>Учим отличать «Хочу» от «Надо» и объясняем ценность труда. Финансовая грамотность — фундамент успеха.</p>
          </div>
        </div>
      </section>

      {/* --- WHY ESQORY --- */}
      <section id="about" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title" style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>Почему Esqory?</h2>
          <p style={{ color: theme.textSecondary }}>Мы не просто учебник. Мы — симулятор реальной жизни в цифровом мире.</p>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <FeatureCard icon="🏦" title="Реальные навыки" text="Никакой скучной теории. Узнай, как работают налоги, депозиты и фриланс в Казахстане." />
          <FeatureCard icon="🎮" title="Геймификация" text="Копи баллы, переходи на новые уровни и достигай финансовых целей играючи." />
          <FeatureCard icon="📱" title="Современно" text="Дизайн и опыт использования, к которому ты привык в лучших финтех-приложениях." />
        </div>
      </section>

      <div id="features" />

      {/* --- SHOWCASE 1: KIDS --- */}
      <section className="showcase-grid" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        <div>
          <span style={{ background: `${theme.primary}18`, color: theme.primary, padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' }}>ESQORY KIDS</span>
          <h2 className="section-title" style={{ fontSize: '36px', fontWeight: '800', margin: '20px 0', letterSpacing: '-0.5px' }}>Умная копилка</h2>
          <p style={{ color: theme.textSecondary, lineHeight: '1.6', marginBottom: '30px' }}>
            Ставь цели и копи на мечту. Мы научим отличать "Хочу" от "Надо" и объясним, откуда берутся деньги в банкомате.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, color: theme.textSecondary, lineHeight: '2.2' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.primary, fontWeight: '700' }}>✓</span> Уроки в формате сторис</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.primary, fontWeight: '700' }}>✓</span> Виртуальный кошелек</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.primary, fontWeight: '700' }}>✓</span> История накоплений</li>
          </ul>
        </div>

        {/* Визуализация интерфейса ребенка - КЛОН РЕАЛЬНОГО ИНТЕРФЕЙСА */}
        <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden', animation: 'float 6s ease-in-out infinite' }}>
          <div style={{ padding: '24px', background: `linear-gradient(135deg, ${theme.primary}, ${theme.violet})`, textAlign: 'center' }}>
            <p style={{ opacity: 0.8, fontSize: '12px', margin: 0 }}>Всего накоплено</p>
            <h2 style={{ fontSize: '32px', margin: '8px 0' }}>12 500 ₸</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme.textSecondary, marginBottom: '6px' }}>
                <span>✨ Цель: Наушники</span><span>62%</span>
              </div>
              <div style={{ height: '8px', borderRadius: '4px', background: theme.border, overflow: 'hidden' }}>
                <div style={{ width: '62%', height: '100%', borderRadius: '4px', background: `linear-gradient(90deg, ${theme.primary}, ${theme.violet})` }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button className="btn-primary" style={{ padding: '16px', fontSize: '14px', background: theme.success }}>+ В копилку</button>
              <button className="btn-primary" style={{ padding: '16px', fontSize: '14px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.border}` }}>- Взять</button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SHOWCASE 2: PRO --- */}
      <section className="showcase-grid" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        {/* Визуализация интерфейса подростка - КЛОН РЕАЛЬНОГО ИНТЕРФЕЙСА */}
        <div className="glass" style={{ borderRadius: '24px', padding: '24px', animation: 'float 6s ease-in-out infinite reverse' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>🇰🇿 Налоговый симулятор</h3>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '6px' }}>Твой доход (₸)</div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '14px' }}>150 000</div>
          </div>
          <div style={{ padding: '15px', border: `1px solid ${theme.success}`, borderRadius: '12px', background: 'rgba(16, 185, 129, 0.05)', marginBottom: '10px' }}>
            <div style={{ fontSize: '11px', color: theme.success }}>Самозанятый (1%)</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>1 500 ₸</div>
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '13px' }}>Рассчитать налоги</button>
        </div>

        <div>
          <span style={{ background: `${theme.violet}18`, color: theme.violet, padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' }}>ESQORY PRO</span>
          <h2 className="section-title" style={{ fontSize: '36px', fontWeight: '800', margin: '20px 0', letterSpacing: '-0.5px' }}>Инструменты для взрослых</h2>
          <p style={{ color: theme.textSecondary, lineHeight: '1.6', marginBottom: '30px' }}>
            Готов к реальному миру? Рассчитай налоги с фриланса, узнай магию сложного процента и как не попасть в финансовую пирамиду.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, color: theme.textSecondary, lineHeight: '2.2' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.violet, fontWeight: '700' }}>✓</span> Налоговый симулятор (ИП, ГПХ)</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.violet, fontWeight: '700' }}>✓</span> Калькулятор сложного процента</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.violet, fontWeight: '700' }}>✓</span> Академия инвестиций</li>
          </ul>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ borderTop: `1px solid ${theme.border}`, padding: '40px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', color: theme.textTertiary, fontSize: '13px', fontWeight: '500' }}>
          <div>Esqory © 2026</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: theme.textTertiary, textDecoration: 'none', transition: 'color 0.2s' }}>Политика конфиденциальности</a>
            <a href="#" style={{ color: theme.textTertiary, textDecoration: 'none', transition: 'color 0.2s' }}>Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- ВСПОМОГАТЕЛЬНЫЕ СТИЛИ ---
const heroCardStyle = {
  background: theme.cardGlass, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '24px',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
  transition: 'all 0.3s ease', textAlign: 'left'
};

const mockupCardStyle = {
  background: theme.cardGlass, border: `1px solid ${theme.border}`, borderRadius: '20px',
  boxShadow: '0 25px 50px -10px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.06)',
  overflow: 'hidden', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
  animation: 'float 6s ease-in-out infinite'
};

const FeatureCard = ({ icon, title, text }) => (
  <div style={{
    background: theme.cardGlass, border: `1px solid ${theme.border}`, borderRadius: '24px',
    padding: '30px', textAlign: 'left', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  }}>
    <div style={{
      width: '50px', height: '50px', borderRadius: '14px',
      background: `linear-gradient(135deg, ${theme.primary}22 0%, ${theme.violet}22 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '24px', marginBottom: '18px'
    }}>{icon}</div>
    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>{title}</h3>
    <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: '1.6', margin: 0 }}>{text}</p>
  </div>
);

// 2. АВТОРИЗАЦИЯ (ОБНОВЛЕНО: ЛОГИН + ПАРОЛЬ)
const Auth = ({ role, onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Переключатель Вход/Регистрация

  const handleSubmit = () => {
    if (!username || !password) return alert("Заполни логин и пароль!");

    const existingUser = Storage.getUserData(username);

    if (isRegister) {
      // ЛОГИКА РЕГИСТРАЦИИ
      if (existingUser) {
        alert("Такой пользователь уже есть. Попробуй просто войти.");
        setIsRegister(false);
        return;
      }
      // Создаем нового пользователя с паролем
      const newUser = {
        password: password,
        savings: 0,
        history: [],
        completedLessons: []
      };
      Storage.saveUserData(username, newUser);
      onLogin(username);
    } else {
      // ЛОГИКА ВХОДА
      if (!existingUser) return alert("Пользователь не найден. Сначала зарегистрируйся.");

      if (existingUser.password !== password) {
        return alert("Неверный пароль!");
      }
      onLogin(username);
    }
  };

  return (
    <div style={centeredContainer}>
      <div style={cardStyle}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.textSecondary, marginBottom: '20px', cursor: 'pointer' }}>← Назад</button>

        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>
          {isRegister ? 'Создать аккаунт' : 'Вход в Esqory'}
        </h2>
        <p style={{ color: theme.textSecondary, marginBottom: '30px' }}>
          {role === 'kids' ? 'Для детей' : 'Для подростков'}
        </p>

        <input
          placeholder="Логин (Имя)"
          value={username} onChange={e => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password} onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSubmit} style={primaryBtn}>
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>

        <p
          onClick={() => setIsRegister(!isRegister)}
          style={{ marginTop: '20px', color: theme.primary, cursor: 'pointer', textAlign: 'center', fontSize: '14px' }}
        >
          {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}
        </p>
      </div>
    </div>
  );
};

// 3. ДЕТСКИЙ ДАШБОРД - БЕЗ ИЗМЕНЕНИЙ
const KidsDashboard = ({ user, onLogout }) => {
  const [tab, setTab] = useState('wallet');
  const [userData, setUserData] = useState(Storage.getUserData(user));

  const updateData = (newData) => {
    setUserData(newData);
    Storage.saveUserData(user, newData);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: theme.bg }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: `1px solid ${theme.border}`, backdropFilter: 'blur(12px)', background: theme.cardGlass }}>
        <h3 style={{ fontWeight: '800', cursor: 'pointer' }} onClick={onLogout}>Esqory <span style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.violet})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Kids</span></h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span>Привет, {user}!</span>
          <button onClick={onLogout} style={{ ...smallBtn, background: theme.danger }}>Выйти</button>
        </div>
      </nav>

      <div className="centered-container" style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
          <button onClick={() => setTab('wallet')} style={tab === 'wallet' ? activeTab : inactiveTab}>💰 Копилка</button>
          <button onClick={() => setTab('lessons')} style={tab === 'lessons' ? activeTab : inactiveTab}>📚 Уроки</button>
        </div>

        <div className="centered-container centered-content" style={{ marginTop: '30px' }}>
          {tab === 'wallet' ? (
            <WalletComponent userData={userData} updateData={updateData} />
          ) : (
            <div style={{ width: '100%', maxWidth: '600px' }}>
              <LessonsComponent userData={userData} updateData={updateData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// КОМПОНЕНТЫ УРОКОВ И КОПИЛКИ - БЕЗ ИЗМЕНЕНИЙ
const WalletComponent = ({ userData, updateData }) => {
  const [amount, setAmount] = useState('');
  const [goalName, setGoalName] = useState(userData.goalName || '');
  const [goalAmount, setGoalAmount] = useState(userData.goalAmount || '');
  const [showConfetti, setShowConfetti] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const progress = goalAmount > 0 ? Math.min(Math.round((userData.savings / goalAmount) * 100), 100) : 0;
  const isGoalAchieved = progress >= 100 && goalAmount > 0;

  useEffect(() => {
    if (isGoalAchieved && !userData.goalAchieved) {
      setShowSuccessModal(true);
      setShowConfetti(true);
      updateData({ ...userData, goalAchieved: true });
      // We don't auto-stop confetti here, it will fade based on CSS
      setTimeout(() => setShowConfetti(false), 6000);
    }
  }, [isGoalAchieved]);

  const handleClaimGoal = () => {
    const date = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newSavings = userData.savings - userData.goalAmount;
    const newHistory = [{
      text: `Цель достигнута: ${userData.goalName} (-${userData.goalAmount.toLocaleString()} ₸)`,
      color: theme.violet,
      time: date
    }, ...userData.history];

    updateData({
      ...userData,
      savings: newSavings,
      history: newHistory,
      goalName: '',
      goalAmount: 0,
      goalAchieved: false
    });
    setShowSuccessModal(false);
  };

  const handleTrans = (type) => {
    const val = parseInt(amount);
    if (!val || val <= 0) return;

    let newSavings = userData.savings;
    let newHistory = [...userData.history];
    const date = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (type === 'add') {
      newSavings += val;
      newHistory.unshift({ text: `Отложил ${val} ₸`, color: theme.success, time: date });
    } else {
      if (val > newSavings) return alert("Недостаточно средств");
      newSavings -= val;
      newHistory.unshift({ text: `Потратил ${val} ₸`, color: theme.danger, time: date });
    }

    updateData({ ...userData, savings: newSavings, history: newHistory });
    setAmount('');
  };

  const saveGoal = () => {
    if (!goalName || !goalAmount) return alert("Введите название и сумму цели!");
    updateData({ ...userData, goalName, goalAmount: parseInt(goalAmount), goalAchieved: false });
  };

  return (
    <div className="glass" style={{ padding: '24px', borderRadius: '24px', width: '100%' }}>
      {showConfetti && Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="confetti" style={{
          left: `${Math.random() * 100}vw`,
          backgroundColor: [`#3B82F6`, `#8B5CF6`, `#10B981`, `#F59E0B`][Math.floor(Math.random() * 4)],
          animationDelay: `${Math.random() * 1.5}s`,
          width: `${Math.random() * 8 + 6}px`,
          height: `${Math.random() * 4 + 8}px`,
        }} />
      ))}

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="glass modal-content" style={{ padding: '32px', borderRadius: '28px', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Поздравляем!</h2>
            <p style={{ color: theme.textSecondary, marginBottom: '24px', lineHeight: '1.5', fontSize: '15px' }}>
              Ты накопил на свою цель: <strong style={{ color: 'white' }}>{userData.goalName}</strong>!<br />
              Сумма <strong>{userData.goalAmount.toLocaleString()} ₸</strong> будет списана из копилки.
            </p>
            <button onClick={handleClaimGoal} className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '17px' }}>
              Забрать награду 🎁
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="wallet-grid">
        {/* ЛЕВАЯ КОЛОНКА: БАЛАНС И ЦЕЛЬ */}
        <div>
          <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Мой кошелёк</h2>
          <div style={{
            background: isGoalAchieved ? `linear-gradient(135deg, ${theme.success}, #059669)` : `linear-gradient(135deg, ${theme.primary}, ${theme.violet})`,
            padding: '24px',
            borderRadius: '20px',
            textAlign: 'center',
            marginBottom: '20px',
            boxShadow: isGoalAchieved ? '0 10px 30px rgba(16,185,129,0.3)' : '0 10px 30px rgba(59,130,246,0.2)',
            transition: 'all 0.5s ease'
          }}>
            <p style={{ opacity: 0.8, fontSize: '13px', margin: 0 }}>{isGoalAchieved ? 'ЦЕЛЬ ДОСТИГНУТА! 🎉' : 'Всего накоплено'}</p>
            <h1 style={{ fontSize: '36px', margin: '6px 0' }}>{userData.savings.toLocaleString()} ₸</h1>
            {isGoalAchieved && <div style={{ fontSize: '11px', fontWeight: 'bold', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '4px 12px', borderRadius: '20px' }}>🏆 МОЛОДЕЦ!</div>}
          </div>

          {/* DREAM GOAL SECTION */}
          <div className="glass" style={{ padding: '20px', borderRadius: '18px', marginBottom: '20px', background: 'rgba(255,255,255,0.03)' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>✨ Цель: {userData.goalName || 'Не установлена'}</h4>
            {userData.goalAmount > 0 ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme.textSecondary, marginBottom: '8px' }}>
                  <span>Прогресс: {progress}%</span>
                  <span>{userData.savings.toLocaleString()} / {userData.goalAmount.toLocaleString()} ₸</span>
                </div>
                <div style={{ height: '12px', borderRadius: '6px', background: theme.border, overflow: 'hidden', border: isGoalAchieved ? `1px solid ${theme.success}50` : 'none' }}>
                  <div className={isGoalAchieved ? "glow-progress" : ""} style={{ width: `${progress}%`, height: '100%', borderRadius: '6px', background: isGoalAchieved ? theme.success : `linear-gradient(90deg, ${theme.primary}, ${theme.violet})`, transition: 'width 1s ease-in-out' }} />
                </div>
                <button onClick={() => updateData({ ...userData, goalAmount: 0, goalName: '', goalAchieved: false })} style={{ background: 'none', border: 'none', color: theme.textTertiary, fontSize: '11px', marginTop: '10px', cursor: 'pointer' }}>Изменить цель</button>
              </>
            ) : (
              <div style={{ display: 'grid', gap: '10px' }}>
                <input placeholder="На что копим? (например: PS5)" value={goalName} onChange={e => setGoalName(e.target.value)} style={{ ...inputStyle, marginBottom: 0, padding: '10px', fontSize: '14px' }} />
                <input type="number" placeholder="Сколько нужно? (₸)" value={goalAmount} onChange={e => setGoalAmount(e.target.value)} style={{ ...inputStyle, marginBottom: 0, padding: '10px', fontSize: '14px' }} />
                <button onClick={saveGoal} className="btn-primary" style={{ padding: '10px', fontSize: '14px' }}>Установить цель</button>
              </div>
            )}
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: ОПЕРАЦИИ */}
        <div>
          <h4 style={{ marginBottom: '15px' }}>Управление</h4>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '30px' }}>
            <input type="number" placeholder="Сумма (₸)" value={amount} onChange={e => setAmount(e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <button onClick={() => handleTrans('add')} className="btn-primary" style={{ background: theme.success, padding: '20px', fontSize: '18px' }}>+ В копилку</button>
              <button onClick={() => handleTrans('sub')} className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', border: `1px solid ${theme.border}`, padding: '20px', fontSize: '18px' }}>- Взять</button>
            </div>
          </div>

          <h4 style={{ color: theme.textSecondary, marginBottom: '12px', fontSize: '14px' }}>История операций</h4>
          <div className="history-scroll">
            {userData.history.length === 0 && <p style={{ opacity: 0.5, fontSize: '13px' }}>Пока пусто...</p>}
            {userData.history.map((h, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: h.color, fontWeight: '600' }}>{h.text}</span>
                <span style={{ color: theme.textTertiary, fontSize: '11px' }}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonsComponent = ({ userData, updateData }) => {
  const [activeLesson, setActiveLesson] = useState(null);

  const finishLesson = (id) => {
    if (!userData.completedLessons.includes(id)) {
      updateData({ ...userData, completedLessons: [...userData.completedLessons, id] });
    }
    setActiveLesson(null);
  };

  if (activeLesson) {
    return <LessonViewer lesson={activeLesson} onFinish={() => finishLesson(activeLesson.id)} onBack={() => setActiveLesson(null)} />;
  }

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      {LESSONS_DATA.map((lesson) => {
        const isDone = userData.completedLessons.includes(lesson.id);
        return (
          <div
            key={lesson.id}
            onClick={() => setActiveLesson(lesson)}
            style={{ ...cardStyle, cursor: 'pointer', transition: '0.2s', border: isDone ? `1px solid ${theme.success}` : `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <span style={{ color: isDone ? theme.success : theme.primary, fontWeight: 'bold', fontSize: '12px' }}>
                {isDone ? '✅ ПРОЙДЕНО' : `УРОК ${lesson.id}`}
              </span>
              <h3 style={{ marginTop: '5px' }}>{lesson.title}</h3>
              <p style={{ color: theme.textSecondary, fontSize: '14px', marginTop: '5px' }}>{lesson.desc}</p>
            </div>
            <div style={{ background: isDone ? 'rgba(16, 185, 129, 0.2)' : theme.border, width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDone ? theme.success : 'white' }}>
              ▶
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LessonViewer = ({ lesson, onFinish, onBack }) => {
  const [step, setStep] = useState('content');

  const checkAnswer = (isCorrect) => {
    if (isCorrect) {
      alert("Верно! Молодец! 🎉");
      onFinish();
    } else {
      alert("Попробуй еще раз! 🤔");
    }
  };

  return (
    <div style={cardStyle}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.textSecondary, marginBottom: '20px', cursor: 'pointer' }}>← Вернуться к списку</button>

      {step === 'content' ? (
        <>
          <h2 style={{ marginBottom: '20px', color: theme.primary }}>{lesson.title}</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6', whiteSpace: 'pre-line', marginBottom: '30px' }}>{lesson.content}</p>
          <button onClick={() => setStep('quiz')} style={primaryBtn}>Перейти к тесту</button>
        </>
      ) : (
        <>
          <h2 style={{ marginBottom: '20px' }}>Проверка знаний 🧠</h2>
          <p style={{ fontSize: '20px', marginBottom: '30px' }}>{lesson.quiz.question}</p>
          <div style={{ display: 'grid', gap: '15px' }}>
            {lesson.quiz.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => checkAnswer(opt.isCorrect)}
                style={{ ...bigButtonStyle, background: theme.card, border: `1px solid ${theme.border}`, fontSize: '16px' }}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- ДАННЫЕ ДЛЯ ПОДРОСТКОВ (ДОБАВИТЬ В НАЧАЛО ФАЙЛА ПОСЛЕ LESSONS_DATA) ---
// --- ДАННЫЕ ДЛЯ ПОДРОСТКОВ (ОБНОВЛЕННЫЕ) ---
const TEEN_LESSONS_DATA = [
  {
    id: 101,
    title: "Фриланс: В черную или легально?",
    desc: "Как не получить штраф от налоговой в 16 лет.",
    content: "Ты заработал первые 50 000 ₸ на дизайне.\n\nВариант А: Получить на карту и молчать. (Риск: блокировка карты, штраф).\nВариант Б: Единый платеж. В Казахстане можно платить всего 1% (если доход мал), и это полностью легально.\n\nБыть легальным выгодно: тебе дадут кредит, визу и будут доверять крупные клиенты.",
    quiz: {
      question: "Заказчик просит выставить счет официально. Твои действия?",
      options: [
        { text: "Скину просто номер Kaspi, я не ИП", isCorrect: false },
        { text: "Использую приложение e-Salyq Business", isCorrect: true }
      ]
    }
  },
  {
    id: 102,
    title: "Магия сложного процента",
    desc: "Как стать миллионером, откладывая копейки.",
    content: "Альберт Эйнштейн называл сложный процент восьмым чудом света.\n\nСуть: Проценты капают не только на твои деньги, но и на уже начисленные проценты.\n\nПример: 100 000 ₸ под 14% годовых.\n1 год: 114 000 ₸\n5 лет: ~192 000 ₸ (почти удвоилось само собой!).",
    quiz: {
      question: "Что выгоднее на дистанции 10 лет?",
      options: [
        { text: "1 млн тенге сразу под подушкой", isCorrect: false },
        { text: "100к тенге под 15% годовых с пополнением", isCorrect: true }
      ]
    }
  },
  {
    id: 103,
    title: "Пирамиды и Скамы",
    desc: "Легкие деньги = Потеря всего.",
    content: "Признаки финансовой пирамиды:\n1. Гарантируют доход (никто в бизнесе не может гарантировать).\n2. Приведи друга — получишь процент.\n3. Нет реального товара.\n\nЕсли тебе пишут в Telegram «Заработок 50 000 в день, просто лайкай видео» — это мошенники.",
    quiz: {
      question: "Тебе предлагают вложить 10к и получить 20к завтра. Твои действия?",
      options: [
        { text: "Попробую, сумма небольшая", isCorrect: false },
        { text: "Заблокирую. Это скам.", isCorrect: true }
      ]
    }
  }
];

// --- НОВЫЙ ДАШБОРД ДЛЯ ПОДРОСТКОВ (3 РАЗДЕЛА + ДИЗАЙН КАК У ДЕТЕЙ) ---
const TeensDashboard = ({ user, onLogout }) => {
  const [section, setSection] = useState('tax'); // 'tax', 'deposit', 'academy'
  const [userData, setUserData] = useState(Storage.getUserData(user));
  const [activeLesson, setActiveLesson] = useState(null); // Для открытия урока

  const updateData = (newData) => {
    setUserData(newData);
    Storage.saveUserData(user, newData);
  };

  // Если открыт урок, показываем его на весь экран (как у детей)
  if (activeLesson) {
    return (
      <TeenLessonViewer
        lesson={activeLesson}
        onFinish={() => {
          if (!userData.completedLessons.includes(activeLesson.id)) {
            updateData({ ...userData, completedLessons: [...userData.completedLessons, activeLesson.id] });
          }
          setActiveLesson(null);
        }}
        onBack={() => setActiveLesson(null)}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: theme.bg, color: 'white' }}>
      {/* Шапка */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: `1px solid ${theme.border}`, backdropFilter: 'blur(12px)', background: theme.cardGlass }}>
        <h3 style={{ fontWeight: '800', cursor: 'pointer' }} onClick={onLogout}>Esqory <span style={{ background: `linear-gradient(90deg, ${theme.violet}, ${theme.primary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pro</span></h3>
        <button onClick={onLogout} style={{ ...smallBtn, background: theme.danger }}>Выйти</button>
      </nav>

      <div className="centered-container" style={{ marginTop: '30px' }}>
        {/* Меню из 3 разделов */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {/* РАЗДЕЛ 2: ДЕПОЗИТ */}
          {section === 'deposit' && (
            <div style={{ width: '100%', maxWidth: '600px' }}>
              <DepositCalculator />
            </div>
          )}

          {/* РАЗДЕЛ 3: УРОКИ (АКАДЕМИЯ) */}
          {section === 'academy' && (
            <div style={{ display: 'grid', gap: '20px' }}>
              {TEEN_LESSONS_DATA.map((lesson) => {
                const isDone = userData.completedLessons.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className="glass"
                    style={{ padding: '30px', borderRadius: '24px', cursor: 'pointer', border: isDone ? `2px solid ${theme.success}` : `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }}
                  >
                    <div>
                      <span style={{ color: isDone ? theme.success : theme.accent, fontWeight: 'bold', fontSize: '12px', letterSpacing: '1px' }}>
                        {isDone ? '✅ ПРОЙДЕНО' : 'BUSINESS LESSON'}
                      </span>
                      <h3 style={{ marginTop: '5px', fontSize: '20px' }}>{lesson.title}</h3>
                      <p style={{ color: theme.textSecondary, fontSize: '14px' }}>{lesson.desc}</p>
                    </div>
                    <div className="btn-primary" style={{ width: '50px', height: '50px', borderRadius: '50%' }}>
                      🚀
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ (Вставь их ниже TeensDashboard) ---

// 1. Просмотрщик урока (Модальное окно как у детей)
const TeenLessonViewer = ({ lesson, onFinish, onBack }) => {
  const [step, setStep] = useState('content'); // content -> quiz

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      alert("Верно! Ты мыслишь как предприниматель! 💸");
      onFinish();
    } else {
      alert("Не совсем так. Попробуй еще раз.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', background: theme.bg }}>
      <div style={cardStyle}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.textSecondary, marginBottom: '20px', cursor: 'pointer' }}>← Назад</button>

        {step === 'content' ? (
          <>
            <h2 style={{ color: theme.accent, marginBottom: '20px' }}>{lesson.title}</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6', whiteSpace: 'pre-line', marginBottom: '30px' }}>{lesson.content}</p>
            <button onClick={() => setStep('quiz')} style={primaryBtn}>Перейти к тесту</button>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: '20px' }}>Бизнес-задача 🧠</h2>
            <p style={{ fontSize: '20px', marginBottom: '30px' }}>{lesson.quiz.question}</p>
            <div style={{ display: 'grid', gap: '15px' }}>
              {lesson.quiz.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.isCorrect)}
                  style={{ ...bigButtonStyle, background: theme.card, border: `1px solid ${theme.border}`, fontSize: '16px' }}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// 2. Калькулятор Налогов (Вынесен отдельно)
const TaxCalculator = () => {
  const [income, setIncome] = useState('');
  const [res, setRes] = useState(null);

  const calc = () => {
    const val = parseInt(income);
    if (!val) return;
    setRes({
      self: Math.round(val * 0.01), // ЕСП (условно 1%)
      ip: Math.round(val * 0.03)    // Упрощенка (3%)
    });
  };

  return (
    <div className="glass" style={{ padding: '40px', borderRadius: '24px' }}>
      <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>🇰🇿 <span className="gradient-text">Налоговый симулятор</span></h2>
      <p style={{ marginBottom: '20px', color: theme.textSecondary }}>Посчитай, сколько нужно отдать государству, чтобы спать спокойно.</p>

      <input
        type="number"
        placeholder="Твой доход за месяц (₸)"
        value={income} onChange={e => setIncome(e.target.value)}
        style={inputStyle}
      />
      <button onClick={calc} className="btn-primary" style={{ width: '100%', padding: '16px' }}>Рассчитать налоги</button>

      {res && (
        <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
          <div className="glass" style={{ padding: '20px', border: `1px solid ${theme.success}`, borderRadius: '18px', background: 'rgba(16, 185, 129, 0.05)' }}>
            <h4 style={{ color: theme.success, margin: 0, fontSize: '14px' }}>Самозанятый (1%)</h4>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>{res.self.toLocaleString()} ₸</p>
            <span style={{ fontSize: '11px', opacity: 0.7 }}>Идеально для фрилансеров РК</span>
          </div>
          <div className="glass" style={{ padding: '20px', border: `1px solid ${theme.primary}`, borderRadius: '18px' }}>
            <h4 style={{ color: theme.primary, margin: 0, fontSize: '14px' }}>ИП Упрощенка (3%)</h4>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>{res.ip.toLocaleString()} ₸</p>
            <span style={{ fontSize: '11px', opacity: 0.7 }}>Если работаешь по договорам</span>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. Калькулятор Депозита (Вынесен отдельно)
// 3. Калькулятор Депозита (ОБНОВЛЕННЫЙ PRO)
const DepositCalculator = () => {
  // Состояния для ввода
  const [start, setStart] = useState('');       // Начальная сумма
  const [years, setYears] = useState('3');      // Срок (по дефолту 3 года)
  const [monthly, setMonthly] = useState('');   // Ежемесячное пополнение

  // Состояния для ставки
  const [isCustomRate, setIsCustomRate] = useState(false);
  const [customRate, setCustomRate] = useState('');

  // Результат
  const [result, setResult] = useState(null);

  const calc = () => {
    // Преобразуем ввод в числа
    const P = parseInt(start) || 0;           // Start Principal
    const t = parseInt(years) || 1;           // Time (years)
    const PMT = parseInt(monthly) || 0;       // Monthly Payment

    // Определяем ставку
    let rate = 14.1; // Базовая ГЭСВ
    if (isCustomRate && customRate) {
      rate = parseFloat(customRate);
    }
    const r = rate / 100;
    const n = 12; // Капитализация каждый месяц

    // 1. Сложный процент на начальную сумму: A = P(1 + r/n)^(nt)
    const principalGrowth = P * Math.pow(1 + r / n, n * t);

    // 2. Сложный процент на ежемесячные пополнения (Future Value of a Series)
    // FV = PMT * [ (1 + r/n)^(nt) - 1 ] / (r/n)
    let contributionGrowth = 0;
    if (PMT > 0) {
      contributionGrowth = PMT * (Math.pow(1 + r / n, n * t) - 1) / (r / n);
    }

    const totalValue = Math.round(principalGrowth + contributionGrowth);
    const totalInvested = P + (PMT * 12 * t);
    const profit = totalValue - totalInvested;

    setResult({ total: totalValue, invested: totalInvested, profit: profit });
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ marginBottom: '20px' }}>📈 Сила сложного процента</h2>
      <p style={{ marginBottom: '20px', color: theme.textSecondary }}>Рассчитай свою прибыль с учетом пополнений.</p>

      {/* 1. Начальная сумма */}
      <label style={{ fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '5px' }}>Начальный взнос (₸)</label>
      <input
        type="number"
        placeholder="Например: 100 000"
        value={start} onChange={e => setStart(e.target.value)}
        style={inputStyle}
      />

      {/* 2. Срок и Пополнения */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <label style={{ fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '5px' }}>Срок (лет)</label>
          <input
            type="number"
            value={years} onChange={e => setYears(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '5px' }}>Пополнять в месяц (₸)</label>
          <input
            type="number"
            placeholder="0"
            value={monthly} onChange={e => setMonthly(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* 3. Выбор ставки */}
      <div style={{ marginBottom: '20px', background: theme.bg, padding: '10px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
        <label style={{ fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '10px' }}>Процентная ставка (Годовых)</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsCustomRate(false)}
            style={{
              padding: '8px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', flex: 1,
              background: !isCustomRate ? `linear-gradient(135deg, ${theme.primary}, ${theme.violet})` : 'transparent',
              color: 'white',
              border: !isCustomRate ? 'none' : `1px solid ${theme.border}`
            }}
          >
            Базовая 14.1%
          </button>
          <button
            onClick={() => setIsCustomRate(true)}
            style={{
              padding: '8px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', flex: 1,
              background: isCustomRate ? theme.primary : 'transparent',
              color: isCustomRate ? 'white' : theme.textSecondary,
              border: isCustomRate ? 'none' : `1px solid ${theme.border}`
            }}
          >
            Своя
          </button>
        </div>

        {isCustomRate && (
          <input
            type="number"
            placeholder="Введи %"
            value={customRate} onChange={e => setCustomRate(e.target.value)}
            style={{ ...inputStyle, marginTop: '10px', marginBottom: 0 }}
          />
        )}
      </div>

      {/* КНОПКА (ТЕПЕРЬ ЯРКАЯ) */}
      <button
        onClick={calc}
        className="btn-primary"
        style={{ width: '100%', padding: '16px', fontSize: '16px' }}
      >
        Рассчитать доход 🚀
      </button>

      {/* РЕЗУЛЬТАТ */}
      {result && (
        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: `1px solid ${theme.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: theme.textSecondary }}>Вложено тобой:</span>
            <span style={{ fontWeight: 'bold' }}>{result.invested.toLocaleString()} ₸</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#10B981' }}>Чистая прибыль:</span>
            <span style={{ fontWeight: 'bold', color: '#10B981' }}>+{result.profit.toLocaleString()} ₸</span>
          </div>
          <div style={{ textAlign: 'center', marginTop: '15px', background: 'rgba(16, 185, 129, 0.1)', padding: '15px', borderRadius: '12px' }}>
            <p style={{ color: theme.textSecondary, fontSize: '12px' }}>Итоговая сумма через {years} лет:</p>
            <h1 style={{ fontSize: '36px', color: '#10B981', margin: '5px 0' }}>{result.total.toLocaleString()} ₸</h1>
          </div>
        </div>
      )}
    </div>
  );
};

// Вспомогательный компонент для карточки урока подростка
const TeenLessonCard = ({ lesson, isDone, onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('desc'); // desc -> content -> quiz

  const handleQuiz = (isCorrect) => {
    if (isCorrect) {
      alert("Правильно! Бизнес-уровень повышен. 📈");
      onComplete(lesson.id);
      setIsOpen(false);
    } else {
      alert("Ошибка. Подумай как предприниматель. 🤔");
    }
  };

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        style={{ ...cardStyle, cursor: 'pointer', border: isDone ? `1px solid ${theme.accent}` : `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <span style={{ color: isDone ? theme.accent : theme.textSecondary, fontWeight: 'bold', fontSize: '12px', letterSpacing: '1px' }}>
            {isDone ? '✅ ВЫУЧЕНО' : 'BUSINESS LESSON'}
          </span>
          <h3 style={{ marginTop: '5px', fontSize: '20px' }}>{lesson.title}</h3>
          <p style={{ color: theme.textSecondary, fontSize: '14px' }}>{lesson.desc}</p>
        </div>
        <div style={{ padding: '10px 20px', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '10px' }}>Start</div>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: theme.textSecondary, marginBottom: '15px', cursor: 'pointer' }}>← Закрыть</button>

      {step === 'desc' && (
        <>
          <h2 style={{ color: theme.accent }}>{lesson.title}</h2>
          <p style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.6' }}>{lesson.content}</p>
          <button onClick={() => setStep('quiz')} style={{ ...primaryBtn, marginTop: '30px' }}>К тесту</button>
        </>
      )}

      {step === 'quiz' && (
        <>
          <h3 style={{ marginBottom: '20px' }}>Кейс: {lesson.quiz.question}</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {lesson.quiz.options.map((opt, i) => (
              <button key={i} onClick={() => handleQuiz(opt.isCorrect)} style={secondaryBtn}>{opt.text}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- ГЛАВНЫЙ КОНТРОЛЛЕР ---
// --- ГЛАВНЫЙ КОНТРОЛЛЕР (ОБНОВЛЕННЫЙ С АВТО-ВХОДОМ) ---
export default function App() {
  const [screen, setScreen] = useState('landing');
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  // 1. ПРОВЕРКА ПРИ ЗАПУСКЕ: Есть ли сохраненная сессия?
  useEffect(() => {
    const savedUser = localStorage.getItem('esqory_session_user');
    const savedRole = localStorage.getItem('esqory_session_role');

    if (savedUser && savedRole) {
      setUser(savedUser);
      setRole(savedRole);
      setScreen('dashboard');
    }
  }, []);

  const handleStart = (selectedRole) => {
    setRole(selectedRole);
    setScreen('auth');
  };

  const handleLogin = (username) => {
    setUser(username);
    setScreen('dashboard');
    // 2. СОХРАНЯЕМ СЕССИЮ ПРИ ВХОДЕ
    localStorage.setItem('esqory_session_user', username);
    localStorage.setItem('esqory_session_role', role);
  };

  const handleLogout = () => {
    setScreen('landing');
    setUser(null);
    setRole(null);
    // 3. УДАЛЯЕМ СЕССИЮ ПРИ ВЫХОДЕ
    localStorage.removeItem('esqory_session_user');
    localStorage.removeItem('esqory_session_role');
  };

  return (
    <>
      {screen === 'landing' && <Landing onStart={(val) => val === 'landing' ? setScreen('landing') : handleStart(val)} />}

      {screen === 'auth' && (
        <Auth role={role} onLogin={handleLogin} onBack={() => setScreen('landing')} />
      )}

      {screen === 'dashboard' && role === 'kids' && (
        <KidsDashboard user={user} onLogout={handleLogout} />
      )}

      {screen === 'dashboard' && role === 'teens' && (
        <TeensDashboard user={user} onLogout={handleLogout} />
      )}
    </>
  );
}

// --- СТИЛИ ---
const centeredContainer = {
  minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column',
  justifyContent: 'center', alignItems: 'center', background: theme.bg
};

const cardStyle = {
  background: theme.cardGlass, padding: '40px', borderRadius: '24px',
  width: '100%', maxWidth: '600px',
  boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(59, 130, 246, 0.05)',
  border: `1px solid ${theme.border}`,
  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
  transition: 'box-shadow 0.3s ease, transform 0.3s ease'
};

const bigButtonStyle = {
  padding: '20px', fontSize: '18px', color: 'white',
  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.violet} 100%)`,
  border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: '600',
  transition: 'transform 0.15s ease, box-shadow 0.3s ease',
  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
};

const primaryBtn = {
  width: '100%', padding: '14px', color: 'white',
  background: `linear-gradient(135deg, ${theme.primary} 0%, #2563EB 100%)`,
  border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer',
  transition: 'transform 0.15s ease, box-shadow 0.3s ease, filter 0.2s ease',
  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
};

const smallBtn = {
  padding: '8px 16px', borderRadius: '8px', border: 'none', color: 'white',
  cursor: 'pointer', fontWeight: '600', transition: 'filter 0.2s ease'
};

const inputStyle = {
  width: '100%', padding: '14px', background: 'rgba(11,14,20,0.8)',
  border: `1px solid ${theme.border}`,
  borderRadius: '12px', color: 'white', marginBottom: '15px', fontSize: '16px',
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
};

const activeTab = {
  padding: '10px 30px', color: 'white', borderRadius: '20px',
  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.violet} 100%)`,
  border: 'none', fontWeight: '600', cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.25)',
  transition: 'all 0.3s ease'
};

const inactiveTab = {
  padding: '10px 30px', background: 'transparent', color: theme.textSecondary, borderRadius: '20px',
  border: 'none', fontWeight: '600', cursor: 'pointer',
  transition: 'all 0.3s ease'
};