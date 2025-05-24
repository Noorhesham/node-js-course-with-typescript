<br />
<br />
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.sanity.io/images/q9c9g16o/dev/134c5ebda8e5c4417fa332ad3707ff9ede7148a2-149x20.svg">
    <img alt="Webstacks Company Logo" src="https://cdn.sanity.io/images/q9c9g16o/dev/134c5ebda8e5c4417fa332ad3707ff9ede7148a2-149x20.svg">
  </picture>
</p>
<br />
<h3 align="center">
  Your website is never done.
</h3>
<p align="center">
  Welcome to the Webstacks Marketing Sites monorepo! This repository houses our Next.js marketing website and Sanity Studio content management system.
</p>

<p align="center">
  <a href="https://vercel.com/webstacks/webstacks"><img alt="Vercel" src="https://img.shields.io/badge/Vercel-black?logo=vercel&logoColor=black&labelColor=white&color=white"/></a>
  <a href="https://studio.wbstks.dev"><img alt="Sanity" src="https://img.shields.io/badge/Sanity-black?logo=sanity&logoColor=white&labelColor=f77769&color=f77769"/></a>
  <a href="https://github.com/vercel/next.js"><img alt="Next.js" src="https://img.shields.io/badge/NextJS-black?logo=nextdotjs&labelColor=black&color=black" /></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-black?logo=typescript&logoColor=white&labelColor=%233178c6&color=3178c6" /></a>
  <a href="https://tailwindcss.com/"><img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-black?logo=tailwindcss&logoColor=white&labelColor=0ea5e9&color=0ea5e9" /></a>
</p>
<br />
<p align="center">
  <img alt="Animation of Webstacks" src="https://cdn.sanity.io/images/q9c9g16o/dev/9995f61facfed2bc3fe02369b235e4364744057f-640x368.gif" >
</p>

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Git Workflow](#git-workflow)
- [Configuration](#configuration)

## Introduction

This monorepo is built with performance, composability, and reusability in mind. By focusing on these principles, we ensure that our applications are not only fast and responsive but also highly modular and maintainable.

Our component organization follows a hierarchical structure:
- **Primatives**: Basic UI components like buttons, icons, and images that form the foundation of our design system
- **Modules**: Complex, reusable components that combine multiple primatives to create more sophisticated UI elements
- **Sections**: Full page sections that compose modules and primatives to create complete page layouts

## Project Structure

The monorepo contains two main applications:

```bash
apps/
├── docs/             # Design System Documentation
│   ├── .storybook/  # Storybook configuration
│   ├── src/         # Source code and stories
│   └── public/      # Public assets
├── web/              # Next.js Marketing Website
│   ├── app/         # App router pages
│   ├── components/  # React components
│   │   ├── primatives/  # Basic UI components (buttons, icons, etc.)
│   │   ├── modules/     # Complex, reusable components
│   │   └── sections/    # Page section components
│   └── utils/       # Utility functions
│
└── studio/          # Sanity Studio
    ├── schemas/     # Content models & types
    ├── components/  # Custom Sanity components
    └── lib/         # Studio utilities
```

## Getting Started

### Environment Variables

This project uses environment variables for configuration. While example files (`.env.example`) are provided, for access to the actual environment variables, please contact:

- Nikan Shahidi
- Tracy Yu
- Jordan Esguerra


### Prerequisites

- Node.js >= 18
- [pnpm](https://pnpm.io/) >= 9.6.0

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/gowebstacks/webstacks-marketing-sites.git
   cd webstacks-marketing-sites
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**
   ```bash
   # For Marketing Website
   cp apps/web/.env.example apps/web/.env.local
   
   # For Sanity Studio
   cp apps/studio/.env.example apps/studio/.env
   ```

4. **Start Development**
   ```bash
   # Start all applications
   pnpm dev
   
   # Start specific app
   pnpm dev --filter web    # Marketing site only
   pnpm dev --filter studio # Sanity studio only
   ```

## Development

### Available Commands

```bash
# Development
pnpm dev              # Start development servers
pnpm build           # Build all applications
pnpm start           # Start production servers

# Quality Assurance
pnpm lint            # Run ESLint
pnpm lint:fix        # Fix ESLint issues
pnpm typegen         # Generate TypeScript types
```

### Application Structure

#### Marketing Website (`apps/web/`)
- `app/` - Next.js 13+ app router pages
- `components/` - Reusable UI components
- `molecules/` - Atomic design molecules
- `utils/` - Helper functions and utilities
- `types.d.ts` - Global TypeScript definitions

#### Sanity Studio (`apps/studio/`)
- `schemas/` - Content type definitions
- `components/` - Custom input components
- `lib/` - Studio utilities and helpers

## Git Workflow

### Branches

- **Main Branch**: Production branch, deploys to [www.webstacks.com](https://www.webstacks.com)
- **Develop Branch**: Staging branch, deploys to [www.wbstks.dev](https://www.wbstks.dev)

### Branch Naming

- **Features**: `feature/description`
- **Bug Fixes**: `bugfix/description`
- **Hotfixes**: `hotfix/description`
- **Chores**: `chore/description`
- **Releases**: `release/version`

### Workflow Steps

1. **Create Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature
   ```

2. **Make Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push Changes**
   ```bash
   git push origin feature/your-feature
   ```

4. **Create Pull Request**
   - Open PR to `develop` (or `main` for hotfixes)
   - Request reviews
   - Address feedback
   - Merge when approved

## Query Structure and Best Practices

### Query Organization

Our GROQ queries are organized in two main locations:

1. **Component-Specific Queries**
   - Located alongside their respective components
   - Example: `components/HeadingBlock/HeadingBlock.query.ts`
   - Contains queries specific to that component's data needs

2. **Global Query Fragments**
   - Located in `utils/sanity/queries/queryFragments/`
   - Used for shared query patterns across multiple components
   - Example: `body.query.ts` combines multiple component queries for page content

### Query Best Practices

1. **Explicit Field Selection**
   - ❌ Avoid spreading fields (`...`)
   - ✅ Explicitly list required fields
   ```groq
   // Bad
   body[] {
     ...,
     ${someOtherQuery}
   }

   // Good
   body[] {
     _key,
     _type,
     style,
     children,
     markDefs,
     ${someOtherQuery}
   }
   ```

2. **Asset References**
   - When using `imageBuilder`, fetch raw asset references
   - ❌ Don't dereference assets with `->` if using `imageBuilder`
   ```groq
   // Bad - dereferencing asset
   asset-> {
     _ref,
     url,
     metadata
   }

   // Good - keeping raw reference
   asset
   ```

3. **Query Location**
   - Keep queries close to their components
   - Only move to `queryFragments` if shared across components
   - Name query files consistently: `ComponentName.query.ts`

4. **Type Safety**
   - All queries should have corresponding TypeScript types
   - Use type generation for Sanity schema

These practices ensure:
- Better performance by only fetching needed fields
- Improved maintainability through explicit data requirements
- Easier debugging by keeping queries close to their usage
- Proper functioning of image handling utilities

## Configuration

### Environment Variables

#### Marketing Website (`apps/web/.env.local`)
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-11
```

#### Sanity Studio (`apps/studio/.env`)
```bash
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## 🤝 Contributing

1. **Branch Naming**
   - `feat/*` - New features
   - `fix/*` - Bug fixes
   - `chore/*` - Maintenance
   - `docs/*` - Documentation
   - `refactor/*` - Code refactoring

2. **Development Flow**
   ```bash
   git checkout -b feat/your-feature
   # Make changes
   git commit -m "feat: add new feature"
   git push origin feat/your-feature
   # Create PR on GitHub
   ```

3. **Pull Request Guidelines**
   - Use conventional commit messages
   - Include screenshots for UI changes
   - Update documentation as needed
   - Ensure all tests pass

## 🚀 Deployment

- **Marketing Website**: Auto-deploys to Vercel
  - Production: Push to `main`
  - Preview: Pull Request branches
  
- **Sanity Studio**: Auto-deploys to Sanity hosting
  - Production: Push to `main`
  - Preview: Available on pull requests

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Turborepo Handbook](https://turbo.build/repo/docs)
- [Internal Wiki](https://www.notion.so/webstacks)

## 🆘 Support

Need help? Here's what to do:

1. Check our [internal documentation](https://www.notion.so/webstacks)
2. Ask in the #dev-support Slack channel
3. Create a GitHub issue

## 📝 License

Private - © 2024 Webstacks. All rights reserved.
#   u p w o r k 2  
 