import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js";
import { ClientSecretCredential } from "@azure/identity";
import 'isomorphic-fetch';

const { tenantId, clientId, clientSecret } = process.env;

export const sendEmail = async (emailSubject, emailBody, propBccRecipients = [], propCcRecipients ) => {
  const resource = 'andre.gonzalez@magnetlogisticscorp.com';
  const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
  const authProvider = new TokenCredentialAuthenticationProvider(credential, { scopes: ["https://graph.microsoft.com/.default"] });
  const client = Client.initWithMiddleware({
    authProvider
  });


  const recipients = [
     "jcastro@magnetlogisticscorp.com",
     "accounting@magnetlogisticscorp.com",
    
  ];

  if (propCcRecipients && propCcRecipients.length !== 0) {
    recipients.push(...propCcRecipients); 
  }

  const ccRecipients = recipients.map(email => ({ emailAddress: { address: email } }));

  try {
    const sendFeesEmail = {
      message: {
        subject: emailSubject,
        body: {
          contentType: 'HTML',
          content: emailBody
        },
        ccRecipients: ccRecipients
      }
    };

    if (propBccRecipients && propBccRecipients.length > 0) {
      const bccRecipients = propBccRecipients.map(email => ({ emailAddress: { address: email } }));
      sendFeesEmail.message.bccRecipients = bccRecipients;
    }

    await client.api(`/users/${resource}/sendMail`).post(sendFeesEmail);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
