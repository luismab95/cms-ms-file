# ==========================================
# BUILD
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i --legacy-peer-deps

COPY . .

RUN npm run build


# ==========================================
# PRODUCTION
# ==========================================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY uploads ./uploads

RUN npm i --legacy-peer-deps --omit=dev \
    && npm cache clean --force

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]