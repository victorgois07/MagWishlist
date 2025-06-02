import { IEmailService } from "@magwishlist/application/src/interfaces/IEmailService";

export class EmailService implements IEmailService {
  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    console.log(`[EmailService] Sending welcome email to ${email} (${name})`);
    // TODO: Implement actual email sending logic
  }

  async sendWishlistSharedEmail(
    email: string,
    wishlistName: string,
    sharedBy: string,
  ): Promise<void> {
    console.log(
      `[EmailService] Sending wishlist shared email to ${email} for wishlist "${wishlistName}" shared by ${sharedBy}`,
    );
    // TODO: Implement actual email sending logic
  }
}
