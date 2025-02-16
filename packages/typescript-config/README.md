# TypeScript Config

This package contains shared TypeScript configurations for the monorepo.

## Configurations

### base.json

The base configuration includes modern TypeScript settings:

```json
{
  "compilerOptions": {
    "declaration": true, // Generate .d.ts files
    "declarationMap": true, // Generate sourcemaps for .d.ts
    "esModuleInterop": true, // Enable ES Module interop
    "incremental": false, // Disable incremental compilation
    "isolatedModules": true, // Enable isolated modules
    "lib": [
      // Include type definitions for:
      "ESNext",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext", // Use ESNext module system
    "moduleDetection": "force", // Force module code generation
    "moduleResolution": "Bundler", // Use bundler-style resolution (no file extensions needed)
    "noUncheckedIndexedAccess": true, // Add undefined to indexed access
    "resolveJsonModule": true, // Allow importing JSON files
    "skipLibCheck": true, // Skip type checking of declaration files
    "strict": true, // Enable all strict type checking options
    "target": "ES2022" // Target ES2022 features
  }
}
```

## Usage

In your package's `tsconfig.json`, extend this configuration:

```json
{
  "extends": "@starter/typescript-config/base.json"
}
```
