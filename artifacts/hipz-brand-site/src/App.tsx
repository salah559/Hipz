import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, Pause, Play, X } from 'lucide-react';
import './index.css';

type Language = 'fr' | 'ar';

const copy = {
  fr: {
    nav: ['Accueil', 'Nos saveurs', "L'univers HIPZ", 'À propos', 'Contact'],
    heroEyebrow: 'Une vibe à partager',
    heroSubtitle: 'Deux saveurs. Une seule vibe.',
    discover: 'Découvrir nos saveurs',
    universeLink: "L'univers HIPZ",
    scroll: 'FAITES DÉFILER',
    flavorKicker: 'À chacun sa vibe',
    flavorsTitle: 'Deux caractères.',
    flavorsSubtitle: 'À partager, à choisir, à retrouver. Découvrez les deux saveurs HIPZ — chacune avec son énergie.',
    lemonTitle: "L'énergie du citron.",
    peachTitle: 'La douceur de la pêche.',
    lemonDescription: 'Une piste créative autour du citron, de la lumière et des moments qui pétillent. Texte de présentation à valider par la marque.',
    peachDescription: 'Une piste créative aux couleurs de la pêche et des instants à savourer ensemble. Texte de présentation à valider par la marque.',
    lemonAlt: 'Visuel de campagne Lemon HIPZ aux agrumes.',
    peachAlt: 'Visuel de campagne Peach HIPZ aux pêches.',
    flavorButton: 'Nous contacter',
    universeEyebrow: 'L’univers HIPZ',
    universeTitle: 'Les bons moments sont encore meilleurs entre amis.',
    universeNote: 'Une expression de campagne, pas un récit historique.',
    backgroundControls: 'Commandes des fonds de campagne',
    backgroundPrevious: 'Image de fond précédente',
    backgroundNext: 'Image de fond suivante',
    backgroundPause: 'Mettre le changement de fond en pause',
    backgroundPlay: 'Reprendre le changement de fond',
    aboutEyebrow: 'À propos',
    aboutTitle: 'HIPZ, à découvrir.',
    aboutCopy: 'Un espace pour raconter HIPZ — Dima S7ab, ses deux saveurs et les moments qu’elles inspirent.',
    placeholderNote: 'Contenu officiel à compléter : nom légal de l’entreprise, présentation validée, localisation, distribution et coordonnées. Aucun détail n’est ajouté sans validation.',
    contactEyebrow: 'On se parle ?',
    contactTitle: 'Pour les projets qui se partagent.',
    contactCopy: 'Distributeur, commerçant ou partenaire ? Laissez vos coordonnées et votre message. Ce formulaire est une démonstration et n’envoie rien.',
    phoneHeading: 'Téléphone',
    socialHeading: 'Réseaux sociaux',
    name: 'Nom complet',
    business: 'Entreprise / organisation (facultatif)',
    email: 'Adresse e-mail',
    phone: 'Téléphone (facultatif)',
    inquiry: 'Votre demande',
    inquiryOptions: ['Choisir un sujet', 'Distribution', 'Commerce de détail', 'Partenariat', 'Autre'],
    message: 'Votre message',
    send: 'Vérifier le formulaire',
    required: 'Ce champ est obligatoire.',
    invalidEmail: 'Saisissez une adresse e-mail valide.',
    messageShort: 'Ajoutez un message de 10 caractères minimum.',
    demoFeedback: 'Démonstration uniquement : votre message n’a pas été envoyé. Aucun service de messagerie n’est connecté.',
    demoError: 'Vérifiez les champs indiqués avant de continuer.',
    footerLabel: 'Le goût des moments partagés.',
    copyright: '© HIPZ — contenu éditable, informations officielles à confirmer.',
    skip: 'Passer au contenu',
    language: 'العربية',
  },
  ar: {
    nav: ['الرئيسية', 'نكهاتنا', 'عالم HIPZ', 'من نحن', 'اتصل بنا'],
    heroEyebrow: 'لحظات تستاهل المشاركة',
    heroSubtitle: 'نكهتان. وفايب واحد.',
    discover: 'اكتشف نكهاتنا',
    universeLink: 'اكتشف عالم HIPZ',
    scroll: 'اكتشف المزيد',
    flavorKicker: 'كل واحد وفايبو',
    flavorsTitle: 'شخصيتان.',
    flavorsSubtitle: 'للمشاركة والاختيار والاستمتاع. اكتشف نكهتي HIPZ، لكل واحدة طاقتها الخاصة.',
    lemonTitle: 'انتعاش بنكهة الليمون.',
    peachTitle: 'نعومة نكهة الخوخ.',
    lemonDescription: 'تصوّر إبداعي يحتفي بالليمون والضوء واللحظات المفعمة بالحيوية. نصّ تقديمي بانتظار موافقة العلامة.',
    peachDescription: 'تصوّر إبداعي بألوان الخوخ ولحظات نستمتع بها معًا. نصّ تقديمي بانتظار موافقة العلامة.',
    lemonAlt: 'صورة حملة Lemon من HIPZ مع الحمضيات.',
    peachAlt: 'صورة حملة Peach من HIPZ مع الخوخ.',
    flavorButton: 'تواصل معنا',
    universeEyebrow: 'عالم HIPZ',
    universeTitle: 'أحلى اللحظات تجمع الصحاب.',
    universeNote: 'عبارة إبداعية للحملة، وليست رواية تاريخية.',
    backgroundControls: 'التحكم في خلفيات الحملة',
    backgroundPrevious: 'الخلفية السابقة',
    backgroundNext: 'الخلفية التالية',
    backgroundPause: 'إيقاف تغيير الخلفية مؤقتًا',
    backgroundPlay: 'استئناف تغيير الخلفية',
    aboutEyebrow: 'من نحن',
    aboutTitle: 'تعرّف على HIPZ.',
    aboutCopy: 'مساحة للتعريف بـ HIPZ — dima s7ab، ونكهتيها، واللحظات التي تلهمها.',
    placeholderNote: 'معلومات رسمية مطلوبة: الاسم القانوني للشركة، نبذة معتمدة، الموقع، معلومات التوزيع وبيانات التواصل. لن نضيف أي تفاصيل من دون اعتماد.',
    contactEyebrow: 'خلّينا نحكيو',
    contactTitle: 'لمشاريع تجمعنا.',
    contactCopy: 'موزّع أو تاجر أو شريك محتمل؟ اترك بياناتك ورسالتك. هذا النموذج تجريبي ولا يرسل أي شيء.',
    phoneHeading: 'أرقام الهاتف',
    socialHeading: 'حسابات التواصل',
    name: 'الاسم الكامل',
    business: 'الشركة / المؤسسة (اختياري)',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف (اختياري)',
    inquiry: 'موضوع التواصل',
    inquiryOptions: ['اختر موضوعًا', 'التوزيع', 'البيع بالتجزئة', 'شراكة', 'موضوع آخر'],
    message: 'رسالتك',
    send: 'تحقق من النموذج',
    required: 'هذا الحقل مطلوب.',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صالح.',
    messageShort: 'اكتب رسالة لا تقل عن 10 أحرف.',
    demoFeedback: 'نموذج تجريبي فقط: لم يتم إرسال رسالتك. لا توجد خدمة بريد إلكتروني متصلة.',
    demoError: 'يرجى مراجعة الحقول المحددة قبل المتابعة.',
    footerLabel: 'نكهة اللحظات اللي تجمعنا.',
    copyright: '© HIPZ — المحتوى قابل للتعديل، والمعلومات الرسمية بانتظار التأكيد.',
    skip: 'انتقل إلى المحتوى',
    language: 'FR',
  },
} as const;

const logoImage = '/assets/hipz-logo.png';
const campaignBackgrounds = [
  { src: '/assets/hipz-background-moments.png', mobileSrc: '/assets/hipz-lifestyle-sip.png' },
  { src: '/assets/hipz-background-flavors.png', mobileSrc: '/assets/hipz-duo-front.png' },
  { src: '/assets/hipz-hero-wide.png', mobileSrc: '/assets/hipz-duo-back.png' },
];

function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [backgroundPlaying, setBackgroundPlaying] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setBackgroundPlaying(!reduceMotion.matches);
    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) setBackgroundPlaying(false);
    };
    reduceMotion.addEventListener('change', onMotionPreferenceChange);
    return () => reduceMotion.removeEventListener('change', onMotionPreferenceChange);
  }, []);

  useEffect(() => {
    if (!backgroundPlaying) return;
    const timer = window.setInterval(() => {
      setBackgroundIndex((index) => (index + 1) % campaignBackgrounds.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [backgroundPlaying]);

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

  const stepBackground = (direction: number) => {
    setBackgroundIndex((index) => (index + direction + campaignBackgrounds.length) % campaignBackgrounds.length);
  };

  const navLinks = [
    ['#accueil', t.nav[0]], ['#saveurs', t.nav[1]], ['#univers', t.nav[2]],
    ['#apropos', t.nav[3]], ['#contact', t.nav[4]],
  ];

  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenu" data-testid="link-skip-content">{t.skip}</a>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} data-testid="site-header">
        <div className="nav-wrap">
          <a href="#accueil" className="brand-link" aria-label="HIPZ — dima s7ab" data-testid="link-brand-home">
            <img src={logoImage} alt="HIPZ" />
            <span className="brand-tag">DIMA S7AB</span>
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? (rtl ? 'إغلاق القائمة' : 'Fermer le menu') : (rtl ? 'فتح القائمة' : 'Ouvrir le menu')} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav id="main-navigation" className={`nav-links${menuOpen ? ' open' : ''}`} aria-label={rtl ? 'روابط التنقل الرئيسية' : 'Navigation principale'}>
            {navLinks.map(([href, label], index) => (
              <a href={href} onClick={() => setMenuOpen(false)} key={href} aria-current={activeSection === href.slice(1) ? 'location' : undefined} data-testid={`link-nav-${index}`}>{label}</a>
            ))}
            <button className="lang-switch" type="button" onClick={setLanguage} aria-label={rtl ? 'تغيير اللغة إلى الفرنسية' : 'Changer la langue en arabe'} data-testid="button-language">
              {t.language}
            </button>
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)} data-testid="link-nav-contact-cta">{t.nav[4]} <ArrowUpRight size={14} aria-hidden="true" /></a>
          </nav>
        </div>
      </header>

      <main id="contenu">
        <section className="hero" id="accueil" aria-labelledby="hero-title">
          <div className="hero-backgrounds" aria-hidden="true">
            {campaignBackgrounds.map((background, index) => (
              <div
                className={`hero-background-slide${backgroundIndex === index ? ' active' : ''}`}
                key={background.src}
                style={{ backgroundImage: `url("${background.src}")` }}
              >
                <picture>
                  <source media="(max-width: 760px)" srcSet={background.mobileSrc} />
                  <img src={background.src} alt="" fetchPriority={index === 0 ? 'high' : undefined} />
                </picture>
              </div>
            ))}
          </div>
          <div className="hero-copy">
            <div className="eyebrow">{t.heroEyebrow}</div>
            <h1 id="hero-title"><span>HIPZ.</span><span className="brand-lower" dir="ltr">DIMA S7AB.</span></h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
            <div className="hero-actions">
              <a className="button-primary" href="#saveurs" data-testid="link-hero-flavors">{t.discover} {rtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}</a>
              <a className="button-outline" href="#univers" data-testid="link-hero-universe">{t.universeLink}</a>
            </div>
            <div className="hero-logo-lockup"><img src={logoImage} alt="" aria-hidden="true" /><span dir="ltr">HIPZ — dima s7ab</span></div>
          </div>
          <div className="hero-background-controls" role="group" aria-label={t.backgroundControls}>
            <button type="button" onClick={() => stepBackground(rtl ? 1 : -1)} aria-label={t.backgroundPrevious} data-testid="button-background-previous">
              {rtl ? <ArrowRight size={18} aria-hidden="true" /> : <ArrowLeft size={18} aria-hidden="true" />}
            </button>
            <span className="hero-background-count" aria-hidden="true">
              {String(backgroundIndex + 1).padStart(2, '0')} / {String(campaignBackgrounds.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => stepBackground(rtl ? -1 : 1)} aria-label={t.backgroundNext} data-testid="button-background-next">
              {rtl ? <ArrowLeft size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => setBackgroundPlaying((playing) => !playing)}
              aria-label={backgroundPlaying ? t.backgroundPause : t.backgroundPlay}
              data-testid="button-background-toggle"
            >
              {backgroundPlaying ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
            </button>
          </div>
          <div className="scroll-mark"><ArrowDown size={14} aria-hidden="true" /> {t.scroll}</div>
        </section>

        <section className="section" id="saveurs" aria-labelledby="flavors-title">
          <div className="flavors-intro">
            <div className="section-kicker">{t.flavorKicker}</div>
            <h2 className="section-title" id="flavors-title">{t.flavorsTitle}</h2>
            <p>{t.flavorsSubtitle}</p>
          </div>
          <article className="flavor-panel lemon" data-testid="panel-flavor-lemon">
            <div className="flavor-copy">
              <span className="flavor-no">01 / LEMON</span>
              <h3>{t.lemonTitle}</h3>
              <p>{t.lemonDescription}</p>
              <a className="button-outline" href="#contact" data-testid="link-lemon-contact">{t.flavorButton} {rtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</a>
            </div>
            <div className="flavor-visual"><img src="/assets/hipz-lemon-campaign.png" alt={t.lemonAlt} loading="lazy" /></div>
          </article>
          <article className="flavor-panel peach" data-testid="panel-flavor-peach">
            <div className="flavor-copy">
              <span className="flavor-no">02 / PEACH</span>
              <h3>{t.peachTitle}</h3>
              <p>{t.peachDescription}</p>
              <a className="button-outline" href="#contact" data-testid="link-peach-contact">{t.flavorButton} {rtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</a>
            </div>
            <div className="flavor-visual"><img src="/assets/hipz-peach-campaign.png" alt={t.peachAlt} loading="lazy" /></div>
          </article>
        </section>

        <section className="universe" id="univers" aria-labelledby="universe-title">
          <div className="universe-grid">
            <div><div className="section-kicker">{t.universeEyebrow}</div><h2 className="section-title" id="universe-title" dir={rtl ? 'rtl' : undefined}><span dir="ltr">dima s7ab</span></h2><span className="universe-asterisk" aria-hidden="true">✳</span></div>
            <blockquote className="universe-quote" data-testid="text-campaign-copy">{t.universeTitle}<small>{t.universeNote}</small></blockquote>
          </div>
        </section>

        <section className="section about-section" id="apropos" aria-labelledby="about-title">
          <div><div className="section-kicker">{t.aboutEyebrow}</div><h2 className="section-title" id="about-title">{t.aboutTitle}</h2></div>
          <div className="about-copy">
            <p>{t.aboutCopy}</p>
            <p className="draft-note" data-testid="text-official-placeholder">{t.placeholderNote}</p>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-layout">
            <div className="contact-copy">
              <div className="section-kicker">{t.contactEyebrow}</div>
              <h2 className="section-title" id="contact-title">{t.contactTitle}</h2>
              <p>{t.contactCopy}</p>
              <div className="contact-details" aria-label={rtl ? 'بيانات التواصل المباشر' : 'Coordonnées directes'}>
                <div className="contact-detail-group">
                  <h3>{t.phoneHeading}</h3>
                  <div className="contact-detail-links">
                    <a href="tel:0770787889" dir="ltr" data-testid="link-phone-0770787889">0770787889</a>
                    <a href="tel:0560404339" dir="ltr" data-testid="link-phone-0560404339">0560404339</a>
                  </div>
                </div>
                <div className="contact-detail-group">
                  <h3>{t.socialHeading}</h3>
                  <div className="contact-detail-links">
                    <a href="https://www.instagram.com/hipzdrink/" target="_blank" rel="noopener noreferrer" aria-label={rtl ? 'حساب HIPZ على Instagram' : 'Instagram — compte HIPZ'} data-testid="link-instagram">Instagram <ArrowUpRight size={13} aria-hidden="true" /></a>
                    <a href="https://www.tiktok.com/@hipzdrink" target="_blank" rel="noopener noreferrer" aria-label={rtl ? 'حساب HIPZ على TikTok' : 'TikTok — compte HIPZ'} data-testid="link-tiktok">TikTok <ArrowUpRight size={13} aria-hidden="true" /></a>
                  </div>
                </div>
              </div>
            </div>
            <form className="contact-form" noValidate onSubmit={handleSubmit} data-testid="form-contact">
              <div className="field">
                <label htmlFor="contact-name">{t.name} *</label>
                <input id="contact-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'error-name' : undefined} onChange={() => { if (errors.name) setErrors((old) => ({ ...old, name: '' })); }} data-testid="input-contact-name" />
                {errors.name && <span className="field-error" id="error-name" role="alert">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="contact-business">{t.business}</label>
                <input id="contact-business" name="business" autoComplete="organization" data-testid="input-contact-business" />
              </div>
              <div className="field">
                <label htmlFor="contact-email">{t.email} *</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'error-email' : undefined} onChange={() => { if (errors.email) setErrors((old) => ({ ...old, email: '' })); }} data-testid="input-contact-email" />
                {errors.email && <span className="field-error" id="error-email" role="alert">{errors.email}</span>}
              </div>
              <div className="field">
                <label htmlFor="contact-phone">{t.phone}</label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" data-testid="input-contact-phone" />
              </div>
              <div className="field full">
                <label htmlFor="contact-inquiry">{t.inquiry}</label>
                <select id="contact-inquiry" name="inquiry" defaultValue="" data-testid="select-contact-inquiry">
                  <option value="">{t.inquiryOptions[0]}</option>
                  {t.inquiryOptions.slice(1).map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              <div className="field full">
                <label htmlFor="contact-message">{t.message} *</label>
                <textarea id="contact-message" name="message" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'error-message' : undefined} onChange={() => { if (errors.message) setErrors((old) => ({ ...old, message: '' })); }} data-testid="input-contact-message" />
                {errors.message && <span className="field-error" id="error-message" role="alert">{errors.message}</span>}
              </div>
              {formFeedback && <div className="form-feedback" role={formFeedback === 'error' ? 'alert' : 'status'} aria-live="polite" data-testid="status-form-feedback">{formFeedback === 'error' ? t.demoError : t.demoFeedback}</div>}
              <button className="button-primary form-submit" type="submit" data-testid="button-submit-contact">{t.send} {rtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-logo"><img src={logoImage} alt="" /><span dir="ltr">HIPZ — dima s7ab</span></div>
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
            {navLinks.map(([href, label], index) => <a href={href} key={href} data-testid={`link-footer-${index}`}>{label}</a>)}
            <button className="lang-switch" type="button" onClick={setLanguage} data-testid="button-footer-language">{t.language}</button>
          </nav>
        </div>
        <div className="footer-bottom"><span>{t.copyright}</span><span>{t.footerLabel}</span></div>
      </footer>

    </div>
  );
}

export default App;
