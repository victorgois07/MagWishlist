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

RUN turbo prune --scope="@magwishlist/web" --docker

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
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/apps/web/package.json ./apps/web/
RUN if [ -f /app/out/package-lock.json ]; then cp /app/out/package-lock.json ./package-lock.json; fi
RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN turbo build --filter="@magwishlist/web"

FROM base AS development
RUN apk add --no-cache libc6-compat
RUN apk update

RUN corepack enable
RUN corepack prepare yarn@3.8.7 --activate

RUN npm install -g turbo

COPY --from=installer /app .

EXPOSE 5173

ENV NODE_ENV=development

CMD ["yarn", "dev", "--", "--filter=@magwishlist/web", "--host"]

FROM base AS production

RUN apk add --no-cache libc6-compat
RUN apk update

ENV NODE_ENV=production

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/apps/web/dist /app/apps/web/dist
COPY --from=installer /app/apps/web/package.json /app/apps/web/package.json

WORKDIR /app/apps/web

EXPOSE 5173

CMD ["yarn", "preview"]
