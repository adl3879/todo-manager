'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

interface SignupData {
  email: string;
  password: string;
}

interface SignupResult {
  error?: string;
  success?: string;
}

export async function signup(formData: SignupData): Promise<SignupResult> {
  const supabase = createClient();

  const data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }
  return { success: 'Check your email for a confirmation link.' };
}
