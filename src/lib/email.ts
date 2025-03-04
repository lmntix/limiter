import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import {
  InvitationEmail,
  InvitationEmailProps,
} from "@/emails/InvitationEmail";
import {
  PasswordResetEmail,
  PasswordResetEmailProps,
} from "@/emails/PasswordResetEmail";
import {
  VerificationEmail,
  VerificationEmailProps,
} from "@/emails/VerificationEmail";
import {
  EmailChangeVerifyEmail,
  EmailChangeVerifyEmailProps,
} from "@/emails/EmailChangeVerifyEmail";
import env from "@/env";

// ----------------------------------------------- EMAIL LOG ---------------------------------

async function logEmailAttempt(
  to: string,
  subject: string,
  success: boolean,
  error?: unknown
) {
  console.log(
    `[Email ${success ? "Success" : "Failed"}] ${new Date().toISOString()}
    To: ${to}
    Subject: ${subject}
    ${error ? `\nError: ${JSON.stringify(error, null, 2)}` : ""}`
  );
}

// ----------------------------------------------- NODEMAILER TRANSPORT ---------------------------------

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT || 587,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

// ----------------------------------------------- EMAIL TYPES START ---------------------------------

type EmailType =
  | "invitation"
  | "password-reset"
  | "verification"
  | "email-change";
type EmailData =
  | InvitationEmailProps
  | PasswordResetEmailProps
  | VerificationEmailProps
  | EmailChangeVerifyEmailProps;

export async function sendEmail(to: string, type: EmailType, data: EmailData) {
  let subject: string;
  let html: string;

  try {
    switch (type) {
      case "invitation":
        subject = "Invitation to PocketFinance";
        html = await render(InvitationEmail(data as InvitationEmailProps));
        break;
      case "password-reset":
        subject = "Reset your PocketFinance password";
        html = await render(
          PasswordResetEmail(data as PasswordResetEmailProps)
        );
        break;
      case "verification":
        subject = "Verify your PocketFinance account";
        html = await render(VerificationEmail(data as VerificationEmailProps));
        break;
      case "email-change":
        subject = "Verify your email change";
        html = await render(
          EmailChangeVerifyEmail(data as EmailChangeVerifyEmailProps)
        );
        break;
      default:
        throw new Error("Invalid email type");
    }

    // ----------------------------------------------- EMAIL TYPES END ---------------------------------

    const emailConfig = {
      from: env.SMTP_FROM,
      to,
      subject,
      html,
    };

    try {
      await transporter.sendMail(emailConfig);
      await logEmailAttempt(to, subject, true);
    } catch (error) {
      await logEmailAttempt(to, subject, false, error);
      throw new Error(
        `Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }

    return { success: true };
  } catch (error) {
    console.error("[Email Service Error]", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
