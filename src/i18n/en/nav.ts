export type LocalizedText =
  | string
  | { en: string; fr?: string; es?: string; ru?: string; zh?: string; 'ar-ae'?: string }

export interface NavItem {
  text: LocalizedText
  slug: string | null
  icon?: string
  hideChevron?: boolean
  children?: NavItem[]
  isSectionTitle?: boolean
}

const nav: NavItem = {
  text: 'root',
  slug: '',
  children: [
    {
      text: { en: 'Intro', fr: 'Introduction', es: 'Introducción', ru: 'Введение', zh: '简介', 'ar-ae': 'مقدمة' },
      slug: null,
      icon: 'home',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: { en: 'Home', fr: 'Accueil', es: 'Inicio', ru: 'Главная', zh: '首页', 'ar-ae': 'الرئيسية' },
      slug: 'home',
      icon: 'home',
      hideChevron: true,
      children: []
    },
    {
      text: { en: 'Getting started', fr: 'Démarrage rapide', es: 'Primeros pasos', ru: 'Начало работы', zh: '快速入门', 'ar-ae': 'البدء السريع' },
      slug: 'getting-started',
      icon: 'start',
      hideChevron: true,
      children: [
        // { text: 'OpenReplay Serverless', slug: 'getting-started/serverless', children: [] },
        // { text: 'OpenReplay Dedicated', slug: 'getting-started/dedicated', children: [] },
        // { text: 'OpenReplay Self-Host', slug: 'getting-started/self-host', children: [] },
      ]
    },
    {
      text: { en: 'Deployment', fr: 'Déploiement', es: 'Despliegue', ru: 'Развёртывание', zh: '部署', 'ar-ae': 'النشر' },
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: { en: 'Deployment', fr: 'Déploiement', es: 'Despliegue', ru: 'Развёртывание', zh: '部署', 'ar-ae': 'النشر' },
      slug: 'deployment/',
      icon: 'deployment',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'deployment/', children: [] },
        { text: { en: 'Cloud Providers', fr: 'Fournisseurs cloud', es: 'Proveedores en la nube', ru: 'Облачные провайдеры', zh: '云服务商', 'ar-ae': 'موفرو السحابة' }, slug: null, children: [
          { text: 'Deploy to AWS', slug: 'deployment/deploy-aws', children: [] },
          { text: 'Deploy to Azure', slug: 'deployment/deploy-azure', children: [] },
          { text: 'Deploy to GCP', slug: 'deployment/deploy-gcp', children: [] },
          { text: 'Deploy to Digital Ocean', slug: 'deployment/deploy-digitalocean', children: [] },
          { text: 'Deploy to OVHCloud', slug: 'deployment/deploy-ovhcloud', children: [] },
          { text: 'Deploy to Scaleway', slug: 'deployment/deploy-scaleway', children: [] }
        ] },
        { text: { en: 'Self-Hosting', fr: 'Auto-hébergement', es: 'Autoalojamiento', ru: 'Самостоятельный хостинг', zh: '自托管', 'ar-ae': 'الاستضافة الذاتية' }, slug: null, children: [
          { text: 'Deploy to Kubernetes', slug: 'deployment/deploy-kubernetes', children: [] },
          { text: 'Deploy to Docker', slug: 'deployment/deploy-docker', children: [] },
          { text: 'Deploy to Ubuntu', slug: 'deployment/deploy-ubuntu', children: [] }
        ] },
        { text: { en: 'Deploy from Source', fr: 'Déployer depuis la source', es: 'Desplegar desde el código fuente', ru: 'Развернуть из исходников', zh: '从源码部署', 'ar-ae': 'النشر من المصدر' }, slug: 'deployment/deploy-source', children: [] },
        { text: { en: 'Maintenance', fr: 'Maintenance', es: 'Mantenimiento', ru: 'Обслуживание', zh: '维护', 'ar-ae': 'الصيانة' }, slug: null, children: [
          { text: 'OpenReplay CLI', slug: 'deployment/openreplay-admin', children: []},
          { text: { en: 'Upgrade Deployment', fr: 'Mise à jour du déploiement', es: 'Actualizar despliegue', ru: 'Обновление развёртывания', zh: '升级部署', 'ar-ae': 'ترقية النشر' }, slug: 'deployment/upgrade', children: [] }
        ] },
        { text: { en: 'Installation', fr: 'Installation', es: 'Instalación', ru: 'Установка', zh: '安装', 'ar-ae': 'التثبيت' }, slug: null, children: [
          { text: { en: 'Setup OpenReplay', fr: 'Installer OpenReplay', es: 'Configurar OpenReplay', ru: 'Настройка OpenReplay', zh: '配置 OpenReplay', 'ar-ae': 'إعداد OpenReplay' }, slug: 'deployment/setup-or', children: [] },
          { text: { en: 'Upload Source Maps', fr: 'Téléverser les source maps', es: 'Subir source maps', ru: 'Загрузить source maps', zh: '上传 Source Maps', 'ar-ae': 'رفع خرائط المصدر' }, slug: 'deployment/upload-sourcemaps', children: [] },
        ] },
        { text: { en: 'Administration', fr: 'Administration', es: 'Administración', ru: 'Администрирование', zh: '管理', 'ar-ae': 'الإدارة' }, slug: null, children: [
          { text: { en: 'Team Management', fr: 'Gestion d\'équipe', es: 'Gestión de equipos', ru: 'Управление командой', zh: '团队管理', 'ar-ae': 'إدارة الفريق' }, slug: 'deployment/invite-team-members', children: [] },
          { text: { en: 'Roles and Access', fr: 'Rôles et accès', es: 'Roles y acceso', ru: 'Роли и доступ', zh: '角色与权限', 'ar-ae': 'الأدوار والصلاحيات' }, slug: 'deployment/roles-and-access', children: [] }
        ] },
        { text: { en: 'Tracker Compatibility', fr: 'Compatibilité du tracker', es: 'Compatibilidad del tracker', ru: 'Совместимость трекера', zh: '追踪器兼容性', 'ar-ae': 'توافق المتتبع' }, slug: 'deployment/compatibility', children: [] },
        
      ]
    },
    {
      text: { en: 'Configuration', fr: 'Configuration', es: 'Configuración', ru: 'Конфигурация', zh: '配置', 'ar-ae': 'الإعداد' },
      slug: 'configuration/',
      icon: 'configure',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'configuration', children: [] },
        { text: { en: 'Cleanup Storage', fr: 'Nettoyer le stockage', es: 'Limpiar almacenamiento', ru: 'Очистка хранилища', zh: '清理存储', 'ar-ae': 'تنظيف التخزين' }, slug: 'configuration/cleanup-storage', children: [] },
        { text: { en: 'Configure SMTP', fr: 'Configurer SMTP', es: 'Configurar SMTP', ru: 'Настройка SMTP', zh: '配置 SMTP', 'ar-ae': 'إعداد SMTP' }, slug: 'configuration/configure-smtp', children: [] },
        { text: 'External Database (Postgres)', slug: 'configuration/external-db', children: [] },
        { text: { en: 'External Storage', fr: 'Stockage externe', es: 'Almacenamiento externo', ru: 'Внешнее хранилище', zh: '外部存储', 'ar-ae': 'التخزين الخارجي' }, slug: 'configuration/external-storage', children: [] },
        { text: { en: 'Proxy Settings', fr: 'Paramètres proxy', es: 'Configuración de proxy', ru: 'Настройки прокси', zh: '代理设置', 'ar-ae': 'إعدادات الوكيل' }, slug: 'configuration/proxy-settings', children: [] },
        { text: { en: 'Secure OpenReplay', fr: 'Sécuriser OpenReplay', es: 'Proteger OpenReplay', ru: 'Защита OpenReplay', zh: '安全配置', 'ar-ae': 'تأمين OpenReplay' }, slug: 'configuration/secure-or', children: [] },
        { text: 'Single Sign-On (SSO)', slug: 'configuration/sso', children: [] },
      ]
    },
    {
      text: 'SDKs',
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: 'JavaScript',
      slug: 'sdk',
      icon: 'sdk',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'sdk', children: [] },
        { text: { en: 'Initialization', fr: 'Initialisation', es: 'Inicialización', ru: 'Инициализация', zh: '初始化', 'ar-ae': 'التهيئة' }, slug: 'sdk/constructor', children: [] },
        { text: { en: 'Methods', fr: 'Méthodes', es: 'Métodos', ru: 'Методы', zh: '方法', 'ar-ae': 'الوظائف' }, slug: 'sdk/methods', children: [
          { text: 'event', slug: 'sdk/methods/event' },
          { text: 'getSessionToken', slug: 'sdk/methods/get-session-token', children: [] },
          { text: 'getSessionID', slug: 'sdk/methods/get-session-id', children: [] },
          { text: 'getSessionURL', slug: 'sdk/methods/get-session-url', children: [] },
          { text: 'handleError', slug: 'sdk/methods/handle-error', children: [] },
          { text: 'isActive', slug: 'sdk/methods/is-active', children: [] },
          { text: 'issue', slug: 'sdk/methods/issue', children: [] },
          { text: 'setUserID', slug: 'sdk/methods/set-user-id', children: [] },
          { text: 'setUserAnonymousID', slug: 'sdk/methods/set-user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'sdk/methods/set-metadata', children: [] },
          { text: 'resanitize', slug: 'sdk/methods/resanitize', children: [] },
          { text: 'isFlagEnabled', slug: 'sdk/methods/is-flag-enabled', children: [] },
          { text: 'reloadFlags', slug: 'sdk/methods/reload-flags', children: [] },
          { text: 'getFeatureFlag', slug: 'sdk/methods/get-feature-flag', children: [] },
          { text: 'getAllFeatureFlags', slug: 'sdk/methods/get-all-feature-flags', children: [] },
          { text: 'clearPersistFlag', slug: 'sdk/methods/clear-persist-flag', children: [] },
          { text: 'start', slug: 'sdk/methods/start', children: [] },
          { text: 'stop', slug: 'sdk/methods/stop', children: [] },
          { text: 'coldStart', slug: 'sdk/methods/cold-start', children: [] },
          { text: 'startOfflineRecording', slug: 'sdk/methods/start-offline-recording', children: [] },
          { text: 'uploadOfflineRecording', slug: 'sdk/methods/upload-offline-recording', children: [] },
          { text: 'forceFlushBatch', slug: 'sdk/methods/force-flush-batch', children: [] },
          { text: 'trackWs', slug: 'sdk/methods/track-ws', children: [] }, 
          { text: 'incident', slug: 'sdk/methods/incident', children: [] },
        ] },
        { text: { en: 'Network Options', fr: 'Options réseau', es: 'Opciones de red', ru: 'Сетевые параметры', zh: '网络选项', 'ar-ae': 'خيارات الشبكة' }, slug: 'sdk/network-options', children: [] },
				{
					text: { en: 'Analytics', fr: 'Analytique', es: 'Analítica', ru: 'Аналитика', zh: '分析', 'ar-ae': 'التحليلات' }, slug: 'sdk/analytics', children: [
						{ text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'sdk/analytics', children: [] },
						{ text: { en: 'People', fr: 'Personnes', es: 'Personas', ru: 'Пользователи', zh: '成员', 'ar-ae': 'الأشخاص' }, slug: 'sdk/analytics/people', children: [] },
						{ text: { en: 'Events', fr: 'Événements', es: 'Eventos', ru: 'События', zh: '事件', 'ar-ae': 'الأحداث' }, slug: 'sdk/analytics/events', children: [] },
					]
				},
        { text: { en: 'Sanitize Data', fr: 'Nettoyer les données', es: 'Sanear datos', ru: 'Очистка данных', zh: '数据脱敏', 'ar-ae': 'تنقية البيانات' }, slug: 'sdk/sanitize-data', children: [] },
        { text: { en: 'Private Mode', fr: 'Mode privé', es: 'Modo privado', ru: 'Приватный режим', zh: '隐私模式', 'ar-ae': 'الوضع الخاص' }, slug: 'sdk/private-mode', children: [] },
        { text: { en: 'Frameworks', fr: 'Frameworks', es: 'Frameworks', ru: 'Фреймворки', zh: '框架', 'ar-ae': 'أطر العمل' }, slug: 'sdk/using-or/', children: [
          { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'sdk/using-or/', children: [] },
          { text: 'React', slug: 'sdk/using-or/react', children: [] },
          { text: 'Vue', slug: 'sdk/using-or/vue', children: [] },
          { text: 'Next.js', slug: 'sdk/using-or/next', children: [] },
          { text: 'Nuxt', slug: 'sdk/using-or/nuxt', children: [] },
          { text: 'Remix', slug: 'sdk/using-or/remix', children: [] },
          { text: 'Svelte', slug: 'sdk/using-or/svelte', children: [] },
          { text: 'Angular', slug: 'sdk/using-or/angular', children: [] },
          { text: 'Gatsby', slug: 'sdk/using-or/gatsby', children: [] },  
        ] },
      ]
    },
    {
      text: 'iOS (beta)',
      slug: 'ios-sdk',
      icon: 'ios_app',
      children: [
        { text: { en: 'Initialization', fr: 'Initialisation', es: 'Inicialización', ru: 'Инициализация', zh: '初始化', 'ar-ae': 'التهيئة' }, slug: 'ios-sdk/init', children: [] },
        { text: { en: 'Modules', fr: 'Modules', es: 'Módulos', ru: 'Модули', zh: '模块', 'ar-ae': 'الوحدات' }, slug: 'ios-sdk/modules', children: [] },
        { text: { en: 'Methods', fr: 'Méthodes', es: 'Métodos', ru: 'Методы', zh: '方法', 'ar-ae': 'الوظائف' }, slug: 'ios-sdk/methods', children: [
          { text: 'event', slug: 'ios-sdk/methods/event' , children: []},
          { text: 'setUserID', slug: 'ios-sdk/methods/set-user-id', children: [] },
          { text: 'userAnonymousID', slug: 'ios-sdk/methods/user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'ios-sdk/methods/set-metadata', children: [] },
          { text: 'start', slug: 'ios-sdk/methods/start', children: [] },
          { text: 'stop', slug: 'ios-sdk/methods/stop', children: [] },
        ] },
        { text: { en: 'Inputs', fr: 'Entrées', es: 'Entradas', ru: 'Входные данные', zh: '输入', 'ar-ae': 'المدخلات' }, slug: 'ios-sdk/inputs', children: [] },     
        { text: { en: 'Network Options', fr: 'Options réseau', es: 'Opciones de red', ru: 'Сетевые параметры', zh: '网络选项', 'ar-ae': 'خيارات الشبكة' }, slug: 'ios-sdk/network', children: [] },
        { text: { en: 'Sanitize Data', fr: 'Nettoyer les données', es: 'Sanear datos', ru: 'Очистка данных', zh: '数据脱敏', 'ar-ae': 'تنقية البيانات' }, slug: 'ios-sdk/sanitization', children: [] },
      ]
    },
    {
      text: 'Android (beta)',
      slug: 'android-sdk',
      icon: 'android_app',
      children: [
        { text: { en: 'Initialization', fr: 'Initialisation', es: 'Inicialización', ru: 'Инициализация', zh: '初始化', 'ar-ae': 'التهيئة' }, slug: 'android-sdk/init', children: [] },
        { text: { en: 'Modules', fr: 'Modules', es: 'Módulos', ru: 'Модули', zh: '模块', 'ar-ae': 'الوحدات' }, slug: 'android-sdk/modules', children: [] },
        { text: { en: 'Methods', fr: 'Méthodes', es: 'Métodos', ru: 'Методы', zh: '方法', 'ar-ae': 'الوظائف' }, slug: 'android-sdk/methods', children: [
          { text: 'event', slug: 'android-sdk/methods/event' , children: []},
          { text: 'setUserID', slug: 'android-sdk/methods/set-user-id', children: [] },
          { text: 'userAnonymousID', slug: 'android-sdk/methods/user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'android-sdk/methods/set-metadata', children: [] },
          { text: 'start', slug: 'android-sdk/methods/start', children: [] },
        ] },
        { text: { en: 'Inputs', fr: 'Entrées', es: 'Entradas', ru: 'Входные данные', zh: '输入', 'ar-ae': 'المدخلات' }, slug: 'android-sdk/inputs', children: [] },        
        { text: { en: 'Network Options', fr: 'Options réseau', es: 'Opciones de red', ru: 'Сетевые параметры', zh: '网络选项', 'ar-ae': 'خيارات الشبكة' }, slug: 'android-sdk/network', children: [] },
        { text: { en: 'Sanitize Data', fr: 'Nettoyer les données', es: 'Sanear datos', ru: 'Очистка данных', zh: '数据脱敏', 'ar-ae': 'تنقية البيانات' }, slug: 'android-sdk/sanitization', children: [] },
      ]
    },
    {
      text: 'React Native (beta)',
      slug: 'rn-sdk',
      icon: 'react-native_ios_app',
      children: [
        { text: { en: 'Initialization', fr: 'Initialisation', es: 'Inicialización', ru: 'Инициализация', zh: '初始化', 'ar-ae': 'التهيئة' }, slug: 'rn-sdk/init', children: [] },
        { text: { en: 'Modules', fr: 'Modules', es: 'Módulos', ru: 'Модули', zh: '模块', 'ar-ae': 'الوحدات' }, slug: 'rn-sdk/modules', children: [] },
        { text: { en: 'Methods', fr: 'Méthodes', es: 'Métodos', ru: 'Методы', zh: '方法', 'ar-ae': 'الوظائف' }, slug: 'rn-sdk/methods', children: [
          { text: 'event', slug: 'rn-sdk/methods/event' , children: []},
          { text: 'setUserID', slug: 'rn-sdk/methods/set-user-id', children: [] },
          { text: 'userAnonymousID', slug: 'rn-sdk/methods/user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'rn-sdk/methods/set-metadata', children: [] },
          { text: 'start', slug: 'rn-sdk/methods/start', children: [] },
          { text: 'patchNetwork', slug: 'rn-sdk/methods/patch-network', children: [] },
        ] },
        { text: { en: 'Inputs', fr: 'Entrées', es: 'Entradas', ru: 'Входные данные', zh: '输入', 'ar-ae': 'المدخلات' }, slug: 'rn-sdk/inputs', children: [] },        
        { text: { en: 'Network Options', fr: 'Options réseau', es: 'Opciones de red', ru: 'Сетевые параметры', zh: '网络选项', 'ar-ae': 'خيارات الشبكة' }, slug: 'rn-sdk/network', children: [] },
        { text: { en: 'Sanitize Data', fr: 'Nettoyer les données', es: 'Sanear datos', ru: 'Очистка данных', zh: '数据脱敏', 'ar-ae': 'تنقية البيانات' }, slug: 'rn-sdk/sanitization', children: [] },
      ]
    },
    {
      text: { en: 'Products', fr: 'Produits', es: 'Productos', ru: 'Продукты', zh: '产品', 'ar-ae': 'المنتجات' },
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: 'Session Replay',
      slug: 'session-replay',
      icon: 'session-replay',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'session-replay', children: [] },
        { text: { en: 'Guides', fr: 'Guides', es: 'Guías', ru: 'Руководства', zh: '指南', 'ar-ae': 'الأدلة' }, slug: null, children: [ 
          { text: { en: 'Omnisearch', fr: 'Recherche universelle', es: 'Búsqueda global', ru: 'Универсальный поиск', zh: '全局搜索', 'ar-ae': 'البحث الشامل' }, slug: 'session-replay/omnisearch', children: [] },
          { text: { en: 'Segments', fr: 'Segments', es: 'Segmentos', ru: 'Сегменты', zh: '细分群组', 'ar-ae': 'الشرائح' }, slug: 'session-replay/segments', children: [] },
          { text: 'Highlights', slug: 'session-replay/highlights', children: [] },
          { text: { en: 'Session to E2E Test', fr: 'Session vers test E2E', es: 'Sesión a prueba E2E', ru: 'Сессия в E2E-тест', zh: '会话转 E2E 测试', 'ar-ae': 'تحويل الجلسة إلى اختبار E2E' }, slug: 'session-replay/generate-e2e-test', children: [] },
        ] 
        },
        { text: { en: 'Advanced Setup', fr: 'Configuration avancée', es: 'Configuración avanzada', ru: 'Расширенная настройка', zh: '高级配置', 'ar-ae': 'الإعداد المتقدم' }, slug: null, children: [
          { text: { en: 'Identify a User', fr: 'Identifier un utilisateur', es: 'Identificar un usuario', ru: 'Идентификация пользователя', zh: '标识用户', 'ar-ae': 'تعريف المستخدم' }, slug: 'session-replay/identify-user', children: [] },
          { text: { en: 'Send Metadata', fr: 'Envoyer des métadonnées', es: 'Enviar metadatos', ru: 'Отправить метаданные', zh: '发送元数据', 'ar-ae': 'إرسال البيانات الوصفية' }, slug: 'session-replay/metadata', children: [] },
          { text: 'Canvas and WebGL', slug: 'session-replay/canvas', children: [] },
          { text: 'Cross-domain iFrames', slug: 'session-replay/crossdomain-iframe', children: [] },
          { text: 'WebSockets', slug: 'session-replay/websockets', children: [] },
          { text: { en: 'Error Tracking', fr: 'Suivi des erreurs', es: 'Seguimiento de errores', ru: 'Отслеживание ошибок', zh: '错误追踪', 'ar-ae': 'تتبع الأخطاء' }, slug: 'session-replay/error-reporting', children: [] },
        ] 
        },
      ]
    },
    {
      text: { en: 'Product Analytics', fr: 'Analytique produit', es: 'Analítica de producto', ru: 'Продуктовая аналитика', zh: '产品分析', 'ar-ae': 'تحليلات المنتج' },
      slug: 'product-analytics',
      icon: 'product-analytics',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'product-analytics', children: [] },
        { text: { en: 'Guides', fr: 'Guides', es: 'Guías', ru: 'Руководства', zh: '指南', 'ar-ae': 'الأدلة' }, slug: null, children: [
          { text: { en: 'Trends', fr: 'Tendances', es: 'Tendencias', ru: 'Тренды', zh: '趋势', 'ar-ae': 'الاتجاهات' }, slug: 'product-analytics/trends', children: [] },
          { text: { en: 'Funnels', fr: 'Entonnoirs', es: 'Embudos', ru: 'Воронки', zh: '漏斗', 'ar-ae': 'مسارات التحويل' }, slug: 'product-analytics/funnels', children: [] },
          { text: { en: 'Journeys', fr: 'Parcours', es: 'Recorridos', ru: 'Пути', zh: '用户旅程', 'ar-ae': 'مسارات المستخدم' }, slug: 'product-analytics/journeys', children: [] },
          { text: { en: 'Heatmaps', fr: 'Cartes de chaleur', es: 'Mapas de calor', ru: 'Тепловые карты', zh: '热力图', 'ar-ae': 'الخرائط الحرارية' }, slug: 'product-analytics/heatmaps', children: [] },
          { text: { en: 'Dashboards', fr: 'Tableaux de bord', es: 'Paneles', ru: 'Дашборды', zh: '仪表板', 'ar-ae': 'لوحات المعلومات' }, slug: 'product-analytics/dashboards', children: [] },
          { text: { en: 'Web Analytics', fr: 'Analytique web', es: 'Analítica web', ru: 'Веб-аналитика', zh: '网页分析', 'ar-ae': 'تحليلات الويب' }, slug: 'product-analytics/web-analytics', children: [] },
          { text: { en: 'Monitors', fr: 'Moniteurs', es: 'Monitores', ru: 'Мониторы', zh: '监控', 'ar-ae': 'أجهزة الرصد' }, slug: 'product-analytics/monitors', children: [] },
        ]
        },
        { text: { en: 'Advanced Setup', fr: 'Configuration avancée', es: 'Configuración avanzada', ru: 'Расширенная настройка', zh: '高级配置', 'ar-ae': 'الإعداد المتقدم' }, slug: null, children: [
					{ text: { en: 'Custom Events', fr: 'Événements personnalisés', es: 'Eventos personalizados', ru: 'Пользовательские события', zh: '自定义事件', 'ar-ae': 'الأحداث المخصصة' }, slug: 'product-analytics/custom-events', children: [] },
          { text: { en: 'Data Management', fr: 'Gestion des données', es: 'Gestión de datos', ru: 'Управление данными', zh: '数据管理', 'ar-ae': 'إدارة البيانات' }, slug: 'product-analytics/data-management', children: [] }
        ]
        },
      ]
    },
    {
      text: 'Co-browsing', slug: 'co-browsing', icon: 'co-browsing', children: []
    },
    {
      text: { en: 'Platform', fr: 'Plateforme', es: 'Plataforma', ru: 'Платформа', zh: '平台', 'ar-ae': 'المنصة' },
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: 'AI',
      slug: 'ai',
      icon: 'ai',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'ai', children: [] },
        { text: { en: 'Summary AI', fr: 'Résumé par IA', es: 'Resumen con IA', ru: 'Сводка ИИ', zh: 'AI 摘要', 'ar-ae': 'ملخص بالذكاء الاصطناعي' }, slug: 'ai/summary-ai', children: [] },
        { text: { en: 'Similar Sessions', fr: 'Sessions similaires', es: 'Sesiones similares', ru: 'Похожие сессии', zh: '相似会话', 'ar-ae': 'جلسات مشابهة' }, slug: 'ai/similar-sessions', children: [] },
        { text: { en: 'Explain AI', fr: 'Expliquer par IA', es: 'Explicar con IA', ru: 'Объяснение ИИ', zh: 'AI 解释', 'ar-ae': 'شرح بالذكاء الاصطناعي' }, slug: 'ai/explain-ai', children: [] },
      ]
    },
    {
      text: 'MCP',
      slug: 'mcp',
      icon: 'ai',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'mcp', children: [] },
        { text: { en: 'Setup', fr: 'Installation', es: 'Configuración', ru: 'Настройка', zh: '设置', 'ar-ae': 'الإعداد' }, slug: 'mcp/setup', children: [] },
        { text: { en: 'Capabilities', fr: 'Fonctionnalités', es: 'Capacidades', ru: 'Возможности', zh: '功能特性', 'ar-ae': 'الإمكانيات' }, slug: 'mcp/capabilities', children: [] },
      ]
    },
    {
      text: { en: 'Plugins', fr: 'Plugins', es: 'Plugins', ru: 'Плагины', zh: '插件', 'ar-ae': 'الإضافات' },
      slug: 'plugins',
      icon: 'plugins',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'plugins', children: [] },
        { text: 'Assist', slug: 'plugins/assist', children: [] },
        { text: 'Axios', slug: 'plugins/axios', children: [] },
        { text: 'Fetch', slug: 'plugins/fetch', children: [] },
        { text: 'GraphQL', slug: 'plugins/graphql', children: [] },
        { text: 'MobX', slug: 'plugins/mobx', children: [] },
        { text: 'NgRx', slug: 'plugins/ngrx', children: [] },
        { text: 'Pinia', slug: 'plugins/pinia', children: [] },
        { text: 'VueX', slug: 'plugins/vuex', children: [] },
        { text: { en: 'Profiler', fr: 'Profileur', es: 'Perfilador', ru: 'Профилировщик', zh: '性能分析', 'ar-ae': 'أداة التنميط' }, slug: 'plugins/profiler', children: [] },
        { text: 'Redux', slug: 'plugins/redux', children: [] },
        { text: 'Zustand', slug: 'plugins/zustand', children: [] },
      ]
    },
    {
      text: { en: 'Integrations', fr: 'Intégrations', es: 'Integraciones', ru: 'Интеграции', zh: '集成', 'ar-ae': 'التكاملات' },
      slug: 'integrations',
      icon: 'integration',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'integrations', children: [] },
        { text: 'Datadog', slug: 'integrations/datadog', children: [] },
        { text: 'Elastic', slug: 'integrations/elastic', children: [] },
        { text: 'Dynatrace', slug: 'integrations/dynatrace', children: [] },
        { text: 'Sentry', slug: 'integrations/sentry', children: [] },
        { text: 'GitHub', slug: 'integrations/github', children: [] },
        { text: 'Slack', slug: 'integrations/slack', children: [] },
        { text: 'MSTeams', slug: 'integrations/msteams', children: [] },
        { text: 'Jira Cloud', slug: 'integrations/jira', children: [] },
        { text: 'Zendesk', slug: 'integrations/zendesk', children: [] },
      ]
    },
    {
      text: 'API',
      slug: 'api',
      icon: 'api',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'api', children: [] },
        { text: 'Assist', slug: 'api/assist', children: [] },
        { text: { en: 'Events', fr: 'Événements', es: 'Eventos', ru: 'События', zh: '事件', 'ar-ae': 'الأحداث' }, slug: 'api/events', children: [] },
        { text: { en: 'Jobs', fr: 'Tâches', es: 'Trabajos', ru: 'Задания', zh: '任务', 'ar-ae': 'المهام' }, slug: 'api/jobs', children: [] },
        { text: { en: 'Projects', fr: 'Projets', es: 'Proyectos', ru: 'Проекты', zh: '项目', 'ar-ae': 'المشاريع' }, slug: 'api/projects', children: [] },
        { text: { en: 'Sessions', fr: 'Sessions', es: 'Sesiones', ru: 'Сессии', zh: '会话', 'ar-ae': 'الجلسات' }, slug: 'api/sessions', children: [] },
        { text: { en: 'Users', fr: 'Utilisateurs', es: 'Usuarios', ru: 'Пользователи', zh: '用户', 'ar-ae': 'المستخدمون' }, slug: 'api/users', children: [] },
      ]
    },
    { 
      text: 'Spot (Chrome Extension)', 
      slug: 'spot',
      icon: 'chrome_extension:_openreplay_spot',
      hideChevron: true,
      children: [] 
    },
    {
      text: { en: 'Materials', fr: 'Ressources', es: 'Materiales', ru: 'Материалы', zh: '资料', 'ar-ae': 'المواد' },
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: { en: 'Exporting data', fr: 'Exporter les données', es: 'Exportar datos', ru: 'Экспорт данных', zh: '导出数据', 'ar-ae': 'تصدير البيانات' },
      slug: 'structure',
      icon: 'structure',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'structure', children: [] },
        { text: { en: 'Exported Data', fr: 'Données exportées', es: 'Datos exportados', ru: 'Экспортированные данные', zh: '已导出数据', 'ar-ae': 'البيانات المصدَّرة' }, slug: 'structure/exported-data', children: [] },
      ]
    },
    {
      text: { en: 'Troubleshooting', fr: 'Dépannage', es: 'Solución de problemas', ru: 'Устранение неполадок', zh: '故障排除', 'ar-ae': 'استكشاف الأخطاء' },
      slug: 'troubleshooting',
      icon: 'troubleshoot',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة' }, slug: 'troubleshooting', children: [] },
        { text: { en: 'Clear Cache', fr: 'Vider le cache', es: 'Limpiar caché', ru: 'Очистить кэш', zh: '清除缓存', 'ar-ae': 'مسح ذاكرة التخزين المؤقت' }, slug: 'troubleshooting/cache', children: [] },
        { text: 'Content Security Policy (CSP)', slug: 'troubleshooting/csp', children: [] },
        { text: { en: 'JS Errors', fr: 'Erreurs JS', es: 'Errores JS', ru: 'Ошибки JS', zh: 'JS 错误', 'ar-ae': 'أخطاء JS' }, slug: 'troubleshooting/js-errors', children: [] },
        { text: { en: 'Localhost Testing', fr: 'Tests en local', es: 'Pruebas en localhost', ru: 'Локальное тестирование', zh: '本地测试', 'ar-ae': 'الاختبار المحلي' }, slug: 'troubleshooting/localhost', children: [] },
        { text: { en: 'Session Recording Issues', fr: 'Problèmes d\'enregistrement', es: 'Problemas de grabación', ru: 'Проблемы записи сессий', zh: '录制问题', 'ar-ae': 'مشكلات التسجيل' }, slug: 'troubleshooting/session-recordings', children: [] },
        { text: { en: 'Sourcemaps Issues', fr: 'Problèmes de source maps', es: 'Problemas de source maps', ru: 'Проблемы source maps', zh: 'Source Maps 问题', 'ar-ae': 'مشكلات خرائط المصدر' }, slug: 'troubleshooting/sourcemaps', children: [] },
        { text: { en: 'Supported Browsers', fr: 'Navigateurs pris en charge', es: 'Navegadores compatibles', ru: 'Поддерживаемые браузеры', zh: '支持的浏览器', 'ar-ae': 'المتصفحات المدعومة' }, slug: 'troubleshooting/supported-browsers', children: [] },
        { text: { en: 'Deployment Issues', fr: 'Problèmes de déploiement', es: 'Problemas de despliegue', ru: 'Проблемы развёртывания', zh: '部署问题', 'ar-ae': 'مشكلات النشر' }, slug: 'troubleshooting/deployment-issues', children: [] },
				{ text: { en: 'Network Resources', fr: 'Ressources réseau', es: 'Recursos de red', ru: 'Сетевые ресурсы', zh: '网络资源', 'ar-ae': 'موارد الشبكة' }, slug: 'troubleshooting/network-resources', children: [] },
      ]
    },
    {
      text: { en: 'Tutorials', fr: 'Tutoriels', es: 'Tutoriales', ru: 'Учебные пособия', zh: '教程', 'ar-ae': 'الدروس التعليمية' },
      slug: null,
      icon: 'tutorials',
      children: [
        { text: 'Assist', slug: 'tutorials/assist', children: [] },
        { text: { en: 'Build Plugins', fr: 'Plugins de build', es: 'Plugins de compilación', ru: 'Плагины сборки', zh: '构建插件', 'ar-ae': 'إضافات البناء' }, slug: 'tutorials/build-plugins', children: [] },
        { text: { en: 'Custom Events', fr: 'Événements personnalisés', es: 'Eventos personalizados', ru: 'Пользовательские события', zh: '自定义事件', 'ar-ae': 'الأحداث المخصصة' }, slug: 'tutorials/custom-events', children: [] },
        { text: { en: 'Capture and Sanitize', fr: 'Capture et nettoyage', es: 'Captura y saneamiento', ru: 'Захват и очистка', zh: '采集与脱敏', 'ar-ae': 'الالتقاط والتنقية' }, slug: 'tutorials/capture-request', children: [] },
        { text: 'GraphQL', slug: 'tutorials/graphql', children: [] },
        { text: { en: 'Metadata', fr: 'Métadonnées', es: 'Metadatos', ru: 'Метаданные', zh: '元数据', 'ar-ae': 'البيانات الوصفية' }, slug: 'tutorials/metadata', children: [] },
        { text: 'Redux', slug: 'tutorials/redux', children: [] },
        { text: 'VueX', slug: 'tutorials/vuex', children: [] },
        { text: 'Zustand', slug: 'tutorials/zustand', children: [] },
      ]
    },
    {
      text: 'OpenReplay CLI',
      slug: 'cli',
      icon: 'cli',
      hideChevron: true,
      children: []
    }
  ]
}

/** Resolve a (possibly multilingual) nav label to a string for `lang` (English fallback). */
export function resolveNavText(text: LocalizedText, lang: string): string {
  if (typeof text === 'string') return text
  return (text as Record<string, string>)[lang] ?? text.en
}

/** A copy of the nav tree with every label resolved to `lang`. */
export function localizeNav(lang: string): NavItem {
  const walk = (item: NavItem): NavItem => ({
    ...item,
    text: resolveNavText(item.text, lang),
    children: item.children?.map(walk) ?? [],
  })
  return walk(nav)
}

export default nav
