import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuthUser = {
  name: string;
  email: string;
  photo?: string;
};

type StoredUser = AuthUser & { password: string };

const SESSION_KEY = "peakfit_session";
const USERS_KEY = "peakfit_registered_users";

const DEMO_EMAIL = "mateo@email.com";
const DEMO_PASSWORD = "1234";
const DEMO_NAME = "Mateo Rojas";

type AuthContextType = {
  user: AuthUser | null;
  /** false until session is read from localStorage (avoid redirect flash on refresh). */
  isAuthReady: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (data: AuthUser) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function readSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as AuthUser;
    if (data?.email && data?.name) return data;
    return null;
  } catch {
    return null;
  }
}

function getRegisteredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSession(user: AuthUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    setUser(readSession());
    setIsAuthReady(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const sessionUser = { name: DEMO_NAME, email: normalizedEmail };
      saveSession(sessionUser);
      setUser(sessionUser);
      return true;
    }

    const registered = getRegisteredUsers();
    const match = registered.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (match) {
      const sessionUser = { name: match.name, email: match.email };
      saveSession(sessionUser);
      setUser(sessionUser);
      return true;
    }

    return false;
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!name.trim() || !normalizedEmail || !password) return false;

    if (normalizedEmail === DEMO_EMAIL) return false;

    const registered = getRegisteredUsers();
    if (registered.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      return false;
    }

    const newUser: StoredUser = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };
    registered.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(registered));
    return true;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const updateUser = useCallback((data: AuthUser) => {
    saveSession(data);
    const registered = getRegisteredUsers();
    const updatedUsers = registered.map((storedUser) =>
      storedUser.email.toLowerCase() === user?.email.toLowerCase()
        ? { ...storedUser, name: data.name, email: data.email, photo: data.photo }
        : storedUser
    );
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    setUser(data);
  }, [user?.email]);

  const value = useMemo(
    () => ({ user, isAuthReady, login, register, logout, updateUser }),
    [user, isAuthReady, login, register, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider is missing in main.tsx");
  return ctx;
}
