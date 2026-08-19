'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, HelperText, PageHeader, Panel, RadioButton, Select, useToast } from '@design-finity/design-system';

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
  legalTaxRequired: 'required' | 'not-required';
  workerStatus: string;
};

const initialState: FormState = {
  rtwCollection: 'on-form',
  legalTaxRequired: 'required',
  workerStatus: 'new-starter',
};

export default function SubcontractorFormConfigPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const { toast } = useToast();

  const update = (updates: Partial<FormState>) => setForm(f => ({ ...f, ...updates }));
  const handleCancel = () => router.push('/form-configuration');
  const handleSave = () => toast('Changes saved');

  return (
    <div style={{ padding: '0 var(--spacing-32) var(--spacing-32)', maxWidth: 640, width: '100%', margin: '0 auto' }}>

      <PageHeader
        title="Subcontractor form configuration"
        description="Configure the fields shown to subcontractor workers during registration."
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
              label="Collect during Worker Registration"
              description="Workers upload the required documents as part of their registration"
              name="rtw-collection-sub"
              checked={form.rtwCollection === 'on-form'}
              onChange={() => update({ rtwCollection: 'on-form' })}
            />
            <RadioButton
              label="Collect elsewhere"
              description="Workers provide the documents outside of Worker Registration"
              name="rtw-collection-sub"
              checked={form.rtwCollection === 'other-service'}
              onChange={() => update({ rtwCollection: 'other-service' })}
            />
          </div>
        </Panel>
      </div>

      <div style={{ marginTop: 'var(--spacing-16)' }}>
        <Panel
          title="Legal and Tax"
          description="Set whether workers need to provide legal and tax details during Worker Registration."
        >
          <div className="flex flex-col" style={{ gap: 'var(--spacing-16)' }}>
            <RadioButton
              label="Required during Worker Registration"
              description="Workers provide their legal and tax details during registration"
              name="legal-tax-required-sub"
              checked={form.legalTaxRequired === 'required'}
              onChange={() => update({ legalTaxRequired: 'required' })}
            />
            {form.legalTaxRequired === 'required' && (
              <div style={{ backgroundColor: 'var(--color-bg-muted)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-16)' }}>
                <p className="font-semibold" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-8)' }}>Field</p>
                {['CIS reference number', 'VAT registration status', 'Related tax details'].map((field, i, arr) => (
                  <p key={field} className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-default)', padding: 'var(--spacing-12) 0', borderBottom: i < arr.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}>{field}</p>
                ))}
              </div>
            )}
            <RadioButton
              label="Not required"
              description="Workers do not need to provide legal and tax details during registration"
              name="legal-tax-required-sub"
              checked={form.legalTaxRequired === 'not-required'}
              onChange={() => update({ legalTaxRequired: 'not-required' })}
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
