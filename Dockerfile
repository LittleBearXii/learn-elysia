FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
COPY package.json package.json
COPY bun.lockb bun.lockb
COPY tsconfig.json tsconfig.json

RUN bun install

COPY src src

ENV NODE_ENV=production

CMD ["bun", "src/index.ts"]

EXPOSE 3000