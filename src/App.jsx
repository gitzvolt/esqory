import React, { useState, useEffect, createContext, useContext } from 'react';
import { translations } from './translations';

// --- КОНТЕКСТ ЯЗЫКА ---
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  const langs = [
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
    { code: 'kk', label: 'KK', flag: '🇰🇿' },
    { code: 'en', label: 'EN', flag: '🇺🇸' }
  ];

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          style={{
            background: lang === l.code ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
            border: lang === l.code ? `1px solid ${theme.primary}` : '1px solid transparent',
            color: lang === l.code ? 'white' : theme.textSecondary,
            padding: '4px 8px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>{l.flag}</span> {l.label}
        </button>
      ))}
    </div>
  );
};

// --- БАЗА ЗНАНИЙ (УРОКИ) ---
// --- ДАННЫЕ УРОКОВ (KIDS) ---
const LESSONS_DATA = {
  en: [
    {
      id: 1,
      title: "What are taxes?",
      desc: "Why do adults share their money?",
      content: "Imagine everyone in a city chipped in some money to build a huge playground. That money is taxes!\n\nAdults pay taxes from their salary to have roads, schools, and hospitals in the country. It's like a subscription for living in a safe and beautiful country.",
      quiz: {
        question: "What are taxes used for?",
        options: [
          { text: "To buy toys for themselves", isCorrect: false },
          { text: "To build schools and roads", isCorrect: true }
        ]
      }
    },
    {
      id: 2,
      title: "Banks and Card",
      desc: "Where does the money in the ATM come from?",
      content: "A bank is like a huge safe for money. When you pay with a card, the bank simply subtracts that amount from your virtual safe.\n\nThe card is just a key to your safe. If you lose the card, the money stays in the bank, you just need a new key!",
      quiz: {
        question: "If you lose your card, does the money disappear?",
        options: [
          { text: "Yes, it's gone", isCorrect: false },
          { text: "No, it's safe in the bank", isCorrect: true }
        ]
      }
    }
  ],
  ru: [
    {
      id: 1,
      title: "Что такое налоги?",
      desc: "Почему взрослые делятся деньгами?",
      content: "Представь, что все люди в городе скинулись по чуть-чуть денег, чтобы построить огромную детскую площадку. Эти деньги — и есть налоги!\n\nВзрослые платят налоги со своей зарплаты, чтобы в стране были дороги, школы и больницы. Это как подписка на жизнь в безопасной и красивой стране.",
      quiz: {
        question: "На что тратятся налоги?",
        options: [
          { text: "На покупку игрушек самим себе", isCorrect: false },
          { text: "На строительство школ и дорог", isCorrect: true }
        ]
      }
    },
    {
      id: 2,
      title: "Банки и Карта",
      desc: "Откуда в банкомате деньги?",
      content: "Банк — это как огромный сейф для денег. Когда ты платишь картой, банк просто вычитает эту сумму из твоего виртуального сейфа.\n\nКарта — это просто ключ от твоего сейфа. Если потерять карту, деньги останутся в банке, просто нужен новый ключ!",
      quiz: {
        question: "Если потерять карту, пропадут ли деньги?",
        options: [
          { text: "Да, они исчезнут", isCorrect: false },
          { text: "Нет, они в безопасности в банке", isCorrect: true }
        ]
      }
    }
  ],
  kk: [
    {
      id: 1,
      title: "Салық деген не?",
      desc: "Неліктен ересектер ақшамен бөліседі?",
      content: "Қаладағы барлық адамдар үлкен балалар алаңын салу үшін аздап ақша жинады деп елестетіңіз. Бұл ақша — салықтар!\n\nЕресектер елде жолдар, мектептер мен ауруханалар болуы үшін жалақысынан салық төлейді. Бұл қауіпсіз және әдемі елде өмір сүруге арналған жазылым сияқты.",
      quiz: {
        question: "Салықтар неге жұмсалады?",
        options: [
          { text: "Өздеріне ойыншық сатып алуға", isCorrect: false },
          { text: "Мектептер мен жолдар салуға", isCorrect: true }
        ]
      }
    },
    {
      id: 2,
      title: "Банктер және Карта",
      desc: "Банкоматтағы ақша қайдан келеді?",
      content: "Банк — бұл ақшаға арналған үлкен сейф сияқты. Картамен төлеген кезде банк виртуалды сейфіңізден сол соманы алып тастайды.\n\nКарта — бұл сіздің сейфіңіздің кілті ғана. Егер картаны жоғалтып алсаңыз, ақша банкте қалады, сізге жай ғана жаңа кілт!",
      quiz: {
        question: "Егер картаны жоғалтып алсаңыз, ақша жоғалып кете ме?",
        options: [
          { text: "Иә, ол жоғалады", isCorrect: false },
          { text: "Жоқ, ол банкте қауіпсіз", isCorrect: true }
        ]
      }
    }
  ]
};

// --- ДАННЫЕ ДЛЯ ПОДРОСТКОВ (TEENS) ---
const TEEN_LESSONS_DATA = {
  en: [
    {
      id: 101,
      title: "Self-Employed vs IE",
      desc: "Choosing a tax regime in RK.",
      content: "If you're a freelancer (designer, tutor), you can work as a self-employed (Unified Aggregate Payment) and pay only 1%.\n\nIf you want a team and a contract with big companies, it's better to open an IE (Simplified) with 3% tax.",
      quiz: {
        question: "Which regime is better for a solo freelancer with small income?",
        options: [
          { text: "Individual Entrepreneur", isCorrect: false },
          { text: "Self-employed (ESIP/UAP)", isCorrect: true }
        ]
      }
    },
    {
      id: 102,
      title: "Magic of Compound Interest",
      desc: "How to become a millionaire by 30.",
      content: "Compound interest is when you get interest on your interest. \n\nIf you put 100,000 tenge at 15% and DON'T withdraw the profit, next year you'll have 15% on 115,000, not on 100,000.",
      quiz: {
        question: "What is more profitable over 10 years?",
        options: [
          { text: "1 million tenge under a pillow", isCorrect: false },
          { text: "100k tenge at 15% with top-ups", isCorrect: true }
        ]
      }
    },
    {
      id: 103,
      title: "Scams and Pyramids",
      desc: "Easy money = Loss of everything.",
      content: "Signs of a pyramid:\n1. Guarantee income (no one in business can guarantee).\n2. Refer a friend — get a percentage.\n3. No real product.\n\nIf someone writes to you on Telegram 'Earnings 50,000 a day, just like videos' — these are scammers.",
      quiz: {
        question: "You're offered to invest 10k and get 20k tomorrow. Your actions?",
        options: [
          { text: "I'll try, the amount is small", isCorrect: false },
          { text: "Block them. It's a scam.", isCorrect: true }
        ]
      }
    }
  ],
  ru: [
    {
      id: 101,
      title: "Самозанятый или ИП?",
      desc: "Выбираем налоговый regime в РК.",
      content: "Если ты фрилансер (дизайнер, репетитор), ты можешь работать как самозанятый (Единый Совокупный Платеж) и платить всего 1%.\n\nЕсли ты хочешь команду и договор с крупными компаниями — лучше открыть ИП (Упрощенка), там налог 3%.",
      quiz: {
        question: "Какой regime лучше для соло-фрилансера с небольшим доходом?",
        options: [
          { text: "Индивидуальный предприниматель", isCorrect: false },
          { text: "Самозанятый (ЕСП)", isCorrect: true }
        ]
      }
    },
    {
      id: 102,
      title: "Магия сложного процента",
      desc: "Как стать миллионером к 30 годам.",
      content: "Сложный процент — это когда проценты начисляются на проценты. \n\nЕсли положить 100 000 тенге под 15% и НЕ забирать прибыль, в следующем году у тебя будет 15% уже от 115 000, а не от 100 000.",
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
  ],
  kk: [
    {
      id: 101,
      title: "Өзін-өзі жұмыспен қамтыған ба әлде ЖК ма?",
      desc: "ҚР-да салық режимін таңдаймыз.",
      content: "Егер сіз фрилансер (дизайнер, репетитор) болсаңыз, сіз өзін-өзі жұмыспен қамтыған (Біріңғай жиынтық төлем) ретінде жұмыс істеп, бар болғаны 1% төлей аласыз.\n\nЕгер сіз команда және ірі компаниялармен келісімшарт алғыңыз келсе — ЖК (Оңайлатылған) ашқан дұрыс, онда салық 3%.",
      quiz: {
        question: "Табысы аз соло-фрилансер үшін қай режим тиімді?",
        options: [
          { text: "Жеке кәсіпкер", isCorrect: false },
          { text: "Өзін-өзі жұмыспен қамтыған (БЖТ)", isCorrect: true }
        ]
      }
    },
    {
      id: 102,
      title: "Күрделі пайыз сиқыры",
      desc: "30 жасқа дейін қалай миллионер болуға болады.",
      content: "Күрделі пайыз — бұл пайыздарға пайыздар қосылған кезде. \n\nЕгер 100 000 теңгені 15%-бен салып, пайдасын АЛМАСАҢЫЗ, келесі жылы сізде 100 000-нан емес, 115 000-нан 15% болады.",
      quiz: {
        question: "10 жылдық қашықтықта не тиімдірек?",
        options: [
          { text: "1 млн теңге бірден жастық астында", isCorrect: false },
          { text: "100 мың теңге жылдық 15%-бен толықтырумен", isCorrect: true }
        ]
      }
    },
    {
      id: 103,
      title: "Пирамидалар және Скамдар",
      desc: "Оңай ақша = Барлығынан айырылу.",
      content: "Қаржылық пирамиданың белгілері:\n1. Табысқа кепілдік береді (бизнесте ешкім кепілдік бере алмайды).\n2. Досыңды әкел — пайыз ал.\n3. Нақты тауар жоқ.\n\nЕгер сізге Telegram-да «Күніне 50 000 табыс, жай ғана видеоға лайк бас» деп жазса — бұл алаяқтар.",
      quiz: {
        question: "Сізге 10 мың салып, ертең 20 мың алуды ұсынады. Сіздің әрекетіңіз?",
        options: [
          { text: "Көріп көрейін, сома аз", isCorrect: false },
          { text: "Блоктаймын. Бұл скам.", isCorrect: true }
        ]
      }
    }
  ]
};

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
  const { t } = useLanguage();
  return (
    <div style={{ minHeight: '100vh', width: '100%', background: theme.bg, color: 'white', overflowX: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* --- HEADER --- */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)', background: 'rgba(11, 14, 20, 0.8)' }}>
        <div style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', cursor: 'pointer' }} onClick={() => onStart('landing')}>
          <span style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.violet})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Esqory</span>
        </div>
        <nav className="nav-links" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#about" style={{ color: theme.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>{t('about')}</a>
          <a href="#features" style={{ color: theme.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>{t('features')}</a>
          <a href="#parents" style={{ color: theme.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>{t('parents')}</a>
          <LanguageSwitcher />
          <button onClick={() => onStart('kids')} className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px', height: '40px' }}>{t('login')}</button>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="hero-section" style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: `linear-gradient(135deg, ${theme.primary}20, ${theme.violet}20)`, border: `1px solid ${theme.primary}30`, color: theme.primary, marginBottom: '24px', letterSpacing: '1px' }}>{t('heroSubtitle')}</div>
        <h1 className="hero-title" style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-1px' }}>
          {t('heroTitlePart1')}<br />
          {t('heroTitlePart2')}{' '}
          <span style={{ background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #3B82F6 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 3s linear infinite' }}>
            {t('heroTitlePart3')}
          </span>.
        </h1>
        <p style={{ color: theme.textSecondary, fontSize: '18px', maxWidth: '600px', margin: '0 auto 50px', lineHeight: '1.7' }}>
          {t('heroDesc')}
        </p>

        {/* КАРТОЧКИ ВЫБОРА */}
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
          <div onClick={() => onStart('kids')} style={heroCardStyle} className="hero-card">
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}>👶</div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>{t('learningMode')}</h3>
                <p style={{ fontSize: '13px', color: theme.textSecondary, margin: 0 }}>{t('ageKids')}</p>
              </div>
            </div>
            <div style={{ color: theme.textSecondary }}>→</div>
          </div>
          <div onClick={() => onStart('teens')} style={heroCardStyle} className="hero-card">
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>🚀</div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>{t('teenMode')}</h3>
                <p style={{ fontSize: '13px', color: theme.textSecondary, margin: 0 }}>{t('ageTeens')}</p>
              </div>
            </div>
            <div style={{ color: theme.textSecondary }}>→</div>
          </div>
        </div>
      </section>

      {/* --- ДЛЯ РОДИТЕЛЕЙ (TRUST SECTION) --- */}
      <section id="parents" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: `linear-gradient(135deg, ${theme.success}20, ${theme.success}10)`, border: `1px solid ${theme.success}30`, color: theme.success, marginBottom: '16px', letterSpacing: '1px' }}>{t('parents').toUpperCase()}</div>
          <h2 className="section-title" style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>{t('parentsTitle')}</h2>
          <p style={{ color: theme.textSecondary, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            {t('parentsDesc')}
          </p>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div className="glass" style={{ borderRadius: '24px', padding: '30px', transition: 'transform 0.3s ease' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', marginBottom: '18px', background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🛡</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>{t('safeSimTitle')}</h3>
            <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: '1.6', margin: 0 }}>{t('safeSimDesc')}</p>
          </div>
          <div className="glass" style={{ borderRadius: '24px', padding: '30px', transition: 'transform 0.3s ease' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', marginBottom: '18px', background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🇰🇿</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>{t('futureKzTitle')}</h3>
            <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: '1.6', margin: 0 }}>{t('futureKzDesc')}</p>
          </div>
          <div className="glass" style={{ borderRadius: '24px', padding: '30px', transition: 'transform 0.3s ease' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', marginBottom: '18px', background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(245,158,11,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🧠</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>{t('habitsTitle')}</h3>
            <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: '1.6', margin: 0 }}>{t('habitsDesc')}</p>
          </div>
        </div>
      </section>

      {/* --- WHY ESQORY --- */}
      <section id="about" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title" style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>{t('whyTitle')}</h2>
          <p style={{ color: theme.textSecondary }}>{t('whyDesc')}</p>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <FeatureCard icon="🏦" title={t('realSkills')} text={t('realSkillsDesc')} />
          <FeatureCard icon="🎮" title={t('gamification')} text={t('gamificationDesc')} />
          <FeatureCard icon="📱" title={t('modern')} text={t('modernDesc')} />
        </div>
      </section>

      <div id="features" />

      {/* --- SHOWCASE 1: KIDS --- */}
      <section className="showcase-grid" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        <div>
          <span style={{ background: `${theme.primary}18`, color: theme.primary, padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' }}>ESQORY KIDS</span>
          <h2 className="section-title" style={{ fontSize: '36px', fontWeight: '800', margin: '20px 0', letterSpacing: '-0.5px' }}>{t('kidsShowcaseTitle')}</h2>
          <p style={{ color: theme.textSecondary, lineHeight: '1.6', marginBottom: '30px' }}>
            {t('kidsShowcaseDesc')}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, color: theme.textSecondary, lineHeight: '2.2' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.primary, fontWeight: '700' }}>✓</span> {t('kidsFeature1')}</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.primary, fontWeight: '700' }}>✓</span> {t('kidsFeature2')}</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.primary, fontWeight: '700' }}>✓</span> {t('kidsFeature3')}</li>
          </ul>
        </div>

        {/* Визуализация интерфейса ребенка - КЛОН РЕАЛЬНОГО ИНТЕРФЕЙСА */}
        <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden', animation: 'float 6s ease-in-out infinite' }}>
          <div style={{ padding: '24px', background: `linear-gradient(135deg, ${theme.primary}, ${theme.violet})`, textAlign: 'center' }}>
            <p style={{ opacity: 0.8, fontSize: '12px', margin: 0 }}>{t('totalSaved')}</p>
            <h2 style={{ fontSize: '32px', margin: '8px 0' }}>12 500 ₸</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme.textSecondary, marginBottom: '6px' }}>
                <span>✨ {t('goalLabel')}: Наушники</span><span>62%</span>
              </div>
              <div style={{ height: '8px', borderRadius: '4px', background: theme.border, overflow: 'hidden' }}>
                <div style={{ width: '62%', height: '100%', borderRadius: '4px', background: `linear-gradient(90deg, ${theme.primary}, ${theme.violet})` }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button className="btn-primary" style={{ padding: '16px', fontSize: '14px', background: theme.success }}>{t('addFunds')}</button>
              <button className="btn-primary" style={{ padding: '16px', fontSize: '14px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.border}` }}>{t('withdrawFunds')}</button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SHOWCASE 2: PRO --- */}
      <section className="showcase-grid" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        {/* Визуализация интерфейса подростка - КЛОН РЕАЛЬНОГО ИНТЕРФЕЙСА */}
        <div className="glass" style={{ borderRadius: '24px', padding: '24px', animation: 'float 6s ease-in-out infinite reverse' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>🇰🇿 {t('taxSimTitle')}</h3>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '6px' }}>{t('incomeLabel')}</div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '14px' }}>150 000</div>
          </div>
          <div style={{ padding: '15px', border: `1px solid ${theme.success}`, borderRadius: '12px', background: 'rgba(16, 185, 129, 0.05)', marginBottom: '10px' }}>
            <div style={{ fontSize: '11px', color: theme.success }}>Самозанятый (1%)</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>1 500 ₸</div>
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '13px' }}>{t('calculateBtn')}</button>
        </div>

        <div>
          <span style={{ background: `${theme.violet}18`, color: theme.violet, padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' }}>ESQORY PRO</span>
          <h2 className="section-title" style={{ fontSize: '36px', fontWeight: '800', margin: '20px 0', letterSpacing: '-0.5px' }}>{t('proShowcaseTitle')}</h2>
          <p style={{ color: theme.textSecondary, lineHeight: '1.6', marginBottom: '30px' }}>
            {t('proShowcaseDesc')}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, color: theme.textSecondary, lineHeight: '2.2' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.violet, fontWeight: '700' }}>✓</span> {t('proFeature1')}</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.violet, fontWeight: '700' }}>✓</span> {t('proFeature2')}</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: theme.violet, fontWeight: '700' }}>✓</span> {t('proFeature3')}</li>
          </ul>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ borderTop: `1px solid ${theme.border}`, padding: '40px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', color: theme.textTertiary, fontSize: '13px', fontWeight: '500' }}>
          <div>Esqory © 2026</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: theme.textTertiary, textDecoration: 'none', transition: 'color 0.2s' }}>{t('privacy')}</a>
            <a href="#" style={{ color: theme.textTertiary, textDecoration: 'none', transition: 'color 0.2s' }}>{t('contacts')}</a>
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
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Переключатель Вход/Регистрация

  const handleSubmit = () => {
    if (!username || !password) return alert(t('usernamePlaceholder') + " & " + t('passwordPlaceholder') + "!");

    const existingUser = Storage.getUserData(username);

    if (isRegister) {
      if (existingUser) {
        alert(t('haveAccount'));
        setIsRegister(false);
        return;
      }
      const newUser = {
        password: password,
        savings: 0,
        history: [],
        completedLessons: []
      };
      Storage.saveUserData(username, newUser);
      onLogin(username);
    } else {
      if (!existingUser) return alert(t('noAccount'));

      if (existingUser.password !== password) {
        return alert("Error");
      }
      onLogin(username);
    }
  };

  return (
    <div style={centeredContainer}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer' }}>← {t('back')}</button>
          <LanguageSwitcher />
        </div>

        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>
          {isRegister ? t('createAccount') : t('loginTitle')}
        </h2>
        <p style={{ color: theme.textSecondary, marginBottom: '30px' }}>
          {role === 'kids' ? t('forKids') : t('forTeens')}
        </p>

        <input
          placeholder={t('usernamePlaceholder')}
          value={username} onChange={e => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder={t('passwordPlaceholder')}
          value={password} onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSubmit} style={primaryBtn}>
          {isRegister ? t('registerBtn') : t('loginBtn')}
        </button>

        <p
          onClick={() => setIsRegister(!isRegister)}
          style={{ marginTop: '20px', color: theme.primary, cursor: 'pointer', textAlign: 'center', fontSize: '14px' }}
        >
          {isRegister ? t('haveAccount') : t('noAccount')}
        </p>
      </div>
    </div>
  );
};

// 3. ДЕТСКИЙ ДАШБОРД - БЕЗ ИЗМЕНЕНИЙ
const KidsDashboard = ({ user, onLogout }) => {
  const { t } = useLanguage();
  const [tab, setTab] = useState('wallet');
  const [userData, setUserData] = useState(Storage.getUserData(user));

  const updateData = (newData) => {
    setUserData(newData);
    Storage.saveUserData(user, newData);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: theme.bg, overflowX: 'hidden' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: `1px solid ${theme.border}`, backdropFilter: 'blur(12px)', background: theme.cardGlass }}>
        <h3 style={{ fontWeight: '800', cursor: 'pointer' }} onClick={onLogout}>Esqory <span style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.violet})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Kids</span></h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span>{t('hello')}, {user}!</span>
          <LanguageSwitcher />
          <button onClick={onLogout} style={{ ...smallBtn, background: theme.danger }}>{t('logout')}</button>
        </div>
      </nav>

      <div className="centered-container" style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
          <button onClick={() => setTab('wallet')} style={tab === 'wallet' ? activeTab : inactiveTab}>{t('walletTab')}</button>
          <button onClick={() => setTab('lessons')} style={tab === 'lessons' ? activeTab : inactiveTab}>{t('lessonsTab')}</button>
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
  const { t } = useLanguage();
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
      setTimeout(() => setShowConfetti(false), 6000);
    }
  }, [isGoalAchieved]);

  const handleClaimGoal = () => {
    const date = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newSavings = userData.savings - userData.goalAmount;
    const newHistory = [{
      text: `${t('goalReachedHistory')}: ${userData.goalName} (-${userData.goalAmount.toLocaleString()} ₸)`,
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
      newHistory.unshift({ text: `${t('addedText')} ${val} ₸`, color: theme.success, time: date });
    } else {
      if (val > newSavings) return alert("Error");
      newSavings -= val;
      newHistory.unshift({ text: `${t('spentText')} ${val} ₸`, color: theme.danger, time: date });
    }

    updateData({ ...userData, savings: newSavings, history: newHistory });
    setAmount('');
  };

  const saveGoal = () => {
    if (!goalName || !goalAmount) return alert("Error");
    updateData({ ...userData, goalName, goalAmount: parseInt(goalAmount), goalAchieved: false });
  };

  return (
    <div className="glass" style={{ padding: '24px', borderRadius: '24px', width: '100%', position: 'relative' }}>
      {showSuccessModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, background: 'rgba(11, 14, 20, 0.9)', backdropFilter: 'blur(8px)' }}>
          <div className="glass modal-content" style={{ padding: '40px', borderRadius: '32px', textAlign: 'center', maxWidth: '420px', width: '90%', margin: 'auto', border: `1px solid ${theme.primary}50` }}>
            <div style={{ fontSize: '72px', marginBottom: '20px' }}>🎉</div>
            <h2 style={{ fontSize: '32px', marginBottom: '16px', fontWeight: '800' }}>{t('congrats')}</h2>
            <p style={{ color: theme.textSecondary, marginBottom: '32px', lineHeight: '1.6', fontSize: '18px' }}>
              {t('congratsDesc')} <strong style={{ color: 'white' }}>{userData.goalName}</strong>!<br />
              Сумма <strong>{userData.goalAmount.toLocaleString()} ₸</strong> {t('deductDesc')}
            </p>
            <button onClick={handleClaimGoal} className="btn-primary" style={{ width: '100%', padding: '20px', fontSize: '20px' }}>
              {t('claimReward')}
            </button>
          </div>
        </div>
      )}

      {showConfetti && Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="confetti" style={{
          left: `${Math.random() * 100}vw`,
          backgroundColor: [`#3B82F6`, `#8B5CF6`, `#10B981`, `#F59E0B`][Math.floor(Math.random() * 4)],
          animationDelay: `${Math.random() * 1.5}s`,
          width: `${Math.random() * 8 + 6}px`,
          height: `${Math.random() * 4 + 8}px`,
        }} />
      ))}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="wallet-grid">
        {/* ЛЕВАЯ КОЛОНКА: БАЛАНС И ЦЕЛЬ */}
        <div>
          <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>{t('myWallet')}</h2>
          <div style={{
            background: isGoalAchieved ? `linear-gradient(135deg, ${theme.success}, #059669)` : `linear-gradient(135deg, ${theme.primary}, ${theme.violet})`,
            padding: '24px',
            borderRadius: '20px',
            textAlign: 'center',
            marginBottom: '20px',
            boxShadow: isGoalAchieved ? '0 10px 30px rgba(16,185,129,0.3)' : '0 10px 30px rgba(59,130,246,0.2)',
            transition: 'all 0.5s ease'
          }}>
            <p style={{ opacity: 0.8, fontSize: '13px', margin: 0 }}>{isGoalAchieved ? t('goalAchieved') : t('totalSaved')}</p>
            <h1 style={{ fontSize: '36px', margin: '6px 0' }}>{userData.savings.toLocaleString()} ₸</h1>
            {isGoalAchieved && <div style={{ fontSize: '11px', fontWeight: 'bold', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '4px 12px', borderRadius: '20px' }}>🏆 {t('done')}</div>}
          </div>

          {/* DREAM GOAL SECTION */}
          <div className="dream-goal-section glass" style={{ padding: '20px', borderRadius: '18px', marginBottom: '20px', background: 'rgba(255,255,255,0.03)' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>✨ {t('goalLabel')}: {userData.goalName || t('goalNotSet')}</h4>
            {userData.goalAmount > 0 ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme.textSecondary, marginBottom: '8px' }}>
                  <span>{t('progress')}: {progress}%</span>
                  <span>{userData.savings.toLocaleString()} / {userData.goalAmount.toLocaleString()} ₸</span>
                </div>
                <div style={{ height: '12px', borderRadius: '6px', background: theme.border, overflow: 'hidden', border: isGoalAchieved ? `1px solid ${theme.success}50` : 'none' }}>
                  <div className={isGoalAchieved ? "glow-progress" : ""} style={{ width: `${progress}%`, height: '100%', borderRadius: '6px', background: isGoalAchieved ? theme.success : `linear-gradient(90deg, ${theme.primary}, ${theme.violet})`, transition: 'width 1s ease-in-out' }} />
                </div>
                <button onClick={() => updateData({ ...userData, goalAmount: 0, goalName: '', goalAchieved: false })} style={{ background: 'none', border: 'none', color: theme.textTertiary, fontSize: '11px', marginTop: '10px', cursor: 'pointer' }}>{t('changeGoal')}</button>
              </>
            ) : (
              <div style={{ display: 'grid', gap: '10px' }}>
                <input placeholder={t('goalNamePlaceholder')} value={goalName} onChange={e => setGoalName(e.target.value)} style={{ ...inputStyle, marginBottom: 0, padding: '10px', fontSize: '14px' }} />
                <input type="number" placeholder={t('goalAmountPlaceholder')} value={goalAmount} onChange={e => setGoalAmount(e.target.value)} style={{ ...inputStyle, marginBottom: 0, padding: '10px', fontSize: '14px' }} />
                <button onClick={saveGoal} className="btn-primary" style={{ padding: '10px', fontSize: '14px' }}>{t('setGoalBtn')}</button>
              </div>
            )}
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: ОПЕРАЦИИ */}
        <div>
          <h4 style={{ marginBottom: '15px' }}>{t('management')}</h4>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '30px' }}>
            <input type="number" placeholder={t('amountPlaceholder')} value={amount} onChange={e => setAmount(e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <button onClick={() => handleTrans('add')} className="btn-primary" style={{ background: theme.success, padding: '20px', fontSize: '18px' }}>{t('addFunds')}</button>
              <button onClick={() => handleTrans('sub')} className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', border: `1px solid ${theme.border}`, padding: '20px', fontSize: '18px' }}>{t('withdrawFunds')}</button>
            </div>
          </div>

          <h4 style={{ color: theme.textSecondary, marginBottom: '12px', fontSize: '14px' }}>{t('history')}</h4>
          <div className="history-scroll">
            {userData.history.length === 0 && <p style={{ opacity: 0.5, fontSize: '13px' }}>{t('historyEmpty')}</p>}
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
  const { lang, t } = useLanguage();
  const [activeLesson, setActiveLesson] = useState(null);

  const finishLesson = (id) => {
    if (!userData.completedLessons.includes(id)) {
      updateData({ ...userData, completedLessons: [...userData.completedLessons, id] });
    }
    setActiveLesson(null);
  };

  const currentLessons = LESSONS_DATA[lang] || LESSONS_DATA['en'];

  if (activeLesson) return <LessonViewer lesson={activeLesson} onFinish={() => finishLesson(activeLesson.id)} onBack={() => setActiveLesson(null)} />;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 800px)', gap: '20px', width: '100%', justifyContent: 'center' }}>
      {currentLessons.map((lesson) => {
        const isDone = userData.completedLessons.includes(lesson.id);
        return (
          <div
            key={lesson.id}
            onClick={() => setActiveLesson(lesson)}
            style={{ ...cardStyle, cursor: 'pointer', transition: '0.2s', border: isDone ? `1px solid ${theme.success}` : `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <span style={{ color: isDone ? theme.success : theme.primary, fontWeight: 'bold', fontSize: '12px' }}>
                {isDone ? t('done') : `${t('lesson')} ${lesson.id}`}
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
  const { t } = useLanguage();
  const [step, setStep] = useState('content');

  const checkAnswer = (isCorrect) => {
    if (isCorrect) {
      alert(t('correctAlert'));
      onFinish();
    } else {
      alert(t('wrongAlert'));
    }
  };

  return (
    <div style={cardStyle}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.textSecondary, marginBottom: '20px', cursor: 'pointer' }}>{t('backToList')}</button>

      {step === 'content' ? (
        <>
          <h2 style={{ marginBottom: '20px', color: theme.primary }}>{lesson.title}</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6', whiteSpace: 'pre-line', marginBottom: '30px' }}>{lesson.content}</p>
          <button onClick={() => setStep('quiz')} style={primaryBtn}>{t('toQuiz')}</button>
        </>
      ) : (
        <>
          <h2 style={{ marginBottom: '20px' }}>{t('quizTitle')}</h2>
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

// --- КОНЕЦ ДАННЫХ ---

// --- КОНЕЦ ДАННЫХ ---

// --- НОВЫЙ ДАШБОРД ДЛЯ ПОДРОСТКОВ (3 РАЗДЕЛА + ДИЗАЙН КАК У ДЕТЕЙ) ---
const TeensDashboard = ({ user, onLogout }) => {
  const { t } = useLanguage();
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
    <div style={{ minHeight: '100vh', width: '100%', background: theme.bg, color: 'white', overflowX: 'hidden' }}>
      {/* Шапка */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: `1px solid ${theme.border}`, backdropFilter: 'blur(12px)', background: theme.cardGlass }}>
        <h3 style={{ fontWeight: '800', cursor: 'pointer' }} onClick={onLogout}>Esqory <span style={{ background: `linear-gradient(90deg, ${theme.violet}, ${theme.primary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pro</span></h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span>{t('hello')}, {user}!</span>
          <LanguageSwitcher />
          <button onClick={onLogout} style={{ ...smallBtn, background: theme.danger }}>{t('logout')}</button>
        </div>
      </nav>

      <div className="centered-container" style={{ marginTop: '30px' }}>
        {/* Меню из 3 разделов */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '30px' }}>
          <button onClick={() => setSection('tax')} style={section === 'tax' ? activeTab : inactiveTab}>{t('taxTab')}</button>
          <button onClick={() => setSection('deposit')} style={section === 'deposit' ? activeTab : inactiveTab}>{t('depositTab')}</button>
          <button onClick={() => setSection('academy')} style={section === 'academy' ? activeTab : inactiveTab}>{t('academyTab')}</button>
        </div>

        <div className="centered-content">
          {/* РАЗДЕЛ 1: НАЛОГИ */}
          {section === 'tax' && (
            <div style={{ width: '100%', maxWidth: '800px' }}>
              <TaxCalculator />
            </div>
          )}

          {/* РАЗДЕЛ 2: ДЕПОЗИТ */}
          {section === 'deposit' && (
            <div style={{ width: '100%', maxWidth: '600px' }}>
              <DepositCalculator />
            </div>
          )}

          {/* РАЗДЕЛ 3: УРОКИ (АКАДЕМИЯ) */}
          {section === 'academy' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 800px)', gap: '20px', justifyContent: 'center', width: '100%' }}>
              {(TEEN_LESSONS_DATA[lang] || TEEN_LESSONS_DATA['en']).map((lesson) => {
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
                        {isDone ? t('done') : t('academyLessonLabel')}
                      </span>
                      <h3 style={{ marginTop: '5px', fontSize: '20px' }}>{lesson.title}</h3>
                      <p style={{ color: theme.textSecondary, fontSize: '14px' }}>{lesson.desc}</p>
                    </div>
                    <div className="btn-primary" style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
  const { t } = useLanguage();
  const [step, setStep] = useState('content'); // content -> quiz

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      alert(t('teenCorrectAlert'));
      onFinish();
    } else {
      alert(t('wrongAlert'));
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: theme.bg, overflowX: 'hidden' }}>
      <div style={cardStyle}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.textSecondary, marginBottom: '20px', cursor: 'pointer' }}>← {t('back')}</button>

        {step === 'content' ? (
          <>
            <h2 style={{ color: theme.accent, marginBottom: '20px' }}>{lesson.title}</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6', whiteSpace: 'pre-line', marginBottom: '30px' }}>{lesson.content}</p>
            <button onClick={() => setStep('quiz')} style={primaryBtn}>{t('toQuiz')}</button>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: '20px' }}>{t('businessQuizTitle')}</h2>
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
  const { t } = useLanguage();
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
      <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>🇰🇿 <span className="gradient-text">{t('taxSimTitle')}</span></h2>
      <p style={{ marginBottom: '20px', color: theme.textSecondary }}>{t('taxSimDesc')}</p>

      <input
        type="number"
        placeholder={t('incomeLabel')}
        value={income} onChange={e => setIncome(e.target.value)}
        style={inputStyle}
      />
      <button onClick={calc} className="btn-primary" style={{ width: '100%', padding: '16px' }}>{t('calculateBtn')}</button>

      {res && (
        <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
          <div className="glass" style={{ padding: '20px', border: `1px solid ${theme.success}`, borderRadius: '18px', background: 'rgba(16, 185, 129, 0.05)' }}>
            <h4 style={{ color: theme.success, margin: 0, fontSize: '14px' }}>{t('taxSelf')}</h4>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>{res.self.toLocaleString()} ₸</p>
            <span style={{ fontSize: '11px', opacity: 0.7 }}>{t('taxSelfDesc')}</span>
          </div>
          <div className="glass" style={{ padding: '20px', border: `1px solid ${theme.primary}`, borderRadius: '18px' }}>
            <h4 style={{ color: theme.primary, margin: 0, fontSize: '14px' }}>{t('taxIp')}</h4>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>{res.ip.toLocaleString()} ₸</p>
            <span style={{ fontSize: '11px', opacity: 0.7 }}>{t('taxIpDesc')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. Калькулятор Депозита (Вынесен отдельно)
// 3. Калькулятор Депозита (ОБНОВЛЕННЫЙ PRO)
const DepositCalculator = () => {
  const { t } = useLanguage();
  // Состояния для ввода
  const [start, setStart] = useState('');       // Начальная сумма
  const [years, setYears] = useState('3');      // Срок (по дефолту 3 года)
  const [monthly, setMonthly] = useState('');   // Ежемесячное пополнение
  // ...
  const [isCustomRate, setIsCustomRate] = useState(false);
  const [customRate, setCustomRate] = useState('');
  const [result, setResult] = useState(null);

  const calc = () => {
    const P = parseInt(start) || 0;
    const tVal = parseInt(years) || 1;
    const PMT = parseInt(monthly) || 0;
    // ...
    const rate = isCustomRate && customRate ? parseFloat(customRate) : 14.1;
    const r = rate / 100;
    const n = 12;
    const principalGrowth = P * Math.pow(1 + r / n, n * tVal);
    const contributionGrowth = PMT > 0 ? PMT * (Math.pow(1 + r / n, n * tVal) - 1) / (r / n) : 0;
    const totalValue = Math.round(principalGrowth + contributionGrowth);
    const totalInvested = P + (PMT * 12 * tVal);
    const profit = totalValue - totalInvested;
    setResult({ total: totalValue, invested: totalInvested, profit: profit });
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ marginBottom: '20px' }}>{t('depositCalcTitle')}</h2>
      <p style={{ marginBottom: '20px', color: theme.textSecondary }}>{t('depositCalcDesc')}</p>

      <label style={{ fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '5px' }}>{t('depositStart')}</label>
      <input
        type="number"
        placeholder="100 000"
        value={start} onChange={e => setStart(e.target.value)}
        style={inputStyle}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <label style={{ fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '5px' }}>{t('depositYears')}</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '5px' }}>{t('depositMonthly')}</label>
          <input type="number" placeholder="0" value={monthly} onChange={e => setMonthly(e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div style={{ marginBottom: '20px', background: theme.bg, padding: '10px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
        <label style={{ fontSize: '12px', color: theme.textSecondary, display: 'block', marginBottom: '10px' }}>{t('depositRate')}</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setIsCustomRate(false)} style={{ ...smallTabStyle, background: !isCustomRate ? `linear-gradient(135deg, ${theme.primary}, ${theme.violet})` : 'transparent', border: !isCustomRate ? 'none' : `1px solid ${theme.border}` }}>
            {t('depositBaseRate')}
          </button>
          <button onClick={() => setIsCustomRate(true)} style={{ ...smallTabStyle, background: isCustomRate ? theme.primary : 'transparent', color: isCustomRate ? 'white' : theme.textSecondary, border: isCustomRate ? 'none' : `1px solid ${theme.border}` }}>
            {t('depositCustomRate')}
          </button>
        </div>
        {isCustomRate && <input type="number" placeholder={t('depositCustomPlaceholder')} value={customRate} onChange={e => setCustomRate(e.target.value)} style={{ ...inputStyle, marginTop: '10px', marginBottom: 0 }} />}
      </div>

      <button onClick={calc} className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>{t('calculateBtn')} 🚀</button>

      {result && (
        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: `1px solid ${theme.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: theme.textSecondary }}>{t('investedByYou')}</span>
            <span style={{ fontWeight: 'bold' }}>{result.invested.toLocaleString()} ₸</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#10B981' }}>{t('netProfit')}</span>
            <span style={{ fontWeight: 'bold', color: '#10B981' }}>+{result.profit.toLocaleString()} ₸</span>
          </div>
          <div style={{ textAlign: 'center', marginTop: '15px', background: 'rgba(16, 185, 129, 0.1)', padding: '15px', borderRadius: '12px' }}>
            <p style={{ color: theme.textSecondary, fontSize: '12px' }}>{t('totalAmountAfter')} {years} {t('yearsLabel')}:</p>
            <h1 style={{ fontSize: '36px', color: '#10B981', margin: '5px 0' }}>{result.total.toLocaleString()} ₸</h1>
          </div>
        </div>
      )}
    </div>
  );
};

const smallTabStyle = { padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', flex: 1, color: 'white', fontSize: '13px' };

// Вспомогательный компонент для карточки урока подростка
const TeenLessonCard = ({ lesson, isDone, onComplete }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('desc'); // desc -> content -> quiz

  const handleQuiz = (isCorrect) => {
    if (isCorrect) {
      alert(t('teenCorrectAlert'));
      onComplete(lesson.id);
      setIsOpen(false);
    } else {
      alert(t('wrongAlert'));
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
            {isDone ? t('done') : t('academyLessonLabel')}
          </span>
          <h3 style={{ marginTop: '5px', fontSize: '20px' }}>{lesson.title}</h3>
          <p style={{ color: theme.textSecondary, fontSize: '14px' }}>{lesson.desc}</p>
        </div>
        <div style={{ padding: '10px 20px', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '10px' }}>{t('startBtn')}</div>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: theme.textSecondary, marginBottom: '15px', cursor: 'pointer' }}>← {t('logout')}</button>

      {step === 'desc' && (
        <>
          <h2 style={{ color: theme.accent }}>{lesson.title}</h2>
          <p style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.6' }}>{lesson.content}</p>
          <button onClick={() => setStep('quiz')} style={{ ...primaryBtn, marginTop: '30px' }}>{t('toQuiz')}</button>
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
  const [lang, setLang] = useState(localStorage.getItem('esqory_lang') || 'ru');

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

  // Сохраняем язык
  useEffect(() => {
    localStorage.setItem('esqory_lang', lang);
  }, [lang]);

  const t = (key) => translations[lang][key] || key;

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
    <LanguageContext.Provider value={{ lang, setLang, t }}>
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
    </LanguageContext.Provider>
  );
}

// --- СТИЛИ ---
const centeredContainer = {
  minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column',
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