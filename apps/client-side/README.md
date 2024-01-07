# Client-Side Project Documentation

This project is the front end of our global application, developed using Next.js.

## Project Configuration

The project configuration is specified in the `project.json` file.

```json
{
  "name": "client-side",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "apps/client-side",
  "projectType": "application",
  "targets": {
    "build": {
      "executor": "@nx/next:build",
      "outputs": ["{options.outputPath}"],
      "defaultConfiguration": "production",
      "options": {
        "outputPath": "dist/apps/client-side"
      },
      "configurations": {
        "development": {
          "outputPath": "apps/client-side"
        },
        "production": {}
      }
    },
    "serve": {
      "executor": "@nx/next:server",
      "defaultConfiguration": "development",
      "options": {
        "buildTarget": "client-side:build",
        "dev": true
      },
      "configurations": {
        "development": {
          "buildTarget": "client-side:build:development",
          "dev": true
        },
        "production": {
          "buildTarget": "client-side:build:production",
          "dev": false
        }
      }
    },
    "export": {
      "executor": "@nx/next:export",
      "options": {
        "buildTarget": "client-side:build:production"
      }
    },
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "apps/client-side/jest.config.ts"
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint",
      "outputs": ["{options.outputFile}"]
    }
  },
  "tags": []
}
```

## Project Structure

The project follows the standard Nx project structure:

```
├── apps
│   └── client-side
│       ├── app
│       │   ├── api
│       │   │   └── hello
│       │   │       └── route.ts
│       │   ├── campaign-details
│       │   │   └── [id]
│       │   │       └── page.tsx
│       │   ├── create-campaign
│       │   │   └── page.tsx
│       │   ├── global.css
│       │   ├── layout.tsx
│       │   ├── page.module.css
│       │   ├── page.tsx
│       │   └── profile
│       │       └── page.tsx
│       ├── assets
│       │   ├── create-campaign.svg
│       │   ├── dashboard.svg
│       │   └── ...
│       ├── components
│       │   ├── CountBox.tsx
│       │   ├── CustomButton.tsx
│       │   └── ...
│       ├── constants
│       │   └── index.ts
│       ├── context
│       │   ├── globalContext.tsx
│       │   └── ...
│       ├── contract
│       │   ├── CrowdFunding.json
│       │   └── ...
│       ├── index.d.ts
│       ├── jest.config.ts
│       ├── next.config.js
│       ├── next-env.d.ts
│       ├── postcss.config.js
│       ├── ...
│       ├── tailwind.config.js
│       ├── tsconfig.json
│       ├── tsconfig.spec.json
│       └── ...
```

## Setup

To run the client-side project locally, follow these steps:

1. **Run the Application:**

   ```bash
     npx nx serve client-side

   ```

   The application will be accessible at `http://localhost:4200`.

<!-- - **Lint the Code:**
  ```bash
  npm run lint
  ```

- **Run Tests:**
  ```bash
  npm test
  ``` -->

<!-- ## Testing

To run tests for the client-side project, use the following command:

```bash
npm test
```

For more details on testing configurations, refer to the `jest.config.ts` file. -->
