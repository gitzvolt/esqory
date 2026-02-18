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

// --- СТИЛИ - БЕЗ ИЗМЕНЕНИЙ ---
const theme = {
  bg: '#0B0E14', card: '#151A23', primary: '#3B82F6', 
  success: '#10B981', danger: '#EF4444', text: '#FFFFFF', 
  textSecondary: '#94A3B8', border: '#2D3748'
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

// 1. ГЛАВНАЯ (LANDING) - ПОЛНАЯ ВЕРСИЯ (КАК НА ФОТО)
const Landing = ({ onStart }) => {
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: theme.bg, color: 'white', overflowX: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      
      {/* --- HEADER --- */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>Esqory</div>
        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#" style={{ color: theme.textSecondary, textDecoration: 'none', fontSize: '14px' }}>О нас</a>
          <a href="#" style={{ color: theme.textSecondary, textDecoration: 'none', fontSize: '14px' }}>Возможности</a>
          <button onClick={() => onStart('kids')} style={{ padding: '10px 24px', background: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '14px' }}>Войти</button>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <section style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px' }}>
          Финансовая грамотность <br />
          <span style={{ background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            нового поколения
          </span> Казахстана.
        </h1>
        <p style={{ color: theme.textSecondary, fontSize: '18px', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px' }}>
          Учись управлять деньгами с детства. От первой копилки до расчета налогов и инвестиций.
        </p>

        {/* КАРТОЧКИ ВЫБОРА */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
          <div onClick={() => onStart('kids')} style={heroCardStyle}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', background: '#F59E0B', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👶</div>
              <div style={{textAlign: 'left'}}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Я учусь</h3>
                <p style={{ fontSize: '13px', color: theme.textSecondary, margin: 0 }}>7-13 лет</p>
              </div>
            </div>
            <div style={{ color: theme.textSecondary }}>→</div>
          </div>
          <div onClick={() => onStart('teens')} style={heroCardStyle}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', background: '#EF4444', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🚀</div>
              <div style={{textAlign: 'left'}}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Я подросток</h3>
                <p style={{ fontSize: '13px', color: theme.textSecondary, margin: 0 }}>14+ лет</p>
              </div>
            </div>
            <div style={{ color: theme.textSecondary }}>→</div>
          </div>
        </div>
      </section>

      {/* --- WHY ESQORY --- */}
      <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>Почему Esqory?</h2>
          <p style={{ color: theme.textSecondary }}>Мы не просто учебник. Мы — симулятор реальной жизни.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <FeatureCard icon="🏦" title="Реальные навыки" text="Никакой скучной теории. Узнай, как работают налоги, депозиты и фриланс в Казахстане." />
          <FeatureCard icon="🎮" title="Геймификация" text="Копи баллы, переходи на новые уровни и достигай финансовых целей играючи." />
          <FeatureCard icon="📱" title="Современно" text="Дизайн и опыт использования, к которому ты привык в любимых приложениях." />
        </div>
      </section>

      {/* --- SHOWCASE 1: KIDS (Слева текст, Справа фото) --- */}
      <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        <div>
          <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>ESQORY KIDS</span>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '20px 0' }}>Умная копилка</h2>
          <p style={{ color: theme.textSecondary, lineHeight: '1.6', marginBottom: '30px' }}>
            Ставь цели и копи на мечту. Мы научим отличать "Хочу" от "Надо" и объясним, откуда берутся деньги в банкомате.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, color: theme.textSecondary, lineHeight: '2' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#3B82F6' }}>✓</span> Уроки в формате сторис</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#3B82F6' }}>✓</span> Виртуальный кошелек</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#3B82F6' }}>✓</span> История накоплений</li>
          </ul>
        </div>
        
        {/* Визуализация интерфейса ребенка */}
        <div style={mockupCardStyle}>
          <div style={{ padding: '20px', borderBottom: `1px solid ${theme.border}` }}>
            <div style={{fontSize: '14px', color: theme.textSecondary, marginBottom: '5px'}}>Моя копилка</div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3B82F6' }}>0 ₸</div>
            </div>
          </div>
          <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
            <div style={{ background: '#10B981', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>+ В копилку</div>
            <div style={{ background: '#374151', color: '#9CA3AF', padding: '10px', borderRadius: '8px', textAlign: 'center', fontSize: '12px' }}>- Взять</div>
          </div>
        </div>
      </section>

      {/* --- SHOWCASE 2: PRO (Слева фото, Справа текст) --- */}
      <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        
        {/* Визуализация интерфейса подростка */}
        <div style={mockupCardStyle}>
          <div style={{ padding: '20px' }}>
             <div style={{marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px'}}>
               <span style={{fontSize: '12px'}}>💰</span> <span style={{fontSize: '14px', fontWeight: 'bold'}}>Сила сложного процента</span>
             </div>
             <div style={{marginBottom: '15px'}}>
               <div style={{fontSize: '10px', color: theme.textSecondary, marginBottom: '5px'}}>Начальный взнос (₸)</div>
               <div style={{background: '#0B0E14', padding: '10px', borderRadius: '6px', border: `1px solid ${theme.border}`, fontSize: '14px'}}>100 000</div>
             </div>
             <div style={{fontSize: '12px', color: '#10B981', marginBottom: '15px'}}>Через 3 года: ~148 000 ₸</div>
             <div style={{background: '#3B82F6', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold'}}>Рассчитать доход 🚀</div>
          </div>
        </div>

        <div>
          <span style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>ESQORY PRO</span>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '20px 0' }}>Инструменты для взрослых</h2>
          <p style={{ color: theme.textSecondary, lineHeight: '1.6', marginBottom: '30px' }}>
            Готов к реальному миру? Рассчитай налоги с фриланса, узнай магию сложного процента и как не попасть в финансовую пирамиду.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, color: theme.textSecondary, lineHeight: '2' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#8B5CF6' }}>✓</span> Налоговый симулятор (ИП, ГПХ)</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#8B5CF6' }}>✓</span> Калькулятор сложного процента</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#8B5CF6' }}>✓</span> Академия инвестиций</li>
          </ul>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ borderTop: `1px solid ${theme.border}`, padding: '40px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', color: theme.textSecondary, fontSize: '12px' }}>
          <div>Esqory © 2026</div>
        </div>
      </footer>
    </div>
  );
};

// --- ВСПОМОГАТЕЛЬНЫЕ СТИЛИ (ДОБАВИТЬ ВНИЗ) ---
const heroCardStyle = {
  background: '#151A23', border: '1px solid #2D3748', borderRadius: '20px', padding: '24px', 
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
  transition: 'all 0.2s', textAlign: 'left'
};

const mockupCardStyle = {
  background: '#151A23', border: '1px solid #2D3748', borderRadius: '16px', 
  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)', overflow: 'hidden'
};

const FeatureCard = ({ icon, title, text }) => (
  <div style={{ background: '#151A23', border: '1px solid #2D3748', borderRadius: '24px', padding: '30px', textAlign: 'left' }}>
    <div style={{ fontSize: '30px', marginBottom: '15px' }}>{icon}</div>
    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{title}</h3>
    <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: '1.5' }}>{text}</p>
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
        <button onClick={onBack} style={{background: 'none', border: 'none', color: theme.textSecondary, marginBottom: '20px', cursor: 'pointer'}}>← Назад</button>
        
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
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: `1px solid ${theme.border}` }}>
        <h3 style={{ fontWeight: 'bold' }}>Esqory <span style={{color: theme.primary}}>Kids</span></h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span>Привет, {user}!</span>
          <button onClick={onLogout} style={{ ...smallBtn, background: theme.danger }}>Выйти</button>
        </div>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '10px' }}>
        <button onClick={() => setTab('wallet')} style={tab === 'wallet' ? activeTab : inactiveTab}>💰 Копилка</button>
        <button onClick={() => setTab('lessons')} style={tab === 'lessons' ? activeTab : inactiveTab}>📚 Уроки</button>
      </div>

      <div style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px' }}>
        {tab === 'wallet' ? (
          <WalletComponent userData={userData} updateData={updateData} />
        ) : (
          <LessonsComponent userData={userData} updateData={updateData} />
        )}
      </div>
    </div>
  );
};

// КОМПОНЕНТЫ УРОКОВ И КОПИЛКИ - БЕЗ ИЗМЕНЕНИЙ
const WalletComponent = ({ userData, updateData }) => {
  const [amount, setAmount] = useState('');

  const handleTrans = (type) => {
    const val = parseInt(amount);
    if (!val || val <= 0) return;
    
    let newSavings = userData.savings;
    let newHistory = [...userData.history];
    const date = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    if (type === 'add') {
      newSavings += val;
      newHistory.unshift({text: `Отложил ${val} ₸`, color: theme.success, time: date});
    } else {
      if (val > newSavings) return alert("Недостаточно средств");
      newSavings -= val;
      newHistory.unshift({text: `Потратил ${val} ₸`, color: theme.danger, time: date});
    }

    updateData({ ...userData, savings: newSavings, history: newHistory });
    setAmount('');
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ marginBottom: '20px' }}>Моя копилка</h2>
      <div style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', padding: '30px', borderRadius: '20px', textAlign: 'center', marginBottom: '30px' }}>
        <p style={{ opacity: 0.8, fontSize: '14px' }}>Всего накоплено</p>
        <h1 style={{ fontSize: '48px', margin: '10px 0' }}>{userData.savings.toLocaleString()} ₸</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="number" 
          placeholder="Сумма (₸)" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          style={{...inputStyle, marginBottom: 0}} 
        />
        <button onClick={() => handleTrans('add')} style={{...primaryBtn, background: theme.success}}>+ В копилку</button>
        <button onClick={() => handleTrans('sub')} style={{...primaryBtn, background: '#374151'}}>- Взять</button>
      </div>

      <div>
        <h4 style={{ color: theme.textSecondary, marginBottom: '10px' }}>История операций</h4>
        {userData.history.length === 0 && <p style={{opacity: 0.5}}>Пока пусто...</p>}
        {userData.history.map((h, i) => (
          <div key={i} style={{ padding: '12px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{color: h.color, fontWeight: 'bold'}}>{h.text}</span>
            <span style={{color: theme.textSecondary, fontSize: '12px'}}>{h.time}</span>
          </div>
        ))}
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
      <button onClick={onBack} style={{background: 'none', border: 'none', color: theme.textSecondary, marginBottom: '20px', cursor: 'pointer'}}>← Вернуться к списку</button>
      
      {step === 'content' ? (
        <>
          <h2 style={{marginBottom: '20px', color: theme.primary}}>{lesson.title}</h2>
          <p style={{fontSize: '18px', lineHeight: '1.6', whiteSpace: 'pre-line', marginBottom: '30px'}}>{lesson.content}</p>
          <button onClick={() => setStep('quiz')} style={primaryBtn}>Перейти к тесту</button>
        </>
      ) : (
        <>
          <h2 style={{marginBottom: '20px'}}>Проверка знаний 🧠</h2>
          <p style={{fontSize: '20px', marginBottom: '30px'}}>{lesson.quiz.question}</p>
          <div style={{display: 'grid', gap: '15px'}}>
            {lesson.quiz.options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => checkAnswer(opt.isCorrect)}
                style={{...bigButtonStyle, background: theme.card, border: `1px solid ${theme.border}`, fontSize: '16px'}}
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
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: `1px solid ${theme.border}` }}>
        <h3 style={{ fontWeight: 'bold' }}>Esqory <span style={{color: theme.accent}}>Pro</span></h3>
        <button onClick={onLogout} style={{ ...smallBtn, background: theme.danger }}>Выйти</button>
      </nav>

      {/* Меню из 3 разделов */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '15px', flexWrap: 'wrap' }}>
        <button onClick={() => setSection('tax')} style={section === 'tax' ? activeTab : inactiveTab}>🏛 Налоги</button>
        <button onClick={() => setSection('deposit')} style={section === 'deposit' ? activeTab : inactiveTab}>📈 Депозит</button>
        <button onClick={() => setSection('academy')} style={section === 'academy' ? activeTab : inactiveTab}>🎓 Академия</button>
      </div>

      <div style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px' }}>
        
        {/* РАЗДЕЛ 1: НАЛОГИ */}
        {section === 'tax' && <TaxCalculator />}

        {/* РАЗДЕЛ 2: ДЕПОЗИТ */}
        {section === 'deposit' && <DepositCalculator />}

        {/* РАЗДЕЛ 3: УРОКИ (АКАДЕМИЯ) */}
        {section === 'academy' && (
          <div style={{ display: 'grid', gap: '20px' }}>
             {TEEN_LESSONS_DATA.map((lesson) => {
                const isDone = userData.completedLessons.includes(lesson.id);
                return (
                  <div 
                    key={lesson.id} 
                    onClick={() => setActiveLesson(lesson)}
                    style={{ ...cardStyle, cursor: 'pointer', border: isDone ? `1px solid ${theme.success}` : `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <span style={{ color: isDone ? theme.success : theme.accent, fontWeight: 'bold', fontSize: '12px', letterSpacing: '1px' }}>
                        {isDone ? '✅ ПРОЙДЕНО' : 'BUSINESS LESSON'}
                      </span>
                      <h3 style={{ marginTop: '5px', fontSize: '20px' }}>{lesson.title}</h3>
                      <p style={{ color: theme.textSecondary, fontSize: '14px' }}>{lesson.desc}</p>
                    </div>
                    <div style={{ background: theme.card, padding: '10px 15px', borderRadius: '50%', border: `1px solid ${theme.border}` }}>
                      🚀
                    </div>
                  </div>
                );
             })}
          </div>
        )}
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
        <button onClick={onBack} style={{background: 'none', border: 'none', color: theme.textSecondary, marginBottom: '20px', cursor: 'pointer'}}>← Назад</button>
        
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
                  style={{...bigButtonStyle, background: theme.card, border: `1px solid ${theme.border}`, fontSize: '16px'}}
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
    <div style={cardStyle}>
      <h2 style={{ marginBottom: '20px' }}>🇰🇿 Налоговый симулятор</h2>
      <p style={{ marginBottom: '20px', color: theme.textSecondary }}>Посчитай, сколько нужно отдать государству, чтобы спать спокойно.</p>
      
      <input 
        type="number" 
        placeholder="Твой доход за месяц (₸)" 
        value={income} onChange={e => setIncome(e.target.value)} 
        style={inputStyle} 
      />
      <button onClick={calc} style={primaryBtn}>Рассчитать налоги</button>

      {res && (
        <div style={{ marginTop: '20px', display: 'grid', gap: '10px' }}>
           <div style={{ padding: '15px', border: `1px solid ${theme.success}`, borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)' }}>
             <h4 style={{ color: theme.success, margin: 0 }}>Самозанятый (1%)</h4>
             <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px 0' }}>{res.self} ₸</p>
             <span style={{ fontSize: '12px', opacity: 0.7 }}>Идеально для фрилансеров до 4 млн в год</span>
           </div>
           <div style={{ padding: '15px', border: `1px solid ${theme.primary}`, borderRadius: '12px' }}>
             <h4 style={{ color: theme.primary, margin: 0 }}>ИП Упрощенка (3%)</h4>
             <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px 0' }}>{res.ip} ₸</p>
             <span style={{ fontSize: '12px', opacity: 0.7 }}>Если работаешь с крупными компаниями</span>
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
      <label style={{fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '5px'}}>Начальный взнос (₸)</label>
      <input 
        type="number" 
        placeholder="Например: 100 000" 
        value={start} onChange={e => setStart(e.target.value)} 
        style={inputStyle} 
      />

      {/* 2. Срок и Пополнения */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
        <div>
          <label style={{fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '5px'}}>Срок (лет)</label>
          <input 
            type="number" 
            value={years} onChange={e => setYears(e.target.value)} 
            style={inputStyle} 
          />
        </div>
        <div>
          <label style={{fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '5px'}}>Пополнять в месяц (₸)</label>
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
        <label style={{fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '10px'}}>Процентная ставка (Годовых)</label>
        <div style={{display: 'flex', gap: '10px'}}>
          <button 
            onClick={() => setIsCustomRate(false)}
            style={{ 
              padding: '8px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', flex: 1,
              background: !isCustomRate ? theme.success : 'transparent', 
              color: !isCustomRate ? 'white' : theme.textSecondary,
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
            style={{...inputStyle, marginTop: '10px', marginBottom: 0}} 
          />
        )}
      </div>

      {/* КНОПКА (ТЕПЕРЬ ЯРКАЯ) */}
      <button 
        onClick={calc} 
        style={{
          width: '100%', padding: '15px', background: '#10B981', color: 'white', 
          border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
        }}
      >
        Рассчитать доход 🚀
      </button>

      {/* РЕЗУЛЬТАТ */}
      {result && (
        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: `1px solid ${theme.border}` }}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
             <span style={{color: theme.textSecondary}}>Вложено тобой:</span>
             <span style={{fontWeight: 'bold'}}>{result.invested.toLocaleString()} ₸</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
             <span style={{color: '#10B981'}}>Чистая прибыль:</span>
             <span style={{fontWeight: 'bold', color: '#10B981'}}>+{result.profit.toLocaleString()} ₸</span>
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
    if(isCorrect) {
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
      <button onClick={() => setIsOpen(false)} style={{background: 'none', border: 'none', color: theme.textSecondary, marginBottom: '15px', cursor: 'pointer'}}>← Закрыть</button>
      
      {step === 'desc' && (
        <>
          <h2 style={{color: theme.accent}}>{lesson.title}</h2>
          <p style={{marginTop: '20px', fontSize: '16px', lineHeight: '1.6'}}>{lesson.content}</p>
          <button onClick={() => setStep('quiz')} style={{...primaryBtn, marginTop: '30px'}}>К тесту</button>
        </>
      )}

      {step === 'quiz' && (
        <>
           <h3 style={{marginBottom: '20px'}}>Кейс: {lesson.quiz.question}</h3>
           <div style={{display: 'grid', gap: '10px'}}>
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
      {screen === 'landing' && <Landing onStart={handleStart} />}
      
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

// --- СТИЛИ (Без изменений) ---
const centeredContainer = {
  minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', 
  justifyContent: 'center', alignItems: 'center', background: theme.bg
};

const cardStyle = {
  background: theme.card, padding: '40px', borderRadius: '24px', 
  width: '100%', maxWidth: '600px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  border: `1px solid ${theme.border}`
};

const bigButtonStyle = {
  padding: '20px', fontSize: '18px', background: theme.primary, color: 'white',
  border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: 'bold',
  transition: 'transform 0.1s'
};

const primaryBtn = {
  width: '100%', padding: '14px', background: theme.primary, color: 'white',
  border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
};

const smallBtn = {
  padding: '8px 16px', borderRadius: '8px', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold'
};

const inputStyle = {
  width: '100%', padding: '14px', background: theme.bg, border: `1px solid ${theme.border}`,
  borderRadius: '12px', color: 'white', marginBottom: '15px', fontSize: '16px',
  outline: 'none', boxSizing: 'border-box'
};

const activeTab = {
  padding: '10px 30px', background: theme.primary, color: 'white', borderRadius: '20px',
  border: 'none', fontWeight: 'bold', cursor: 'pointer'
};

const inactiveTab = {
  padding: '10px 30px', background: 'transparent', color: theme.textSecondary, borderRadius: '20px',
  border: 'none', fontWeight: 'bold', cursor: 'pointer'
};