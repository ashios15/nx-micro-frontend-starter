# nx-micro-frontend-starter

[![CI](https://github.com/ashios15/nx-micro-frontend-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/ashios15/nx-micro-frontend-starter/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A **production-ready Nx monorepo template** with Module Federation — shell + independent remotes + shared UI library + custom code generators.

<!-- ![Screenshot](./docs/architecture.png) -->

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                    Shell (port 4200)                  │
│  ┌─────────────────────────────────────────────────┐ │
│  │              Navigation / Layout                 │ │
│  ├──────────────┬──────────────┬───────────────────┤ │
│  │  /auth/*     │ /dashboard/* │ /feature/*        │ │
│  │  Remote Auth │ Remote Dash  │ (generate new!)   │ │
│  │  :4201       │ :4202        │                   │ │
│  └──────────────┴──────────────┴───────────────────┘ │
│                                                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │        @shared-ui  ·  @shared-utils             │ │
│  │        (Shared libraries via Nx)                 │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

## Features

- **Nx Monorepo** — Intelligent build caching, affected commands, dependency graph
- **Module Federation** — Runtime module loading, independent deployments
- **Shared UI Library** — Consistent design system across all remotes
- **Custom Generators** — Scaffold new remotes in seconds with `nx g new-remote`
- **Shared dependencies** — React, React Router as singletons (no duplication)
- **Dependency Graph** — Visualize with `nx graph`
- **CI/CD Ready** — GitHub Actions with Nx Cloud caching

## Quick Start

```bash
# Clone and install
git clone https://github.com/ashios15/nx-micro-frontend-starter.git
cd nx-micro-frontend-starter
npm install

# Start all apps
npm run start:all

# Or individually
nx serve shell          # http://localhost:4200
nx serve remote-auth    # http://localhost:4201
nx serve remote-dashboard  # http://localhost:4202
```

## Generate a New Remote

```bash
nx g @nx-micro-frontend-starter/tools:new-remote --name=payments --port=4203
```

This automatically:
1. Creates `apps/remote-payments/` with Module.tsx and federation config
2. Updates the shell's module-federation.config.js
3. Wires up routing

## Project Structure

```
├── apps/
│   ├── shell/                   # Host application
│   │   ├── src/App.tsx          # Router + remote loading
│   │   └── module-federation.config.js
│   ├── remote-auth/             # Auth remote (login/signup)
│   │   └── src/Module.tsx
│   └── remote-dashboard/        # Dashboard remote (analytics)
│       └── src/Module.tsx
├── libs/
│   ├── shared-ui/               # Shared component library
│   └── shared-utils/            # Shared utilities
├── tools/
│   └── generators/
│       └── new-remote/          # Custom Nx generator
│           ├── index.ts
│           ├── schema.json
│           └── files/           # Template files
└── nx.json
```

## Key Concepts

### Module Federation Config
Each remote exposes a `Module` component. The shell consumes remotes at runtime:

```js
// shell: module-federation.config.js
remotes: {
  'remote-auth': 'remote_auth@http://localhost:4201/remoteEntry.js',
}

// shell: App.tsx
const RemoteAuth = React.lazy(() => import('remote-auth/Module'));
```

### Shared Dependencies
React and React Router are configured as singletons — loaded once by the shell and shared with all remotes. No bundle duplication.

### Custom Generator
The `new-remote` generator creates a fully wired remote app in seconds. See `tools/generators/new-remote/`.

## Development

```bash
nx graph              # Visualize dependency graph
nx affected:test      # Test only affected projects
nx run-many --target=build --all  # Build everything
```

## License

MIT © [Ashish Joshi](https://github.com/ashios15)
