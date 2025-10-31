import type { ReactNode } from 'react';
import { Logo } from '@/components/logo';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm">
            <div className="mb-6 flex justify-center">
                <Logo />
            </div>
            {children}
        </div>
    </main>
  );
}
