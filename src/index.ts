import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

const mailService = new Elysia({ prefix: "/mail" })
.get("/test", () => "Hello Elysia1 from mailService")

const userService = new Elysia({ prefix: "/user" })
.get("/test", () => "Hello Elysia1 from userService")

const app = new Elysia()
  .use(swagger())
  .use(mailService)
  .use(userService)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
