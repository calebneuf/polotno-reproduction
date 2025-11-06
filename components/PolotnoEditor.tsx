'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'next-themes';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel, DEFAULT_SECTIONS, SectionTab } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';
import { unstable_useHtmlTextRender } from 'polotno/config';
import { reaction } from 'mobx';
import { Mountain, FileText, Grid3x3, Route, BookOpen, List } from 'lucide-react';
import { OverlaysProvider } from '@blueprintjs/core';
import { toast } from 'sonner';

interface PolotnoEditorProps {
  apiKey?: string;
  initialDesign?: any;
  onSave?: (design: any) => void;
  showCredit?: boolean;
}

// Simplified custom panels - replace with your actual implementations
const AreasPanel = observer(() => {
  return <div className="p-4">Areas Panel - Replace with your implementation</div>;
});

const RoutesPanel = observer(() => {
  return <div className="p-4">Routes Panel - Replace with your implementation</div>;
});

const TemplatesPanel = observer(() => {
  return <div className="p-4">Templates Panel - Replace with your implementation</div>;
});

const GridPanel = observer(() => {
  return <div className="p-4">Grid Panel - Replace with your implementation</div>;
});

const BookOptionsPanel = observer(() => {
  return <div className="p-4">Book Options Panel - Replace with your implementation</div>;
});

const TableOfContentsPanel = observer(() => {
  return <div className="p-4">Table of Contents Panel - Replace with your implementation</div>;
});

// Custom Areas section
const AreasSection = {
  name: 'areas',
  Tab: (props: any) => (
    <SectionTab name="Areas" {...props}>
      <div className="flex flex-col items-center justify-center gap-1">
        <Mountain className="w-5 h-5" />
      </div>
    </SectionTab>
  ),
  Panel: AreasPanel,
};

// Custom Routes section
const RoutesSection = {
  name: 'routes',
  Tab: (props: any) => (
    <SectionTab name="Routes" {...props}>
      <div className="flex flex-col items-center justify-center gap-1">
        <Route className="w-5 h-5" />
      </div>
    </SectionTab>
  ),
  Panel: RoutesPanel,
};

// Custom Templates section
const TemplatesSection = {
  name: 'guidebook-templates',
  Tab: (props: any) => (
    <SectionTab name="Templates" {...props}>
      <div className="flex flex-col items-center justify-center gap-1">
        <FileText className="w-5 h-5" />
      </div>
    </SectionTab>
  ),
  Panel: TemplatesPanel,
};

// Custom Grid section
const GridSection = {
  name: 'grid',
  Tab: (props: any) => (
    <SectionTab name="Grid" {...props}>
      <div className="flex flex-col items-center justify-center gap-1">
        <Grid3x3 className="w-5 h-5" />
      </div>
    </SectionTab>
  ),
  Panel: GridPanel,
};

// Custom Book Options section
const BookOptionsSection = {
  name: 'book-options',
  Tab: (props: any) => (
    <SectionTab name="Book Options" {...props}>
      <div className="flex flex-col items-center justify-center gap-1">
        <BookOpen className="w-5 h-5" />
      </div>
    </SectionTab>
  ),
  Panel: BookOptionsPanel,
};

// Custom Table of Contents section
const TableOfContentsSection = {
  name: 'table-of-contents',
  Tab: (props: any) => (
    <SectionTab name="Table of Contents" {...props}>
      <div className="flex flex-col items-center justify-center gap-1">
        <List className="w-5 h-5" />
      </div>
    </SectionTab>
  ),
  Panel: TableOfContentsPanel,
};

export const PolotnoEditor = ({
  apiKey,
  initialDesign,
  onSave,
  showCredit = true,
}: PolotnoEditorProps) => {
  // Get theme from next-themes
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ref for Polotno container
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine if dark mode is active
  const isDarkMode = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Enable rich text HTML support
  useEffect(() => {
    unstable_useHtmlTextRender(true);
  }, []);

  // Create store using useMemo to avoid recreating on every render
  const store = useMemo(() => {
    const polotnoKey = apiKey || (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_POLOTNO_API_KEY : '') || '';
    const newStore = createStore({
      key: polotnoKey,
      showCredit: showCredit,
    });

    // Increase pixel ratio for better text rendering quality
    newStore.setElementsPixelRatio(3);

    // Add a page if no initial design is provided
    // Set page size to 6" x 9" (432 x 648 points at 72 DPI)
    if (!initialDesign) {
      const page = newStore.addPage();
      page.set({
        width: 432,  // 6 inches
        height: 648, // 9 inches
      });
    }

    return newStore;
  }, [apiKey, showCredit]);

  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load initial design if provided
    if (initialDesign) {
      store.loadJSON(initialDesign);
    }

    // Auto-save handler (optional)
    if (onSave) {
      saveIntervalRef.current = setInterval(() => {
        const json = store.toJSON();
        onSave(json);
      }, 30000); // Auto-save every 30 seconds

      return () => {
        if (saveIntervalRef.current) {
          clearInterval(saveIntervalRef.current);
        }
      };
    }
  }, [store, initialDesign, onSave]);

  useEffect(() => {
    // Inject CSS to fix z-index issues with Polotno tooltips and popups
    const styleId = 'polotno-z-index-fix';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Ensure Polotno editor container has proper positioning context */
        .polotno-container {
          position: relative !important;
        }
        
        /* Ensure Polotno toolbar and controls stay within editor bounds */
        .polotno-toolbar,
        .polotno-workspace-wrap {
          position: relative;
          z-index: 1;
        }
        
        /* Ensure side panel stays in correct stacking order */
        .polotno-side-panel-wrap {
          position: relative;
          z-index: 2;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <PolotnoContainer
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          isolation: 'isolate'
        }}
        className={isDarkMode ? 'polotno-container bp5-dark' : 'polotno-container'}
      >
        <link
          rel="stylesheet"
          href="https://unpkg.com/@blueprintjs/core@5/lib/css/blueprint.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
        />
        <OverlaysProvider>
          <SidePanelWrap>
            <SidePanel
              store={store}
              sections={[
                AreasSection,
                RoutesSection,
                TemplatesSection,
                GridSection,
                BookOptionsSection,
                TableOfContentsSection,
                ...DEFAULT_SECTIONS
              ]}
              defaultSection="areas"
            />
          </SidePanelWrap>
          <WorkspaceWrap>
            <Toolbar store={store} downloadButtonEnabled />
            <Workspace store={store} />
            <ZoomButtons store={store} />
            <PagesTimeline store={store} />
          </WorkspaceWrap>
        </OverlaysProvider>
      </PolotnoContainer>
    </div>
  );
};

export default PolotnoEditor;

