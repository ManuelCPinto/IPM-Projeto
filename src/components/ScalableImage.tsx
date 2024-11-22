import Image from 'next/image'
import { clsx } from 'clsx'

export function ScalableImage({ src, alt = '', className }: { src: string; alt?: string; className?: string }) {
  return <Image src={src} alt={alt} className={clsx('w-full', className)} sizes="100vw" height={0} width={0} />
}
