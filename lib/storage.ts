"use client";

import type { PassData } from "./types";

const KEY = "pass-studio:v1";

export function loadPass(): PassData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PassData;
  } catch {
    return null;
  }
}

export function savePass(data: PassData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // ignore quota / private-mode errors
  }
}

export function clearPass(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
