export interface IEmailService {
  sendWelcomeEmail(email: string, name: string): Promise<void>;
  sendWishlistSharedEmail(
    email: string,
    wishlistName: string,
    sharedBy: string,
  ): Promise<void>;
}
