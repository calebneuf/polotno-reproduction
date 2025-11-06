'use client';

import { useEffect, useMemo, useRef } from 'react';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel, DEFAULT_SECTIONS } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';

interface PolotnoEditorProps {
  apiKey?: string;
  initialDesign?: any;
  onSave?: (design: any) => void;
  showCredit?: boolean;
}

export const PolotnoEditor = ({
  apiKey,
  initialDesign,
  onSave,
  showCredit = true,
}: PolotnoEditorProps) => {
  // Ref for Polotno container
  const containerRef = useRef<HTMLDivElement>(null);

  // Create store using useMemo to avoid recreating on every render
  const store = useMemo(() => {
    const polotnoKey = apiKey || (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_POLOTNO_API_KEY : '') || '';
    const newStore = createStore({
      key: polotnoKey,
      showCredit: showCredit,
    });

    // Add a page if no initial design is provided
    if (!initialDesign) {
      newStore.addPage();
    }

    return newStore;
  }, [apiKey, showCredit]);

  useEffect(() => {
    // Load initial design if provided
    if (initialDesign) {
      store.loadJSON(initialDesign);
    }
  }, [store, initialDesign]);

  // TESTING: Commented out CSS injection to test if it affects popover alignment
  // useEffect(() => {
  //   // Inject CSS to fix z-index issues with Polotno tooltips and popups
  //   const styleId = 'polotno-z-index-fix';
  //   if (!document.getElementById(styleId)) {
  //     const style = document.createElement('style');
  //     style.id = styleId;
  //     style.textContent = `
  //       /* Ensure Polotno editor container has proper positioning context */
  //       .polotno-container {
  //         position: relative !important;
  //       }
  //       
  //       /* Ensure Polotno toolbar and controls stay within editor bounds */
  //       .polotno-toolbar,
  //       .polotno-workspace-wrap {
  //         position: relative;
  //         z-index: 1;
  //       }
  //       
  //       /* Ensure side panel stays in correct stacking order */
  //       .polotno-side-panel-wrap {
  //         position: relative;
  //         z-index: 2;
  //       }
  //     `;
  //     document.head.appendChild(style);
  //   }
  // }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
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
          <ZoomButtons store={store} />
          <PagesTimeline store={store} />
        </WorkspaceWrap>
      </PolotnoContainer>
    </div>
  );
};

export default PolotnoEditor;

