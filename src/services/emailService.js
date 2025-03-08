import sgMail from '@sendgrid/mail';
const { sendGridKey } = process.env;


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
        };

        sgMail.setApiKey(sendGridKey);

        sgMail.send(msg).then(() => {
            console.log('Email sent');
        })
            .catch((error) => {
                console.error(error);
            });
    });


};
