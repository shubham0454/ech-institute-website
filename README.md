# ECH Institute Website

A modern, responsive website for ECH Institute built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed file structure and organization.

### Key Directories

- **`src/app/`** - Next.js pages and routes
  - `page.tsx` - Home page
  - `layout.tsx` - Root layout with providers
  - `globals.css` - Global styles and CSS variables
  - `home-page-styles.css` - Home page specific styles

- **`src/components/`** - React components
  - `layout/` - Layout components (Navigation, Footer)
  - `features/` - Feature-specific components (CardSlider, DonationCard)
  - `ui/` - Reusable UI components (shadcn/ui)

- **`src/lib/`** - Utility functions
- **`src/providers/`** - React context providers

## 🎨 Design System

### Typography
- **Headings & Navigation**: Antonio, sans-serif
- **Body Text & Subtitles**: Roboto, sans-serif

### Colors
- **Primary**: White (60%), Black (30%), Yellow (10%)
- **Accent**: #facc14 (Yellow)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Web3**: RainbowKit, Wagmi

## 📝 Code Style

- **Components**: PascalCase (e.g., `Navigation.tsx`)
- **Files**: kebab-case for CSS (e.g., `home-page-styles.css`)
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## 🔧 Configuration

- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration
- `components.json` - shadcn/ui configuration

## 📦 Key Features

- ✅ Fully responsive design
- ✅ Dark/Light theme support
- ✅ Web3 wallet integration
- ✅ Modern UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ SEO optimized
- ✅ Accessible components

## 🤝 Contributing

1. Follow the file structure outlined in `PROJECT_STRUCTURE.md`
2. Use descriptive component and file names
3. Follow TypeScript best practices
4. Ensure responsive design for all screen sizes
5. Use Tailwind CSS for styling

## 📄 License

Private project - ECH Institute, Inc.
