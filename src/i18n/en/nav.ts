export type LocalizedText =
  | string
  | { en: string; fr?: string; es?: string; ru?: string; zh?: string; 'ar-ae'?: string; ja?: string; pt?: string; de?: string; ko?: string; it?: string }

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
      text: { en: 'Intro', fr: 'Introduction', es: 'Introducción', ru: 'Введение', zh: '简介', 'ar-ae': 'مقدمة', ja: 'イントロダクション', pt: 'Introdução', de: 'Einführung', ko: '소개', it: 'Introduzione' },
      slug: null,
      icon: 'home',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: { en: 'Home', fr: 'Accueil', es: 'Inicio', ru: 'Главная', zh: '首页', 'ar-ae': 'الرئيسية', ja: 'ホーム', pt: 'Início', de: 'Startseite', ko: '홈', it: 'Home' },
      slug: 'home',
      icon: 'home',
      hideChevron: true,
      children: []
    },
    {
      text: { en: 'Getting started', fr: 'Démarrage rapide', es: 'Primeros pasos', ru: 'Начало работы', zh: '快速入门', 'ar-ae': 'البدء السريع', ja: 'はじめに', pt: 'Primeiros passos', de: 'Erste Schritte', ko: '시작하기', it: 'Primi passi' },
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
      text: { en: 'Deployment', fr: 'Déploiement', es: 'Despliegue', ru: 'Развёртывание', zh: '部署', 'ar-ae': 'النشر', ja: 'デプロイ', pt: 'Implantação', de: 'Bereitstellung', ko: '배포', it: 'Deployment' },
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: { en: 'Deployment', fr: 'Déploiement', es: 'Despliegue', ru: 'Развёртывание', zh: '部署', 'ar-ae': 'النشر', ja: 'デプロイ', pt: 'Implantação', de: 'Bereitstellung', ko: '배포', it: 'Deployment' },
      slug: 'deployment/',
      icon: 'deployment',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'deployment/', children: [] },
        { text: { en: 'Cloud Providers', fr: 'Fournisseurs cloud', es: 'Proveedores en la nube', ru: 'Облачные провайдеры', zh: '云服务商', 'ar-ae': 'موفرو السحابة', ja: 'クラウドプロバイダー', pt: 'Provedores de nuvem', de: 'Cloud-Anbieter', ko: '클라우드 제공업체', it: 'Provider cloud' }, slug: null, children: [
          { text: 'Deploy to AWS', slug: 'deployment/deploy-aws', children: [] },
          { text: 'Deploy to Azure', slug: 'deployment/deploy-azure', children: [] },
          { text: 'Deploy to GCP', slug: 'deployment/deploy-gcp', children: [] },
          { text: 'Deploy to Digital Ocean', slug: 'deployment/deploy-digitalocean', children: [] },
          { text: 'Deploy to OVHCloud', slug: 'deployment/deploy-ovhcloud', children: [] },
          { text: 'Deploy to Scaleway', slug: 'deployment/deploy-scaleway', children: [] }
        ] },
        { text: { en: 'Self-Hosting', fr: 'Auto-hébergement', es: 'Autoalojamiento', ru: 'Самостоятельный хостинг', zh: '自托管', 'ar-ae': 'الاستضافة الذاتية', ja: 'セルフホスト', pt: 'Auto-hospedagem', de: 'Self-Hosting', ko: '셀프 호스팅', it: 'Self-hosting' }, slug: null, children: [
          { text: 'Deploy to Kubernetes', slug: 'deployment/deploy-kubernetes', children: [] },
          { text: 'Deploy to Docker', slug: 'deployment/deploy-docker', children: [] },
          { text: 'Deploy to Ubuntu', slug: 'deployment/deploy-ubuntu', children: [] }
        ] },
        { text: { en: 'Deploy from Source', fr: 'Déployer depuis la source', es: 'Desplegar desde el código fuente', ru: 'Развернуть из исходников', zh: '从源码部署', 'ar-ae': 'النشر من المصدر', ja: 'ソースからデプロイ', pt: 'Implantar a partir do código-fonte', de: 'Aus dem Quellcode bereitstellen', ko: '소스에서 배포', it: 'Deploy dal codice sorgente' }, slug: 'deployment/deploy-source', children: [] },
        { text: { en: 'Maintenance', fr: 'Maintenance', es: 'Mantenimiento', ru: 'Обслуживание', zh: '维护', 'ar-ae': 'الصيانة', ja: 'メンテナンス', pt: 'Manutenção', de: 'Wartung', ko: '유지 관리', it: 'Manutenzione' }, slug: null, children: [
          { text: 'OpenReplay CLI', slug: 'deployment/openreplay-admin', children: []},
          { text: { en: 'Upgrade Deployment', fr: 'Mise à jour du déploiement', es: 'Actualizar despliegue', ru: 'Обновление развёртывания', zh: '升级部署', 'ar-ae': 'ترقية النشر', ja: 'デプロイのアップグレード', pt: 'Atualizar a implantação', de: 'Bereitstellung aktualisieren', ko: '배포 업그레이드', it: 'Aggiornare il deployment' }, slug: 'deployment/upgrade', children: [] }
        ] },
        { text: { en: 'Installation', fr: 'Installation', es: 'Instalación', ru: 'Установка', zh: '安装', 'ar-ae': 'التثبيت', ja: 'インストール', pt: 'Instalação', de: 'Installation', ko: '설치', it: 'Installazione' }, slug: null, children: [
          { text: { en: 'Setup OpenReplay', fr: 'Installer OpenReplay', es: 'Configurar OpenReplay', ru: 'Настройка OpenReplay', zh: '配置 OpenReplay', 'ar-ae': 'إعداد OpenReplay', ja: 'OpenReplay のセットアップ', pt: 'Configurar o OpenReplay', de: 'OpenReplay einrichten', ko: 'OpenReplay 설정', it: 'Configurare OpenReplay' }, slug: 'deployment/setup-or', children: [] },
          { text: { en: 'Upload Source Maps', fr: 'Téléverser les source maps', es: 'Subir source maps', ru: 'Загрузить source maps', zh: '上传 Source Maps', 'ar-ae': 'رفع خرائط المصدر', ja: 'ソースマップのアップロード', pt: 'Enviar source maps', de: 'Source Maps hochladen', ko: '소스 맵 업로드', it: 'Caricare le source map' }, slug: 'deployment/upload-sourcemaps', children: [] },
        ] },
        { text: { en: 'Administration', fr: 'Administration', es: 'Administración', ru: 'Администрирование', zh: '管理', 'ar-ae': 'الإدارة', ja: '管理', pt: 'Administração', de: 'Verwaltung', ko: '관리', it: 'Amministrazione' }, slug: null, children: [
          { text: { en: 'Team Management', fr: 'Gestion d\'équipe', es: 'Gestión de equipos', ru: 'Управление командой', zh: '团队管理', 'ar-ae': 'إدارة الفريق', ja: 'チーム管理', pt: 'Gerenciamento de equipe', de: 'Teamverwaltung', ko: '팀 관리', it: 'Gestione del team' }, slug: 'deployment/invite-team-members', children: [] },
          { text: { en: 'Roles and Access', fr: 'Rôles et accès', es: 'Roles y acceso', ru: 'Роли и доступ', zh: '角色与权限', 'ar-ae': 'الأدوار والصلاحيات', ja: 'ロールとアクセス権', pt: 'Funções e acesso', de: 'Rollen und Zugriff', ko: '역할 및 접근 권한', it: 'Ruoli e accesso' }, slug: 'deployment/roles-and-access', children: [] }
        ] },
        { text: { en: 'Tracker Compatibility', fr: 'Compatibilité du tracker', es: 'Compatibilidad del tracker', ru: 'Совместимость трекера', zh: '追踪器兼容性', 'ar-ae': 'توافق المتتبع', ja: 'トラッカーの互換性', pt: 'Compatibilidade do tracker', de: 'Tracker-Kompatibilität', ko: '트래커 호환성', it: 'Compatibilità del tracker' }, slug: 'deployment/compatibility', children: [] },
        
      ]
    },
    {
      text: { en: 'Configuration', fr: 'Configuration', es: 'Configuración', ru: 'Конфигурация', zh: '配置', 'ar-ae': 'الإعداد', ja: '設定', pt: 'Configuração', de: 'Konfiguration', ko: '구성', it: 'Configurazione' },
      slug: 'configuration/',
      icon: 'configure',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'configuration', children: [] },
        { text: { en: 'Cleanup Storage', fr: 'Nettoyer le stockage', es: 'Limpiar almacenamiento', ru: 'Очистка хранилища', zh: '清理存储', 'ar-ae': 'تنظيف التخزين', ja: 'ストレージのクリーンアップ', pt: 'Limpeza do armazenamento', de: 'Speicher bereinigen', ko: '스토리지 정리', it: 'Pulizia dello storage' }, slug: 'configuration/cleanup-storage', children: [] },
        { text: { en: 'Configure SMTP', fr: 'Configurer SMTP', es: 'Configurar SMTP', ru: 'Настройка SMTP', zh: '配置 SMTP', 'ar-ae': 'إعداد SMTP', ja: 'SMTP の設定', pt: 'Configurar SMTP', de: 'SMTP konfigurieren', ko: 'SMTP 구성', it: 'Configurare SMTP' }, slug: 'configuration/configure-smtp', children: [] },
        { text: 'External Database (Postgres)', slug: 'configuration/external-db', children: [] },
        { text: { en: 'External Storage', fr: 'Stockage externe', es: 'Almacenamiento externo', ru: 'Внешнее хранилище', zh: '外部存储', 'ar-ae': 'التخزين الخارجي', ja: '外部ストレージ', pt: 'Armazenamento externo', de: 'Externer Speicher', ko: '외부 스토리지', it: 'Storage esterno' }, slug: 'configuration/external-storage', children: [] },
        { text: { en: 'Proxy Settings', fr: 'Paramètres proxy', es: 'Configuración de proxy', ru: 'Настройки прокси', zh: '代理设置', 'ar-ae': 'إعدادات الوكيل', ja: 'プロキシ設定', pt: 'Configurações de proxy', de: 'Proxy-Einstellungen', ko: '프록시 설정', it: 'Impostazioni proxy' }, slug: 'configuration/proxy-settings', children: [] },
        { text: { en: 'Secure OpenReplay', fr: 'Sécuriser OpenReplay', es: 'Proteger OpenReplay', ru: 'Защита OpenReplay', zh: '安全配置', 'ar-ae': 'تأمين OpenReplay', ja: 'OpenReplay のセキュリティ', pt: 'Proteger o OpenReplay', de: 'OpenReplay absichern', ko: 'OpenReplay 보안', it: 'Proteggere OpenReplay' }, slug: 'configuration/secure-or', children: [] },
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
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'sdk', children: [] },
        { text: { en: 'Initialization', fr: 'Initialisation', es: 'Inicialización', ru: 'Инициализация', zh: '初始化', 'ar-ae': 'التهيئة', ja: '初期化', pt: 'Inicialização', de: 'Initialisierung', ko: '초기화', it: 'Inizializzazione' }, slug: 'sdk/constructor', children: [] },
        { text: { en: 'Methods', fr: 'Méthodes', es: 'Métodos', ru: 'Методы', zh: '方法', 'ar-ae': 'الوظائف', ja: 'メソッド', pt: 'Métodos', de: 'Methoden', ko: '메서드', it: 'Metodi' }, slug: 'sdk/methods', children: [
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
        { text: { en: 'Network Options', fr: 'Options réseau', es: 'Opciones de red', ru: 'Сетевые параметры', zh: '网络选项', 'ar-ae': 'خيارات الشبكة', ja: 'ネットワークオプション', pt: 'Opções de rede', de: 'Netzwerkoptionen', ko: '네트워크 옵션', it: 'Opzioni di rete' }, slug: 'sdk/network-options', children: [] },
				{
					text: { en: 'Analytics', fr: 'Analytique', es: 'Analítica', ru: 'Аналитика', zh: '分析', 'ar-ae': 'التحليلات', ja: '分析', pt: 'Analytics', de: 'Analytics', ko: '분석', it: 'Analytics' }, slug: 'sdk/analytics', children: [
						{ text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'sdk/analytics', children: [] },
						{ text: { en: 'People', fr: 'Personnes', es: 'Personas', ru: 'Пользователи', zh: '成员', 'ar-ae': 'الأشخاص', ja: 'ユーザー', pt: 'Pessoas', de: 'Personen', ko: '사용자', it: 'Persone' }, slug: 'sdk/analytics/people', children: [] },
						{ text: { en: 'Events', fr: 'Événements', es: 'Eventos', ru: 'События', zh: '事件', 'ar-ae': 'الأحداث', ja: 'イベント', pt: 'Eventos', de: 'Ereignisse', ko: '이벤트', it: 'Eventi' }, slug: 'sdk/analytics/events', children: [] },
					]
				},
        { text: { en: 'Sanitize Data', fr: 'Nettoyer les données', es: 'Sanear datos', ru: 'Очистка данных', zh: '数据脱敏', 'ar-ae': 'تنقية البيانات', ja: 'データのサニタイズ', pt: 'Sanitizar dados', de: 'Daten bereinigen', ko: '데이터 정제', it: 'Sanificare i dati' }, slug: 'sdk/sanitize-data', children: [] },
        { text: { en: 'Private Mode', fr: 'Mode privé', es: 'Modo privado', ru: 'Приватный режим', zh: '隐私模式', 'ar-ae': 'الوضع الخاص', ja: 'プライベートモード', pt: 'Modo privado', de: 'Privater Modus', ko: '비공개 모드', it: 'Modalità privata' }, slug: 'sdk/private-mode', children: [] },
        { text: { en: 'Frameworks', fr: 'Frameworks', es: 'Frameworks', ru: 'Фреймворки', zh: '框架', 'ar-ae': 'أطر العمل', ja: 'フレームワーク', pt: 'Frameworks', de: 'Frameworks', ko: '프레임워크', it: 'Framework' }, slug: 'sdk/using-or/', children: [
          { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'sdk/using-or/', children: [] },
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
      text: 'iOS',
      slug: 'ios-sdk',
      icon: 'ios_app',
      children: [
        { text: { en: 'Initialization', fr: 'Initialisation', es: 'Inicialización', ru: 'Инициализация', zh: '初始化', 'ar-ae': 'التهيئة', ja: '初期化', pt: 'Inicialização', de: 'Initialisierung', ko: '초기화', it: 'Inizializzazione' }, slug: 'ios-sdk/init', children: [] },
        { text: { en: 'Modules', fr: 'Modules', es: 'Módulos', ru: 'Модули', zh: '模块', 'ar-ae': 'الوحدات', ja: 'モジュール', pt: 'Módulos', de: 'Module', ko: '모듈', it: 'Moduli' }, slug: 'ios-sdk/modules', children: [] },
        { text: { en: 'Methods', fr: 'Méthodes', es: 'Métodos', ru: 'Методы', zh: '方法', 'ar-ae': 'الوظائف', ja: 'メソッド', pt: 'Métodos', de: 'Methoden', ko: '메서드', it: 'Metodi' }, slug: 'ios-sdk/methods', children: [
          { text: 'event', slug: 'ios-sdk/methods/event' , children: []},
          { text: 'setUserID', slug: 'ios-sdk/methods/set-user-id', children: [] },
          { text: 'userAnonymousID', slug: 'ios-sdk/methods/user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'ios-sdk/methods/set-metadata', children: [] },
          { text: 'start', slug: 'ios-sdk/methods/start', children: [] },
          { text: 'stop', slug: 'ios-sdk/methods/stop', children: [] },
        ] },
        { text: { en: 'Analytics', fr: 'Analytique', es: 'Analítica', ru: 'Аналитика', zh: '分析', 'ar-ae': 'التحليلات', ja: '分析', pt: 'Analytics', de: 'Analytics', ko: '분석', it: 'Analytics' }, slug: 'ios-sdk/analytics', children: [] },
        { text: { en: 'Inputs', fr: 'Entrées', es: 'Entradas', ru: 'Входные данные', zh: '输入', 'ar-ae': 'المدخلات', ja: '入力', pt: 'Entradas', de: 'Eingaben', ko: '입력', it: 'Input' }, slug: 'ios-sdk/inputs', children: [] },     
        { text: { en: 'Network Options', fr: 'Options réseau', es: 'Opciones de red', ru: 'Сетевые параметры', zh: '网络选项', 'ar-ae': 'خيارات الشبكة', ja: 'ネットワークオプション', pt: 'Opções de rede', de: 'Netzwerkoptionen', ko: '네트워크 옵션', it: 'Opzioni di rete' }, slug: 'ios-sdk/network', children: [] },
        { text: { en: 'Sanitize Data', fr: 'Nettoyer les données', es: 'Sanear datos', ru: 'Очистка данных', zh: '数据脱敏', 'ar-ae': 'تنقية البيانات', ja: 'データのサニタイズ', pt: 'Sanitizar dados', de: 'Daten bereinigen', ko: '데이터 정제', it: 'Sanificare i dati' }, slug: 'ios-sdk/sanitization', children: [] },
      ]
    },
    {
      text: 'Android',
      slug: 'android-sdk',
      icon: 'android_app',
      children: [
        { text: { en: 'Initialization', fr: 'Initialisation', es: 'Inicialización', ru: 'Инициализация', zh: '初始化', 'ar-ae': 'التهيئة', ja: '初期化', pt: 'Inicialização', de: 'Initialisierung', ko: '초기화', it: 'Inizializzazione' }, slug: 'android-sdk/init', children: [] },
        { text: { en: 'Modules', fr: 'Modules', es: 'Módulos', ru: 'Модули', zh: '模块', 'ar-ae': 'الوحدات', ja: 'モジュール', pt: 'Módulos', de: 'Module', ko: '모듈', it: 'Moduli' }, slug: 'android-sdk/modules', children: [] },
        { text: { en: 'Methods', fr: 'Méthodes', es: 'Métodos', ru: 'Методы', zh: '方法', 'ar-ae': 'الوظائف', ja: 'メソッド', pt: 'Métodos', de: 'Methoden', ko: '메서드', it: 'Metodi' }, slug: 'android-sdk/methods', children: [
          { text: 'event', slug: 'android-sdk/methods/event' , children: []},
          { text: 'setUserID', slug: 'android-sdk/methods/set-user-id', children: [] },
          { text: 'userAnonymousID', slug: 'android-sdk/methods/user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'android-sdk/methods/set-metadata', children: [] },
          { text: 'start', slug: 'android-sdk/methods/start', children: [] },
        ] },
        { text: { en: 'Analytics', fr: 'Analytique', es: 'Analítica', ru: 'Аналитика', zh: '分析', 'ar-ae': 'التحليلات', ja: '分析', pt: 'Analytics', de: 'Analytics', ko: '분석', it: 'Analytics' }, slug: 'android-sdk/analytics', children: [] },
        { text: { en: 'Inputs', fr: 'Entrées', es: 'Entradas', ru: 'Входные данные', zh: '输入', 'ar-ae': 'المدخلات', ja: '入力', pt: 'Entradas', de: 'Eingaben', ko: '입력', it: 'Input' }, slug: 'android-sdk/inputs', children: [] },        
        { text: { en: 'Network Options', fr: 'Options réseau', es: 'Opciones de red', ru: 'Сетевые параметры', zh: '网络选项', 'ar-ae': 'خيارات الشبكة', ja: 'ネットワークオプション', pt: 'Opções de rede', de: 'Netzwerkoptionen', ko: '네트워크 옵션', it: 'Opzioni di rete' }, slug: 'android-sdk/network', children: [] },
        { text: { en: 'Sanitize Data', fr: 'Nettoyer les données', es: 'Sanear datos', ru: 'Очистка данных', zh: '数据脱敏', 'ar-ae': 'تنقية البيانات', ja: 'データのサニタイズ', pt: 'Sanitizar dados', de: 'Daten bereinigen', ko: '데이터 정제', it: 'Sanificare i dati' }, slug: 'android-sdk/sanitization', children: [] },
      ]
    },
    {
      text: 'React Native',
      slug: 'rn-sdk',
      icon: 'react-native_ios_app',
      children: [
        { text: { en: 'Initialization', fr: 'Initialisation', es: 'Inicialización', ru: 'Инициализация', zh: '初始化', 'ar-ae': 'التهيئة', ja: '初期化', pt: 'Inicialização', de: 'Initialisierung', ko: '초기화', it: 'Inizializzazione' }, slug: 'rn-sdk/init', children: [] },
        { text: { en: 'Modules', fr: 'Modules', es: 'Módulos', ru: 'Модули', zh: '模块', 'ar-ae': 'الوحدات', ja: 'モジュール', pt: 'Módulos', de: 'Module', ko: '모듈', it: 'Moduli' }, slug: 'rn-sdk/modules', children: [] },
        { text: { en: 'Methods', fr: 'Méthodes', es: 'Métodos', ru: 'Методы', zh: '方法', 'ar-ae': 'الوظائف', ja: 'メソッド', pt: 'Métodos', de: 'Methoden', ko: '메서드', it: 'Metodi' }, slug: 'rn-sdk/methods', children: [
          { text: 'event', slug: 'rn-sdk/methods/event' , children: []},
          { text: 'setUserID', slug: 'rn-sdk/methods/set-user-id', children: [] },
          { text: 'userAnonymousID', slug: 'rn-sdk/methods/user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'rn-sdk/methods/set-metadata', children: [] },
          { text: 'start', slug: 'rn-sdk/methods/start', children: [] },
          { text: 'patchNetwork', slug: 'rn-sdk/methods/patch-network', children: [] },
        ] },
        { text: { en: 'Analytics', fr: 'Analytique', es: 'Analítica', ru: 'Аналитика', zh: '分析', 'ar-ae': 'التحليلات', ja: '分析', pt: 'Analytics', de: 'Analytics', ko: '분석', it: 'Analytics' }, slug: 'rn-sdk/analytics', children: [] },
        { text: { en: 'Inputs', fr: 'Entrées', es: 'Entradas', ru: 'Входные данные', zh: '输入', 'ar-ae': 'المدخلات', ja: '入力', pt: 'Entradas', de: 'Eingaben', ko: '입력', it: 'Input' }, slug: 'rn-sdk/inputs', children: [] },        
        { text: { en: 'Network Options', fr: 'Options réseau', es: 'Opciones de red', ru: 'Сетевые параметры', zh: '网络选项', 'ar-ae': 'خيارات الشبكة', ja: 'ネットワークオプション', pt: 'Opções de rede', de: 'Netzwerkoptionen', ko: '네트워크 옵션', it: 'Opzioni di rete' }, slug: 'rn-sdk/network', children: [] },
        { text: { en: 'Sanitize Data', fr: 'Nettoyer les données', es: 'Sanear datos', ru: 'Очистка данных', zh: '数据脱敏', 'ar-ae': 'تنقية البيانات', ja: 'データのサニタイズ', pt: 'Sanitizar dados', de: 'Daten bereinigen', ko: '데이터 정제', it: 'Sanificare i dati' }, slug: 'rn-sdk/sanitization', children: [] },
      ]
    },
    {
      text: 'Flutter (beta)',
      slug: 'flutter-sdk',
      icon: 'flutter_app',
      children: [
        { text: { en: 'Initialization', fr: 'Initialisation', es: 'Inicialización', ru: 'Инициализация', zh: '初始化', 'ar-ae': 'التهيئة', ja: '初期化', pt: 'Inicialização', de: 'Initialisierung', ko: '초기화', it: 'Inizializzazione' }, slug: 'flutter-sdk/init', children: [] },
        { text: { en: 'Modules', fr: 'Modules', es: 'Módulos', ru: 'Модули', zh: '模块', 'ar-ae': 'الوحدات', ja: 'モジュール', pt: 'Módulos', de: 'Module', ko: '모듈', it: 'Moduli' }, slug: 'flutter-sdk/modules', children: [] },
        { text: { en: 'Methods', fr: 'Méthodes', es: 'Métodos', ru: 'Методы', zh: '方法', 'ar-ae': 'الوظائف', ja: 'メソッド', pt: 'Métodos', de: 'Methoden', ko: '메서드', it: 'Metodi' }, slug: 'flutter-sdk/methods', children: [
          { text: 'event', slug: 'flutter-sdk/methods/event' , children: []},
          { text: 'setUserID', slug: 'flutter-sdk/methods/set-user-id', children: [] },
          { text: 'userAnonymousID', slug: 'flutter-sdk/methods/user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'flutter-sdk/methods/set-metadata', children: [] },
          { text: 'start', slug: 'flutter-sdk/methods/start', children: [] },
          { text: 'stop', slug: 'flutter-sdk/methods/stop', children: [] },
          { text: 'patchNetwork', slug: 'flutter-sdk/methods/patch-network', children: [] },
        ] },
        { text: { en: 'Analytics', fr: 'Analytique', es: 'Analítica', ru: 'Аналитика', zh: '分析', 'ar-ae': 'التحليلات', ja: '分析', pt: 'Analytics', de: 'Analytics', ko: '분석', it: 'Analytics' }, slug: 'flutter-sdk/analytics', children: [] },
        { text: { en: 'Inputs', fr: 'Entrées', es: 'Entradas', ru: 'Входные данные', zh: '输入', 'ar-ae': 'المدخلات', ja: '入力', pt: 'Entradas', de: 'Eingaben', ko: '입력', it: 'Input' }, slug: 'flutter-sdk/inputs', children: [] },
        { text: { en: 'Network Options', fr: 'Options réseau', es: 'Opciones de red', ru: 'Сетевые параметры', zh: '网络选项', 'ar-ae': 'خيارات الشبكة', ja: 'ネットワークオプション', pt: 'Opções de rede', de: 'Netzwerkoptionen', ko: '네트워크 옵션', it: 'Opzioni di rete' }, slug: 'flutter-sdk/network', children: [] },
        { text: { en: 'Sanitize Data', fr: 'Nettoyer les données', es: 'Sanear datos', ru: 'Очистка данных', zh: '数据脱敏', 'ar-ae': 'تنقية البيانات', ja: 'データのサニタイズ', pt: 'Sanitizar dados', de: 'Daten bereinigen', ko: '데이터 정제', it: 'Sanificare i dati' }, slug: 'flutter-sdk/sanitization', children: [] },
      ]
    },
    {
      text: { en: 'Products', fr: 'Produits', es: 'Productos', ru: 'Продукты', zh: '产品', 'ar-ae': 'المنتجات', ja: '製品', pt: 'Produtos', de: 'Produkte', ko: '제품', it: 'Prodotti' },
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
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'session-replay', children: [] },
        { text: { en: 'Guides', fr: 'Guides', es: 'Guías', ru: 'Руководства', zh: '指南', 'ar-ae': 'الأدلة', ja: 'ガイド', pt: 'Guias', de: 'Anleitungen', ko: '가이드', it: 'Guide' }, slug: null, children: [ 
          { text: { en: 'Omnisearch', fr: 'Recherche universelle', es: 'Búsqueda global', ru: 'Универсальный поиск', zh: '全局搜索', 'ar-ae': 'البحث الشامل', ja: 'オムニサーチ', pt: 'Busca global', de: 'Omnisearch', ko: 'Omnisearch', it: 'Omnisearch' }, slug: 'session-replay/omnisearch', children: [] },
          { text: { en: 'Segments', fr: 'Segments', es: 'Segmentos', ru: 'Сегменты', zh: '细分群组', 'ar-ae': 'الشرائح', ja: 'セグメント', pt: 'Segmentos', de: 'Segmente', ko: '세그먼트', it: 'Segmenti' }, slug: 'session-replay/segments', children: [] },
          { text: 'Highlights', slug: 'session-replay/highlights', children: [] },
          { text: { en: 'Session to E2E Test', fr: 'Session vers test E2E', es: 'Sesión a prueba E2E', ru: 'Сессия в E2E-тест', zh: '会话转 E2E 测试', 'ar-ae': 'تحويل الجلسة إلى اختبار E2E', ja: 'セッションから E2E テストへ', pt: 'Sessão para teste E2E', de: 'Sitzung zu E2E-Test', ko: '세션을 E2E 테스트로', it: 'Da sessione a test E2E' }, slug: 'session-replay/generate-e2e-test', children: [] },
        ] 
        },
        { text: { en: 'Advanced Setup', fr: 'Configuration avancée', es: 'Configuración avanzada', ru: 'Расширенная настройка', zh: '高级配置', 'ar-ae': 'الإعداد المتقدم', ja: '高度な設定', pt: 'Configuração avançada', de: 'Erweiterte Einrichtung', ko: '고급 설정', it: 'Configurazione avanzata' }, slug: null, children: [
          { text: { en: 'Identify a User', fr: 'Identifier un utilisateur', es: 'Identificar un usuario', ru: 'Идентификация пользователя', zh: '标识用户', 'ar-ae': 'تعريف المستخدم', ja: 'ユーザーの識別', pt: 'Identificar um usuário', de: 'Benutzer identifizieren', ko: '사용자 식별', it: 'Identificare un utente' }, slug: 'session-replay/identify-user', children: [] },
          { text: { en: 'Send Metadata', fr: 'Envoyer des métadonnées', es: 'Enviar metadatos', ru: 'Отправить метаданные', zh: '发送元数据', 'ar-ae': 'إرسال البيانات الوصفية', ja: 'メタデータの送信', pt: 'Enviar metadados', de: 'Metadaten senden', ko: '메타데이터 전송', it: 'Inviare metadati' }, slug: 'session-replay/metadata', children: [] },
          { text: 'Canvas and WebGL', slug: 'session-replay/canvas', children: [] },
          { text: 'Cross-domain iFrames', slug: 'session-replay/crossdomain-iframe', children: [] },
          { text: 'WebSockets', slug: 'session-replay/websockets', children: [] },
          { text: { en: 'Error Tracking', fr: 'Suivi des erreurs', es: 'Seguimiento de errores', ru: 'Отслеживание ошибок', zh: '错误追踪', 'ar-ae': 'تتبع الأخطاء', ja: 'エラートラッキング', pt: 'Rastreamento de erros', de: 'Fehlerverfolgung', ko: '오류 추적', it: 'Tracciamento degli errori' }, slug: 'session-replay/error-reporting', children: [] },
        ] 
        },
      ]
    },
    {
      text: { en: 'Product Analytics', fr: 'Analytique produit', es: 'Analítica de producto', ru: 'Продуктовая аналитика', zh: '产品分析', 'ar-ae': 'تحليلات المنتج', ja: 'プロダクト分析', pt: 'Product Analytics', de: 'Product Analytics', ko: '제품 분석', it: 'Product Analytics' },
      slug: 'product-analytics',
      icon: 'product-analytics',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'product-analytics', children: [] },
        { text: { en: 'Guides', fr: 'Guides', es: 'Guías', ru: 'Руководства', zh: '指南', 'ar-ae': 'الأدلة', ja: 'ガイド', pt: 'Guias', de: 'Anleitungen', ko: '가이드', it: 'Guide' }, slug: null, children: [
          { text: { en: 'Trends', fr: 'Tendances', es: 'Tendencias', ru: 'Тренды', zh: '趋势', 'ar-ae': 'الاتجاهات', ja: 'トレンド', pt: 'Tendências', de: 'Trends', ko: '트렌드', it: 'Tendenze' }, slug: 'product-analytics/trends', children: [] },
          { text: { en: 'Funnels', fr: 'Entonnoirs', es: 'Embudos', ru: 'Воронки', zh: '漏斗', 'ar-ae': 'مسارات التحويل', ja: 'ファネル', pt: 'Funis', de: 'Funnels', ko: '퍼널', it: 'Funnel' }, slug: 'product-analytics/funnels', children: [] },
          { text: { en: 'Journeys', fr: 'Parcours', es: 'Recorridos', ru: 'Пути', zh: '用户旅程', 'ar-ae': 'مسارات المستخدم', ja: 'ジャーニー', pt: 'Jornadas', de: 'Journeys', ko: '여정', it: 'Percorsi' }, slug: 'product-analytics/journeys', children: [] },
          { text: { en: 'Heatmaps', fr: 'Cartes de chaleur', es: 'Mapas de calor', ru: 'Тепловые карты', zh: '热力图', 'ar-ae': 'الخرائط الحرارية', ja: 'ヒートマップ', pt: 'Mapas de calor', de: 'Heatmaps', ko: '히트맵', it: 'Heatmap' }, slug: 'product-analytics/heatmaps', children: [] },
          { text: { en: 'Dashboards', fr: 'Tableaux de bord', es: 'Paneles', ru: 'Дашборды', zh: '仪表板', 'ar-ae': 'لوحات المعلومات', ja: 'ダッシュボード', pt: 'Dashboards', de: 'Dashboards', ko: '대시보드', it: 'Dashboard' }, slug: 'product-analytics/dashboards', children: [] },
          { text: { en: 'Web Analytics', fr: 'Analytique web', es: 'Analítica web', ru: 'Веб-аналитика', zh: '网页分析', 'ar-ae': 'تحليلات الويب', ja: 'Web 分析', pt: 'Web Analytics', de: 'Web Analytics', ko: '웹 분석', it: 'Web Analytics' }, slug: 'product-analytics/web-analytics', children: [] },
          { text: { en: 'Monitors', fr: 'Moniteurs', es: 'Monitores', ru: 'Мониторы', zh: '监控', 'ar-ae': 'أجهزة الرصد', ja: 'モニター', pt: 'Monitores', de: 'Monitore', ko: '모니터', it: 'Monitor' }, slug: 'product-analytics/monitors', children: [] },
        ]
        },
        { text: { en: 'Data Management', fr: 'Gestion des données', es: 'Gestión de datos', ru: 'Управление данными', zh: '数据管理', 'ar-ae': 'إدارة البيانات', ja: 'データ管理', pt: 'Gerenciamento de dados', de: 'Datenverwaltung', ko: '데이터 관리', it: 'Gestione dei dati' }, slug: 'product-analytics/data-management', children: [] },
      ]
    },
    {
      text: 'Co-browsing', slug: 'co-browsing', icon: 'co-browsing', children: []
    },
    {
      text: { en: 'Platform', fr: 'Plateforme', es: 'Plataforma', ru: 'Платформа', zh: '平台', 'ar-ae': 'المنصة', ja: 'プラットフォーム', pt: 'Plataforma', de: 'Plattform', ko: '플랫폼', it: 'Piattaforma' },
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
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'ai', children: [] },
        { text: { en: 'Summary AI', fr: 'Résumé par IA', es: 'Resumen con IA', ru: 'Сводка ИИ', zh: 'AI 摘要', 'ar-ae': 'ملخص بالذكاء الاصطناعي', ja: 'AI 要約', pt: 'Resumo por IA', de: 'Summary AI', ko: 'Summary AI', it: 'Summary AI' }, slug: 'ai/summary-ai', children: [] },
        { text: { en: 'Similar Sessions', fr: 'Sessions similaires', es: 'Sesiones similares', ru: 'Похожие сессии', zh: '相似会话', 'ar-ae': 'جلسات مشابهة', ja: '類似セッション', pt: 'Sessões semelhantes', de: 'Ähnliche Sitzungen', ko: '유사한 세션', it: 'Sessioni simili' }, slug: 'ai/similar-sessions', children: [] },
        { text: { en: 'Explain AI', fr: 'Expliquer par IA', es: 'Explicar con IA', ru: 'Объяснение ИИ', zh: 'AI 解释', 'ar-ae': 'شرح بالذكاء الاصطناعي', ja: 'AI による解説', pt: 'Explicação por IA', de: 'Explain AI', ko: 'Explain AI', it: 'Explain AI' }, slug: 'ai/explain-ai', children: [] },
      ]
    },
    {
      text: 'MCP',
      slug: 'mcp',
      icon: 'mcp',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'mcp', children: [] },
        { text: { en: 'Setup', fr: 'Installation', es: 'Configuración', ru: 'Настройка', zh: '设置', 'ar-ae': 'الإعداد', ja: 'セットアップ', pt: 'Configuração', de: 'Einrichtung', ko: '설정', it: 'Configurazione' }, slug: 'mcp/setup', children: [] },
        { text: { en: 'Capabilities', fr: 'Fonctionnalités', es: 'Capacidades', ru: 'Возможности', zh: '功能特性', 'ar-ae': 'الإمكانيات', ja: '機能', pt: 'Recursos', de: 'Funktionen', ko: '기능', it: 'Funzionalità' }, slug: 'mcp/capabilities', children: [] },
      ]
    },
    {
      text: { en: 'Plugins', fr: 'Plugins', es: 'Plugins', ru: 'Плагины', zh: '插件', 'ar-ae': 'الإضافات', ja: 'プラグイン', pt: 'Plugins', de: 'Plugins', ko: '플러그인', it: 'Plugin' },
      slug: 'plugins',
      icon: 'plugins',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'plugins', children: [] },
        { text: 'Assist', slug: 'plugins/assist', children: [] },
        { text: 'Axios', slug: 'plugins/axios', children: [] },
        { text: 'Fetch', slug: 'plugins/fetch', children: [] },
        { text: 'GraphQL', slug: 'plugins/graphql', children: [] },
        { text: 'MobX', slug: 'plugins/mobx', children: [] },
        { text: 'NgRx', slug: 'plugins/ngrx', children: [] },
        { text: 'Pinia', slug: 'plugins/pinia', children: [] },
        { text: 'VueX', slug: 'plugins/vuex', children: [] },
        { text: { en: 'Profiler', fr: 'Profileur', es: 'Perfilador', ru: 'Профилировщик', zh: '性能分析', 'ar-ae': 'أداة التنميط', ja: 'プロファイラー', pt: 'Profiler', de: 'Profiler', ko: '프로파일러', it: 'Profiler' }, slug: 'plugins/profiler', children: [] },
        { text: 'Redux', slug: 'plugins/redux', children: [] },
        { text: 'Zustand', slug: 'plugins/zustand', children: [] },
      ]
    },
    {
      text: { en: 'Integrations', fr: 'Intégrations', es: 'Integraciones', ru: 'Интеграции', zh: '集成', 'ar-ae': 'التكاملات', ja: 'インテグレーション', pt: 'Integrações', de: 'Integrationen', ko: '통합', it: 'Integrazioni' },
      slug: 'integrations',
      icon: 'integration',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'integrations', children: [] },
        { text: 'Datadog', slug: 'integrations/datadog', children: [] },
        { text: 'Elastic', slug: 'integrations/elastic', children: [] },
        { text: 'Dynatrace', slug: 'integrations/dynatrace', children: [] },
        { text: 'Sentry', slug: 'integrations/sentry', children: [] },
        { text: 'GitHub', slug: 'integrations/github', children: [] },
        { text: 'Slack', slug: 'integrations/slack', children: [] },
        { text: 'MSTeams', slug: 'integrations/msteams', children: [] },
        { text: 'Jira Cloud', slug: 'integrations/jira', children: [] },
        { text: 'Zendesk', slug: 'integrations/zendesk', children: [] },
        { text: 'Google Tag Manager', slug: 'integrations/google-tag-manager', children: [] },
      ]
    },
    {
      text: 'API',
      slug: 'api',
      icon: 'api',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'api', children: [] },
        { text: 'Assist', slug: 'api/assist', children: [] },
        { text: { en: 'Events', fr: 'Événements', es: 'Eventos', ru: 'События', zh: '事件', 'ar-ae': 'الأحداث', ja: 'イベント', pt: 'Eventos', de: 'Ereignisse', ko: '이벤트', it: 'Eventi' }, slug: 'api/events', children: [] },
        { text: { en: 'Jobs', fr: 'Tâches', es: 'Trabajos', ru: 'Задания', zh: '任务', 'ar-ae': 'المهام', ja: 'ジョブ', pt: 'Jobs', de: 'Jobs', ko: '작업', it: 'Job' }, slug: 'api/jobs', children: [] },
        { text: { en: 'Projects', fr: 'Projets', es: 'Proyectos', ru: 'Проекты', zh: '项目', 'ar-ae': 'المشاريع', ja: 'プロジェクト', pt: 'Projetos', de: 'Projekte', ko: '프로젝트', it: 'Progetti' }, slug: 'api/projects', children: [] },
        { text: { en: 'Sessions', fr: 'Sessions', es: 'Sesiones', ru: 'Сессии', zh: '会话', 'ar-ae': 'الجلسات', ja: 'セッション', pt: 'Sessões', de: 'Sitzungen', ko: '세션', it: 'Sessioni' }, slug: 'api/sessions', children: [] },
        { text: { en: 'Users', fr: 'Utilisateurs', es: 'Usuarios', ru: 'Пользователи', zh: '用户', 'ar-ae': 'المستخدمون', ja: 'ユーザー', pt: 'Usuários', de: 'Benutzer', ko: '사용자', it: 'Utenti' }, slug: 'api/users', children: [] },
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
      text: { en: 'Materials', fr: 'Ressources', es: 'Materiales', ru: 'Материалы', zh: '资料', 'ar-ae': 'المواد', ja: '資料', pt: 'Materiais', de: 'Materialien', ko: '자료', it: 'Materiali' },
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: { en: 'Exporting data', fr: 'Exporter les données', es: 'Exportar datos', ru: 'Экспорт данных', zh: '导出数据', 'ar-ae': 'تصدير البيانات', ja: 'データのエクスポート', pt: 'Exportação de dados', de: 'Daten exportieren', ko: '데이터 내보내기', it: 'Esportazione dei dati' },
      slug: 'structure',
      icon: 'structure',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'structure', children: [] },
        { text: { en: 'Exported Data', fr: 'Données exportées', es: 'Datos exportados', ru: 'Экспортированные данные', zh: '已导出数据', 'ar-ae': 'البيانات المصدَّرة', ja: 'エクスポートされたデータ', pt: 'Dados exportados', de: 'Exportierte Daten', ko: '내보낸 데이터', it: 'Dati esportati' }, slug: 'structure/exported-data', children: [] },
      ]
    },
    {
      text: { en: 'Troubleshooting', fr: 'Dépannage', es: 'Solución de problemas', ru: 'Устранение неполадок', zh: '故障排除', 'ar-ae': 'استكشاف الأخطاء', ja: 'トラブルシューティング', pt: 'Solução de problemas', de: 'Fehlerbehebung', ko: '문제 해결', it: 'Risoluzione dei problemi' },
      slug: 'troubleshooting',
      icon: 'troubleshoot',
      children: [
        { text: { en: 'Overview', fr: 'Aperçu', es: 'Descripción general', ru: 'Обзор', zh: '概览', 'ar-ae': 'نظرة عامة', ja: '概要', pt: 'Visão geral', de: 'Überblick', ko: '개요', it: 'Panoramica' }, slug: 'troubleshooting', children: [] },
        { text: { en: 'Clear Cache', fr: 'Vider le cache', es: 'Limpiar caché', ru: 'Очистить кэш', zh: '清除缓存', 'ar-ae': 'مسح ذاكرة التخزين المؤقت', ja: 'キャッシュのクリア', pt: 'Limpar cache', de: 'Cache leeren', ko: '캐시 지우기', it: 'Svuotare la cache' }, slug: 'troubleshooting/cache', children: [] },
        { text: 'Content Security Policy (CSP)', slug: 'troubleshooting/csp', children: [] },
        { text: { en: 'JS Errors', fr: 'Erreurs JS', es: 'Errores JS', ru: 'Ошибки JS', zh: 'JS 错误', 'ar-ae': 'أخطاء JS', ja: 'JS エラー', pt: 'Erros de JS', de: 'JS-Fehler', ko: 'JS 오류', it: 'Errori JS' }, slug: 'troubleshooting/js-errors', children: [] },
        { text: { en: 'Localhost Testing', fr: 'Tests en local', es: 'Pruebas en localhost', ru: 'Локальное тестирование', zh: '本地测试', 'ar-ae': 'الاختبار المحلي', ja: 'localhost でのテスト', pt: 'Testes em localhost', de: 'Tests auf localhost', ko: 'localhost 테스트', it: 'Test su localhost' }, slug: 'troubleshooting/localhost', children: [] },
        { text: { en: 'Session Recording Issues', fr: 'Problèmes d\'enregistrement', es: 'Problemas de grabación', ru: 'Проблемы записи сессий', zh: '录制问题', 'ar-ae': 'مشكلات التسجيل', ja: 'セッション録画の問題', pt: 'Problemas na gravação de sessões', de: 'Probleme bei der Sitzungsaufzeichnung', ko: '세션 녹화 문제', it: 'Problemi di registrazione delle sessioni' }, slug: 'troubleshooting/session-recordings', children: [] },
        { text: { en: 'Sourcemaps Issues', fr: 'Problèmes de source maps', es: 'Problemas de source maps', ru: 'Проблемы source maps', zh: 'Source Maps 问题', 'ar-ae': 'مشكلات خرائط المصدر', ja: 'ソースマップの問題', pt: 'Problemas com source maps', de: 'Probleme mit Source Maps', ko: '소스 맵 문제', it: 'Problemi con le source map' }, slug: 'troubleshooting/sourcemaps', children: [] },
        { text: { en: 'Supported Browsers', fr: 'Navigateurs pris en charge', es: 'Navegadores compatibles', ru: 'Поддерживаемые браузеры', zh: '支持的浏览器', 'ar-ae': 'المتصفحات المدعومة', ja: '対応ブラウザ', pt: 'Navegadores compatíveis', de: 'Unterstützte Browser', ko: '지원 브라우저', it: 'Browser supportati' }, slug: 'troubleshooting/supported-browsers', children: [] },
        { text: { en: 'Deployment Issues', fr: 'Problèmes de déploiement', es: 'Problemas de despliegue', ru: 'Проблемы развёртывания', zh: '部署问题', 'ar-ae': 'مشكلات النشر', ja: 'デプロイの問題', pt: 'Problemas de implantação', de: 'Probleme bei der Bereitstellung', ko: '배포 문제', it: 'Problemi di deployment' }, slug: 'troubleshooting/deployment-issues', children: [] },
				{ text: { en: 'Network Resources', fr: 'Ressources réseau', es: 'Recursos de red', ru: 'Сетевые ресурсы', zh: '网络资源', 'ar-ae': 'موارد الشبكة', ja: 'ネットワークリソース', pt: 'Recursos de rede', de: 'Netzwerkressourcen', ko: '네트워크 리소스', it: 'Risorse di rete' }, slug: 'troubleshooting/network-resources', children: [] },
      ]
    },
    {
      text: { en: 'Tutorials', fr: 'Tutoriels', es: 'Tutoriales', ru: 'Учебные пособия', zh: '教程', 'ar-ae': 'الدروس التعليمية', ja: 'チュートリアル', pt: 'Tutoriais', de: 'Tutorials', ko: '튜토리얼', it: 'Tutorial' },
      slug: null,
      icon: 'tutorials',
      children: [
        { text: 'Assist', slug: 'tutorials/assist', children: [] },
        { text: { en: 'Build Plugins', fr: 'Plugins de build', es: 'Plugins de compilación', ru: 'Плагины сборки', zh: '构建插件', 'ar-ae': 'إضافات البناء', ja: 'プラグインの作成', pt: 'Criar plugins', de: 'Plugins erstellen', ko: '플러그인 만들기', it: 'Creare plugin' }, slug: 'tutorials/build-plugins', children: [] },
        { text: { en: 'Custom Events', fr: 'Événements personnalisés', es: 'Eventos personalizados', ru: 'Пользовательские события', zh: '自定义事件', 'ar-ae': 'الأحداث المخصصة', ja: 'カスタムイベント', pt: 'Eventos personalizados', de: 'Benutzerdefinierte Events', ko: '사용자 지정 이벤트', it: 'Eventi personalizzati' }, slug: 'tutorials/custom-events', children: [] },
        { text: { en: 'Capture and Sanitize', fr: 'Capture et nettoyage', es: 'Captura y saneamiento', ru: 'Захват и очистка', zh: '采集与脱敏', 'ar-ae': 'الالتقاط والتنقية', ja: 'キャプチャとサニタイズ', pt: 'Captura e sanitização', de: 'Erfassen und bereinigen', ko: '캡처 및 정제', it: 'Acquisizione e sanificazione' }, slug: 'tutorials/capture-request', children: [] },
        { text: 'GraphQL', slug: 'tutorials/graphql', children: [] },
        { text: { en: 'Metadata', fr: 'Métadonnées', es: 'Metadatos', ru: 'Метаданные', zh: '元数据', 'ar-ae': 'البيانات الوصفية', ja: 'メタデータ', pt: 'Metadados', de: 'Metadaten', ko: '메타데이터', it: 'Metadati' }, slug: 'tutorials/metadata', children: [] },
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
