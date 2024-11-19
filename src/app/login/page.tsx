'use client'

import ky from 'ky'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Center from '@/components/Center'
import { useRouter } from 'next/navigation'

interface LoginForm {
  username: string
  password: string
}

const initialValues: LoginForm = {
  username: '',
  password: ''
}

const validationSchema: Yup.ObjectSchema<LoginForm> = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

export default function Login() {
  const router = useRouter()

  async function createUser(values: LoginForm) {
    const success = (await ky.post('/api/user', { json: values }).json()) as boolean
    if (success) {
      router.replace('/player')
    }
  }

  return (
    <Center className="h-full">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createUser}>
        <Form className="flex flex-col gap-2 w-80">
          <div>
            <p>Username</p>
            <Field type="text" name="username" className="w-full text-black" />
            <ErrorMessage name="username" component="p" className="text-red-700" />
          </div>
          <div>
            <p>Password</p>
            <Field type="text" name="password" className="w-full text-black" />
            <ErrorMessage name="password" component="p" className="text-red-700" />
          </div>
          <div className="mt-2">
            <button type="submit" className="border-2 rounded py-1 px-4">
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </Center>
  )
}
