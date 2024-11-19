'use client'

import ky from 'ky'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import Center from '@/components/Center'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '@mui/material'
import { TextField } from 'formik-mui'
import { clsx } from 'clsx'
import Link from 'next/link'

interface RegisterForm {
  username: string
  email: string
  password: string
}

const initialValues: RegisterForm = {
  username: '',
  email: '',
  password: ''
}

const validationSchema: Yup.ObjectSchema<RegisterForm> = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
})

export default function Register() {
  const router = useRouter()

  async function createUser(values: RegisterForm) {
    const success = (await ky.post('/api/user', { json: values }).json()) as boolean
    if (success) {
      router.replace('/login')
    } else {
      toast.error('Username already exists')
    }
  }

  return (
    <Center className="h-full gap-8">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createUser}>
        {({ isSubmitting }) => (
          <Form className={clsx('flex flex-col gap-4 w-80', isSubmitting && 'pointer-events-none')}>
            <Field type="text" label="Username" name="username" component={TextField} />
            <Field type="email" label="Email" name="email" component={TextField} />
            <Field type="password" label="Password" name="password" component={TextField} />
            <Button type="submit" variant="contained">
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Link href="/login" className="hover:underline text-xs">
        Login
      </Link>
    </Center>
  )
}