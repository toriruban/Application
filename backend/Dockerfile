FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build && mkdir -p dist/src/generated && cp -r src/generated/prisma dist/src/generated/

EXPOSE 8000
CMD ["node", "dist/src/server.js"]