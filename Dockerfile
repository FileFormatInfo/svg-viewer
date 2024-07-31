# syntax=docker/dockerfile:1.7-labs
FROM node:20-bookworm AS base

WORKDIR /app

USER root

RUN apt-get update && apt-get install -y dumb-init

# Copy the just the files necessary for npm ci
COPY package.json package-lock.json /app/
RUN npm install --audit=false --fund=false --omit dev


FROM base AS builder

COPY . /app/

RUN npm install --audit=false --fund=false
RUN npm run build


FROM gcr.io/distroless/nodejs20-debian12:latest AS runner

ARG COMMIT="(not set)"
ARG LASTMOD="(not set)"
ENV COMMIT=$COMMIT
ENV LASTMOD=$LASTMOD
ENV NODE_ENV=production

USER nonroot
COPY --chown=nonroot:nonroot --from=base /usr/bin/dumb-init /usr/bin/dumb-init
COPY --chown=nonroot:nonroot --from=builder /app/build /app/build
COPY --chown=nonroot:nonroot --from=builder /app/node_modules /app/node_modules
COPY --chown=nonroot:nonroot ./server.js /app/server.js
COPY --chown=nonroot:nonroot ./package.json /app/package.json

WORKDIR /app
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/nodejs/bin/node", "./server.js"]
