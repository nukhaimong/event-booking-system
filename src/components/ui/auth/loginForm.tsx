'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authService } from '@/service/auth/authService';

// Zod schema
const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginFormData,

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = 'logging';
      const { email, password } = value;
      try {
        toast.loading('Loging...', { id: toastId });
        const response = await authService.login({ email, password });
        console.log(response)

        if (response.error) {
          toast.error(response.error.message ||"Login Failed, please try again", { id: toastId });
          return;
        }
  
        toast.success("Login successful", { id: toastId });
        router.refresh();
        router.push('/');
      } catch (error) {
        console.log('Internal Server Error: ', error);
      }
    },
  });

 return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm mb-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* EMAIL */}
        <form.Field name="email">
          {(field) => (
            <div>
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter your email"
              />
              {field.state.meta.isTouched && field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-sm mt-1">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        {/* PASSWORD */}
        <form.Field name="password">
          {(field) => (
            <div>
              <label className="text-sm font-medium" htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter your password"
              />
              {field.state.meta.isTouched && field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-sm mt-1">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>
        {/* SUBMIT */}
        <Button
          type="submit"
          className="w-full"
          disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  )
}