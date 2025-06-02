import { INotificationService } from "@magwishlist/application/src/interfaces/INotificationService";

export class NotificationService implements INotificationService {
  async notifyUser(userId: string, message: string): Promise<void> {
    console.log(`[NotificationService] Notifying user ${userId}: ${message}`);
    // TODO: Implement actual notification logic (e.g., push notifications, in-app notifications)
  }

  async notifyWishlistUpdate(
    wishlistId: string,
    message: string,
  ): Promise<void> {
    console.log(
      `[NotificationService] Notifying wishlist ${wishlistId} update: ${message}`,
    );
    // TODO: Implement actual notification logic
  }
}
