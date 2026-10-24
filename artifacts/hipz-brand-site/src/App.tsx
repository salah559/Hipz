import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  Flame,
  Mail,
  Menu,
  MessageSquare,
  Pause,
  Phone,
  Play,
  Sparkles,
  User,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import './index.css';

type Language = 'fr' | 'ar';
type ActiveFlavor = 'lemon' | 'peach';

const copy = {
  fr: {
    nav: ['Accueil', 'Saveurs', 'L’Univers', 'La Vibe', 'Contact'],
    heroBadge: 'BOISSON PÉTILLANTE DE NOUVELLE GÉNÉRATION',
    heroEyebrow: 'Une vibe à partager',
    heroTitlePart1: 'HIPZ.',
    heroTitlePart2: 'DIMA S7AB.',
    heroSubtitle: 'Deux saveurs explosives. Une seule énergie qui rassemble les vrais amis.',
    discover: 'Découvrir les saveurs',
    universeLink: 'Explorer l’univers',
    scroll: 'EXPLORER',
    marquee: [
      '⚡ HIPZ — DIMA S7AB',
      'LEMON ÉNERGIE CITRON',
      'PEACH DOUCEUR DE PÊCHE',
      '100% VIBE NATURELLE',
      'DEUX CARACTÈRES EXPLOSIFS',
      'LE GOÛT DU PARTAGE',
    ],
    stats: [
      { num: '02', label: 'Saveurs Signatures', desc: 'Citron Zesté & Pêche Veloutée' },
      { num: '100%', label: 'Good Vibes', desc: 'Des moments intenses entre amis' },
      { num: 'DIMA', label: 'S7ab Toujours', desc: 'Une boisson faite pour rassembler' },
      { num: '24/7', label: 'Rafraîchissement', desc: 'Une fraîcheur vive à chaque instant' },
    ],
    flavorKicker: 'LA COLLECTION EXCLUSIVE',
    flavorsTitle: 'Deux saveurs. Une signature.',
    flavorsSubtitle: 'Chaque canette HIPZ est une promesse d’intensité, de fraîcheur et d’authenticité.',
    lemonBadge: '⚡ ÉNERGIE CITRON',
    lemonTitle: 'Citron Zesté',
    lemonSubtitle: 'L’énergie pure qui réveille chaque instant.',
    lemonDescription: 'Un équilibre vibrant entre l’acidité vivifiante du citron solaire et de fines bulles pétillantes. Conçu pour apporter un coup d’éclat immédiat.',
    lemonSpecs: [
      { label: 'Intensité', value: 92 },
      { label: 'Pétillant', value: 95 },
      { label: 'Fraîcheur', value: 100 },
    ],
    lemonFeatures: [
      'Agrumes solaires sélectionnés avec soin',
      'Fines bulles ultra-désaltérantes',
      'Parfait pour les journées actives et festives',
    ],
    peachBadge: '🍑 DOUCEUR VELOUTÉE',
    peachTitle: 'Pêche Solaire',
    peachSubtitle: 'La douceur gourmande des couchers de soleil.',
    peachDescription: 'La générosité et le parfum irrésistible de pêches mûries au soleil. Une texture douce, rafraîchissante et naturellement réconfortante.',
    peachSpecs: [
      { label: 'Douceur', value: 98 },
      { label: 'Arôme', value: 94 },
      { label: 'Fraîcheur', value: 96 },
    ],
    peachFeatures: [
      'Saveur de pêche mûrie au soleil',
      'Sensation veloutée et fruitée unique',
      'L’alliée idéale des moments chill entre amis',
    ],
    flavorButton: 'Commander / Devenir Distributeur',
    vibeTitle: 'Quelle est votre vibe aujourd’hui ?',
    vibeSubtitle: 'Choisissez votre énergie et découvrez votre boisson idéale.',
    vibeLemonTag: 'VIBE ÉNERGIE & ACTION',
    vibeLemonDesc: 'Pour les sessions intenses, les virées en ville et les moments où il faut être au sommet.',
    vibePeachTag: 'VIBE CHILL & SUNSET',
    vibePeachDesc: 'Pour les discussions infinies entre amis, les après-midis d’été et la musique au coucher du soleil.',
    universeEyebrow: 'L’UNIVERS DIMA S7AB',
    universeTitle: 'Les meilleurs moments sont ceux que l’on partage.',
    universeText: 'HIPZ n’est pas qu’une boisson : c’est le symbole d’une communauté qui avance ensemble. "Dima S7ab" célèbre l’amitié fidèle, les fous rires spontanés et l’énergie de la jeunesse.',
    backgroundControls: 'Fond vidéo',
    videoPause: 'Pause',
    videoPlay: 'Lecture',
    soundUnmute: 'Activer le son',
    soundMute: 'Couper le son',
    videoBadge: 'VIDÉO OFFICIELLE',
    contactEyebrow: 'PARTENARIAT & DISTRIBUTION',
    contactTitle: 'Rejoignez le mouvement HIPZ.',
    contactCopy: 'Vous êtes distributeur, gérant de commerce ou partenaire événementiel ? Notre équipe commerciale est à votre écoute pour concrétiser vos projets.',
    phoneHeading: 'Ligne directe',
    socialHeading: 'Rejoindre la commu',
    name: 'Nom complet',
    business: 'Entreprise / Commerce (facultatif)',
    email: 'Adresse e-mail',
    phone: 'Numéro de téléphone (facultatif)',
    inquiry: 'Objet de votre demande',
    inquiryOptions: ['Choisir un sujet', 'Distribution commerciale', 'Commande en gros / Retail', 'Partenariat & Sponsoring', 'Autre demande'],
    message: 'Votre message',
    send: 'Envoyer la demande',
    required: 'Ce champ est obligatoire.',
    invalidEmail: 'Adresse e-mail invalide.',
    messageShort: 'Votre message doit contenir au moins 10 caractères.',
    demoFeedback: 'Votre message a bien été envoyé ! Nous vous répondrons sous 24h.',
    demoError: 'Veuillez corriger les champs signalés.',
    footerLabel: 'Le goût des moments vrais.',
    copyright: '© HIPZ — DIMA S7AB. Tous droits réservés.',
    skip: 'Passer au contenu',
    language: 'العربية',
    backToTop: 'Haut',
  },
  ar: {
    nav: ['الرئيسية', 'النكهات', 'العالم', 'الفايب', 'تواصل معنا'],
    heroBadge: 'الجيل الجديد من المشروبات المنعشة',
    heroEyebrow: 'لحظات تستاهل المشاركة',
    heroTitlePart1: 'HIPZ.',
    heroTitlePart2: 'DIMA S7AB.',
    heroSubtitle: 'نكهتان قويتان. وفايب واحد يجمع الصحاب في كل وقت وكل مكان.',
    discover: 'اكتشف النكهات',
    universeLink: 'استكشف عالمنا',
    scroll: 'اكتشف المزيد',
    marquee: [
      '⚡ HIPZ — ديما صحاب',
      'انتعاش الليمون الطبيعي',
      'نعومة الخوخ المميزة',
      '100% طاقة وفايب حقيقي',
      'شخصيتان بطعم لا يُقاوم',
      'أحلى اللحظات تجمعنا',
    ],
    stats: [
      { num: '02', label: 'نكهات أيقونية', desc: 'ليمون حارق وخوخ ساحر' },
      { num: '100%', label: 'طاقة ومشاركة', desc: 'لحظات أصيلة تدوم مع الصحاب' },
      { num: 'ديما', label: 'صحاب على طول', desc: 'مشروب خُلق ليجمعنا دائماً' },
      { num: '24/7', label: 'انتعاش متواصل', desc: 'يروي العطش في كل ثانية' },
    ],
    flavorKicker: 'التشكيلة الحصرية',
    flavorsTitle: 'نكهتان. شخصية واحدة لا تُنسى.',
    flavorsSubtitle: 'كل علبة من HIPZ صُممت لتمنحك أقصى درجات الانتعاش والطاقة والمذاق الأصيل.',
    lemonBadge: '⚡ انتعاش الليمون',
    lemonTitle: 'ليمون منعش',
    lemonSubtitle: 'طاقة نقية توقظ حواسك من أول رشفة.',
    lemonDescription: 'مزيج فوار متوازن بين حموضة الليمون الطبيعي والانتعاش الفوار القوي. صُمم ليمنحك الطاقة القصوى لتعيش يومك بأعلى حيوية.',
    lemonSpecs: [
      { label: 'قوة النكهة', value: 92 },
      { label: 'درجة الفوران', value: 95 },
      { label: 'مستوى الانتعاش', value: 100 },
    ],
    lemonFeatures: [
      'حمضيات طبيعية منتقاة بعناية فائقة',
      'فقاعات فوارة خفيفة تروي العطش فوراً',
      'الرفيق المثالي للأنشطة والرياضة والخرجات',
    ],
    peachBadge: '🍑 نعومة الخوخ',
    peachTitle: 'خوخ مشمس',
    peachSubtitle: 'لذة الفواكه الناضجة في أجواء الغروب.',
    peachDescription: 'مذاق ساحر يحمل نكهة الخوخ الغنية المنعشة. قوام مخملي ناعم يمنحك لحظات استرخاء رائعة مع أعز الناس.',
    peachSpecs: [
      { label: 'حلاوة المذاق', value: 98 },
      { label: 'الرائحة الزكية', value: 94 },
      { label: 'مستوى الانتعاش', value: 96 },
    ],
    peachFeatures: [
      'نكهة خوخ طبيعية ناضجة تحت الشمس',
      'إحساس فاكهي ناعم ومريح',
      'مثالي للأوقات الهادئة وجلسات الصحاب',
    ],
    flavorButton: 'اطلب الآن / كن موزعاً معتمداً',
    vibeTitle: 'أي نكهة تمثّل فايبك اليوم؟',
    vibeSubtitle: 'اختر طاقتك المفضلة واستمتع بالمشروب المناسب لك.',
    vibeLemonTag: 'فايب الحركة والطاقة',
    vibeLemonDesc: 'للأوقات الحماسية، الخرجات في المدينة، والتحديات اللي تحتاج تركيز ونشاط.',
    vibePeachTag: 'فايب الروقان والصحبة',
    vibePeachDesc: 'للجلسات الرايقة مع الصحاب، الغروب، والموسيقى الهادية وأحلى الذكريات.',
    universeEyebrow: 'عالم ديما صحاب',
    universeTitle: 'أحلى اللحظات دائماً تكمل مع الصحاب.',
    universeText: 'HIPZ ليست مجرد مشروب، بل هي روح مجتمع يجمعنا. "ديما صحاب" تحتفي بالصداقة الحقيقية، الضحك العفوي، وشغف الشباب الذي لا ينطفئ.',
    backgroundControls: 'فيديو الخلفية',
    videoPause: 'إيقاف مؤقت',
    videoPlay: 'تشغيل',
    soundUnmute: 'تشغيل الصوت',
    soundMute: 'كتم الصوت',
    videoBadge: 'فيديو رسمي',
    contactEyebrow: 'شراكات وتوزيع',
    contactTitle: 'انضم إلى عائلة HIPZ.',
    contactCopy: 'هل أنت موزع، صاحب متجر أو منظم فعاليات؟ يسعد فريقنا بالتواصل معكم لبناء شراكة ناجحة.',
    phoneHeading: 'الاتصال المباشر',
    socialHeading: 'مجتمعنا على التواصل',
    name: 'الاسم الكامل',
    business: 'الشركة / المتجر (اختياري)',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف (اختياري)',
    inquiry: 'موضوع الطلب',
    inquiryOptions: ['اختر موضوعاً', 'توزيع تجاري', 'طلبات جملة / محلات', 'رعاية وفعاليات', 'استفسار آخر'],
    message: 'رسالتك',
    send: 'إرسال الطلب',
    required: 'هذا الحقل مطلوب.',
    invalidEmail: 'البريد الإلكتروني غير صالح.',
    messageShort: 'اكتب رسالة لا تقل عن 10 أحرف.',
    demoFeedback: 'تم استلام طلبك بنجاح! سيتواصل معك فريقنا خلال 24 ساعة.',
    demoError: 'يرجى مراجعة الحقول المشار إليها.',
    footerLabel: 'نكهة اللحظات اللي تجمعنا.',
    copyright: '© HIPZ — ديما صحاب. جميع الحقوق محفوظة.',
    skip: 'انتقل إلى المحتوى',
    language: 'FR',
    backToTop: 'الأعلى',
  },
} as const;

const logoImage = '/assets/hipz-logo.png';
const heroVideo = '/assets/hipz-video.mp4';

function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);
  const [activeFlavor, setActiveFlavor] = useState<ActiveFlavor>('lemon');
  const [activeSection, setActiveSection] = useState('accueil');
  const [formFeedback, setFormFeedback] = useState<'success' | 'error' | ''>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  const t = copy[lang];
  const rtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    const localizedTitle = rtl ? 'HIPZ — dima s7ab | نكهتان، وفايب واحد' : 'HIPZ — dima s7ab | Deux saveurs. Une seule vibe.';
    document.title = localizedTitle;
  }, [lang, rtl]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) {
      setVideoPlaying(false);
      if (videoRef.current) videoRef.current.pause();
    }
    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setVideoPlaying(false);
        if (videoRef.current) videoRef.current.pause();
      }
    };
    reduceMotion.addEventListener('change', onMotionPreferenceChange);
    return () => reduceMotion.removeEventListener('change', onMotionPreferenceChange);
  }, []);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setVideoPlaying(true);
      }).catch(() => {
        setVideoPlaying(false);
      });
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoMuted;
    videoRef.current.muted = nextMuted;
    setVideoMuted(nextMuted);
  };

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main section[id]');
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, .15, .35, .6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const setLanguage = () => {
    setLang((current) => current === 'fr' ? 'ar' : 'fr');
    setMenuOpen(false);
  };

  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const next: Record<string, string> = {};
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name) next.name = t.required;
    if (!email) next.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t.invalidEmail;
    if (!message) next.message = t.required;
    else if (message.length < 10) next.message = t.messageShort;
    setErrors(next);
    setFormFeedback(Object.keys(next).length ? 'error' : 'success');
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate(event.currentTarget);
  };

  const navLinks = [
    ['#accueil', t.nav[0]],
    ['#saveurs', t.nav[1]],
    ['#univers', t.nav[2]],
    ['#vibe', t.nav[3]],
    ['#contact', t.nav[4]],
  ];

  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenu" data-testid="link-skip-content">{t.skip}</a>
      
      {/* 1. FLOATING MINIMALIST LUXURY HEADER */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} data-testid="site-header">
        <div className="nav-container">
          <div className="nav-wrap">
            <a href="#accueil" className="brand-link" aria-label="HIPZ — dima s7ab" data-testid="link-brand-home">
              <div className="brand-logo-frame">
                <img src={logoImage} alt="HIPZ" />
              </div>
              <span className="brand-tag">HIPZ</span>
            </a>
            
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? (rtl ? 'إغلاق القائمة' : 'Fermer le menu') : (rtl ? 'فتح القائمة' : 'Ouvrir le menu')}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav id="main-navigation" className={`nav-links${menuOpen ? ' open' : ''}`} aria-label={rtl ? 'روابط التنقل الرئيسية' : 'Navigation principale'}>
              {navLinks.map(([href, label], index) => (
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  key={href}
                  className={`nav-item${activeSection === href.slice(1) ? ' active' : ''}`}
                  data-testid={`link-nav-${index}`}
                >
                  {label}
                </a>
              ))}
              
              <div className="nav-actions">
                <button
                  className="lang-switch"
                  type="button"
                  onClick={setLanguage}
                  aria-label={rtl ? 'Changer en français' : 'التحويل إلى العربية'}
                  data-testid="button-language"
                >
                  <span className="lang-indicator" />
                  <span>{t.language}</span>
                </button>
                <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)} data-testid="link-nav-contact-cta">
                  <span>{t.nav[4]}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main id="contenu">
        {/* 2. CINEMATIC EDGE-TO-EDGE VIDEO HERO */}
        <section className="hero" id="accueil" aria-labelledby="hero-title">
          <div className="hero-video-bg-container" aria-hidden="true">
            <video
              ref={videoRef}
              className="hero-video-element"
              autoPlay
              loop
              muted={videoMuted}
              playsInline
              poster="/assets/hipz-hero-wide.png"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
            <div className="hero-video-overlay" />
          </div>

          {/* Clean Cinematic Headline - No bulky opaque cards blocking the video! */}
          <div className="hero-main-layer">
            <div className="hero-pill-badge">
              <span className="pulse-dot" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 id="hero-title" className="hero-title-cinematic">
              <span className="brand-glow-text">HIPZ</span>
              <span className="brand-slogan-gradient">DIMA S7AB</span>
            </h1>

            <p className="hero-subtitle-clean">{t.heroSubtitle}</p>

            <div className="hero-action-buttons">
              <a className="btn-hero-primary" href="#saveurs" data-testid="link-hero-flavors">
                <span>{t.discover}</span>
                {rtl ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
              </a>
              <a className="btn-hero-glass" href="#univers" data-testid="link-hero-universe">
                <Sparkles size={16} />
                <span>{t.universeLink}</span>
              </a>
            </div>
          </div>

          {/* Sleek Floating Sound & Video Controls */}
          <div className="hero-video-controls-capsule" role="group" aria-label={t.backgroundControls}>
            <div className="video-status-indicator">
              <span className="status-live-dot" />
              <span>{t.videoBadge}</span>
            </div>
            <button
              type="button"
              onClick={toggleVideoPlay}
              aria-label={videoPlaying ? t.videoPause : t.videoPlay}
              className="capsule-btn"
              data-testid="button-background-toggle"
            >
              {videoPlaying ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <button
              type="button"
              onClick={toggleVideoMute}
              aria-label={videoMuted ? t.soundUnmute : t.soundMute}
              className="capsule-btn"
              data-testid="button-background-sound"
            >
              {videoMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>

          <a href="#saveurs" className="hero-scroll-prompt" aria-label={t.scroll}>
            <span className="mouse-frame"><span className="mouse-wheel" /></span>
            <span>{t.scroll}</span>
            <ArrowDown size={12} />
          </a>
        </section>

        {/* 3. ELECTRIC BRAND MARQUEE */}
        <section className="brand-marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...t.marquee, ...t.marquee, ...t.marquee].map((item, idx) => (
              <span key={idx} className="marquee-item">
                <Zap size={14} className="marquee-sparkle" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </section>

        {/* 4. INTERACTIVE 3D PRODUCT SHOWCASE */}
        <section className="section flavors-stage-section" id="saveurs" aria-labelledby="flavors-title">
          <div className="stage-header text-center">
            <span className="section-kicker-glow">{t.flavorKicker}</span>
            <h2 className="section-title-stage" id="flavors-title">{t.flavorsTitle}</h2>
            <p className="section-subtitle-stage">{t.flavorsSubtitle}</p>

            {/* Flavor Interactive Tabs */}
            <div className="flavor-tabs-nav" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeFlavor === 'lemon'}
                className={`flavor-tab-btn lemon${activeFlavor === 'lemon' ? ' active' : ''}`}
                onClick={() => setActiveFlavor('lemon')}
              >
                <span className="tab-dot lemon" />
                <span>{t.lemonTitle}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFlavor === 'peach'}
                className={`flavor-tab-btn peach${activeFlavor === 'peach' ? ' active' : ''}`}
                onClick={() => setActiveFlavor('peach')}
              >
                <span className="tab-dot peach" />
                <span>{t.peachTitle}</span>
              </button>
            </div>
          </div>

          {/* Interactive Dynamic Stage */}
          <div className="flavor-stage-container">
            {activeFlavor === 'lemon' ? (
              <div className="flavor-spotlight-card lemon animate-fade-in">
                <div className="spotlight-visual">
                  <div className="halo-glow lemon" />
                  <img
                    src="/assets/hipz-lemon-campaign.png"
                    alt={t.lemonAlt}
                    className="can-3d-image"
                    loading="lazy"
                  />
                  <div className="can-reflection" />
                </div>

                <div className="spotlight-info">
                  <div className="badge-pill lemon">{t.lemonBadge}</div>
                  <h3 className="spotlight-title">{t.lemonTitle}</h3>
                  <p className="spotlight-subtitle">{t.lemonSubtitle}</p>
                  <p className="spotlight-description">{t.lemonDescription}</p>

                  <div className="flavor-meters">
                    {t.lemonSpecs.map((spec, i) => (
                      <div key={i} className="meter-row">
                        <div className="meter-labels">
                          <span>{spec.label}</span>
                          <span>{spec.value}%</span>
                        </div>
                        <div className="meter-track">
                          <div className="meter-fill lemon" style={{ width: `${spec.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="spotlight-features">
                    {t.lemonFeatures.map((feat, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="feature-icon lemon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" className="btn-stage-action lemon">
                    <span>{t.flavorButton}</span>
                    {rtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </a>
                </div>
              </div>
            ) : (
              <div className="flavor-spotlight-card peach animate-fade-in">
                <div className="spotlight-visual">
                  <div className="halo-glow peach" />
                  <img
                    src="/assets/hipz-peach-campaign.png"
                    alt={t.peachAlt}
                    className="can-3d-image"
                    loading="lazy"
                  />
                  <div className="can-reflection" />
                </div>

                <div className="spotlight-info">
                  <div className="badge-pill peach">{t.peachBadge}</div>
                  <h3 className="spotlight-title">{t.peachTitle}</h3>
                  <p className="spotlight-subtitle">{t.peachSubtitle}</p>
                  <p className="spotlight-description">{t.peachDescription}</p>

                  <div className="flavor-meters">
                    {t.peachSpecs.map((spec, i) => (
                      <div key={i} className="meter-row">
                        <div className="meter-labels">
                          <span>{spec.label}</span>
                          <span>{spec.value}%</span>
                        </div>
                        <div className="meter-track">
                          <div className="meter-fill peach" style={{ width: `${spec.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="spotlight-features">
                    {t.peachFeatures.map((feat, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="feature-icon peach" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" className="btn-stage-action peach">
                    <span>{t.flavorButton}</span>
                    {rtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. VIBE MATCHER (Interactive Lifestyle Experience) */}
        <section className="section vibe-matcher-section" id="vibe">
          <div className="vibe-header text-center">
            <span className="section-kicker-glow">LIFESTYLE & ENERGY</span>
            <h2 className="section-title-stage">{t.vibeTitle}</h2>
            <p className="section-subtitle-stage">{t.vibeSubtitle}</p>
          </div>

          <div className="vibe-cards-grid">
            <div
              className={`vibe-card lemon-vibe${activeFlavor === 'lemon' ? ' selected' : ''}`}
              onClick={() => setActiveFlavor('lemon')}
            >
              <div className="vibe-card-overlay" />
              <div className="vibe-top-tag">
                <Flame size={14} />
                <span>{t.vibeLemonTag}</span>
              </div>
              <h3>HIPZ LEMON</h3>
              <p>{t.vibeLemonDesc}</p>
              <div className="vibe-action-hint">
                <span>{activeFlavor === 'lemon' ? '✓ Actif' : 'Activer cette vibe'}</span>
              </div>
            </div>

            <div
              className={`vibe-card peach-vibe${activeFlavor === 'peach' ? ' selected' : ''}`}
              onClick={() => setActiveFlavor('peach')}
            >
              <div className="vibe-card-overlay" />
              <div className="vibe-top-tag">
                <Sparkles size={14} />
                <span>{t.vibePeachTag}</span>
              </div>
              <h3>HIPZ PEACH</h3>
              <p>{t.vibePeachDesc}</p>
              <div className="vibe-action-hint">
                <span>{activeFlavor === 'peach' ? '✓ Actif' : 'Activer cette vibe'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. DIMA S7AB COMMUNITY UNIVERSE */}
        <section className="section universe-modern-section" id="univers" aria-labelledby="universe-title">
          <div className="universe-modern-grid">
            <div className="universe-text-block">
              <span className="universe-kicker">{t.universeEyebrow}</span>
              <h2 className="universe-title-modern" id="universe-title">
                {t.universeTitle}
              </h2>
              <p className="universe-body-clean">{t.universeText}</p>

              <div className="stats-strip">
                {t.stats.map((s, idx) => (
                  <div key={idx} className="stat-strip-item">
                    <span className="stat-big-number">{s.num}</span>
                    <span className="stat-big-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="universe-visual-block">
              <div className="universe-frame-glow">
                <img
                  src="/assets/hipz-campaign-collage.png"
                  alt="HIPZ Dima S7ab Campaign"
                  className="universe-image-cinematic"
                  loading="lazy"
                />
                <div className="universe-card-caption">
                  <span className="pulse-dot green" />
                  <span>DIMA S7AB • COMMUNAUTÉ OFFICIELLE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CONTACT & PARTNERSHIP (Dark Luxury Glass Portal) */}
        <section className="section contact-portal-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-portal-grid">
            <div className="portal-info-panel">
              <span className="section-kicker-glow">{t.contactEyebrow}</span>
              <h2 className="portal-title">{t.contactTitle}</h2>
              <p className="portal-subtitle">{t.contactCopy}</p>

              <div className="portal-contact-links">
                <div className="portal-group">
                  <h4>{t.phoneHeading}</h4>
                  <div className="phone-badges">
                    <a href="tel:0770787889" dir="ltr" className="portal-pill-btn">
                      <Phone size={14} />
                      <span>0770787889</span>
                    </a>
                    <a href="tel:0560404339" dir="ltr" className="portal-pill-btn">
                      <Phone size={14} />
                      <span>0560404339</span>
                    </a>
                  </div>
                </div>

                <div className="portal-group">
                  <h4>{t.socialHeading}</h4>
                  <div className="social-badges">
                    <a
                      href="https://www.instagram.com/hipzdrink/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portal-pill-btn social instagram"
                    >
                      <span>Instagram</span>
                      <ArrowUpRight size={13} />
                    </a>
                    <a
                      href="https://www.tiktok.com/@hipzdrink"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portal-pill-btn social tiktok"
                    >
                      <span>TikTok</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Glass Form Card */}
            <div className="portal-form-card">
              <form className="contact-form-modern" noValidate onSubmit={handleSubmit}>
                <div className="form-field-row">
                  <div className="field-modern">
                    <label htmlFor="contact-name">
                      <User size={13} />
                      <span>{t.name} *</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      placeholder={rtl ? 'اسمك الكريم' : 'Votre nom complet'}
                      aria-invalid={!!errors.name}
                      onChange={() => { if (errors.name) setErrors((old) => ({ ...old, name: '' })); }}
                    />
                    {errors.name && <span className="field-error-text">{errors.name}</span>}
                  </div>

                  <div className="field-modern">
                    <label htmlFor="contact-business">
                      <span>{t.business}</span>
                    </label>
                    <input
                      id="contact-business"
                      name="business"
                      autoComplete="organization"
                      placeholder={rtl ? 'المتجر أو المؤسسة' : 'Nom de votre établissement'}
                    />
                  </div>
                </div>

                <div className="form-field-row">
                  <div className="field-modern">
                    <label htmlFor="contact-email">
                      <Mail size={13} />
                      <span>{t.email} *</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="contact@exemple.com"
                      aria-invalid={!!errors.email}
                      onChange={() => { if (errors.email) setErrors((old) => ({ ...old, email: '' })); }}
                    />
                    {errors.email && <span className="field-error-text">{errors.email}</span>}
                  </div>

                  <div className="field-modern">
                    <label htmlFor="contact-phone">
                      <Phone size={13} />
                      <span>{t.phone}</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="05 / 06 / 07 ..."
                    />
                  </div>
                </div>

                <div className="field-modern full">
                  <label htmlFor="contact-inquiry">
                    <span>{t.inquiry}</span>
                  </label>
                  <select id="contact-inquiry" name="inquiry" defaultValue="">
                    <option value="">{t.inquiryOptions[0]}</option>
                    {t.inquiryOptions.slice(1).map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="field-modern full">
                  <label htmlFor="contact-message">
                    <MessageSquare size={13} />
                    <span>{t.message} *</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder={rtl ? 'اكتب تفاصيل طلبك أو رسالتك هنا...' : 'Parlez-nous de vos besoins...'}
                    aria-invalid={!!errors.message}
                    onChange={() => { if (errors.message) setErrors((old) => ({ ...old, message: '' })); }}
                  />
                  {errors.message && <span className="field-error-text">{errors.message}</span>}
                </div>

                {formFeedback && (
                  <div className={`portal-feedback ${formFeedback}`} role="status">
                    {formFeedback === 'error' ? t.demoError : t.demoFeedback}
                  </div>
                )}

                <button className="btn-portal-submit" type="submit">
                  <span>{t.send}</span>
                  {rtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 8. ULTRA-CLEAN OBSIDIAN FOOTER */}
      <footer className="footer-obsidian">
        <div className="footer-top-row">
          <div className="footer-brand-info">
            <div className="brand-logo-frame mini">
              <img src={logoImage} alt="HIPZ" />
            </div>
            <span className="footer-brand-title">HIPZ</span>
            <p className="footer-tagline">{t.heroSubtitle}</p>
          </div>

          <nav className="footer-links-clean">
            {navLinks.map(([href, label], index) => (
              <a href={href} key={href}>{label}</a>
            ))}
            <button className="footer-lang-btn" type="button" onClick={setLanguage}>
              {t.language}
            </button>
          </nav>
        </div>

        <div className="footer-divider-line" />

        <div className="footer-bottom-row">
          <span>{t.copyright}</span>
          <span className="footer-motto-glow">{t.footerLabel}</span>
        </div>
      </footer>

      {/* 9. FLOATING BACK TO TOP */}
      {scrolled && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top-clean"
          aria-label={t.backToTop}
          title={t.backToTop}
        >
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  );
}

export default App;
