import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null; needsEmailConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  /** Envía el mail con el enlace de recuperación. */
  requestPasswordReset: (email: string) => Promise<{ error: string | null }>;
  /** Fija la contraseña nueva durante una sesión de recuperación. */
  updatePassword: (password: string) => Promise<{ error: string | null }>;
  /** true cuando el usuario llegó desde el enlace del mail. */
  isRecovering: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
