'use client';

import { useMemo } from 'react';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { SidePanel, DEFAULT_SECTIONS } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';

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
export default function PolotnoTestPage() {
  const store = useMemo(() => {
    const newStore = createStore({
      key: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_POLOTNO_API_KEY || '' : '',
      showCredit: true,
    });

    // Create multiple pages with content to test reordering
    const page1 = newStore.addPage();
    page1.addElement({
      type: 'text',
      text: 'Page 1 - Drag pages to test reordering',
      x: 100,
      y: 100,
      fontSize: 20,
    });

    const page2 = newStore.addPage();
    page2.addElement({
      type: 'text',
      text: 'Page 2 - Hover toolbar for popover test',
      x: 100,
      y: 100,
      fontSize: 20,
    });

    return newStore;
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <PolotnoContainer
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
        className="polotno-container"
      >
        <link
          href="https://unpkg.com/polotno@3.0.0-6/blueprint.polotno.css"
          rel="stylesheet"
        />
        <SidePanelWrap>
          <SidePanel
            store={store}
            sections={DEFAULT_SECTIONS}
          />
        </SidePanelWrap>
        <WorkspaceWrap>
          <Toolbar store={store} downloadButtonEnabled />
          <Workspace store={store} />
          <PagesTimeline store={store} />
        </WorkspaceWrap>
      </PolotnoContainer>
    </div>
  );
}

