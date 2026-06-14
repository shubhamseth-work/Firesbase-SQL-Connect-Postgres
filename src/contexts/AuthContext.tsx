// ============================================
// AUTH CONTEXT
// Firebase Authentication state management
// Google SSO only
// ============================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  getIdToken,
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import logger from '../utils/logger';

// -----------------------------------------------
// TYPES
// -----------------------------------------------
interface AuthUser {
  uid:          string;
  email:        string | null;
  displayName:  string | null;
  photoURL:     string | null;
  emailVerified: boolean;
}

interface AuthContextType {
  user:           AuthUser | null;
  firebaseUser:   User | null;
  isAuthenticated: boolean;
  isLoading:      boolean;
  error:          string | null;
  signInWithGoogle: () => Promise<void>;
  logout:         () => Promise<void>;
  getToken:       () => Promise<string | null>;
  clearError:     () => void;
}

// -----------------------------------------------
// CONTEXT
// -----------------------------------------------
const AuthContext = createContext<AuthContextType>({
  user:             null,
  firebaseUser:     null,
  isAuthenticated:  false,
  isLoading:        true,
  error:            null,
  signInWithGoogle: async () => {},
  logout:           async () => {},
  getToken:         async () => null,
  clearError:       () => {},
});

// -----------------------------------------------
// PROVIDER
// -----------------------------------------------
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading,    setIsLoading]    = useState(true);
  const [error,        setError]        = useState<string | null>(null);

  // Map Firebase User to our AuthUser
  const user: AuthUser | null = useMemo(() => {
    if (!firebaseUser) return null;
    return {
      uid:           firebaseUser.uid,
      email:         firebaseUser.email,
      displayName:   firebaseUser.displayName,
      photoURL:      firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
    };
  }, [firebaseUser]);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      setIsLoading(false);
      if (fbUser) {
        logger.info(`Auth state: signed in as ${fbUser.email}`);
      } else {
        logger.info('Auth state: signed out');
      }
    });
    return () => unsubscribe();
  }, []);

  // Google Sign In
  const signInWithGoogle = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      logger.info('Google sign in successful');
    } catch (err: unknown) {
      const message = err instanceof Error
        ? err.message
        : 'Sign in failed. Please try again.';
      setError(message);
      logger.error('Google sign in failed', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    setError(null);
    try {
      await signOut(auth);
      logger.info('Sign out successful');
    } catch (err: unknown) {
      const message = err instanceof Error
        ? err.message
        : 'Sign out failed.';
      setError(message);
      logger.error('Sign out failed', err);
    }
  }, []);

  // Get ID Token
  const getToken = useCallback(async (): Promise<string | null> => {
    if (!firebaseUser) return null;
    try {
      return await getIdToken(firebaseUser, false);
    } catch (err) {
      logger.error('Failed to get token', err);
      return null;
    }
  }, [firebaseUser]);

  // Clear error
  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(
    () => ({
      user,
      firebaseUser,
      isAuthenticated: !!user,
      isLoading,
      error,
      signInWithGoogle,
      logout,
      getToken,
      clearError,
    }),
    [
      user,
      firebaseUser,
      isLoading,
      error,
      signInWithGoogle,
      logout,
      getToken,
      clearError,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// -----------------------------------------------
// HOOK
// -----------------------------------------------
export const useAuth = (): AuthContextType => useContext(AuthContext);

export default AuthContext;