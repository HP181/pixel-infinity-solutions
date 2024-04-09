import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const body = await request.json();
    const { name, e } = body;

    const data = await resend.emails.send({
      from: 'codebucks.tech@gmail.com',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
