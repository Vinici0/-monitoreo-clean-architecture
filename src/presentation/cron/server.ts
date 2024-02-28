import { EmailService } from "../email/email.service";

export class Server {
  public static start() {
    console.log("Server started...");

    const emailService = new EmailService();

    emailService.sendEmail({
      to: "vinicio.borja10@gmail.com",
      subject: "Test",
      htmlBody: "<h1>Test</h1>",
    })
  }
}
