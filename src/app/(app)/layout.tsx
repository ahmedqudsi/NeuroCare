"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Header } from '@/components/layout/header';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" side="left">
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
              {siteConfig.name}
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {siteConfig.sidebarNav.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                  tooltip={item.label}
                  className={cn(
                    "justify-start",
                     pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                      ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
