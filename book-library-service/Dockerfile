# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# ---- Production Stage ----
FROM node:22-alpine AS production

WORKDIR /app

RUN mkdir -p /data

COPY package.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3002

CMD ["node", "dist/server.js"]
