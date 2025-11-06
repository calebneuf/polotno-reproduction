'use client';

import dynamic from 'next/dynamic';

// Combined minimal test case for both bugs
// - Page reordering error: "Cannot read properties of null (reading 'findOne')"
// - Popover alignment issue: Popovers appearing in top-left
const CombinedTest = dynamic(
  () => import('../../components/CombinedTest'),
  { 
    ssr: false,
    loading: () => <div>Loading combined test...</div>
  }
);

export default function CombinedTestPage() {
  return (
    <div className="w-full h-screen">
      <CombinedTest />
    </div>
  );
}

