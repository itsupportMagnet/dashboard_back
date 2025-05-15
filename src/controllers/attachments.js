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


    const file = files.pdf[0];
    if (!file) {
      return res.status(400).json({ message: 'No PDF file was sent.' });
    }

    try {
      const fileBuffer = await fs.readFile(file.filepath);
      const fileBase64 = fileBuffer.toString('base64');

      sgMail.setApiKey(sendGridKey);
      const bookingNumber = fields.bookingNumber || 'BK-0000';
      const { carrierName, coordinatorName, operationId, carrierEmail } = fields;
      const subject = `DO - ${operationId} - ${carrierName} - ${bookingNumber}`;
      const text = `
        Dear ${carrierName},

        Attached you will find the Delivery Order for Operation ${operationId}.

        Please confirm receipt.

        Thank you,
        ${coordinatorName}
        Magnet Logistics
      `;
      const html = `
        <p>Dear <strong>${carrierName}</strong>,</p>
        <p>Attached you will find the Delivery Order for Operation <strong>${operationId}</strong>.</p>
        <p>Please confirm receipt.</p>
        <p>Thank you,<br>
        <strong>${coordinatorName}</strong><br>
        Magnet Logistics</p>
      `;
      const msg = {
        to: carrierEmail,
        from: 'andre.gonzalez@easyfreight.ai',
        replyTo: 'andre.gonzalez@easyfreight.ai',
        subject: subject,
        text: text,
        html: html,
        attachments: [
          {
            filename: file.originalFilename,
            content: fileBase64,
            type: file.mimetype,
            disposition: 'attachment',
          },
        ],
      };

      const emailSent = await sgMail.send(msg);
      console.log('Email sent:', emailSent);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email.' });
    }
  });
};
