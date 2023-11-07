import { Resend } from 'resend';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
const router = express.Router();
dotenv.config({path: "../.env"});
const id = process.env.RESENDID;

const resend = new Resend(id);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log('Listening on http://localhost:' + process.env.PORT);
});

router.post('/contact', async (req: Request, res: Response) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'jenha04@gmail.com',
      subject: '***Contacto - Portafolio',
      html: `<p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Message: ${message}</p>`,
    });

    res.status(200).json(data);
  } catch(error) {
    res.status(400).json(error);
  }
})

