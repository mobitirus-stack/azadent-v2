import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// Generic hook to fetch content from Supabase with a fallback
export function useContent<T>(slug: string, fallbackData: T) {
    const [data, setData] = useState<T>(fallbackData);
    const [loading, setLoading] = useState(true);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        let isMounted = true;

        if (!supabase) {
            setLoading(false);
            return;
        }

        async function fetchContent() {
            try {
                const { data: dbData } = await supabase!
                    .from('content')
                    .select('value')
                    .eq('slug', slug)
                    .single();

                if (dbData?.value && isMounted) {
                    setData(dbData.value as T);
                }
            } catch (e) {
                console.error(`Error fetching content for ${slug}:`, e);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        async function checkAuth() {
            const { data: { session } } = await supabase!.auth.getSession();
            if (session && isMounted) {
                setIsEditable(true);
            }
        }

        fetchContent();
        checkAuth();

        return () => {
            isMounted = false;
        };
    }, [slug]);

    return { data, loading, isEditable };
}
