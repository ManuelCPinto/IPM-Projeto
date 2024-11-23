'use client';

import ky from 'ky';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Center from '@/components/Center';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Alert, Button } from '@mui/material';
import { TextField } from 'formik-mui';
import { clsx } from 'clsx';
import Link from 'next/link';

interface LoginForm {
  username: string;
  password: string;
}

const initialValues: LoginForm = {
  username: '',
  password: '',
};

const validationSchema: Yup.ObjectSchema<LoginForm> = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login() {
  const router = useRouter();

  async function loginUser(values: LoginForm) {
    try {
      // Convert `LoginForm` to a compatible format for `searchParams`
      const searchParams = new URLSearchParams({
        username: values.username,
        password: values.password,
      });
  
      const response = await ky
        .get('/api/user/login', { searchParams })
        .json<{ success: boolean; message?: string; user?: { username: string; name: string; email: string; type: string; password: string } }>();
  
      if (response.success && response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success('Login successful');
        router.replace('/player'); 
      } else {
        toast.error(response.message || 'Invalid username or password');
      }
    } catch (error) {
      toast.error('Network error or server unavailable');
      console.error(error);
    }
  }
    
  return (
    <Center className="h-full gap-8">
      <Alert severity="info">
        <p>Username: admin</p>
        <p>Password: admin123</p>
      </Alert>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={loginUser}>
        {({ isSubmitting }) => (
          <Form className={clsx('flex flex-col gap-4 w-80', isSubmitting && 'pointer-events-none')}>
            <Field type="text" label="Username" name="username" component={TextField} />
            <Field type="password" label="Password" name="password" component={TextField} />
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Link href="/register" className="hover:underline text-xs">
        Create account
      </Link>
    </Center>
  );
}
