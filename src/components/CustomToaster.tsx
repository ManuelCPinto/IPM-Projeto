'use client'

import { toast, ToastBar, Toaster } from 'react-hot-toast'

export const CustomToaster = () => (
  <Toaster position="bottom-right">
    {(t) => (
      <ToastBar toast={t}>
        {({ icon, message }) => (
          <>
            {icon}
            {message}
            {t.type !== 'loading' && <button onClick={() => toast.dismiss(t.id)}>X</button>}
          </>
        )}
      </ToastBar>
    )}
  </Toaster>
)
