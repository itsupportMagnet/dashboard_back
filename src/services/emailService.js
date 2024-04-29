import sgMail from '@sendgrid/mail';
const { sendGridKey, fromEmail, replyToEmail } = process.env
const sendGridTestKey = "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";

export const sendEmail = async (carrier, emailSubject, emailBody) => {
  console.log(carrier);
  // sgMail.setApiKey(sendGridKey)//Cambiar a sendGridKey
  const msg = {
    to: carrier, // Change to your recipient
    from: 'easyfreight@easyfreight.ai', // Change to your verified sender
    replyTo: 'josias.salgado.f@gmail.com',
    subject: emailSubject,
    // bcc: bccRecipients,
    text: 'EasyFreight 2024',
    html: emailBody,
  }

  sgMail.setApiKey(sendGridTestKey);

  sgMail.send(msg).then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

};
