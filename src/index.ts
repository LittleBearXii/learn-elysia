import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'
import { swagger } from "@elysiajs/swagger";
import { MailOptions } from "./models/mailOptions";
import { SENDER } from "@/config";
import sendMailAsync from "@/mailService/initMail";
import { emailTemplate } from "@/mailService/mailTemplate";

const validateMailRequestOption = {
  body: t.Object({
    sendTo: t.String(),
  }),
};

const mailService = new Elysia({ prefix: "/mail" })
.post("/send", async ({ body }) => {
    const mailOptions: MailOptions = {
      from: SENDER,
      to: body.sendTo,
      subject: "Hello Elysia",
      html: emailTemplate,
      attachments: [{   
        // filename and content type is derived from path
        path: `${process.cwd()}/src/assets/Test.pdf`
      }]
    };

    const response = await sendMailAsync(mailOptions);

    return response;
  },
  validateMailRequestOption
);

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(mailService)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
