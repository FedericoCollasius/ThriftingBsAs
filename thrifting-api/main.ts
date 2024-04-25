import express from "express";
import mailjet from "node-mailjet";
import { supabase } from "./supabase/supabase";
import 'dotenv/config';

import { ThriftStore, OpeningHours, SuggestStoreRequest } from "./models/types";
const app = express();
const port = 5000;

const emailSender = "thrift.ba@gmail.com";

const mailjetKey = process.env.MAILJET_KEY;
if (!mailjetKey) {
  console.error("MAILJET_KEY is required");
  process.exit(1);
}

const mailjetSecret = process.env.MAILJET_SECRET;
if (!mailjetSecret) {
  console.error("MAILJET_SECRET is required");
  process.exit(1);
}

const mailService = mailjet.apiConnect(mailjetKey, mailjetSecret);
app.use(express.json());

app.post("/sugerirTienda", (req, res) => {
  const { email, store  } = req.body as SuggestStoreRequest;

  mailService
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: emailSender,
          },
          To: [
            {
              Email: email,
            },
          ],
          Subject: "Thrift BA: Sugerir tienda",
          TextPart: `Gracias por sugerir la tienda ${store.name}. Nos pondremos en contacto con ellos para invitarlos a unirse a nuestra plataforma.`,
        },
      ],
    })
    .then(() => {
      supabase.from("stores").insert([{ user_email : email, store_name: store.name }]);

      res.status(200).send("Email sent");

    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error sending email");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
