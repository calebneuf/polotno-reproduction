'use client';

import { useMemo } from 'react';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { SidePanel, DEFAULT_SECTIONS } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';

/**
 * Minimal test case for popover alignment issue
 * 
 * To reproduce:
 * 1. Hover over toolbar buttons to see tooltips
 * 2. Open side panel and interact with elements that show popovers
 * 3. Bug: Popovers appear in top-left corner instead of correctly positioned near their triggers
 */
export default function PopoverTest() {
  const store = useMemo(() => {
    const newStore = createStore({
      key: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_POLOTNO_API_KEY || '' : '',
      showCredit: true,
    });

    // Add a page with content
    const page = newStore.addPage();
    page.addElement({
      type: 'text',
      text: 'Hover over toolbar buttons to test popover alignment',
      x: 100,
      y: 100,
      fontSize: 20,
    });

    return newStore;
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <PolotnoContainer
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
        className="polotno-container"
      >
        <link
          rel="stylesheet"
          href="https://unpkg.com/@blueprintjs/core@5/lib/css/blueprint.css"
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
        </WorkspaceWrap>
      </PolotnoContainer>
    </div>
  );
}

