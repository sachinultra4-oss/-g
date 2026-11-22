import { Toaster as Sonner, type ToasterProps } from 'sonner';

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--cream)',
          color: 'var(--charcoal)',
          border: '1px solid var(--line)',
          borderRadius: '6px',
          boxShadow: 'var(--shadow-2)',
          fontFamily: 'var(--font-sans)',
        },
      }}
      {...props}
    />
  );
}
