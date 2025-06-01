FROM node:22-alpine AS base

WORKDIR /app

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

RUN corepack enable
RUN corepack prepare yarn@3.8.7 --activate

RUN npm install -g turbo

COPY . .

RUN yarn set version 3.8.7

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN turbo prune --scope="@magwishlist/api" --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

RUN corepack enable
RUN corepack prepare yarn@3.8.7 --activate

RUN npm install -g turbo

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/.yarnrc.yml .
COPY --from=builder /app/.yarn /app/.yarn
COPY --from=builder /app/package.json .
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
RUN if [ -f /app/out/package-lock.json ]; then cp /app/out/package-lock.json ./package-lock.json; fi
RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN turbo build --filter="@magwishlist/api"

FROM base AS development
RUN apk add --no-cache libc6-compat
RUN apk update

RUN corepack enable
RUN corepack prepare yarn@3.8.7 --activate

RUN npm install -g turbo

COPY --from=installer /app .

RUN cd apps/api && npx prisma generate

EXPOSE 3001
EXPOSE 9229

ENV PORT 3001
ENV NODE_ENV=development

CMD ["yarn", "dev", "--", "--filter=@magwishlist/api"]

FROM base AS production
RUN apk add --no-cache libc6-compat
RUN apk update

ENV NODE_ENV=production

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/apps/api/dist /app/apps/api/dist
COPY --from=installer /app/apps/api/package.json /app/apps/api/package.json

WORKDIR /app/apps/api

EXPOSE 3001

CMD ["node", "dist/main"]
