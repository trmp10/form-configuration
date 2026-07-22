'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, LabelBadge, RadioButton, Select, Tabs, Toggle } from '@design-finity/design-system';

const tabs = [
  { id: 'umbrella',      label: 'Umbrella' },
  { id: 'paye',          label: 'PAYE' },
  { id: 'subcontractor', label: 'Subcontractor' },
];


const alwaysFields = [
  'Full name',
  'Date of birth',
  'Mobile number',
  'Personal address',
  'Nationality',
  'Job title',
];


type TabData = {
  niShow: boolean;
  niRequired: boolean;
  showRtw: boolean;
  rtwDoc: 'single' | 'multiple';
  workerStatus: string;
  holidayPayMethod: 'worker' | 'admin';
  showLegalTax: boolean;
};

const makeTabData = (): TabData => ({
  niShow: true,
  niRequired: false,
  showRtw: true,
  rtwDoc: 'single',
  workerStatus: 'new-starter',
  holidayPayMethod: 'worker',
  showLegalTax: true,
});

const workerStatusOptions = [
  { value: 'new-starter-minimal', label: 'New starter minimal' },
  { value: 'new-starter',         label: 'New starter' },
  { value: 'registered',          label: 'Registered' },
];

export default function OnboardingFormsPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [tabData, setTabData] = useState<Record<string, TabData>>({
    paye: makeTabData(),
    subcontractor: makeTabData(),
    umbrella: makeTabData(),
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tab = tabData[activeTab];

  const updateTab = (updates: Partial<TabData>) => {
    setTabData(d => ({ ...d, [activeTab]: { ...d[activeTab], ...updates } }));
    setSaveStatus('saving');
    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    saveTimer.current = setTimeout(() => {
      setSaveStatus('saved');
      savedTimer.current = setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };

  useEffect(() => () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (savedTimer.current) clearTimeout(savedTimer.current);
  }, []);

  return (
    <div style={{ padding: 'var(--spacing-32)', maxWidth: 1080, width: '100%', margin: '0 auto' }}>

      <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-24)' }}>
        <div>
          <h1
            className="font-semibold"
            style={{ fontSize: 'var(--font-size-heading-lg)', lineHeight: 'var(--line-height-heading-lg)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}
          >
            Onboarding forms
          </h1>
          <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>
            Configure fields shown to workers during onboarding registration.
          </p>
        </div>
        <Button variant="secondary" size="medium">Activity log</Button>
      </div>

      <div style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Tabs noBorder items={tabs} value={activeTab} onChange={setActiveTab} className="w-full" />
      </div>

      <div style={{ paddingTop: 'var(--spacing-24)' }}>
        {activeTab === 'paye' && (
          <div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', overflow: 'hidden' }}>
              <div style={{ padding: 'var(--spacing-20)' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Personal details</p>
                    <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>
                      {alwaysFields.join('  ⋅  ')}
                    </p>
                  </div>
                  <LabelBadge label="Required" variant="neutral" size="small" />
                </div>
              </div>
              <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border-subtle)', padding: 'var(--spacing-20)' }}>
                <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-default)' }}>NI number</p>
                <div className="flex items-center" style={{ gap: 'var(--spacing-32)' }}>
                  <div className="flex items-center" style={{ gap: 'var(--spacing-8)' }}>
                    <span className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Show</span>
                    <Toggle checked={tab.niShow} onChange={() => updateTab({ niShow: !tab.niShow })} />
                  </div>
                  <div className="flex items-center" style={{ gap: 'var(--spacing-8)' }}>
                    <span className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Required</span>
                    <Toggle checked={tab.niRequired} onChange={() => updateTab({ niRequired: !tab.niRequired })} disabled={!tab.niShow} />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <div className="flex items-start justify-between" style={{ marginBottom: tab.showRtw ? 'var(--spacing-20)' : 0 }}>
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Right to work</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>
                    Workers will be asked to provide right to work documents during registration.
                  </p>
                </div>
                <div className="flex items-center" style={{ gap: 'var(--spacing-8)' }}>
                  <span className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Show</span>
                  <Toggle checked={tab.showRtw} onChange={() => updateTab({ showRtw: !tab.showRtw })} />
                </div>
              </div>
              {tab.showRtw && (
                <div className="flex items-center" style={{ gap: 'var(--spacing-24)' }}>
                  <RadioButton label="One document" name="rtw-doc-paye" checked={tab.rtwDoc === 'single'} onChange={() => updateTab({ rtwDoc: 'single' })} />
                  <RadioButton label="Multiple documents" name="rtw-doc-paye" checked={tab.rtwDoc === 'multiple'} onChange={() => updateTab({ rtwDoc: 'multiple' })} />
                </div>
              )}
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>HMRC starter form statement</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Starter declaration</p>
                </div>
                <LabelBadge label="Required" variant="neutral" size="small" />
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Holiday pay method</p>
              <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-20)' }}>
                Choose whether the worker sets their own holiday pay rate, or whether an admin defines it.
              </p>
              <div className="flex items-start" style={{ gap: 'var(--spacing-32)' }}>
                <RadioButton label="Worker sets rate" name="holiday-pay-paye" checked={tab.holidayPayMethod === 'worker'} onChange={() => updateTab({ holidayPayMethod: 'worker' })} />
                <RadioButton label="Admin sets rate" name="holiday-pay-paye" checked={tab.holidayPayMethod === 'admin'} onChange={() => updateTab({ holidayPayMethod: 'admin' })} />
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Payment details</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Account name  ⋅  Account number  ⋅  Sort code</p>
                </div>
                <LabelBadge label="Required" variant="neutral" size="small" />
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>On approval</p>
              <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-20)' }}>
                Define what happens automatically when a worker&apos;s registration is approved.
              </p>
              <div className="flex items-center justify-between" style={{ paddingTop: 'var(--spacing-12)' }}>
                <div style={{ maxWidth: 560 }}>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Worker status after approval</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)' }}>The employment status assigned to the worker when their registration is approved</p>
                </div>
                <div style={{ width: 160, flexShrink: 0 }}>
                  <Select options={workerStatusOptions} value={tab.workerStatus} onChange={v => updateTab({ workerStatus: v })} size="medium" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subcontractor' && (
          <div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', overflow: 'hidden' }}>
              <div style={{ padding: 'var(--spacing-20)' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Personal details</p>
                    <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>
                      {alwaysFields.join('  ⋅  ')}
                    </p>
                  </div>
                  <LabelBadge label="Required" variant="neutral" size="small" />
                </div>
              </div>
              <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border-subtle)', padding: 'var(--spacing-20)' }}>
                <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-default)' }}>NI number</p>
                <div className="flex items-center" style={{ gap: 'var(--spacing-32)' }}>
                  <div className="flex items-center" style={{ gap: 'var(--spacing-8)' }}>
                    <span className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Show</span>
                    <Toggle checked={tab.niShow} onChange={() => updateTab({ niShow: !tab.niShow })} />
                  </div>
                  <div className="flex items-center" style={{ gap: 'var(--spacing-8)' }}>
                    <span className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Required</span>
                    <Toggle checked={tab.niRequired} onChange={() => updateTab({ niRequired: !tab.niRequired })} disabled={!tab.niShow} />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <div className="flex items-start justify-between" style={{ marginBottom: tab.showRtw ? 'var(--spacing-20)' : 0 }}>
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Right to work</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>
                    Workers will be asked to provide right to work documents during registration.
                  </p>
                </div>
                <div className="flex items-center" style={{ gap: 'var(--spacing-8)' }}>
                  <span className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Show</span>
                  <Toggle checked={tab.showRtw} onChange={() => updateTab({ showRtw: !tab.showRtw })} />
                </div>
              </div>
              {tab.showRtw && (
                <div className="flex items-center" style={{ gap: 'var(--spacing-24)' }}>
                  <RadioButton label="One document" name="rtw-doc-sub" checked={tab.rtwDoc === 'single'} onChange={() => updateTab({ rtwDoc: 'single' })} />
                  <RadioButton label="Multiple documents" name="rtw-doc-sub" checked={tab.rtwDoc === 'multiple'} onChange={() => updateTab({ rtwDoc: 'multiple' })} />
                </div>
              )}
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>HMRC starter form statement</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Starter declaration</p>
                </div>
                <LabelBadge label="Required" variant="neutral" size="small" />
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Legal and Tax</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>
                    Collects CIS reference number  ⋅  VAT registration status  ⋅  Related tax details
                  </p>
                </div>
                <div className="flex items-center" style={{ gap: 'var(--spacing-8)' }}>
                  <span className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Show</span>
                  <Toggle checked={tab.showLegalTax} onChange={() => updateTab({ showLegalTax: !tab.showLegalTax })} />
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Payment details</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Account name  ⋅  Account number  ⋅  Sort code</p>
                </div>
                <LabelBadge label="Required" variant="neutral" size="small" />
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>On approval</p>
              <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-20)' }}>
                Define what happens automatically when a worker&apos;s registration is approved.
              </p>
              <div className="flex items-center justify-between" style={{ paddingTop: 'var(--spacing-12)' }}>
                <div style={{ maxWidth: 560 }}>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Worker status after approval</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)' }}>The employment status assigned to the worker when their registration is approved</p>
                </div>
                <div style={{ width: 160, flexShrink: 0 }}>
                  <Select options={workerStatusOptions} value={tab.workerStatus} onChange={v => updateTab({ workerStatus: v })} size="medium" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'umbrella' && (
          <div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', overflow: 'hidden' }}>
              <div style={{ padding: 'var(--spacing-20)' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Personal details</p>
                    <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>
                      {alwaysFields.join('  ⋅  ')}
                    </p>
                  </div>
                  <LabelBadge label="Required" variant="neutral" size="small" />
                </div>
              </div>
              <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border-subtle)', padding: 'var(--spacing-20)' }}>
                <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-default)' }}>NI number</p>
                <div className="flex items-center" style={{ gap: 'var(--spacing-32)' }}>
                  <div className="flex items-center" style={{ gap: 'var(--spacing-8)' }}>
                    <span className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Show</span>
                    <Toggle checked={tab.niShow} onChange={() => updateTab({ niShow: !tab.niShow })} />
                  </div>
                  <div className="flex items-center" style={{ gap: 'var(--spacing-8)' }}>
                    <span className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Required</span>
                    <Toggle checked={tab.niRequired} onChange={() => updateTab({ niRequired: !tab.niRequired })} disabled={!tab.niShow} />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <div className="flex items-start justify-between" style={{ marginBottom: tab.showRtw ? 'var(--spacing-20)' : 0 }}>
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Right to work</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>
                    Workers will be asked to provide right to work documents during registration.
                  </p>
                </div>
                <div className="flex items-center" style={{ gap: 'var(--spacing-8)' }}>
                  <span className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Show</span>
                  <Toggle checked={tab.showRtw} onChange={() => updateTab({ showRtw: !tab.showRtw })} />
                </div>
              </div>
              {tab.showRtw && (
                <div className="flex items-center" style={{ gap: 'var(--spacing-24)' }}>
                  <RadioButton label="One document" name="rtw-doc-umb" checked={tab.rtwDoc === 'single'} onChange={() => updateTab({ rtwDoc: 'single' })} />
                  <RadioButton label="Multiple documents" name="rtw-doc-umb" checked={tab.rtwDoc === 'multiple'} onChange={() => updateTab({ rtwDoc: 'multiple' })} />
                </div>
              )}
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>HMRC starter form statement</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Starter declaration</p>
                </div>
                <LabelBadge label="Required" variant="neutral" size="small" />
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Holiday pay method</p>
              <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-20)' }}>
                Choose whether the worker sets their own holiday pay rate, or whether an admin defines it.
              </p>
              <div className="flex items-start" style={{ gap: 'var(--spacing-32)' }}>
                <RadioButton label="Worker sets rate" name="holiday-pay-umb" checked={tab.holidayPayMethod === 'worker'} onChange={() => updateTab({ holidayPayMethod: 'worker' })} />
                <RadioButton label="Admin sets rate" name="holiday-pay-umb" checked={tab.holidayPayMethod === 'admin'} onChange={() => updateTab({ holidayPayMethod: 'admin' })} />
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Payment details</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>Account name  ⋅  Account number  ⋅  Sort code</p>
                </div>
                <LabelBadge label="Required" variant="neutral" size="small" />
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-default)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-medium)', padding: 'var(--spacing-20)', marginTop: 'var(--spacing-16)' }}>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-heading-sm)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>On approval</p>
              <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-20)' }}>
                Define what happens automatically when a worker&apos;s registration is approved.
              </p>
              <div className="flex items-center justify-between" style={{ paddingTop: 'var(--spacing-12)' }}>
                <div style={{ maxWidth: 560 }}>
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}>Worker status after approval</p>
                  <p className="font-medium" style={{ fontSize: 'var(--font-size-compact)', color: 'var(--color-text-tertiary)' }}>The employment status assigned to the worker when their registration is approved</p>
                </div>
                <div style={{ width: 160, flexShrink: 0 }}>
                  <Select options={workerStatusOptions} value={tab.workerStatus} onChange={v => updateTab({ workerStatus: v })} size="medium" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
