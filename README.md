# Catan Map Generator

A web application for generating random Catan game maps with customizable settings.

## Features

- Random map generation for Catan board game
- Multi-language support (English, Russian, Hebrew)
- Mobile-first responsive design
- PDF rules viewer with download and print options
- Modern, clean UI with Catan-themed color scheme

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **i18next** - Internationalization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/catan-map-generator.git

# Navigate to project directory
cd catan-map-generator

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
catan-map-generator/
├── public/
│   └── assets/
│       └── rules/          # PDF rule files
├── src/
│   ├── components/
│   │   ├── App/           # Main app component
│   │   ├── FirstPage/     # Landing page
│   │   ├── Rules/         # Rules viewer
│   │   └── layout/        # Layout components
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
