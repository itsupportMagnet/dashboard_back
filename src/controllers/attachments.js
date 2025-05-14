import { IncomingForm } from 'formidable';
import sgMail from '@sendgrid/mail';
import fs from 'fs/promises'; // 👈 usar fs/promises para async/await

const { sendGridKey } = process.env;

export const sendDO = async (req, res) => {
  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error processing form:', err);
      return res.status(500).json({ message: 'Error processing form.' });
    }

    const file = files.pdf;
    if (!file) {
      return res.status(400).json({ message: 'No PDF file was sent.' });
    }

    try {
      // ✅ Leer el archivo como base64
      const fileBuffer = await fs.readFile(file.filepath);
      const fileBase64 = fileBuffer.toString('base64');

      sgMail.setApiKey(sendGridKey);

      const msg = {
        to: 'anders.rojas@pucp.pe',
        from: 'andre.gonzalez@easyfreight.ai',
        replyTo: 'anders.rojas@pucp.pe',
        subject: 'Drayage request from',
        text: 'EasyFreight 2024',
        html: 'asd',
        attachments: [
          {
            filename: file.originalFilename,
            content: fileBase64,
            type: file.mimetype,
            disposition: 'attachment',
          },
        ],
      };

      await sgMail.send(msg);
      console.log('Email sent');
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email.' });
    }
  });
};
