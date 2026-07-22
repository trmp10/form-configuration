'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumb, Button, File } from '@design-finity/design-system';

function IconA() {
  return (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.125 11.75L9.5 10.875V7.21623M16.5 10C16.5 6.13401 13.366 3 9.5 3C5.63401 3 2.5 6.13401 2.5 10C2.5 13.866 5.63401 17 9.5 17C9.94861 17 10.3874 16.9578 10.8125 16.8772M15.1875 12.625V14.8125M15.1875 14.8125V17M15.1875 14.8125H17.375M15.1875 14.8125H13" stroke="currentColor" strokeWidth="1.55769" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconB() {
  return (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.2443 16V14.6667C13.2443 13.9594 12.9761 13.2811 12.4988 12.781C12.0214 12.281 11.374 12 10.6989 12H5.60795C4.93286 12 4.28541 12.281 3.80805 12.781C3.33068 13.2811 3.0625 13.9594 3.0625 14.6667V16M17.0625 16V14.6667C17.0621 14.0758 16.8744 13.5018 16.5288 13.0349C16.1833 12.5679 15.6995 12.2344 15.1534 12.0867M12.608 4.08667C13.1555 4.23353 13.6408 4.56713 13.9874 5.03487C14.3339 5.50261 14.522 6.07789 14.522 6.67C14.522 7.26211 14.3339 7.83739 13.9874 8.30513C13.6408 8.77287 13.1555 9.10647 12.608 9.25333M10.6989 6.66667C10.6989 8.13943 9.55923 9.33333 8.15341 9.33333C6.74759 9.33333 5.60795 8.13943 5.60795 6.66667C5.60795 5.19391 6.74759 4 8.15341 4C9.55923 4 10.6989 5.19391 10.6989 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

type FormType = 'type-a' | 'type-b' | 'type-c';

export default function NewOnboardingFormPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<FormType | null>(null);

  const selectType = (type: FormType) => {
    setSelectedType(prev => prev === type ? null : type);
  };

  return (
    <div style={{ padding: 'var(--spacing-32) var(--spacing-32) 120px', maxWidth: 1080, width: '100%', margin: '0 auto' }}>

      <div style={{ marginBottom: 'var(--spacing-16)' }}>
        <Breadcrumb
          items={[
            { label: 'Onboarding forms', onClick: () => router.push('/onboarding-forms') },
            { label: 'New onboarding form' },
          ]}
        />
      </div>
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-24)' }}>
        <h1 className="font-semibold" style={{ fontSize: 'var(--font-size-heading-lg)', lineHeight: 'var(--line-height-heading-lg)', color: 'var(--color-text-default)' }}>
          New onboarding form
        </h1>
      </div>

      <div className="grid grid-cols-3 items-stretch" style={{ gap: 'var(--spacing-16)' }}>
        <FormCard
          icon={<IconA />}
          title="Form type A"
          description="Description for form type A."
          selected={selectedType === 'type-a'}
          onClick={() => selectType('type-a')}
        />
        <FormCard
          icon={<IconB />}
          title="Form type B"
          description="Description for form type B."
          selected={selectedType === 'type-b'}
          onClick={() => selectType('type-b')}
        />
        <FormCard
          icon={<File style={{ width: 32, height: 32, color: 'var(--color-text-default)', marginLeft: -4 }} />}
          title="Form type C"
          description="Description for form type C."
          selected={selectedType === 'type-c'}
          onClick={() => selectType('type-c')}
        />
      </div>

      {/* Sticky bottom nav */}
      <div
        className="fixed bottom-0"
        style={{
          left: 'var(--sidebar-width)',
          right: 0,
          paddingTop: 'var(--spacing-12)',
          paddingBottom: 'var(--spacing-12)',
          backgroundColor: 'var(--color-bg-default)',
          borderTop: '1px solid var(--color-border-subtle)',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto', paddingLeft: 'var(--spacing-20)', paddingRight: 'var(--spacing-20)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--spacing-8)' }}>
          <Button variant="secondary" size="medium" onClick={() => router.push('/onboarding-forms')}>Cancel</Button>
          {selectedType && (
            <Button variant="primary" size="medium" onClick={() => router.push(`/onboarding-forms/upload?type=${selectedType}`)}>
              Continue
            </Button>
          )}
        </div>
      </div>

    </div>
  );
}

type FormCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};

function FormCard({ icon, title, description, selected, onClick }: FormCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="text-left cursor-pointer"
      style={{
        borderRadius: 'var(--radius-medium)',
        padding: 'var(--spacing-20)',
        backgroundColor: selected ? 'var(--color-coral-50)' : hovered ? 'var(--color-grey-100)' : 'var(--color-bg-default)',
        border: '1px solid var(--color-border-subtle)',
        outline: selected ? '2px solid var(--color-coral-400)' : 'none',
        outlineOffset: -1,
        transition: 'background-color 150ms ease',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ marginBottom: 'var(--spacing-12)', color: 'var(--color-text-default)' }}>{icon}</div>
      <p className="font-semibold" style={{ color: 'var(--color-text-default)', fontSize: 'var(--font-size-heading-sm)', marginBottom: 'var(--spacing-4)' }}>
        {title}
      </p>
      <p className="font-medium" style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-body)' }}>
        {description}
      </p>
    </button>
  );
}
