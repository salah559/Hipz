import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
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

const copy = {
  fr: {
    nav: ['Accueil', 'Nos saveurs', "L'univers HIPZ", 'À propos', 'Contact'],
    heroBadge: 'NOUVELLE GÉNÉRATION DE BOISSONS',
    heroEyebrow: 'Une vibe à partager',
    heroSubtitle: 'Deux saveurs explosives. Une seule vibe qui rassemble.',
    discover: 'Découvrir nos saveurs',
    universeLink: "L'univers HIPZ",
    scroll: 'FAITES DÉFILER',
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
      { num: 'DIMA', label: 'S7ab', desc: 'Une boisson faite pour rassembler' },
      { num: '24/7', label: 'Rafraîchissement', desc: 'Fraîcheur vive à chaque gorgée' },
    ],
    flavorKicker: 'À chacun sa vibe',
    flavorsTitle: 'Deux caractères.',
    flavorsSubtitle: 'À partager, à choisir, à retrouver. Découvrez les deux créations HIPZ — chacune avec son énergie propre.',
    lemonBadge: '⚡ ÉNERGIE CITRON',
    lemonTitle: "L'énergie du citron.",
    lemonDescription: 'Une explosion d’agrumes frais, de lumière et de pétillant. Conçu pour réveiller vos sens et donner le rythme à votre journée.',
    lemonFeatures: ['Pétillant & Rafraîchissant', 'Agrumes solaires sélectionnés', 'Énergie vive & vivifiante'],
    lemonAlt: 'Visuel de campagne Lemon HIPZ aux agrumes.',
    peachBadge: '🍑 DOUCEUR VELOUTÉE',
    peachTitle: 'La douceur de la pêche.',
    peachDescription: 'La rondeur de la pêche mûrie au soleil pour des instants de pure douceur à partager ensemble. Un goût irrésistible.',
    peachFeatures: ['Douceur fruitée naturelle', 'Moments chill entre amis', 'Texture veloutée & délicate'],
    peachAlt: 'Visuel de campagne Peach HIPZ aux pêches.',
    flavorButton: 'Commander / Contacter',
    universeEyebrow: 'L’univers HIPZ',
    universeTitle: 'Les bons moments sont encore meilleurs entre amis.',
    universeNote: 'Une expression de campagne, une vibe communautaire.',
    backgroundControls: 'Commandes du fond vidéo',
    videoPause: 'Mettre la vidéo en pause',
    videoPlay: 'Lire la vidéo',
    soundUnmute: 'Activer le son',
    soundMute: 'Couper le son',
    videoBadge: 'VIDÉO OFFICIELLE',
    aboutEyebrow: 'Notre Histoire',
    aboutTitle: 'HIPZ, la boisson des moments vrais.',
    aboutCopy: 'HIPZ est née d’une idée simple : célébrer l’amitié et le partage ("Dima S7ab"). À travers deux saveurs audacieuses, nous accompagnons chaque instant de convivialité, d’énergie et de créativité.',
    aboutPillars: [
      { title: 'L’Esprit du Partage', desc: 'Créée pour les groupes d’amis qui célèbrent chaque victoire ensemble.' },
      { title: 'Ingrédients de Qualité', desc: 'Des arômes fruités intenses pour une sensation de fraîcheur immédiate.' },
      { title: 'Zéro Compromis', desc: 'Le parfait équilibre entre pétillant, gourmandise et énergie moderne.' },
    ],
    placeholderNote: 'Informations officielles de la marque — distribution, partenariats et points de vente à confirmer.',
    contactEyebrow: 'Partenariats & Contact',
    contactTitle: 'Donnons du goût à vos projets.',
    contactCopy: 'Distributeur, commerçant, organisateur ou partenaire ? Contactez notre équipe dès aujourd’hui.',
    phoneHeading: 'Téléphone direct',
    socialHeading: 'Communauté sociale',
    name: 'Nom complet',
    business: 'Entreprise / Organisation (facultatif)',
    email: 'Adresse e-mail',
    phone: 'Numéro de téléphone (facultatif)',
    inquiry: 'Objet de la demande',
    inquiryOptions: ['Choisir un sujet', 'Distribution commerciale', 'Points de vente / Retail', 'Partenariat & Événementiel', 'Autre demande'],
    message: 'Votre message',
    send: 'Envoyer le message',
    required: 'Ce champ est obligatoire.',
    invalidEmail: 'Saisissez une adresse e-mail valide.',
    messageShort: 'Ajoutez un message de 10 caractères minimum.',
    demoFeedback: 'Message reçu ! Notre équipe commerciale vous répondra dans les plus brefs délais.',
    demoError: 'Veuillez vérifier les champs indiqués avant d’envoyer.',
    footerLabel: 'Le goût des moments partagés.',
    copyright: '© HIPZ — Tous droits réservés. Dima S7ab.',
    skip: 'Passer au contenu',
    language: 'العربية',
    backToTop: 'Haut de page',
  },
  ar: {
    nav: ['الرئيسية', 'نكهاتنا', 'عالم HIPZ', 'من نحن', 'اتصل بنا'],
    heroBadge: 'الجيل الجديد من المشروبات المنعشة',
    heroEyebrow: 'لحظات تستاهل المشاركة',
    heroSubtitle: 'نكهتان قويتان. وفايب واحد يجمع الصحاب في كل وقت.',
    discover: 'اكتشف النكهات',
    universeLink: 'عالم HIPZ',
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
      { num: '02', label: 'نكهات أيقونية', desc: 'ليمون منعش وخوخ لذيذ' },
      { num: '100%', label: 'طاقة إيجابية', desc: 'لحظات لا تُنسى مع الصحاب' },
      { num: 'ديما', label: 'صحاب', desc: 'مشروب خُلق ليجمعنا دائماً' },
      { num: '24/7', label: 'انتعاش متواصل', desc: 'طعم يروي العطش في كل ثانية' },
    ],
    flavorKicker: 'كل واحد وفايبو',
    flavorsTitle: 'شخصيتان بطعم فريد.',
    flavorsSubtitle: 'للمشاركة، للاختيار، وللاستمتاع. اكتشف نكهتي HIPZ — كل واحدة بطاقتها وشخصيتها الخاصة.',
    lemonBadge: '⚡ انتعاش الليمون',
    lemonTitle: 'طاقة وانتعاش الليمون.',
    lemonDescription: 'انفجار من الليمون المنعش والحيوية الفوارة. صُمم ليوقظ حواسك ويمنحك الطاقة الكافية لبدء يومك بأعلى نشاط.',
    lemonFeatures: ['انتعاش فوار لا يُقاوم', 'حمضيات طبيعية مختارة بعناية', 'طاقة وحيوية متجددة'],
    lemonAlt: 'صورة حملة Lemon من HIPZ مع الحمضيات.',
    peachBadge: '🍑 نعومة الخوخ',
    peachTitle: 'نعومة ولذة الخوخ.',
    peachDescription: 'حلاوة ونعومة الخوخ الناضج تحت أشعة الشمس لأوقات من الاسترخاء واللذة نتقاسمها معاً. مذاق يسحر القلوب.',
    peachFeatures: ['مذاق فواكه طبيعي وناعم', 'لحظات رايقة مع الصحاب', 'قوام مخملي ولذيذ'],
    peachAlt: 'صورة حملة Peach من HIPZ مع الخوخ.',
    flavorButton: 'اطلب الآن / تواصل معنا',
    universeEyebrow: 'عالم HIPZ',
    universeTitle: 'أحلى اللحظات دائماً تكمل مع الصحاب.',
    universeNote: 'عبارة إبداعية ومجتمع يجمع عشاق الانتعاش.',
    backgroundControls: 'التحكم في فيديو الخلفية',
    videoPause: 'إيقاف الفيديو مؤقتًا',
    videoPlay: 'تشغيل الفيديو',
    soundUnmute: 'تشغيل الصوت',
    soundMute: 'كتم الصوت',
    videoBadge: 'فيديو رسمي',
    aboutEyebrow: 'قصتنا',
    aboutTitle: 'HIPZ، مشروب اللحظات الحقيقية.',
    aboutCopy: 'انطلقت HIPZ من فكرة بسيطة وملهمة: الاحتفاء بالصداقة والمشاركة الحقيقية ("Dima S7ab"). من خلال نكهتين متميزتين، نرافقكم في كل لحظة تجمع بين الطاقة، الفرح، والإبداع.',
    aboutPillars: [
      { title: 'روح المشاركة والصحبة', desc: 'صُنعت لتجمع الأصدقاء في كل مناسبة واحتفال باللحظات الجميلة.' },
      { title: 'مكونات طبيعية ومنعشة', desc: 'نكهات فواكه مكثفة تمنحك إحساساً فورياً بالحيوية والانتعاش.' },
      { title: 'طعم حقيقي بدون مساومة', desc: 'توازن مثالي بين الانتعاش الفوار والمذاق العصري اللذيذ.' },
    ],
    placeholderNote: 'المعلومات الرسمية للعلامة التجارية — شبكة التوزيع، نقاط البيع، والشراكات المعتمدة.',
    contactEyebrow: 'تواصل وشراكات',
    contactTitle: 'لنصنع معاً مشاريع بطعم النجاح.',
    contactCopy: 'موزع، تاجر تجزئة، منظم فعاليات أو شريك محتمل؟ يسعد فريقنا بالتواصل معكم والإجابة على استفساراتكم.',
    phoneHeading: 'الهاتف المباشر',
    socialHeading: 'مجتمعنا على التواصل',
    name: 'الاسم الكامل',
    business: 'الشركة / المؤسسة (اختياري)',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف (اختياري)',
    inquiry: 'موضوع التواصل',
    inquiryOptions: ['اختر موضوعاً', 'توزيع تجاري', 'نقاط بيع / تجزئة', 'رعاية وفعاليات', 'استفسار آخر'],
    message: 'رسالتك',
    send: 'إرسال الرسالة',
    required: 'هذا الحقل مطلوب.',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صالح.',
    messageShort: 'اكتب رسالة لا تقل عن 10 أحرف.',
    demoFeedback: 'تم استلام رسالتك بنجاح! سيتواصل معك فريقنا التجاري في أقرب وقت.',
    demoError: 'يرجى مراجعة الحقول المحددة قبل الإرسال.',
    footerLabel: 'نكهة اللحظات اللي تجمعنا.',
    copyright: '© HIPZ — جميع الحقوق محفوظة. ديما صحاب.',
    skip: 'انتقل إلى المحتوى',
    language: 'FR',
    backToTop: 'إلى الأعلى',
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSection, setActiveSection] = useState('accueil');
  const [formFeedback, setFormFeedback] = useState<'success' | 'error' | ''>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = copy[lang];
  const rtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    const localizedTitle = rtl ? 'HIPZ — dima s7ab | نكهتان، وفايب واحد' : 'HIPZ — dima s7ab | Deux saveurs. Une seule vibe.';
    document.title = localizedTitle;
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = localizedTitle;
    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.content = localizedTitle;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const localizedDescription = rtl
      ? 'اكتشف HIPZ — dima s7ab، نكهتا الليمون والخوخ، وفايب يجمع الصحاب.'
      : 'Découvrez HIPZ — dima s7ab, ses saveurs Lemon et Peach et une vibe à partager.';
    if (description) description.content = localizedDescription;
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = localizedDescription;
    const twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.content = localizedDescription;
  }, [lang, rtl]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0, .15, .35, .6] });
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
    ['#apropos', t.nav[3]],
    ['#contact', t.nav[4]],
  ];

  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenu" data-testid="link-skip-content">{t.skip}</a>
      
      {/* Floating Glass Navigation */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} data-testid="site-header">
        <div className="nav-container">
          <div className="nav-wrap">
            <a href="#accueil" className="brand-link" aria-label="HIPZ — dima s7ab" data-testid="link-brand-home">
              <div className="brand-logo-frame">
                <img src={logoImage} alt="HIPZ" />
              </div>
              <span className="brand-tag">DIMA S7AB</span>
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
                  aria-current={activeSection === href.slice(1) ? 'location' : undefined}
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
                  {t.language}
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
        {/* Hero Section with Video Background */}
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
            <div className="hero-ambient-glow glow-lemon" />
            <div className="hero-ambient-glow glow-peach" />
          </div>

          <div className="hero-content-wrap">
            <div className="hero-copy">
              <div className="hero-badge">
                <span className="pulse-dot" />
                <span>{t.heroBadge}</span>
              </div>
              <div className="eyebrow">{t.heroEyebrow}</div>
              <h1 id="hero-title">
                <span className="hero-brand-name">HIPZ.</span>
                <span className="brand-lower" dir="ltr">DIMA S7AB.</span>
              </h1>
              <p className="hero-subtitle">{t.heroSubtitle}</p>
              
              <div className="hero-actions">
                <a className="button-primary" href="#saveurs" data-testid="link-hero-flavors">
                  <span>{t.discover}</span>
                  {rtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </a>
                <a className="button-outline" href="#univers" data-testid="link-hero-universe">
                  <Sparkles size={15} />
                  <span>{t.universeLink}</span>
                </a>
              </div>

              <div className="hero-logo-lockup">
                <img src={logoImage} alt="" aria-hidden="true" />
                <span dir="ltr">HIPZ — dima s7ab</span>
              </div>
            </div>
          </div>

          {/* Floating Video Controller */}
          <div className="hero-background-controls" role="group" aria-label={t.backgroundControls}>
            <div className="hero-video-badge" aria-hidden="true">
              <span className="hero-video-dot" />
              <span>{t.videoBadge}</span>
            </div>
            <button
              type="button"
              onClick={toggleVideoPlay}
              aria-label={videoPlaying ? t.videoPause : t.videoPlay}
              title={videoPlaying ? t.videoPause : t.videoPlay}
              data-testid="button-background-toggle"
            >
              {videoPlaying ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={toggleVideoMute}
              aria-label={videoMuted ? t.soundUnmute : t.soundMute}
              title={videoMuted ? t.soundUnmute : t.soundMute}
              data-testid="button-background-sound"
            >
              {videoMuted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
            </button>
          </div>

          <a href="#saveurs" className="scroll-mark" aria-label={t.scroll}>
            <span className="scroll-mouse"><span className="scroll-wheel" /></span>
            <span>{t.scroll}</span>
            <ArrowDown size={13} aria-hidden="true" />
          </a>
        </section>

        {/* Infinite Moving Brand Ribbon */}
        <section className="brand-marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...t.marquee, ...t.marquee, ...t.marquee].map((item, idx) => (
              <span key={idx} className="marquee-item">
                <Zap size={14} className="marquee-icon" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </section>

        {/* Stats / Highlights Grid */}
        <section className="stats-section">
          <div className="stats-grid">
            {t.stats.map((s, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-top">
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-glow" />
                </div>
                <h3 className="stat-label">{s.label}</h3>
                <p className="stat-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Flavors Section with 3D Showcase Cards */}
        <section className="section flavors-section" id="saveurs" aria-labelledby="flavors-title">
          <div className="flavors-intro">
            <div className="section-badge">{t.flavorKicker}</div>
            <h2 className="section-title" id="flavors-title">{t.flavorsTitle}</h2>
            <p className="section-subtitle">{t.flavorsSubtitle}</p>
          </div>

          <div className="flavor-grid">
            {/* Lemon Flavor Card */}
            <article className="flavor-card lemon" data-testid="panel-flavor-lemon">
              <div className="flavor-card-glow" />
              <div className="flavor-orbit" aria-hidden="true">
                <span className="flavor-word">LEMON</span>
              </div>
              <div className="flavor-content">
                <div className="flavor-top">
                  <span className="flavor-pill">{t.lemonBadge}</span>
                  <span className="flavor-index">01</span>
                </div>
                <h3>{t.lemonTitle}</h3>
                <p>{t.lemonDescription}</p>
                
                <ul className="flavor-feature-list">
                  {t.lemonFeatures.map((feat, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="flavor-card-actions">
                  <a className="button-outline flavor-btn" href="#contact" data-testid="link-lemon-contact">
                    <span>{t.flavorButton}</span>
                    {rtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
                  </a>
                </div>
              </div>
              <div className="flavor-visual">
                <div className="flavor-img-backdrop" />
                <img src="/assets/hipz-lemon-campaign.png" alt={t.lemonAlt} loading="lazy" />
              </div>
            </article>

            {/* Peach Flavor Card */}
            <article className="flavor-card peach" data-testid="panel-flavor-peach">
              <div className="flavor-card-glow" />
              <div className="flavor-orbit" aria-hidden="true">
                <span className="flavor-word">PEACH</span>
              </div>
              <div className="flavor-content">
                <div className="flavor-top">
                  <span className="flavor-pill">{t.peachBadge}</span>
                  <span className="flavor-index">02</span>
                </div>
                <h3>{t.peachTitle}</h3>
                <p>{t.peachDescription}</p>
                
                <ul className="flavor-feature-list">
                  {t.peachFeatures.map((feat, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="flavor-card-actions">
                  <a className="button-outline flavor-btn" href="#contact" data-testid="link-peach-contact">
                    <span>{t.flavorButton}</span>
                    {rtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
                  </a>
                </div>
              </div>
              <div className="flavor-visual">
                <div className="flavor-img-backdrop" />
                <img src="/assets/hipz-peach-campaign.png" alt={t.peachAlt} loading="lazy" />
              </div>
            </article>
          </div>
        </section>

        {/* Universe Section */}
        <section className="universe" id="univers" aria-labelledby="universe-title">
          <div className="universe-grid">
            <div className="universe-left">
              <div className="universe-badge">{t.universeEyebrow}</div>
              <h2 className="section-title" id="universe-title" dir={rtl ? 'rtl' : undefined}>
                <span dir="ltr">dima s7ab</span>
              </h2>
              <blockquote className="universe-quote" data-testid="text-campaign-copy">
                "{t.universeTitle}"
                <small>{t.universeNote}</small>
              </blockquote>
            </div>

            <div className="universe-visual-wrap">
              <div className="universe-image-card">
                <img src="/assets/hipz-campaign-collage.png" alt="HIPZ Dima S7ab Campaign" loading="lazy" />
                <div className="universe-card-tag">
                  <Sparkles size={16} />
                  <span>DIMA S7AB • 100% VIBE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section about-section" id="apropos" aria-labelledby="about-title">
          <div className="about-header">
            <div className="section-badge">{t.aboutEyebrow}</div>
            <h2 className="section-title" id="about-title">{t.aboutTitle}</h2>
            <p className="about-main-text">{t.aboutCopy}</p>
          </div>

          <div className="about-pillars">
            {t.aboutPillars.map((pillar, idx) => (
              <div key={idx} className="about-pillar-card">
                <span className="pillar-num">0{idx + 1}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="draft-note" data-testid="text-official-placeholder">
            <span>ℹ️</span>
            <p>{t.placeholderNote}</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-layout">
            <div className="contact-copy">
              <div className="contact-badge">{t.contactEyebrow}</div>
              <h2 className="section-title" id="contact-title">{t.contactTitle}</h2>
              <p className="contact-intro">{t.contactCopy}</p>

              <div className="contact-details" aria-label={rtl ? 'بيانات التواصل المباشر' : 'Coordonnées directes'}>
                <div className="contact-detail-group">
                  <h3>{t.phoneHeading}</h3>
                  <div className="contact-detail-links">
                    <a href="tel:0770787889" dir="ltr" data-testid="link-phone-0770787889" className="contact-pill-btn">
                      <Phone size={14} />
                      <span>0770787889</span>
                    </a>
                    <a href="tel:0560404339" dir="ltr" data-testid="link-phone-0560404339" className="contact-pill-btn">
                      <Phone size={14} />
                      <span>0560404339</span>
                    </a>
                  </div>
                </div>

                <div className="contact-detail-group">
                  <h3>{t.socialHeading}</h3>
                  <div className="contact-detail-links">
                    <a
                      href="https://www.instagram.com/hipzdrink/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-pill-btn social"
                      aria-label={rtl ? 'حساب HIPZ على Instagram' : 'Instagram — compte HIPZ'}
                      data-testid="link-instagram"
                    >
                      <span>Instagram</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@hipzdrink"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-pill-btn social"
                      aria-label={rtl ? 'حساب HIPZ على TikTok' : 'TikTok — compte HIPZ'}
                      data-testid="link-tiktok"
                    >
                      <span>TikTok</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Glass Form Card */}
            <div className="contact-form-wrapper">
              <form className="contact-form" noValidate onSubmit={handleSubmit} data-testid="form-contact">
                <div className="field">
                  <label htmlFor="contact-name">
                    <User size={13} />
                    <span>{t.name} *</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder={rtl ? 'اكتب اسمك هنا' : 'Votre nom complet'}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    onChange={() => { if (errors.name) setErrors((old) => ({ ...old, name: '' })); }}
                    data-testid="input-contact-name"
                  />
                  {errors.name && <span className="field-error" id="error-name" role="alert">{errors.name}</span>}
                </div>

                <div className="field">
                  <label htmlFor="contact-business">
                    <span>{t.business}</span>
                  </label>
                  <input
                    id="contact-business"
                    name="business"
                    autoComplete="organization"
                    placeholder={rtl ? 'اسم الشركة أو المحل' : 'Nom de votre entreprise'}
                    data-testid="input-contact-business"
                  />
                </div>

                <div className="field">
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
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    onChange={() => { if (errors.email) setErrors((old) => ({ ...old, email: '' })); }}
                    data-testid="input-contact-email"
                  />
                  {errors.email && <span className="field-error" id="error-email" role="alert">{errors.email}</span>}
                </div>

                <div className="field">
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
                    data-testid="input-contact-phone"
                  />
                </div>

                <div className="field full">
                  <label htmlFor="contact-inquiry">
                    <span>{t.inquiry}</span>
                  </label>
                  <select id="contact-inquiry" name="inquiry" defaultValue="" data-testid="select-contact-inquiry">
                    <option value="">{t.inquiryOptions[0]}</option>
                    {t.inquiryOptions.slice(1).map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="field full">
                  <label htmlFor="contact-message">
                    <MessageSquare size={13} />
                    <span>{t.message} *</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder={rtl ? 'اكتب تفاصيل طلبك أو رسالتك هنا...' : 'Écrivez votre message ici...'}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    onChange={() => { if (errors.message) setErrors((old) => ({ ...old, message: '' })); }}
                    data-testid="input-contact-message"
                  />
                  {errors.message && <span className="field-error" id="error-message" role="alert">{errors.message}</span>}
                </div>

                {formFeedback && (
                  <div
                    className={`form-feedback ${formFeedback}`}
                    role={formFeedback === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                    data-testid="status-form-feedback"
                  >
                    {formFeedback === 'error' ? t.demoError : t.demoFeedback}
                  </div>
                )}

                <button className="button-primary form-submit" type="submit" data-testid="button-submit-contact">
                  <span>{t.send}</span>
                  {rtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logoImage} alt="HIPZ" />
              <span dir="ltr">HIPZ — dima s7ab</span>
            </div>
            <p className="footer-motto">{t.heroSubtitle}</p>
          </div>

          <div className="footer-contact" aria-label={rtl ? 'طرق التواصل مع HIPZ' : 'Contacter HIPZ'}>
            <div>
              <span>{t.phoneHeading}</span>
              <a href="tel:0770787889" dir="ltr" data-testid="footer-phone-0770787889">0770787889</a>
              <a href="tel:0560404339" dir="ltr" data-testid="footer-phone-0560404339">0560404339</a>
            </div>
            <div>
              <span>{t.socialHeading}</span>
              <a href="https://www.instagram.com/hipzdrink/" target="_blank" rel="noopener noreferrer" data-testid="footer-instagram">Instagram</a>
              <a href="https://www.tiktok.com/@hipzdrink" target="_blank" rel="noopener noreferrer" data-testid="footer-tiktok">TikTok</a>
            </div>
          </div>

          <nav className="footer-links" aria-label={rtl ? 'روابط التذييل' : 'Navigation de pied de page'}>
            {navLinks.map(([href, label], index) => (
              <a href={href} key={href} data-testid={`link-footer-${index}`}>{label}</a>
            ))}
            <button className="lang-switch-footer" type="button" onClick={setLanguage} data-testid="button-footer-language">
              {t.language}
            </button>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>{t.copyright}</span>
          <span>{t.footerLabel}</span>
        </div>
      </footer>

      {/* Floating Back To Top */}
      {scrolled && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top"
          aria-label={t.backToTop}
          title={t.backToTop}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

export default App;
