FROM node:18-alpine3.19

ENV PORT=3332
EXPOSE 3332
COPY .dist/apps/api .

COPY libs/prisma-crypto-fund/src/lib/prisma/schema.prisma schema.prisma
# Important remove Prisma output configuration used only for dev
# This allow prisma to generate client in defaut output folder
RUN sed -i '/^  output/c\  output   = "node_modules/@prisma/crypto"' schema.prisma
RUN npm install --force
RUN npm install prisma@5.7.0  @prisma/client@5.7.0 --force
RUN npx prisma generate
CMD node ./main.js

