export interface INotificationService {
  notifyUser(userId: string, message: string): Promise<void>;
  notifyWishlistUpdate(wishlistId: string, message: string): Promise<void>;
}
