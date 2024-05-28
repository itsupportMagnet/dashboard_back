import sgMail from '@sendgrid/mail';
const { sendGridKey, fromEmail, replyToEmail } = process.env
const sendGridTestKey = "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";

export const sendEmail = async (carriers, replyEmail, emailSubject, emailBody) => {
  // sgMail.setApiKey(sendGridKey)//Cambiar a sendGridKey

  carriers.forEach(carrierEmail => {
    const msg = {
      to: carrierEmail, // Change to your recipient
      from: 'andre.gonzalez@easyfreight.ai', // Change to your verified sender
      replyTo: replyEmail,
      subject: emailSubject,
      // bcc: bccRecipients,
      text: 'EasyFreight 2024',
      html: emailBody,
    }

    console.log(msg);
    sgMail.setApiKey(sendGridKey);

    sgMail.send(msg).then(() => {
      console.log('Email sent')
    })
      .catch((error) => {
        console.error(error)
      })
  })


};
