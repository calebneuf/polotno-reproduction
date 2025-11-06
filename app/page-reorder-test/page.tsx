'use client';

import dynamic from 'next/dynamic';

// Minimal test case for page reordering error
// Bug: "Cannot read properties of null (reading 'findOne')" / "No stage is found for element"
const PageReorderTest = dynamic(
  () => import('../../components/PageReorderTest'),
  { 
    ssr: false,
    loading: () => <div>Loading page reorder test...</div>
  }
);

export default function PageReorderTestPage() {
  return (
    <div className="w-full h-screen">
      <PageReorderTest />
    </div>
  );
}

