import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Universal hook for localStorage-based content management.
 * Replaces Supabase-based useContent hook.
 * 
 * @param key - localStorage key (e.g., 'admin.hero', 'admin.services')
 * @param defaultData - fallback data if nothing in localStorage
 */
export function useLocalContent<T>(key: string, defaultData: T) {
    const [data, setData] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            if (stored) {
                return JSON.parse(stored) as T;
            }
        } catch (e) {
            console.error(`Error reading localStorage key "${key}":`, e);
        }
        return defaultData;
    });
    const [loading, setLoading] = useState(false);

    // Save to localStorage
    const save = useCallback((newData?: T) => {
        try {
            const dataToSave = newData !== undefined ? newData : data;
            localStorage.setItem(key, JSON.stringify(dataToSave));
            if (newData !== undefined) {
                setData(newData);
            }
            toast.success('Išsaugota sėkmingai!');
            return true;
        } catch (e) {
            console.error(`Error saving to localStorage key "${key}":`, e);
            toast.error('Klaida saugant duomenis');
            return false;
        }
    }, [key, data]);

    // Reset to defaults
    const reset = useCallback(() => {
        localStorage.removeItem(key);
        setData(defaultData);
        toast.success('Atstatyta į numatytuosius');
    }, [key, defaultData]);

    return { data, setData, save, reset, loading };
}

/**
 * Read-only hook for frontend components.
 * Returns localStorage data with fallback to defaults.
 */
export function usePublicContent<T>(key: string, defaultData: T): { data: T; loading: boolean } {
    const [data] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            if (stored) {
                return JSON.parse(stored) as T;
            }
        } catch (e) {
            console.error(`Error reading localStorage key "${key}":`, e);
        }
        return defaultData;
    });

    return { data, loading: false };
}

/**
 * Convert a File to base64 data URL string.
 * Used for image uploads stored in localStorage.
 */
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}

/**
 * Check if admin is logged in (sessionStorage-based).
 */
export function isAdminLoggedIn(): boolean {
    return sessionStorage.getItem('admin_logged_in') === 'true';
}

export function adminLogin(password: string): boolean {
    // Simple password check - can be changed
    const ADMIN_PASSWORD = 'azadent2024';
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_logged_in', 'true');
        return true;
    }
    return false;
}

export function adminLogout(): void {
    sessionStorage.removeItem('admin_logged_in');
}
