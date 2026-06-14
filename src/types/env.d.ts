// ============================================
// ENVIRONMENT VARIABLE TYPE DECLARATIONS
// Gives TypeScript full awareness of all
// REACT_APP_ variables
// ============================================

declare namespace NodeJS {
  interface ProcessEnv {
    // App
    readonly REACT_APP_ENV: 'local' | 'sandbox' | 'nonprod' | 'production';
    readonly REACT_APP_APP_NAME: string;
    readonly REACT_APP_VERSION: string;

    // Firebase
    readonly REACT_APP_FIREBASE_USE_EMULATOR: string;
    readonly REACT_APP_FIREBASE_EMULATOR_HOST: string;
    readonly REACT_APP_FIREBASE_AUTH_EMULATOR_PORT: string;
    readonly REACT_APP_FIREBASE_DATACONNECT_EMULATOR_PORT: string;
    readonly REACT_APP_FIREBASE_STORAGE_EMULATOR_PORT: string;
    readonly REACT_APP_FIREBASE_PROJECT_ID: string;
    readonly REACT_APP_FIREBASE_API_KEY: string;
    readonly REACT_APP_FIREBASE_AUTH_DOMAIN: string;
    readonly REACT_APP_FIREBASE_STORAGE_BUCKET: string;
    readonly REACT_APP_FIREBASE_MESSAGING_SENDER_ID: string;
    readonly REACT_APP_FIREBASE_APP_ID: string;

    // API
    readonly REACT_APP_API_BASE_URL: string;
    readonly REACT_APP_GRAPHQL_ENDPOINT: string;

    // GCP
    readonly REACT_APP_GCP_PROJECT_ID: string;
    readonly REACT_APP_GCP_REGION: string;

    // Feature Flags
    readonly REACT_APP_ENABLE_MOCK_AUTH: string;
    readonly REACT_APP_ENABLE_DEBUG_LOGS: string;
    readonly REACT_APP_ENABLE_QUERY_INSPECTOR: string;
  }
}