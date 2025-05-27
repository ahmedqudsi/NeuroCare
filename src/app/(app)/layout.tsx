
"use client";

import type { ReactNode } from 'react';
import { Header } from '@/components/layout/header';
import { CartProvider } from '@/context/CartContext';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </CartProvider>
  );
}
