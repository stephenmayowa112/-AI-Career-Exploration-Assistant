import { cn } from '../lib/utils';

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-bold uppercase tracking-widest transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/80': variant === 'primary',
          'bg-[#FF5F1F] text-white hover:bg-[#FF5F1F]/80': variant === 'secondary',
          'border-2 border-[#1A1A1A] bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white': variant === 'outline',
          'hover:bg-black/5 text-[#1A1A1A]': variant === 'ghost',
          'h-10 px-4 text-[10px]': size === 'sm',
          'h-12 px-6 text-xs': size === 'md',
          'h-14 px-8 text-sm': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
