'use client';

import dynamic from 'next/dynamic';
import { Toaster } from 'sonner';

// Dynamically import PolotnoEditor with SSR disabled since it uses react-konva
const PolotnoEditor = dynamic(
  () => import('../components/PolotnoEditor'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    )
  }
);

export default function GuidebooksPage() {
  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-3.75rem)]">
      <div className="w-full h-full relative">
        <PolotnoEditor 
          showCredit={true}
          onSave={(design) => {
            // Handle auto-save if needed
            console.log('Design saved:', design);
          }}
        />
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

