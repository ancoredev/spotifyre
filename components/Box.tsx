import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: FC<BoxProps> = ({
  children,
  className
}) => {
  return <div
    className={twMerge(`
      bg-neutral-900
      rounded-lg
      g-fit
      w-full
      `, className)}
  >
    <div className=''></div>
    {children}</div>
}

export default Box