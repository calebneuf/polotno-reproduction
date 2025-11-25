'use client';

import dynamic from 'next/dynamic';

/**
 * Minimal reproduction for both bugs:
 * 
 * Bug 1 - Page Reordering Error:
 * - Drag/reorder pages in PagesTimeline
 * - Error: "Cannot read properties of null (reading 'findOne')" / "No stage is found for element"
 * 
 * Bug 2 - Popover Alignment Issue:
 * - Hover over toolbar buttons to see tooltips
 * - Open side panel and interact with elements that show popovers
 * - Bug: Popovers appear in top-left corner instead of correctly positioned
 */

// Dynamically import Polotno components with SSR disabled to avoid "document is not defined" error
const PolotnoTestPage = dynamic(
  () => import('../components/PolotnoTestPage'),
  {
    ssr: false,
    loading: () => (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        Loading Polotno Editor...
      </div>
    ),
  }
);

export default function Home() {
  return <PolotnoTestPage />;
}

