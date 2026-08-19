'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, HelperText, PageHeader, Panel, RadioButton, Select, useToast } from '@design-finity/design-system';

const holidayPayMethodOptions = [
  { value: 'accrued',  label: 'Accrued and retained holiday pay', description: 'Workers earn holiday as they work and take it as paid time off. The employer tracks their holiday entitlement.' },
  { value: 'advanced', label: 'Advanced holiday pay', description: "Workers are paid their holiday entitlement as part of their regular pay, shown on their payslip. They are not paid separately when taking time off." },
];

const alwaysFields = [
  'Full name',
  'Date of birth',
  'Mobile number',
  'Personal address',
  'Nationality',
  'Job title',
];

const workerStatusOptions = [
  { value: 'new-starter', label: 'New starter' },
  { value: 'registered',  label: 'Registered' },
];

type FormState = {
  rtwCollection: 'on-form' | 'other-service';
  holidayPayChoice: 'allow-user' | 'company-default';
  workerStatus: string;
};

const initialState: FormState = {
  rtwCollection: 'on-form',
  holidayPayChoice: 'allow-user',
  workerStatus: 'new-starter',
};

export default function UmbrellaFormConfigPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const { toast } = useToast();

  const update = (updates: Partial<FormState>) => setForm(f => ({ ...f, ...updates }));
  const handleCancel = () => router.push('/onboarding-forms');
  const handleSave = () => toast('Changes saved');

  return (
    <div style={{ padding: '0 var(--spacing-32) var(--spacing-32)', maxWidth: 640, width: '100%', margin: '0 auto' }}>

      <PageHeader
        title="Umbrella form configuration"
        description="Configure the fields shown to Umbrella workers during registration."
        size="medium"
        bottomSlot={
          <Alert variant="info" emphasis="subtle">
            Changes apply to future registrations only. Workers who have already started or completed registration will not be affected.
          </Alert>
        }
      />

      <div style={{ marginTop: 'var(--spacing-20)' }}>
      <Panel title="Personal details" description="Workers are required to provide the following details.">
        <div className="grid" style={{ gridTemplateColumns: '1fr 90px 90px', gap: 'var(--spacing-16)', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <span className="font-semibold" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-8) 0' }}>Field</span>
          <span className="font-semibold" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-8) 0' }}>Show</span>
          <span className="font-semibold" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-8) 0' }}>Required</span>
        </div>
        {alwaysFields.map(field => (
          <div key={field} className="grid items-center" style={{ gridTemplateColumns: '1fr 90px 90px', gap: 'var(--spacing-16)', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <span className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-12) 0' }}>{field}</span>
            <span className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)', padding: 'var(--spacing-12) 0' }}>Always</span>
            <span className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)', padding: 'var(--spacing-12) 0' }}>Always</span>
          </div>
        ))}
        <div className="grid items-start" style={{ gridTemplateColumns: '1fr 90px 90px', gap: 'var(--spacing-16)' }}>
          <div style={{ padding: 'var(--spacing-12) 0' }}>
            <p className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)' }}>NI number</p>
            <div style={{ marginTop: 'var(--spacing-4)' }}>
              <HelperText>Overseas workers can mark this as optional while waiting for an NI number</HelperText>
            </div>
          </div>
          <span className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)', padding: 'var(--spacing-12) 0' }}>Always</span>
          <span className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)', padding: 'var(--spacing-12) 0' }}>Always</span>
        </div>
      </Panel>
      </div>

      <div style={{ marginTop: 'var(--spacing-16)' }}>
        <Panel title="Right to work" description="Set whether workers provide right-to-work documents during registration or through a separate process.">
          <div className="flex flex-col" style={{ gap: 'var(--spacing-16)' }}>
            <RadioButton
              label="Required on Worker registration"
              description="Workers upload one or more right-to-work documents during registration"
              name="rtw-collection-umb"
              checked={form.rtwCollection === 'on-form'}
              onChange={() => update({ rtwCollection: 'on-form' })}
            />
            <RadioButton
              label="Collected elsewhere"
              description="Workers provide right-to-work documents outside Worker registration"
              name="rtw-collection-umb"
              checked={form.rtwCollection === 'other-service'}
              onChange={() => update({ rtwCollection: 'other-service' })}
            />
          </div>
        </Panel>
      </div>

      <div style={{ marginTop: 'var(--spacing-16)' }}>
        <Panel title="New starter checklist" description="Workers are required to complete the new starter declaration.">
          <div className="grid" style={{ gridTemplateColumns: '1fr 90px 90px', gap: 'var(--spacing-16)', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <span className="font-semibold" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-8) 0' }}>Field</span>
            <span className="font-semibold" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-8) 0' }}>Show</span>
            <span className="font-semibold" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-8) 0' }}>Required</span>
          </div>
          <div className="grid items-center" style={{ gridTemplateColumns: '1fr 90px 90px', gap: 'var(--spacing-16)' }}>
            <span className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-12) 0' }}>New starter checklist</span>
            <span className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)', padding: 'var(--spacing-12) 0' }}>Always</span>
            <span className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)', padding: 'var(--spacing-12) 0' }}>Always</span>
          </div>
        </Panel>
      </div>

      <div style={{ marginTop: 'var(--spacing-16)' }}>
        <Panel
          title="Holiday pay method"
          description="Set whether workers choose their own holiday pay method or use the default settings."
        >
          <div className="flex flex-col" style={{ gap: 'var(--spacing-16)' }}>
            <RadioButton
              label="Allow workers to choose their holiday pay method"
              name="holiday-pay-choice-umb"
              checked={form.holidayPayChoice === 'allow-user'}
              onChange={() => update({ holidayPayChoice: 'allow-user' })}
            />
            {form.holidayPayChoice === 'allow-user' && (
              <div style={{ backgroundColor: 'var(--color-bg-muted)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-16)' }}>
                <div className="flex flex-col" style={{ gap: 'var(--spacing-12)' }}>
                  {holidayPayMethodOptions.map(opt => (
                    <div key={opt.value}>
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)' }}>{opt.label}</p>
                      <p className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)' }}>{opt.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <RadioButton
              label="Use the company default settings"
              name="holiday-pay-choice-umb"
              checked={form.holidayPayChoice === 'company-default'}
              onChange={() => update({ holidayPayChoice: 'company-default' })}
            />
          </div>
        </Panel>
      </div>

      <div style={{ marginTop: 'var(--spacing-16)' }}>
        <Panel title="Bank details" description="Workers are required to provide their bank details for payment.">
          <div className="grid" style={{ gridTemplateColumns: '1fr 90px 90px', gap: 'var(--spacing-16)', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <span className="font-semibold" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-8) 0' }}>Field</span>
            <span className="font-semibold" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-8) 0' }}>Show</span>
            <span className="font-semibold" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-8) 0' }}>Required</span>
          </div>
          {['Account name', 'Account number', 'Sort code'].map((field, i, arr) => (
            <div key={field} className="grid items-center" style={{ gridTemplateColumns: '1fr 90px 90px', gap: 'var(--spacing-16)', borderBottom: i < arr.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}>
              <span className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-12) 0' }}>{field}</span>
              <span className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)', padding: 'var(--spacing-12) 0' }}>Always</span>
              <span className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)', padding: 'var(--spacing-12) 0' }}>Always</span>
            </div>
          ))}
        </Panel>
      </div>

      <div style={{ marginTop: 'var(--spacing-16)' }}>
        <Panel
          title="Worker status after approval"
          description="Set the worker's status when their registration is approved."
          action={
            <div style={{ width: 160 }}>
              <Select options={workerStatusOptions} value={form.workerStatus} onChange={v => update({ workerStatus: v })} size="medium" />
            </div>
          }
        />
      </div>

      <div className="flex items-center justify-start" style={{ gap: 'var(--spacing-8)', marginTop: 'var(--spacing-24)' }}>
        <Button variant="secondary" size="medium" onClick={handleCancel}>Go back</Button>
        <Button variant="primary" size="medium" onClick={handleSave}>Save changes</Button>
      </div>

    </div>
  );
}
