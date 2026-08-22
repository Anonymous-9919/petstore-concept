"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AccountUser {
  email: string;
  name: string;
}

interface AccountState {
  user: AccountUser | null;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

/**
 * Account auth layer.
 *
 * TODAY: local demo accounts (concept build - no backend).
 * WOOCOMMERCE: swap the implementations for the WooCommerce Store API:
 *   - register -> POST /wp-json/wc/store/v1/customers (or wc/v3/customers via admin proxy)
 *   - login    -> WordPress JWT (e.g. /wp-json/jwt-auth/v1/token) then store token
 *   - cart     -> cart is already a persisted store; on login it syncs to the
 *                 customer session via /wp-json/wc/store/v1/cart/add-item
 *   - history  -> GET /wp-json/wc/v3/orders?customer=<id> for the account page
 */
const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      user: null,

      register: async (name, email, password) => {
        if (!name.trim()) return { ok: false, error: "Please enter your name" };
        if (!validateEmail(email)) return { ok: false, error: "Please enter a valid email" };
        if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters" };
        // TODO(Woo): POST to Store API instead of local persistence
        set({ user: { name: name.trim(), email: email.trim().toLowerCase() } });
        return { ok: true };
      },

      login: async (email, password) => {
        if (!validateEmail(email)) return { ok: false, error: "Please enter a valid email" };
        if (!password) return { ok: false, error: "Please enter your password" };
        // TODO(Woo): exchange credentials for a JWT here
        set({ user: { name: email.split("@")[0], email: email.trim().toLowerCase() } });
        return { ok: true };
      },

      logout: () => set({ user: null }),
    }),
    { name: "petstore-account" }
  )
);
