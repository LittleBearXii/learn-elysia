# Elysia with Bun runtime

## Getting Started
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## How to deploy
To deploy this project to docker <br />
note: fix you image name in **docker-compose.yml** befor run command
```bash
 docker build -t your-image-name .

 docker compose -f docker-compose.yml -p you-container-name up -d 
```