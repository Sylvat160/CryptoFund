# API Project Documentation

This project is the backend application developed using NestJS, serving as the API for our global project.

## Project Configuration

The project configuration is specified in the `project.json` file.

```json
{
  "name": "api",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "apps/api/src",
  "projectType": "application",
  "targets": {
    "build": {
      "executor": "@nx/webpack:webpack",
      "outputs": ["{options.outputPath}"],
      "defaultConfiguration": "production",
      "options": {
        "target": "node",
        "compiler": "tsc",
        "outputPath": "dist/apps/api",
        "main": "apps/api/src/main.ts",
        "tsConfig": "apps/api/tsconfig.app.json",
        "assets": ["apps/api/src/assets"],
        "webpackConfig": "apps/api/webpack.config.js"
      },
      "configurations": {
        "development": {},
        "production": {}
      }
    },
    "serve": {
      "executor": "@nx/js:node",
      "defaultConfiguration": "development",
      "options": {
        "buildTarget": "api:build"
      },
      "configurations": {
        "development": {
          "buildTarget": "api:build:development"
        },
        "production": {
          "buildTarget": "api:build:production"
        }
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint",
      "outputs": ["{options.outputFile}"]
    },
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "apps/api/jest.config.ts"
      }
    }
  },
  "tags": []
}
```

## Project Structure

The project follows the standard Nx project structure:

```
├── apps
│   ├── api
│   │   ├── Dockerfile
│   │   ├── jest.config.ts
│   │   ├── project.json
│   │   ├── src
│   │   │   ├── app
│   │   │   │   ├── app.controller.spec.ts
│   │   │   │   ├── app.controller.ts
│   │   │   │   ├── app.module.ts
│   │   │   │   ├── app.service.spec.ts
│   │   │   │   ├── app.service.ts
│   │   │   │   ├── campaign
│   │   │   │   │   ├── campaign.controller.spec.ts
│   │   │   │   │   ├── campaign.controller.ts
│   │   │   │   │   ├── campaign.module.ts
│   │   │   │   │   ├── campaign.service.spec.ts
│   │   │   │   │   └── campaign.service.ts
│   │   │   │   └── donator
│   │   │   │       ├── donator.controller.spec.ts
│   │   │   │       ├── donator.controller.ts
│   │   │   │       ├── donator.module.ts
│   │   │   │       ├── donator.service.spec.ts
│   │   │   │       └── donator.service.ts
│   │   │   ├── assets
│   │   │   └── main.ts
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.spec.json
│   │   └── webpack.config.js
│   └── ...
```

## Setup

To run the API project locally, follow these steps:

4. **Run the Application:**
   ```bash
    npx nx serve api
   ```
   The application will be accessible at `http://localhost:3000`.

<!-- ## Testing

To run tests for the API project, use the following command:

```bash
npm test
``` -->

<!-- For more details on testing configurations, refer to the `jest.config.ts` file. -->

## Docker

The API project can also be run using Docker. Build the Docker image using the provided Dockerfile:

```bash
docker build -t api-image .
```

Then, run the Docker container:

```bash
docker run -p 3000:3000 api-image
```

The application will be accessible at `http://localhost:3000`.

## Configuration

- **Jest Configuration:** The Jest configuration for testing is located at `jest.config.ts`.
- **Webpack Configuration:** The Webpack configuration is located at `webpack.config.js`.
- **TypeScript Configurations:** TypeScript configurations can be found in various `tsconfig` files.

## API Endpoints

The API project exposes various endpoints for different functionalities. Refer to the relevant controllers and services for detailed information.

- **Example Endpoint:** `/api/campaigns`
  - Method: `GET`
  - Description: Retrieve a list of campaigns.

...

## Development Guidelines

Please adhere to the following guidelines when contributing to the API project:

- Follow the [NestJS Style Guide](https://docs.nestjs.com/styleguide).
- Write meaningful commit messages.
- ...

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Jest Testing Framework](https://jestjs.io/)
- ...

Feel free to expand and customize the documentation based on your project's specific needs.

````

This README provides information on project configuration, structure, setup, available scripts, testing, Docker usage, and development guidelines. You can customize and expand it further based on specific project requirements.

## Docker

The API project can be run using Docker. The provided Dockerfile sets up the environment and dependencies for the project.

### Build Docker Image

To build the Docker image, use the following command:

```bash
docker build -t api-image .
````

### Run Docker Container

Once the Docker image is built, you can run the Docker container:

```bash
docker run -p 3332:3332 api-image
```

The application will be accessible at `http://localhost:3332`.

### Dockerfile Details

The Dockerfile includes the following steps:

```dockerfile
FROM node:18-alpine3.19

ENV PORT=3332
EXPOSE 3332
COPY .dist/apps/api .

COPY libs/prisma-crypto-fund/src/lib/prisma/schema.prisma schema.prisma
# Important: Remove Prisma output configuration used only for dev
# This allows Prisma to generate client in the default output folder
RUN sed -i '/^  output/c\  output   = "node_modules/@prisma/crypto"' schema.prisma
RUN npm install --force
RUN npm install prisma@5.7.0  @prisma/client@5.7.0 --force
RUN npx prisma generate
CMD node ./main.js
```

Explanation of key steps:

- **ENV PORT=3332:** Sets the environment variable for the application port.
- **EXPOSE 3332:** Exposes the specified port.
- **COPY .dist/apps/api .:** Copies the compiled application files into the Docker image.
- **COPY libs/prisma-crypto-fund/src/lib/prisma/schema.prisma schema.prisma:** Copies the Prisma schema into the image.
- **sed -i '/^ output/c\ output = "node_modules/@prisma/crypto"' schema.prisma:** Modifies the Prisma schema to adjust the output configuration.
- **npm install --force:** Installs project dependencies.
- **npm install prisma@5.7.0 @prisma/client@5.7.0 --force:** Installs specific versions of Prisma and its client.
- **npx prisma generate:** Generates the Prisma client.
- **CMD node ./main.js:** Specifies the command to run when the container starts.
