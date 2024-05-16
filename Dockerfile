# syntax=docker/dockerfile:1.7-labs
FROM node:20 as frontend
RUN mkdir /frontend
WORKDIR /frontend
COPY --exclude=dist --exclude=cmd . /frontend/
RUN \
	npm install \
	&& npm run build

FROM golang:1.22-alpine as builder
RUN apk add --no-cache upx
RUN mkdir /build
COPY --exclude=src . /build/
COPY --from=frontend /frontend/dist /build/dist
WORKDIR /build
ARG COMMIT
ARG LASTMOD
RUN echo "INFO: building for $COMMIT on $LASTMOD"

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

RUN go build \
    -a \
    -installsuffix cgo \
    -ldflags "-s -w -X main.COMMIT=$COMMIT -X main.LASTMOD=$LASTMOD -extldflags '-static'" \
    -o svg-view cmd/svg-view/*.go \
    && upx svg-view

FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /build/svg-view /bin/svg-view
ENV PORT 4000
ENTRYPOINT ["/bin/svg-view"]
