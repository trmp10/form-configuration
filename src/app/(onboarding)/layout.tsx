'use client';

import { usePathname } from 'next/navigation';
import { Sidebar, ToastProvider } from '@design-finity/design-system';
import type { SidebarNavSection } from '@design-finity/design-system';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const nav: SidebarNavSection[] = [
    {
      items: [
        { label: 'Form configuration', href: '/onboarding-forms', active: pathname === '/' || pathname.startsWith('/onboarding-forms') },
      ],
    },
  ];

  return (
    <ToastProvider>
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
      <Sidebar
        nav={nav}
        fixed
        header={
          <div className="flex items-center gap-[var(--spacing-8)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.svg" alt="finity" width={32} height={32} className="shrink-0" />
            <span className="font-semibold" style={{ color: 'var(--color-base-white)', fontSize: 'var(--font-size-heading-sm)' }}>
              Finity
            </span>
          </div>
        }
      />
      <div className="flex-1 flex flex-col min-w-0" style={{ marginLeft: 'var(--sidebar-width)' }}>
        {children}
      </div>
    </div>
    </ToastProvider>
  );
}
