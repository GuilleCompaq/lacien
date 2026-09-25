import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  /**
   * `redirectPath` es adónde vuelve el usuario tras confirmar el mail. Sin él,
   * Supabase manda al Site URL del proyecto, que por defecto es localhost.
   */
  signUp: (
    email: string,
    password: string,
    redirectPath?: string,
  ) => Promise<{ error: string | null; needsEmailConfirmation: boolean }>;
  /** Reenvía la confirmación: sin esto, un mail perdido deja la cuenta inutilizable. */
  resendConfirmation: (email: string, redirectPath?: string) => Promise<{ error: string | null }>;
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
