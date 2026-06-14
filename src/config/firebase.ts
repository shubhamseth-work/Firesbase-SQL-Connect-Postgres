// ============================================
// FIREBASE INITIALIZATION
// Handles both emulator and production modes
// ============================================

import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import {
  getAuth,
  Auth,
  connectAuthEmulator,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  getStorage,
  FirebaseStorage,
  connectStorageEmulator,
} from 'firebase/storage';

import config from './environment';

// ============================================
// FIREBASE APP CONFIG
// ============================================
const firebaseConfig = {
  apiKey:            config.firebase.apiKey,
  authDomain:        config.firebase.authDomain,
  projectId:         config.firebase.projectId,
  storageBucket:     config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId:             config.firebase.appId,
};

// ============================================
// INITIALIZE FIREBASE (singleton pattern)
// ============================================
let app: FirebaseApp;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// ============================================
// FIREBASE AUTH
// ============================================
const auth: Auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// ============================================
// FIREBASE STORAGE
// ============================================
const storage: FirebaseStorage = getStorage(app);

// ============================================
// CONNECT TO EMULATORS (local dev only)
// ============================================
if (config.emulator.enabled) {
  const { host, authPort, storagePort } = config.emulator;

  // Auth emulator
  connectAuthEmulator(
    auth,
    `http://${host}:${authPort}`,
    { disableWarnings: false }
  );

  // Storage emulator
  connectStorageEmulator(storage, host, storagePort);

  console.info('🔧 Firebase Emulators connected');
  console.info(`   Auth:    http://${host}:${authPort}`);
  console.info(`   Storage: http://${host}:${storagePort}`);
}

export { app, auth, storage, googleProvider };
export default app;