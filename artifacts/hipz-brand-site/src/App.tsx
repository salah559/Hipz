import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import './index.css';

type Language = 'fr' | 'ar';

const copy = {
  fr: {
    nav: ['Accueil', 'Nos saveurs', "L'univers HIPZ", 'Galerie', 'À propos', 'Contact'],
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
    flavorButton: 'Voir la campagne',
    universeEyebrow: 'L’univers HIPZ',
    universeTitle: 'Les bons moments sont encore meilleurs entre amis.',
    universeNote: 'Une expression de campagne, pas un récit historique.',
    galleryEyebrow: 'Images de campagne',
    galleryTitle: 'Une vibe. En images.',
    galleryText: 'Le collage de campagne fourni, présenté dans son intégralité. Chaque panneau reste à sa place.',
    galleryCaption: 'Campagne HIPZ — collage complet',
    openImage: 'Ouvrir le visuel de campagne',
    aboutEyebrow: 'À propos',
    aboutTitle: 'HIPZ, à découvrir.',
    aboutCopy: 'Un espace pour raconter HIPZ — Dima S7ab, ses deux saveurs et les moments qu’elles inspirent.',
    placeholderNote: 'Contenu officiel à compléter : nom légal de l’entreprise, présentation validée, localisation, distribution et coordonnées. Aucun détail n’est ajouté sans validation.',
    contactEyebrow: 'On se parle ?',
    contactTitle: 'Pour les projets qui se partagent.',
    contactCopy: 'Distributeur, commerçant ou partenaire ? Laissez vos coordonnées et votre message. Ce formulaire est une démonstration et n’envoie rien.',
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
    noSocial: 'Réseaux officiels à ajouter après confirmation.',
    close: 'Fermer le visuel',
    skip: 'Passer au contenu',
    language: 'العربية',
    alt: 'Collage de campagne HIPZ complet : bouteilles Lemon et Peach, visuels fruités et scènes de campagne.',
  },
  ar: {
    nav: ['الرئيسية', 'نكهاتنا', 'عالم HIPZ', 'المعرض', 'من نحن', 'اتصل بنا'],
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
    flavorButton: 'شاهد الحملة',
    universeEyebrow: 'عالم HIPZ',
    universeTitle: 'أحلى اللحظات تجمع الصحاب.',
    universeNote: 'عبارة إبداعية للحملة، وليست رواية تاريخية.',
    galleryEyebrow: 'صور الحملة',
    galleryTitle: 'فايب واحد. بصور كثيرة.',
    galleryText: 'الكولاج الأصلي للحملة كما تمّ توفيره، مع الحفاظ على جميع أجزائه.',
    galleryCaption: 'حملة HIPZ — الكولاج الكامل',
    openImage: 'افتح صورة الحملة',
    aboutEyebrow: 'من نحن',
    aboutTitle: 'تعرّف على HIPZ.',
    aboutCopy: 'مساحة للتعريف بـ HIPZ — dima s7ab، ونكهتيها، واللحظات التي تلهمها.',
    placeholderNote: 'معلومات رسمية مطلوبة: الاسم القانوني للشركة، نبذة معتمدة، الموقع، معلومات التوزيع وبيانات التواصل. لن نضيف أي تفاصيل من دون اعتماد.',
    contactEyebrow: 'خلّينا نحكيو',
    contactTitle: 'لمشاريع تجمعنا.',
    contactCopy: 'موزّع أو تاجر أو شريك محتمل؟ اترك بياناتك ورسالتك. هذا النموذج تجريبي ولا يرسل أي شيء.',
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
    noSocial: 'تُضاف الحسابات الرسمية بعد تأكيدها.',
    close: 'إغلاق صورة الحملة',
    skip: 'انتقل إلى المحتوى',
    language: 'FR',
    alt: 'كولاج حملة HIPZ كامل: عبوتا Lemon وPeach وصور الفاكهة ومشاهد الحملة.',
  },
} as const;

const campaignImage = '/assets/hipz-campaign-collage.png';
const logoImage = '/assets/hipz-logo.png';

function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [formFeedback, setFormFeedback] = useState<'success' | 'error' | ''>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
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
    if (!lightboxOpen) return;
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setLightboxOpen(false);
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previousFocus.current?.focus();
    };
  }, [lightboxOpen]);

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

  const openLightbox = (event: MouseEvent<HTMLButtonElement>) => {
    previousFocus.current = event.currentTarget;
    setLightboxOpen(true);
  };

  const navLinks = [
    ['#accueil', t.nav[0]], ['#saveurs', t.nav[1]], ['#univers', t.nav[2]],
    ['#galerie', t.nav[3]], ['#apropos', t.nav[4]], ['#contact', t.nav[5]],
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
              <a href={href} onClick={() => setMenuOpen(false)} key={href} data-testid={`link-nav-${index}`}>{label}</a>
            ))}
            <button className="lang-switch" type="button" onClick={setLanguage} aria-label={rtl ? 'تغيير اللغة إلى الفرنسية' : 'Changer la langue en arabe'} data-testid="button-language">
              {t.language}
            </button>
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)} data-testid="link-nav-contact-cta">{t.nav[5]} <ArrowUpRight size={14} aria-hidden="true" /></a>
          </nav>
        </div>
      </header>

      <main id="contenu">
        <section className="hero" id="accueil" aria-labelledby="hero-title">
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
          <div className="hero-visual" data-testid="hero-campaign-visual">
            <div className="hero-image-frame"><img src={campaignImage} alt={t.alt} fetchPriority="high" /></div>
            <div className="image-caption"><span>Campagne / حملة</span><span>01 — 02</span></div>
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
              <a className="button-outline" href="#galerie" data-testid="link-lemon-campaign">{t.flavorButton} {rtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</a>
            </div>
            <div className="flavor-visual" aria-hidden="true"><div className="flavor-orbit"><span className="flavor-word">LE</span><span className="flavor-mark">LEMON</span></div></div>
          </article>
          <article className="flavor-panel peach" data-testid="panel-flavor-peach">
            <div className="flavor-copy">
              <span className="flavor-no">02 / PEACH</span>
              <h3>{t.peachTitle}</h3>
              <p>{t.peachDescription}</p>
              <a className="button-outline" href="#galerie" data-testid="link-peach-campaign">{t.flavorButton} {rtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</a>
            </div>
            <div className="flavor-visual" aria-hidden="true"><div className="flavor-orbit"><span className="flavor-word">PE</span><span className="flavor-mark">PEACH</span></div></div>
          </article>
        </section>

        <section className="universe" id="univers" aria-labelledby="universe-title">
          <div className="universe-grid">
            <div><div className="section-kicker">{t.universeEyebrow}</div><h2 className="section-title" id="universe-title" dir={rtl ? 'rtl' : undefined}><span dir="ltr">dima s7ab</span></h2><span className="universe-asterisk" aria-hidden="true">✳</span></div>
            <blockquote className="universe-quote" data-testid="text-campaign-copy">{t.universeTitle}<small>{t.universeNote}</small></blockquote>
          </div>
        </section>

        <section className="section gallery-section" id="galerie" aria-labelledby="gallery-title">
          <div className="gallery-head">
            <div><div className="section-kicker">{t.galleryEyebrow}</div><h2 className="section-title" id="gallery-title">{t.galleryTitle}</h2></div>
            <p>{t.galleryText}</p>
          </div>
          <button className="gallery-card" type="button" onClick={openLightbox} aria-label={t.openImage} data-testid="button-open-gallery">
            <img src={campaignImage} alt={t.alt} loading="lazy" />
          </button>
          <div className="gallery-caption"><span>{t.galleryCaption}</span><span>01 / 01</span></div>
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
          <nav className="footer-links" aria-label={rtl ? 'روابط التذييل' : 'Navigation de pied de page'}>
            {navLinks.map(([href, label], index) => <a href={href} key={href} data-testid={`link-footer-${index}`}>{label}</a>)}
            <button className="lang-switch" type="button" onClick={setLanguage} data-testid="button-footer-language">{t.language}</button>
          </nav>
        </div>
        <div className="footer-bottom"><span>{t.copyright}</span><span>{t.footerLabel} · {t.noSocial}</span></div>
      </footer>

      {lightboxOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={t.galleryCaption} onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxOpen(false); }} data-testid="dialog-gallery-lightbox">
          <button className="lightbox-close" type="button" aria-label={t.close} onClick={() => setLightboxOpen(false)} ref={closeButton} data-testid="button-close-lightbox"><X size={22} /></button>
          <img src={campaignImage} alt={t.alt} />
          <div className="lightbox-label">{t.galleryCaption} · 01 / 01</div>
        </div>
      )}
    </div>
  );
}

export default App;
