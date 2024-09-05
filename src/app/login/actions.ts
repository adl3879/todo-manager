'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResult {
  success?: string;
  error?: string;
}

export async function login(formData: LoginData): Promise<LoginResult> {
  const supabase = createClient();

  const data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
  return { success: 'Login successful' };
}
