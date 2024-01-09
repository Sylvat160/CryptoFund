# Global Project Documentation

Welcome to the documentation for our global project! This repository follows a mono-repo structure using Nx, which allows us to manage multiple projects efficiently.

## Table of Contents

1. [API (NestJS Backend)](./apps/api/README.md)
2. [API End-to-End Tests](./apps/api-e2e/README.md)
3. [Client-Side (Next.js Frontend)](./apps/client-side/README.md)
4. [Client-Side End-to-End Tests](./apps/client-side-e2e/README.md)
5. [Smart Contract (Solidity)](./smart-contract/README.md)

## Getting Started

Before diving into project-specific details, let's set up the global environment.

### Clone the Repository

```bash
git clone https://github.com/Sylvat160/CryptoFund
cd CryptoFund
```

### Install Dependencies

```bash
npm install
```

## Projects

## Prisma Setup

The global project utilizes Prisma for managing the database schema and interactions. The Prisma setup is encapsulated in the `prisma-crypto-fund` library.

### Prisma Crypto Fund Library

The `prisma-crypto-fund` library contains the Prisma configuration and necessary tools for managing the database.

**Prisma Configuration:**

- The Prisma configuration is located in the `libs/prisma-crypto-fund/src/lib/prisma` directory.
- To generate the Prisma client, use the following command:

  ```bash
  npx prisma generate
  ```

**Database Migrations:**

- To create a new migration, use the following command:

  ```bash
  npx prisma migrate save --name <migration-name>
  ```

- To apply pending migrations, use:

  ```bash
  npx prisma migrate up
  ```

**Reset Database:**

- To reset the database and apply all migrations from scratch, use:

  ```bash
  npx prisma migrate reset --force
  ```

### 1. API (NestJS Backend)

For details on the NestJS backend project, including setup, testing, and API endpoints, refer to the [API Documentation](./apps/api/README.md).

<!-- ### 2. API End-to-End Tests

Learn how to run end-to-end tests for the API project by visiting the [API End-to-End Tests Documentation](./apps/api-e2e/README.md). -->

### 3. Client-Side (Next.js Frontend)

Explore the Next.js frontend project, including setup, components, and client-side functionalities. Visit [Client-Side Documentation](./apps/client-side/README.md).

<!-- ### 4. Client-Side End-to-End Tests

Understand how to run end-to-end tests for the client-side application with Cypress. Refer to [Client-Side End-to-End Tests Documentation](./apps/client-side-e2e/README.md). -->

### 5. Smart Contract (Solidity)

Delve into the world of smart contracts with information on setup, deployment, and testing. Check out the [Smart Contract Documentation](./smart-contract/README.md).

## Additional Resources

- [Nx Documentation](https://nx.dev/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/)
- [Hardhat Documentation](https://hardhat.org/)
