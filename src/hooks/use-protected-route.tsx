import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Loading from '@/components/ui/loading';

export function ProtectedRouteWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setIsLoading(false);
        router.push('/login');
      }
    };
    checkUser();
  }, [router]);

  if (isLoading) return <Loading />;

  return <>{children}</>;
}
