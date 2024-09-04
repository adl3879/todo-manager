'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from './actions';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export default function LogIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const result = await login(values);
    if (result.error) {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <div className="text-white max-w-lg mx-auto px-6 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold mb-2">Log in to your account</h1>
        <p className="text-xs text-gray-400 mb-6">
          Enter your email and password to log in to your account.
        </p>
        <Form {...form}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={() => setError(null)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-xs"
                      placeholder="your@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Password</FormLabel>
                  <FormControl>
                    <Input className="text-xs" placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Log in'}
            </Button>
          </form>
        </Form>
        <p className="text-xs text-gray-400 mt-2">
          Don&apos;t have an account yet?{' '}
          <Link href="/sign-up">
            <span className="text-blue-300 hover:underline">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
