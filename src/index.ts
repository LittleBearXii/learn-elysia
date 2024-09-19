import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { MailOptions } from "./models/mailOptions";
import { SENDER } from "@/config";
import sendMailAsync from "@/mailService/initMail";

const validateMailRequestOption = {
  body: t.Object({
    sendTo: t.String(),
  }),
};

const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="height: 100vh;"
    >
      <tr>
        <td align="center" valign="top" style="padding: 20px 0;">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
            "
          >
            <tr>
              <td
                align="center"
                style="
                  font-size: 24px;
                  font-family: Arial, sans-serif;
                  font-weight: bold;
                  color: #333;
                  padding: 20px;
                "
              >
                Welcome to Our Service!
              </td>
            </tr>
            <tr>
              <td
                align="center"
                style="
                  font-size: 16px;
                  font-family: Arial, sans-serif;
                  color: #555;
                  padding: 20px;
                "
              >
                We're excited to have you on board. Enjoy all the features we offer and feel free to reach out to our support team if you have any questions.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`

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
  .use(swagger())
  .use(mailService)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
