import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DEFAULT_MESSAGE = "Sign in to continue.";

/**
 * Returns a function that sends guests to /login with an optional banner message
 * and preserves the current path for post-login redirect. Returns true if the user is logged in.
 */
export function useRequireLogin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const requireLogin = useCallback(
    (message?: string) => {
      if (user) {
        return true;
      }
      navigate("/login", {
        state: {
          guestNotice: message ?? DEFAULT_MESSAGE,
          from: `${location.pathname}${location.search}`,
        },
      });
      return false;
    },
    [user, navigate, location.pathname, location.search]
  );

  return requireLogin;
}
