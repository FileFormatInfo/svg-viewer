# syntax=docker/dockerfile:1.7-labs
FROM node:20-bookworm AS builder

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install --audit=false --fund=false
COPY . /app/

RUN npm run build


FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/build/client /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
