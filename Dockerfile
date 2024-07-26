# syntax=docker/dockerfile:1.7-labs
FROM node:20
ARG COMMIT
ARG LASTMOD
RUN echo "INFO: building for $COMMIT on $LASTMOD"

WORKDIR /app
COPY . .
RUN \
	npm install \
	&& npm run build

EXPOSE 4000
ENV PORT 4000

CMD npm run start
