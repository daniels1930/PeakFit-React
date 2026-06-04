# Redux / Supabase Bridge

- `auth` slice -> replaces `AuthContext`
- `products` slice -> replaces product/catalog data layer
- `cart` slice -> replaces `CartContext`
- `wishlist` slice -> replaces `WishlistContext`
- `orders` slice -> replaces orders/order detail local data

Temporary persistence:
- `cart` and `wishlist` still mirror `localStorage` until Supabase sync is wired.

API layer:
- `src/services/api.ts` is a placeholder bridge to the shared Supabase client.
