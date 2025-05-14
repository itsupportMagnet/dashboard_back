import { IncomingForm } from 'formidable';
import sgMail from '@sendgrid/mail';
const { sendGridKey } = process.env;

export const sendDO = async (req, res) => {
  const form = new IncomingForm({ keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error procesing form:', err);
      return res.status(500).json({ message: 'Error procesing form.' });
    }
    const file = files.pdf;
    if (!file) {
      return res.status(400).json({ message: 'No PDF file was sent.' });
    }
    const emailSubject = 'Drayage request from';
    const emailBody = 'asd';
    const msg = {
      to: 'anders.rojas@pucp.pe',
      from: 'andre.gonzalez@easyfreight.ai',
      replyTo: 'anders.rojas@pucp.pe',
      subject: emailSubject,
      // bcc: bccRecipients,
      text: 'EasyFreight 2024',
      html: emailBody,
    };

    try {
      sgMail.setApiKey(sendGridKey);
      await sgMail.send(msg);
      console.log('Email sent');
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email.' });
    }
  });
  
};
