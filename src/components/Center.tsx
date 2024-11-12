import { PropsWithChildren } from 'react'
import { clsx } from 'clsx'

export default function Center({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={clsx('flex flex-col items-center justify-center', className)}>{children}</div>
}
