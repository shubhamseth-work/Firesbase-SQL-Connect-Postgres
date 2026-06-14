// ============================================
// ENVIRONMENT CONFIGURATION
// Single source of truth for all env variables
// ============================================

export type AppEnvironment = 'local' | 'sandbox' | 'nonprod' | 'production';

interface FirebaseConfig {
  projectId: string;
  apiKey: string;
  authDomain: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

interface EmulatorConfig {
  enabled: boolean;
  host: string;
  authPort: number;
  dataConnectPort: number;
  storagePort: number;
}

interface ApiConfig {
  baseUrl: string;
  graphqlEndpoint: string;
}

interface FeatureFlags {
  enableMockAuth: boolean;
  enableDebugLogs: boolean;
  enableQueryInspector: boolean;
}

interface GcpConfig {
  projectId: string;
  region: string;
}

interface AppConfig {
  env: AppEnvironment;
  appName: string;
  version: string;
  firebase: FirebaseConfig;
  emulator: EmulatorConfig;
  api: ApiConfig;
  gcp: GcpConfig;
  features: FeatureFlags;
  isLocal: boolean;
  isSandbox: boolean;
  isNonProd: boolean;
  isProduction: boolean;
}

// ============================================
// READ FROM ENVIRONMENT VARIABLES
// ============================================
const env = process.env.REACT_APP_ENV as AppEnvironment || 'local';

const config: AppConfig = {
  env,
  appName: process.env.REACT_APP_APP_NAME || 'CLSQL React App',
  version: process.env.REACT_APP_VERSION || '1.0.0',

  firebase: {
    projectId:         process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
    apiKey:            process.env.REACT_APP_FIREBASE_API_KEY || '',
    authDomain:        process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
    storageBucket:     process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
    appId:             process.env.REACT_APP_FIREBASE_APP_ID || '',
  },

  emulator: {
    enabled:          process.env.REACT_APP_FIREBASE_USE_EMULATOR === 'true',
    host:             process.env.REACT_APP_FIREBASE_EMULATOR_HOST || 'localhost',
    authPort:         parseInt(process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_PORT || '9099'),
    dataConnectPort:  parseInt(process.env.REACT_APP_FIREBASE_DATACONNECT_EMULATOR_PORT || '9399'),
    storagePort:      parseInt(process.env.REACT_APP_FIREBASE_STORAGE_EMULATOR_PORT || '9199'),
  },

  api: {
    baseUrl:          process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
    graphqlEndpoint:  process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:9399/graphql',
  },

  gcp: {
    projectId: process.env.REACT_APP_GCP_PROJECT_ID || 'firbaseapplication-891be',
    region:    process.env.REACT_APP_GCP_REGION || 'us-central1',
  },

  features: {
    enableMockAuth:        process.env.REACT_APP_ENABLE_MOCK_AUTH === 'true',
    enableDebugLogs:       process.env.REACT_APP_ENABLE_DEBUG_LOGS === 'true',
    enableQueryInspector:  process.env.REACT_APP_ENABLE_QUERY_INSPECTOR === 'true',
  },

  // Convenience booleans
  isLocal:      env === 'local',
  isSandbox:    env === 'sandbox',
  isNonProd:    env === 'nonprod',
  isProduction: env === 'production',
};

// ============================================
// VALIDATION — Warn on missing required values
// ============================================
const validateConfig = (): void => {
  const required: Array<{ key: string; value: string }> = [
    { key: 'REACT_APP_FIREBASE_PROJECT_ID', value: config.firebase.projectId },
  ];

  // Only enforce API key in non-emulator mode
  if (!config.emulator.enabled) {
    required.push(
      { key: 'REACT_APP_FIREBASE_API_KEY',    value: config.firebase.apiKey },
      { key: 'REACT_APP_FIREBASE_AUTH_DOMAIN', value: config.firebase.authDomain },
    );
  }

  required.forEach(({ key, value }) => {
    if (!value) {
      console.warn(`Missing environment variable: ${key}`);
    }
  });

  if (config.features.enableDebugLogs) {
    console.info(`🌍 Environment: ${config.env.toUpperCase()}`);
    console.info(`📦 App: ${config.appName} v${config.version}`);
    console.info(`🔥 Firebase Project: ${config.firebase.projectId}`);
    console.info(`🖥️  Emulator: ${config.emulator.enabled ? 'ENABLED' : 'DISABLED'}`);
  }
};

validateConfig();

export default config;