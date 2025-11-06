'use client';

import { useMemo } from 'react';
import { PolotnoContainer, WorkspaceWrap } from 'polotno';
import { PagesTimeline } from 'polotno/pages-timeline';
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';

/**
 * Minimal test case for page reordering error
 * 
 * To reproduce:
 * 1. This creates multiple pages with some content
 * 2. Try dragging/reordering pages in the PagesTimeline
 * 3. Error: "Cannot read properties of null (reading 'findOne')" / "No stage is found for element"
 */
export default function PageReorderTest() {
  const store = useMemo(() => {
    const newStore = createStore({
      key: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_POLOTNO_API_KEY || '' : '',
      showCredit: true,
    });

    // Create multiple pages with content to test reordering
    const page1 = newStore.addPage();
    page1.addElement({
      type: 'text',
      text: 'Page 1',
      x: 100,
      y: 100,
      fontSize: 24,
    });

    const page2 = newStore.addPage();
    page2.addElement({
      type: 'text',
      text: 'Page 2',
      x: 100,
      y: 100,
      fontSize: 24,
    });

    const page3 = newStore.addPage();
    page3.addElement({
      type: 'text',
      text: 'Page 3',
      x: 100,
      y: 100,
      fontSize: 24,
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
        <WorkspaceWrap>
          <Workspace store={store} />
          <PagesTimeline store={store} />
        </WorkspaceWrap>
      </PolotnoContainer>
    </div>
  );
}

