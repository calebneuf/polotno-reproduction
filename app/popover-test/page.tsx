'use client';

import dynamic from 'next/dynamic';

// Minimal test case for popover alignment issue
// Bug: Popovers appearing in top-left instead of correctly positioned
const PopoverTest = dynamic(
  () => import('../../components/PopoverTest'),
  { 
    ssr: false,
    loading: () => <div>Loading popover test...</div>
  }
);

export default function PopoverTestPage() {
  return (
    <div className="w-full h-screen">
      <PopoverTest />
    </div>
  );
}

