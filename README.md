# Polotno Reproduction Project

This is a minimal reproduction project to test polotno issues. It matches the structure of your main project's Polotno editor component.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your Polotno API key:
```bash
NEXT_PUBLIC_POLOTNO_API_KEY=your_api_key_here
```
Get your API key from https://polotno.com/cabinet/

3. Run the development server:
```bash
npm run dev
```

## Configuration

This project matches the configuration from your main project:
- Next.js 15.2.2 with Turbopack
- React 19 (via overrides for polotno)
- polotno 2.29.5
- TypeScript
- Tailwind CSS
- next-themes for dark mode support
- mobx-react-lite for state management
- Blueprint.js for UI components
- sonner for toast notifications

## Structure

- `components/PolotnoEditor.tsx` - Main editor component with custom sections
- `app/page.tsx` - Page that renders the editor
- Custom panels are stubbed out - replace with your actual implementations:
  - AreasPanel
  - RoutesPanel
  - TemplatesPanel
  - GridPanel
  - BookOptionsPanel
  - TableOfContentsPanel

## Customization

The editor includes placeholder implementations for your custom panels. Replace them with your actual panel components from your main project to fully reproduce the issue.

