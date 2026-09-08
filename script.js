/* ============================================================
   NANCY ABDULLAH FATHY — PORTFOLIO SCRIPT
   Theme toggle · i18n (AR/EN) · Formspree · Particles ·
   Typing · Counters · Marquee · Project filter · Sidebar
   ============================================================ */

/* ── FORMSPREE ENDPOINT ─── Replace with your actual endpoint */
const FORMSPREE_URL = 'https://formspree.io/f/xgonvjjy';

/* ── TRANSLATIONS ─────────────────────────────────────────── */
const T = {
  en: {
    nav_about: 'About', nav_skills: 'Skills', nav_experience: 'Experience',
    nav_projects: 'Projects', nav_gallery: 'Gallery', nav_education: 'Education',
    nav_contact: 'Contact',

    hero_badge: 'Available for Opportunities',
    hero_name1: 'Nancy',
    hero_name2: 'Abdullah Fathy',
    hero_role_typed: ['TypeScript / Next.js Developer', 'Full Stack Web Developer', 'React.js Developer', 'PHP / Laravel Expert', 'Software Engineer'],
    hero_desc: 'TypeScript & Next.js Developer with 3+ years of experience building fast, scalable, SEO-friendly web applications — from interactive React front-ends to robust Laravel back-ends and AI-powered features.',
    hero_btn_projects: 'View Projects',
    hero_btn_hire: 'Hire Me',
    hero_btn_email: 'Email Me',
    stat_years_lbl: 'Years Exp.',
    stat_projects_lbl: 'Projects',
    stat_gpa_lbl: 'GPA / 4.0',
    stat_grade_lbl: 'Top Grade',
    badge_nextjs: 'TypeScript / Next.js Developer',
    badge_react: 'React Developer',
    badge_laravel: 'Laravel Expert',
    initial_letter: 'N',

    about_tag: 'Who I Am', about_title: 'About Me',
    about_lead: '"Driven by a passion for creating smart, scalable, and user-centric solutions."',
    about_p1: "I'm a TypeScript / Next.js Developer and Software Engineer with over 3 years of experience shipping production web applications — from interactive React and Next.js front-ends to PHP & Laravel back-ends, database design, and AI-powered features.",
    about_p2: 'My aim is to transform complex challenges into seamless digital experiences by combining clean, type-safe code, intuitive interfaces, and efficient system design — delivering not just functional applications, but meaningful user journeys.',
    lbl_location: 'Location', val_location: 'Giza, Egypt',
    lbl_email: 'Email', lbl_phone: 'Phone',
    lbl_university: 'University', val_university: 'Helwan University',
    lbl_major: 'Major', val_major: 'AI Department — CS & AI',
    lbl_gpa: 'GPA', val_gpa: '3.68 / 4.0 · Excellent',
    lang_arabic: 'Arabic', lang_lv_arabic: 'Native / Fluent',
    lang_english: 'English', lang_lv_english: 'Very Good',
    lang_deutsch: 'Deutsch', lang_lv_deutsch: 'Good',

    skills_tag: 'What I Know', skills_title: 'Technical Skills',
    sk1_cat: 'Core', sk1_title: 'Languages',
    sk2_cat: 'Frameworks', sk2_title: 'Frameworks & Libraries',
    sk3_cat: 'Data', sk3_title: 'Databases',
    sk4_cat: 'DevOps', sk4_title: 'Tools & Version Control',
    sk5_cat: 'AI', sk5_title: 'AI & Architecture',
    sk6_cat: 'Cloud', sk6_title: 'Infrastructure',
    sk7_cat: 'Soft Skills', sk7_title: 'Professional Skills',

    exp_tag: 'My Journey', exp_title: 'Work Experience',
    bz_period: 'December 2024 — May 2025',
    bz_role: 'Full Stack PHP/Laravel Developer',
    bz_company: 'Bluezone Web Company',
    bz_li1: 'Developed and maintained e-commerce platforms (Nabela, Sakba, Shantongulf, AndMore) using PHP Laravel & MySQL with responsive, cross-browser-compatible design.',
    bz_li2: 'Implemented dynamic product catalogs, user authentication, and real-time inventory management — reducing page load times by 30% through query optimization and caching.',
    bz_li3: 'Designed responsive UI components using Blade, HTML5, CSS3, and JavaScript — leading to a 20% increase in user engagement and session duration.',
    bz_li4: 'Integrated MyFatoorah payment gateway and designed RESTful APIs, improving conversion rates by 15%.',
    bz_li5: 'Streamlined development workflows using Git & Docker, cutting deployment times in half.',
    nti_period: 'July 2025 — August 2025',
    nti_role: 'Full Stack Developer Intern',
    nti_company: 'National Telecommunication Institute (NTI)',
    nti_li1: 'Gained hands-on experience in PHP, Laravel, MySQL, HTML, CSS, JavaScript, and Bootstrap for building dynamic web applications.',
    nti_li2: 'Developed and optimized backend APIs, implemented authentication, and integrated database-driven features.',
    nti_li3: 'Acquired freelancing skills including proposal writing, client communication, project pricing, and contract management.',
    pro_period: 'August — September 2024',
    pro_role: 'Full Stack Development Intern',
    pro_company: 'Prodigy Info Tech',
    pro_li1: 'Completed multiple projects independently: User Authentication, Employee Management System, E-commerce Store, and Social Media Website.',
    pro_li2: 'Built dynamic web applications using HTML, CSS, JavaScript, PHP, and MySQL.',
    ca_period: 'August 2024',
    ca_role: 'Full Stack Development Intern',
    ca_company: 'Code Alpha',
    ca_li1: 'Designed user-friendly interfaces using Bootstrap and implemented robust authentication systems using Laravel.',
    ca_li2: 'Worked on Secure User Authentication, Employee Management, and E-commerce Store tasks.',
    cib_period: '5 August — 22 August 2024',
    cib_role: 'Internship Trainee',
    cib_company: 'CIB Bank',
    cib_li1: 'Developed skills in digital literacy, cybersecurity intro, digital transformation, and entrepreneurial thinking.',
    cib_li2: 'Collaborated with international institutions (SAS, LinkedIn, Frankfurt School) and earned 4 certificates.',

    proj_tag: 'My Work', proj_title: 'Featured Projects',
    pf_all: 'All',
    bay_title: 'Baytak — Home Maintenance Platform',
    bay_desc: 'Home-maintenance booking platform connecting customers with verified technicians (plumbing, electrical, AC, carpentry, painting, cleaning) and tracking each request from booking to completion.',
    alf_title: 'Alf Leila Restaurant Platform',
    alf_desc: 'Arabian-Nights-themed restaurant platform with online reservations, QR table scan & ordering, menu browsing, checkout, customer accounts, and an admin dashboard.',
    pha_title: 'Virtual Pharaohs Museum',
    pha_desc: 'Graduation project for Egyptology students: an interactive virtual museum with six 360° panoramic exhibition halls, Arabic artifact descriptions, audio narration, and sign language interpretation videos.',
    car_title: 'Car Rental Website',
    car_desc: 'A full-featured car rental platform with luxury vehicle listings, advanced search and filtering, customer reviews, and a modern responsive design.',
    nab_title: 'Nabela E-Commerce Platform',
    nab_desc: "Kuwait-based e-commerce for traditional women's wear (abayas). Multi-currency (KWD, SAR, AED, QAR, BHD, OMR) and bilingual Arabic/English interface with responsive design.",
    and_title: 'AndMore E-commerce Website',
    and_desc: 'Kuwait-based e-commerce platform offering diverse products across electronics, fashion, home goods, and personal care. Features promotional ads, intuitive navigation, and multiple payment methods.',
    sak_title: 'Sakba Custom Dashdasha Platform',
    sak_desc: "Kuwait-based e-commerce for custom men's dashdashas with fabric selection. Integrates Visa, MasterCard & KNET. Improved page responsiveness by 25%.",
    sha_title: "Shantongulf Women's Fashion Store",
    sha_desc: "Kuwait-based e-commerce for traditional women's wear including abayas and seasonal dresses. Multi-currency support, language toggle, and streamlined cart system.",
    axi_title: 'AXIT Landing Page',
    axi_desc: 'Modern, responsive landing page for a fictional tech company AXIT. Clean design, tabs, and mobile-first layout with interactive elements.',

    gal_tag: 'Visual Showcase', gal_title: 'Project Gallery',
    gal_all: 'All Media', gal_screenshots: 'Screenshots', gal_videos: 'Demo Videos',
    gal_nabela: 'Nabela E-Commerce', gal_sakba: 'Sakba Platform',
    gal_shanton: 'Shantongulf', gal_car: 'Car Rental',
    gal_axit: 'AXIT', gal_andmore: 'AndMore Demo', gal_encyclopedia: 'Encyclopedia',

    edu_tag: 'Academic Background', edu_title: 'Education & Certificates',
    edu1_year: 'September 2022 — Present',
    edu1_degree: 'Bachelor of Science in Computer Science & Artificial Intelligence',
    edu1_school: 'Helwan University · AI Department',
    edu1_grade1: 'Grade: Excellent',
    edu1_grade2: 'GPA: 3.68 / 4.0',
    edu2_year: 'Academic Excellence',
    edu2_degree: 'AI & Software Engineering Focus',
    edu2_school: 'Consistently maintaining excellent academic standing',
    edu2_text: 'Majoring in Artificial Intelligence with curriculum spanning machine learning, data structures, algorithms, web development, and software engineering — complemented by extensive real-world project experience since first year.',
    cert1_name: 'Certificate of Completing Internship from NTI',
    cert1_issuer: 'National Telecommunication Institute · August 2025',
    cert2_name: 'Web Development — PHP/Laravel Specialization',
    cert2_issuer: 'Udemy · August 2024',
    cert3_name: 'CIB Bank Digital Transformation Certificates (×4)',
    cert3_issuer: 'CIB Bank · August 2024',
    cert4_name: 'Internship Certificate — Code Alpha',
    cert4_issuer: 'Code Alpha Company · September 2024',
    cert5_name: 'Internship Certificate — Prodigy Info Tech',
    cert5_issuer: 'Prodigy Info Tech · August 2024',

    contact_tag: 'Get in Touch', contact_title: "Let's Connect",
    contact_tagline: '"Let\'s build something extraordinary together."',
    contact_text: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great. Reach out through any channel below and I'll get back to you swiftly.",
    c_email_lbl: 'Email', c_phone_lbl: 'Phone',
    c_linkedin_lbl: 'LinkedIn', c_linkedin_val: 'Connect on LinkedIn',
    c_github_lbl: 'GitHub', c_github_val: 'View Repositories',

    f_name: 'Your Name', f_name_ph: 'Full name',
    f_email: 'Email Address', f_email_ph: 'your@email.com',
    f_proj_type: 'Project Type', f_budget: 'Budget (EGP)',
    f_subject: 'Subject', f_subject_ph: 'Project inquiry, collaboration...',
    f_msg: 'Message', f_msg_ph: 'Tell me about your project...',
    f_send: 'Send Message',
    f_success: "✓ Message sent! I'll get back to you soon.",
    f_error: '✗ Something went wrong. Please try again or email me directly.',

    pt_placeholder: 'Select project type...',
    pt_landing: 'Landing Page / Promotional Website', pt_ecomm: 'E-Commerce Store',
    pt_webapp: 'Web Application / SaaS Platform', pt_corp: 'Corporate / Business Website',
    pt_api: 'API Development & Integration', pt_cms: 'WordPress / CMS Website',
    pt_dash: 'Admin Dashboard & Back-Office', pt_redesign: 'Mobile-Responsive Redesign',
    pt_portfolio: 'Portfolio / Personal Website', pt_custom: 'Custom Web Solution',

    bd_placeholder: 'Select budget range...',
    bd_1: 'Under 2,000 EGP', bd_2: '2,000 – 5,000 EGP', bd_3: '5,000 – 10,000 EGP',
    bd_4: '10,000 – 20,000 EGP', bd_5: '20,000 – 50,000 EGP', bd_6: 'Above 50,000 EGP',
    bd_7: 'Open to Discussion',

    screenshot: 'Screenshot', demo_video: 'Demo Video', live_demo: 'Live Demo',
    lang_btn: 'عربي', wa_tooltip: 'Chat on WhatsApp',
    footer_txt: '© 2026 Nancy Abdullah Fathy · TypeScript / Next.js Developer · Giza, Egypt',
    footer_sub: 'BUILT WITH PASSION & PRECISION',
  },

  ar: {
    nav_about: 'عني', nav_skills: 'مهاراتي', nav_experience: 'خبراتي',
    nav_projects: 'مشاريعي', nav_gallery: 'معرض الأعمال', nav_education: 'التعليم',
    nav_contact: 'تواصل معي',

    hero_badge: 'متاحة للفرص الوظيفية',
    hero_name1: 'نانسي',
    hero_name2: 'عبدالله فتحي',
    hero_role_typed: ['مطورة TypeScript / Next.js', 'مطورة ويب متكاملة', 'مطورة React.js', 'خبيرة PHP / Laravel', 'مهندسة برمجيات'],
    hero_desc: 'مطورة TypeScript وNext.js بخبرة تزيد عن 3 سنوات في بناء تطبيقات ويب سريعة وقابلة للتوسع وصديقة لمحركات البحث — من واجهات React تفاعلية إلى أنظمة Laravel خلفية وميزات مدعومة بالذكاء الاصطناعي.',
    hero_btn_projects: 'استعراض المشاريع',
    hero_btn_hire: 'وظّفني',
    hero_btn_email: 'راسلني',
    stat_years_lbl: 'سنوات خبرة',
    stat_projects_lbl: 'مشروع',
    stat_gpa_lbl: 'معدل / 4.0',
    stat_grade_lbl: 'تقدير امتياز',
    badge_nextjs: 'مطورة TypeScript / Next.js',
    badge_react: 'مطورة React',
    badge_laravel: 'خبيرة Laravel',
    initial_letter: 'ن',

    about_tag: 'من أنا', about_title: 'نبذة عني',
    about_lead: '"مدفوعة بشغف لإنشاء حلول ذكية وقابلة للتوسع ومتمحورة حول المستخدم."',
    about_p1: 'أنا مطورة TypeScript / Next.js ومهندسة برمجيات بخبرة تزيد عن 3 سنوات في تطوير تطبيقات ويب إنتاجية — من واجهات React وNext.js تفاعلية إلى أنظمة PHP & Laravel خلفية وتصميم قواعد البيانات وميزات مدعومة بالذكاء الاصطناعي.',
    about_p2: 'هدفي هو تحويل التحديات المعقدة إلى تجارب رقمية سلسة من خلال الجمع بين كود نظيف وآمن الأنواع وواجهات بديهية وتصميم أنظمة فعّالة — لتقديم تجارب مستخدم متكاملة وليس مجرد تطبيقات وظيفية.',
    lbl_location: 'الموقع', val_location: 'الجيزة، مصر',
    lbl_email: 'البريد الإلكتروني', lbl_phone: 'الهاتف',
    lbl_university: 'الجامعة', val_university: 'جامعة حلوان',
    lbl_major: 'التخصص', val_major: 'قسم الذكاء الاصطناعي — علوم الحاسب',
    lbl_gpa: 'المعدل التراكمي', val_gpa: '3.68 / 4.0 · امتياز',
    lang_arabic: 'العربية', lang_lv_arabic: 'اللغة الأم',
    lang_english: 'الإنجليزية', lang_lv_english: 'جيد جداً',
    lang_deutsch: 'الألمانية', lang_lv_deutsch: 'جيد',

    skills_tag: 'ما أعرفه', skills_title: 'المهارات التقنية',
    sk1_cat: 'أساسية', sk1_title: 'لغات البرمجة',
    sk2_cat: 'أُطر عمل', sk2_title: 'الأُطر والمكتبات',
    sk3_cat: 'بيانات', sk3_title: 'قواعد البيانات',
    sk4_cat: 'DevOps', sk4_title: 'الأدوات والإصدارات',
    sk5_cat: 'ذكاء اصطناعي', sk5_title: 'الذكاء الاصطناعي والمعمارية',
    sk6_cat: 'سحابة', sk6_title: 'البنية التحتية',
    sk7_cat: 'مهنية', sk7_title: 'المهارات الشخصية',

    exp_tag: 'مسيرتي المهنية', exp_title: 'الخبرة العملية',
    bz_period: 'ديسمبر 2024 — مايو 2025',
    bz_role: 'مطور ويب متكامل PHP/Laravel',
    bz_company: 'شركة بلوزون للويب',
    bz_li1: 'تطوير وصيانة منصات تجارة إلكترونية (نبيلة، سكبة، شانتون خليج، وأكثر) باستخدام PHP Laravel وMySQL مع تصميم متجاوب ومتوافق مع جميع المتصفحات.',
    bz_li2: 'تطبيق كتالوجات منتجات ديناميكية وتحقق هوية المستخدم وإدارة المخزون الفوري — مع تقليل أوقات تحميل الصفحات بنسبة 30% عبر تحسين الاستعلامات والتخزين المؤقت.',
    bz_li3: 'تصميم مكونات واجهة مستخدم متجاوبة باستخدام Blade وHTML5 وCSS3 وJavaScript — مما أدى إلى زيادة تفاعل المستخدمين بنسبة 20%.',
    bz_li4: 'دمج بوابة الدفع MyFatoorah وتصميم RESTful APIs، مما حسّن معدلات التحويل بنسبة 15%.',
    bz_li5: 'تبسيط سير عمل التطوير باستخدام Git وDocker، مما قلّص أوقات النشر إلى النصف.',
    nti_period: 'يوليو 2025 — أغسطس 2025',
    nti_role: 'متدرب مطور ويب متكامل',
    nti_company: 'المعهد القومي للاتصالات (NTI)',
    nti_li1: 'اكتساب خبرة عملية في PHP وLaravel وMySQL وHTML وCSS وJavaScript وBootstrap لبناء تطبيقات ويب ديناميكية.',
    nti_li2: 'تطوير وتحسين APIs الخلفية وتطبيق المصادقة ودمج الميزات المدعومة بقواعد البيانات.',
    nti_li3: 'اكتساب مهارات العمل الحر بما في ذلك كتابة العروض والتواصل مع العملاء وتسعير المشاريع وإدارة العقود.',
    pro_period: 'أغسطس — سبتمبر 2024',
    pro_role: 'متدرب مطور ويب متكامل',
    pro_company: 'Prodigy Info Tech',
    pro_li1: 'إتمام مشاريع متعددة بشكل مستقل: نظام مصادقة المستخدمين ونظام إدارة الموظفين ومتجر إلكتروني وموقع تواصل اجتماعي.',
    pro_li2: 'بناء تطبيقات ويب ديناميكية باستخدام HTML وCSS وJavaScript وPHP وMySQL.',
    ca_period: 'أغسطس 2024',
    ca_role: 'متدرب مطور ويب متكامل',
    ca_company: 'Code Alpha',
    ca_li1: 'تصميم واجهات مستخدم سهلة الاستخدام باستخدام Bootstrap وتطبيق أنظمة مصادقة قوية باستخدام Laravel.',
    ca_li2: 'العمل على مهام نظام المصادقة الآمن وإدارة الموظفين والمتجر الإلكتروني.',
    cib_period: '5 أغسطس — 22 أغسطس 2024',
    cib_role: 'متدرب تدريب مهني',
    cib_company: 'بنك CIB',
    cib_li1: 'تطوير مهارات في محو الأمية الرقمية ومقدمة الأمن السيبراني والتحول الرقمي والتفكير الريادي.',
    cib_li2: 'التعاون مع مؤسسات دولية (SAS وLinkedIn وFrankfurt School) والحصول على 4 شهادات.',

    proj_tag: 'أعمالي', proj_title: 'المشاريع المميزة',
    pf_all: 'الكل',
    bay_title: 'بيتك — منصة الصيانة المنزلية',
    bay_desc: 'منصة حجز صيانة منزلية تربط العملاء بفنيين معتمدين (سباكة، كهرباء، تكييف، نجارة، دهانات، تنظيف) وتتابع كل طلب من الحجز حتى الإتمام.',
    alf_title: 'منصة مطعم ألف ليلة',
    alf_desc: 'منصة مطعم بطابع ألف ليلة وليلة مع حجوزات أونلاين، مسح QR للطلب من الطاولة، تصفح القائمة، الدفع، حسابات العملاء، ولوحة تحكم للإدارة.',
    pha_title: 'المتحف الافتراضي للفراعنة',
    pha_desc: 'مشروع تخرج لطلاب المصريات: متحف افتراضي تفاعلي بست قاعات عرض بانورامية 360°، وصف عربي للقطع، تعليق صوتي، وفيديوهات بلغة الإشارة.',
    car_title: 'موقع تأجير السيارات',
    car_desc: 'منصة متكاملة لتأجير السيارات مع قوائم مركبات فاخرة وبحث وتصفية متقدمة ومراجعات العملاء وتصميم متجاوب حديث.',
    nab_title: 'منصة نبيلة للتجارة الإلكترونية',
    nab_desc: 'متجر إلكتروني كويتي للملابس النسائية التقليدية (العباءات). دعم متعدد العملات (KWD, SAR, AED, QAR, BHD, OMR) وواجهة ثنائية اللغة عربي/إنجليزي.',
    and_title: 'موقع أند مور للتجارة الإلكترونية',
    and_desc: 'منصة تجارة إلكترونية كويتية تقدم منتجات متنوعة في الإلكترونيات والموضة ومستلزمات المنزل والعناية الشخصية مع إعلانات ترويجية وطرق دفع متعددة.',
    sak_title: 'منصة سكبة للدشاديش المخصصة',
    sak_desc: 'متجر إلكتروني كويتي للدشاديش الرجالية المخصصة مع اختيار الأقمشة. يدمج Visa وMasterCard وKNET مع تحسين استجابة الصفحات بنسبة 25%.',
    sha_title: 'متجر شانتون خليج للأزياء النسائية',
    sha_desc: 'متجر إلكتروني كويتي للملابس النسائية التقليدية بما فيها العباءات والفساتين الموسمية مع دعم متعدد العملات وتبديل اللغة.',
    axi_title: 'الصفحة الترويجية لـ AXIT',
    axi_desc: 'صفحة هبوط حديثة ومتجاوبة لشركة تقنية افتراضية. تصميم نظيف وعلامات تبويب وتخطيط مُحسَّن للجوال مع عناصر تفاعلية.',

    gal_tag: 'عرض مرئي', gal_title: 'معرض المشاريع',
    gal_all: 'جميع الوسائط', gal_screenshots: 'لقطات الشاشة', gal_videos: 'فيديوهات العرض',
    gal_nabela: 'نبيلة للتجارة الإلكترونية', gal_sakba: 'منصة سكبة',
    gal_shanton: 'شانتون خليج', gal_car: 'تأجير السيارات',
    gal_axit: 'أكسيت', gal_andmore: 'عرض أند مور', gal_encyclopedia: 'الموسوعة',

    edu_tag: 'الخلفية الأكاديمية', edu_title: 'التعليم والشهادات',
    edu1_year: 'سبتمبر 2022 — حتى الآن',
    edu1_degree: 'بكالوريوس علوم الحاسب والذكاء الاصطناعي',
    edu1_school: 'جامعة حلوان · قسم الذكاء الاصطناعي',
    edu1_grade1: 'التقدير: امتياز',
    edu1_grade2: 'المعدل التراكمي: 3.68 / 4.0',
    edu2_year: 'تميز أكاديمي',
    edu2_degree: 'تخصص الذكاء الاصطناعي وهندسة البرمجيات',
    edu2_school: 'الحفاظ باستمرار على مستوى أكاديمي ممتاز',
    edu2_text: 'التخصص في الذكاء الاصطناعي بمنهج يشمل التعلم الآلي وهياكل البيانات والخوارزميات وتطوير الويب وهندسة البرمجيات — مع خبرة عملية واسعة في المشاريع منذ السنة الأولى.',
    cert1_name: 'شهادة إتمام التدريب من المعهد القومي للاتصالات',
    cert1_issuer: 'المعهد القومي للاتصالات · أغسطس 2025',
    cert2_name: 'تطوير الويب — تخصص PHP/Laravel',
    cert2_issuer: 'Udemy · أغسطس 2024',
    cert3_name: 'شهادات التحول الرقمي من بنك CIB (×4)',
    cert3_issuer: 'بنك CIB · أغسطس 2024',
    cert4_name: 'شهادة تدريب — Code Alpha',
    cert4_issuer: 'شركة Code Alpha · سبتمبر 2024',
    cert5_name: 'شهادة تدريب — Prodigy Info Tech',
    cert5_issuer: 'Prodigy Info Tech · أغسطس 2024',

    contact_tag: 'تواصل معي', contact_title: 'لنبدأ التواصل',
    contact_tagline: '"لنبني معاً شيئاً استثنائياً."',
    contact_text: 'أنا دائماً منفتحة لمناقشة مشاريع جديدة وأفكار إبداعية وفرص للمشاركة في شيء عظيم. تواصل معي عبر أي قناة أدناه وسأرد عليك بسرعة.',
    c_email_lbl: 'البريد الإلكتروني', c_phone_lbl: 'الهاتف',
    c_linkedin_lbl: 'لينكد إن', c_linkedin_val: 'تواصل على لينكد إن',
    c_github_lbl: 'جيت هاب', c_github_val: 'استعراض المستودعات',

    f_name: 'الاسم الكامل', f_name_ph: 'أدخل اسمك الكامل',
    f_email: 'البريد الإلكتروني', f_email_ph: 'your@email.com',
    f_proj_type: 'نوع المشروع', f_budget: 'الميزانية (جنيه مصري)',
    f_subject: 'الموضوع', f_subject_ph: 'استفسار عن مشروع، تعاون...',
    f_msg: 'الرسالة', f_msg_ph: 'أخبرني عن مشروعك...',
    f_send: 'إرسال الرسالة',
    f_success: '✓ تم إرسال الرسالة! سأرد عليك قريباً.',
    f_error: '✗ حدث خطأ. يرجى المحاولة مرة أخرى أو مراسلتي مباشرةً.',

    pt_placeholder: 'اختر نوع المشروع...',
    pt_landing: 'صفحة هبوط / موقع ترويجي', pt_ecomm: 'متجر إلكتروني',
    pt_webapp: 'تطبيق ويب / منصة SaaS', pt_corp: 'موقع شركة / موقع أعمال',
    pt_api: 'تطوير ودمج API', pt_cms: 'موقع WordPress / CMS',
    pt_dash: 'لوحة تحكم وإدارة', pt_redesign: 'إعادة تصميم متجاوب للجوال',
    pt_portfolio: 'موقع شخصي / معرض أعمال', pt_custom: 'حل ويب مخصص',

    bd_placeholder: 'اختر نطاق الميزانية...',
    bd_1: 'أقل من 2,000 جنيه', bd_2: '2,000 – 5,000 جنيه', bd_3: '5,000 – 10,000 جنيه',
    bd_4: '10,000 – 20,000 جنيه', bd_5: '20,000 – 50,000 جنيه', bd_6: 'أكثر من 50,000 جنيه',
    bd_7: 'قابل للنقاش',

    screenshot: 'لقطة شاشة', demo_video: 'فيديو تجريبي', live_demo: 'عرض مباشر',
    lang_btn: 'English', wa_tooltip: 'تواصل عبر واتساب',
    footer_txt: '© 2026 نانسي عبدالله فتحي · مطورة TypeScript / Next.js · الجيزة، مصر',
    footer_sub: 'مبنية بشغف ودقة',
  }
};

/* ── STATE ─────────────────────────────────────────────────── */
let currentLang = localStorage.getItem('naf_lang') || 'en';
let currentTheme = localStorage.getItem('naf_theme') || 'dark';
let typedIndex = 0, typedCharIdx = 0, typedDeleting = false;

/* ── THEME ─────────────────────────────────────────────────── */
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('naf_theme', theme);
  const isDark = theme === 'dark';
  const icon = document.getElementById('themeIcon');
  const sidebarIcon = document.getElementById('sidebarThemeIcon');
  if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  if (sidebarIcon) sidebarIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

/* ── LANGUAGE ──────────────────────────────────────────────── */
function applyLang(lang) {
  currentLang = lang;
  const t = T[lang];
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  localStorage.setItem('naf_lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  rebuildSelects(lang);
  document.title = lang === 'ar'
    ? 'نانسي عبدالله فتحي | مطورة TypeScript · Next.js'
    : 'Nancy Abdullah Fathy | TypeScript · Next.js Developer';
}

function rebuildSelects(lang) {
  const t = T[lang];
  const ptSel = document.getElementById('selectProjectType');
  const bdSel = document.getElementById('selectBudget');
  if (ptSel) {
    ptSel.innerHTML = `
      <option value="">${t.pt_placeholder}</option>
      <option value="landing">${t.pt_landing}</option>
      <option value="ecomm">${t.pt_ecomm}</option>
      <option value="webapp">${t.pt_webapp}</option>
      <option value="corp">${t.pt_corp}</option>
      <option value="api">${t.pt_api}</option>
      <option value="cms">${t.pt_cms}</option>
      <option value="dash">${t.pt_dash}</option>
      <option value="redesign">${t.pt_redesign}</option>
      <option value="portfolio">${t.pt_portfolio}</option>
      <option value="custom">${t.pt_custom}</option>`;
  }
  if (bdSel) {
    bdSel.innerHTML = `
      <option value="">${t.bd_placeholder}</option>
      <option value="under2k">${t.bd_1}</option>
      <option value="2k-5k">${t.bd_2}</option>
      <option value="5k-10k">${t.bd_3}</option>
      <option value="10k-20k">${t.bd_4}</option>
      <option value="20k-50k">${t.bd_5}</option>
      <option value="over50k">${t.bd_6}</option>
      <option value="open">${t.bd_7}</option>`;
  }
}

/* ── LOADER ────────────────────────────────────────────────── */
(function initLoader() {
  let pct = 0;
  const prog = document.getElementById('lp');
  if (!prog) return;
  const iv = setInterval(() => {
    pct += Math.random() * 14 + 4;
    if (pct >= 100) {
      pct = 100; clearInterval(iv);
      setTimeout(() => document.getElementById('loader')?.classList.add('hide'), 400);
    }
    prog.style.width = pct + '%';
  }, 50);
})();

/* ── CURSOR ────────────────────────────────────────────────── */
(function initCursor() {
  const cur = document.getElementById('cur');
  const curR = document.getElementById('curR');
  if (!cur || !curR) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
    curR.style.left = rx + 'px'; curR.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();
  const HOVER_SEL = 'a,button,.project-card,.gi,.skill-card,.cert-item,.c-method,.edu-card,.gf-btn,.pf-btn,.mtab,.soc-btn,.tag';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(HOVER_SEL)) {
      curR.style.transform = 'translate(-50%,-50%) scale(1.8)';
      curR.style.borderColor = 'var(--gold-light)';
    } else {
      curR.style.transform = 'translate(-50%,-50%) scale(1)';
      curR.style.borderColor = 'var(--gold)';
    }
  });
})();

/* ── PARTICLES ─────────────────────────────────────────────── */
(function initParticles() {
  const cv = document.getElementById('particles');
  if (!cv) return;
  const cx = cv.getContext('2d');
  function resize() { cv.width = innerWidth; cv.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  const pts = Array.from({ length: 55 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 1.3 + 0.3,
    vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
    o: Math.random() * .3 + .05
  }));
  (function draw() {
    cx.clearRect(0, 0, cv.width, cv.height);
    pts.forEach(p => {
      cx.beginPath();
      cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      cx.fillStyle = `rgba(201,168,76,${p.o})`;
      cx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = cv.width; if (p.x > cv.width) p.x = 0;
      if (p.y < 0) p.y = cv.height; if (p.y > cv.height) p.y = 0;
    });
    requestAnimationFrame(draw);
  })();
})();

/* ── SCROLL EFFECTS ────────────────────────────────────────── */
(function initScroll() {
  const nav = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');
  const waBtn = document.getElementById('waBtn');
  const prog = document.getElementById('scrollProgress');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .sidebar-nav a');

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.width = (sy / docH * 100) + '%';
    if (nav) nav.classList.toggle('scrolled', sy > 60);
    const show = sy > 500;
    if (backTop) backTop.classList.toggle('show', show);
    if (waBtn) waBtn.classList.toggle('show', show);
    let cur = '';
    sections.forEach(s => { if (sy >= s.offsetTop - 260) cur = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }, { passive: true });
})();

/* ── INTERSECTION OBSERVER ─────────────────────────────────── */
(function initObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      e.target.querySelectorAll('.lang-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal,.timeline-item,.project-card,.skill-card,.cert-item').forEach(el => obs.observe(el));
})();

/* ── TYPING EFFECT ─────────────────────────────────────────── */
function initTyping() {
  const el = document.getElementById('typedRole');
  if (!el) return;
  const roles = T[currentLang].hero_role_typed;
  (function type() {
    const current = roles[typedIndex];
    if (typedDeleting) {
      el.textContent = current.slice(0, --typedCharIdx);
      if (typedCharIdx === 0) {
        typedDeleting = false;
        typedIndex = (typedIndex + 1) % roles.length;
        setTimeout(type, 400); return;
      }
    } else {
      el.textContent = current.slice(0, ++typedCharIdx);
      if (typedCharIdx === current.length) {
        typedDeleting = true;
        setTimeout(type, 2200); return;
      }
    }
    setTimeout(type, typedDeleting ? 55 : 80);
  })();
}

/* ── STAT COUNTERS ─────────────────────────────────────────── */
function initCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  });
}

/* ── MARQUEE — duplicate track content for a seamless loop ── */
(function initMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (track) track.innerHTML += track.innerHTML;
})();

/* ── MAGNETIC BUTTONS (fine pointers only) ─────────────────── */
(function initMagnetic() {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduced) return;
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * .12}px, ${y * .18}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();

/* ── SIDEBAR ───────────────────────────────────────────────── */
(function initSidebar() {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('mobileSidebar');
  const closeBtn = document.getElementById('sidebarClose');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!menuBtn || !sidebar || !closeBtn || !backdrop) return;

  const open = () => {
    sidebar.classList.add('open'); backdrop.classList.add('open');
    menuBtn.classList.add('active'); document.body.style.overflow = 'hidden';
  };
  const close = () => {
    sidebar.classList.remove('open'); backdrop.classList.remove('open');
    menuBtn.classList.remove('active'); document.body.style.overflow = '';
  };
  menuBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.querySelectorAll('.sidebar-nav a').forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* ── MEDIA TABS ────────────────────────────────────────────── */
function swapMedia(btn, proj, type) {
  btn.closest('.mtabs').querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(proj + '-img').classList.toggle('active', type === 'img');
  document.getElementById(proj + '-vid').classList.toggle('active', type === 'vid');
}

/* ── PROJECT FILTER ────────────────────────────────────────── */
function pFilter(btn, stack) {
  document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    const match = stack === 'all' || (card.dataset.stack || '').split(' ').includes(stack);
    card.classList.toggle('filter-hide', !match);
    if (match) {
      card.classList.remove('visible');
      requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('visible')));
    }
  });
}

/* ── GALLERY FILTER ────────────────────────────────────────── */
function gFilter(btn, type) {
  document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gi').forEach(item => {
    const show = type === 'all' || item.dataset.type === type;
    item.style.opacity = show ? '1' : '0.2';
    item.style.transform = show ? '' : 'scale(0.96)';
    item.style.pointerEvents = show ? '' : 'none';
  });
}

/* ── FORM SUBMISSION ───────────────────────────────────────── */
async function submitForm(event) {
  event.preventDefault();
  const btn = document.getElementById('sendBtn');
  const feedback = document.getElementById('formFeedback');
  const form = document.getElementById('contactForm');
  const t = T[currentLang];

  btn.classList.add('loading'); btn.disabled = true;
  feedback.className = 'form-feedback';

  const data = {
    name: form.querySelector('[name="name"]').value,
    email: form.querySelector('[name="email"]').value,
    project_type: form.querySelector('[name="project_type"]').value,
    budget: form.querySelector('[name="budget"]').value,
    subject: form.querySelector('[name="subject"]').value,
    message: form.querySelector('[name="message"]').value,
  };

  if (!data.name || !data.email || !data.message) {
    feedback.textContent = currentLang === 'ar'
      ? '✗ يرجى ملء الحقول المطلوبة (الاسم، البريد الإلكتروني، الرسالة).'
      : '✗ Please fill in required fields (name, email, message).';
    feedback.className = 'form-feedback error';
    btn.classList.remove('loading'); btn.disabled = false;
    return;
  }

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Server error');
    feedback.textContent = t.f_success;
    feedback.className = 'form-feedback success';
    form.reset();
    rebuildSelects(currentLang);
    setTimeout(() => { feedback.className = 'form-feedback'; }, 7000);
  } catch {
    feedback.textContent = t.f_error;
    feedback.className = 'form-feedback error';
  } finally {
    btn.classList.remove('loading'); btn.disabled = false;
  }
}

/* ── LIGHTBOX ──────────────────────────────────────────────── */
(function initLightbox() {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCaption');
  if (!lb) return;

  document.querySelectorAll('.project-card img, .gi img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', e => {
      e.stopPropagation();
      lbImg.src = img.src;
      if (lbCap) lbCap.textContent = img.alt || '';
      lb.classList.add('show');
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', () => lb.classList.remove('show'));
  lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('show'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('show'); });
})();

/* ── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  applyLang(currentLang);

  document.getElementById('themeToggle').addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
  document.getElementById('sidebarThemeToggle')?.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  const switchLang = () => {
    applyLang(currentLang === 'en' ? 'ar' : 'en');
    typedIndex = 0; typedCharIdx = 0; typedDeleting = false;
  };
  document.getElementById('langToggle').addEventListener('click', switchLang);
  document.getElementById('sidebarLangToggle')?.addEventListener('click', switchLang);

  document.getElementById('backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  setTimeout(initTyping, 800);
  initCounters();

  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
    img.addEventListener('error', function () {
      if (!this.src.includes('placeholder')) {
        this.src = 'https://via.placeholder.com/640x360/1a1a1a/c9a84c?text=' + encodeURIComponent(this.alt || 'Image');
      }
    });
  });
  document.querySelectorAll('video').forEach(vid => {
    vid.addEventListener('error', function () {
      const ph = document.createElement('div');
      ph.className = 'media-ph';
      ph.innerHTML = '<i class="fas fa-video"></i><p>Video unavailable</p>';
      this.parentElement.replaceChild(ph, this);
    });
  });
});