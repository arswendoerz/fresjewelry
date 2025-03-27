import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.sendMail({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};
export const sendWelcomeEmail = async (email, name) => {
  const recipient = { email };
  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "f0389f07-aab2-46fc-94ce-10b1a7bc3981",
      template_variables: {
        company_info_name: "Fres Jewellry",
        name: name,
      },
    });

    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error(`Error sending welcome email`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};
