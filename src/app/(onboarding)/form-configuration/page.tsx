'use client';

import { useRouter } from 'next/navigation';
import { DataTable, LabelBadge, type DataTableColumn } from '@design-finity/design-system';

type ConfigRow = {
  slug: string;
  workerType: string;
  lastModified: string;
};

const rows: ConfigRow[] = [
  { slug: 'subcontractor', workerType: 'Subcontractor', lastModified: '14/08/2026, 17:32:14' },
  { slug: 'paye',          workerType: 'PAYE',           lastModified: '18/08/2026, 09:30:59' },
  { slug: 'umbrella',      workerType: 'Umbrella',       lastModified: '18/08/2026, 10:22:57' },
];

const columns: DataTableColumn[] = [
  { type: 'custom', key: 'workerType',   label: 'Worker type' },
  { type: 'custom', key: 'status',       label: 'Status' },
  { type: 'custom', key: 'lastModified', label: 'Last modified' },
];

export default function OnboardingFormsPage() {
  const router = useRouter();

  return (
    <div style={{ padding: 'var(--spacing-32)', maxWidth: 1080, width: '100%', margin: '0 auto' }}>

      <div style={{ marginBottom: 'var(--spacing-24)' }}>
        <h1
          className="font-semibold"
          style={{ fontSize: 'var(--font-size-heading-lg)', lineHeight: 'var(--line-height-heading-lg)', color: 'var(--color-text-default)', marginBottom: 'var(--spacing-4)' }}
        >
          Form configuration
        </h1>
        <p className="font-medium" style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>
          Configure fields shown to workers on the Worker Registration Form.
        </p>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        sortColumn={null}
        sortDir="asc"
        onSort={() => {}}
        onRowClick={row => router.push(`/form-configuration/${row.slug}`)}
        page={1}
        totalPages={1}
        perPage={rows.length}
        onPageChange={() => {}}
        onPerPageChange={() => {}}
        hideOnSinglePage
        renderCell={(col, row) => {
          if (col.type !== 'custom') return null;
          if (col.key === 'status') return <LabelBadge label="Modified" variant="teal" size="small" />;
          if (col.key === 'workerType') return <span style={{ color: 'var(--color-text-default)' }}>{row.workerType}</span>;
          return row[col.key as keyof ConfigRow];
        }}
      />

    </div>
  );
}
