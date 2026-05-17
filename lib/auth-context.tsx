"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { User } from "@/types";
import { getCurrentUser, setCurrentUser } from "./user-data";
import { verifyToken } from "./auth-utils";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

type AuthAction =
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "INIT"; payload: { user: User | null; token: string | null } };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
        isLoading: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "INIT":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        token: action.payload.token,
        isLoading: false,
      };
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "fanzhen_auth_token";

// 设置cookie（用于中间件验证）
function setCookie(name: string, value: string, days: number = 7) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/;SameSite=Lax`;
}

function removeCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          const payload = verifyToken(token);
          if (payload) {
            const user = getCurrentUser();
            if (user && user.id === payload.userId) {
              dispatch({ type: "INIT", payload: { user, token } });
              return;
            }
          }
          localStorage.removeItem(TOKEN_KEY);
          setCurrentUser(null);
          removeCookie(TOKEN_KEY);
        }
      } catch {
        // ignore
      }
      dispatch({ type: "INIT", payload: { user: null, token: null } });
    };

    initAuth();
  }, []);

  const login = useCallback((user: User, token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setCookie(TOKEN_KEY, token, 7);
    setCurrentUser(user);
    dispatch({ type: "LOGIN", payload: { user, token } });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    removeCookie(TOKEN_KEY);
    setCurrentUser(null);
    dispatch({ type: "LOGOUT" });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    if (!state.user) return;
    const updatedUser = { ...state.user, ...updates };
    setCurrentUser(updatedUser);
    dispatch({ type: "UPDATE_USER", payload: updatedUser });
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

export function useCurrentUser(): User | null {
  const { user } = useAuth();
  return user;
}
