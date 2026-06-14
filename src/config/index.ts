// ============================================
// CONFIG BARREL EXPORT
// Import everything from one place
// ============================================

export { default as config } from './environment';
export { default as firebaseApp, auth, storage, googleProvider } from './firebase';
export type { AppEnvironment } from './environment';