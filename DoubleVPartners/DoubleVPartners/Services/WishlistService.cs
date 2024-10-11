using DoubleVPartners.Models;

public class WishlistService
{
    private readonly IWishlistRepository _wishlistRepository;

    public WishlistService(IWishlistRepository wishlistRepository)
    {
        _wishlistRepository = wishlistRepository;
    }

    public async Task<List<WishlistDto>> GetAllWishlistItems(int userId)
    {
        var wishlistItems = await _wishlistRepository.GetAllWishlistItems(userId);
        return wishlistItems.Select(p => new WishlistDto
        {
            WishlistItemId = p.WishlistItemId,
            WishlistUserId = p.WishlistUser.UserId,
            WishlistProductId = p.WishlistProduct.ProductId,
            WishlistAddedDate = p.WishlistAddedDate,
            WishlistProductName = p.WishlistProduct.ProductName,
            WishlistProductDescription = p.WishlistProduct.ProductDescription,
            WishlistProductPrice = p.WishlistProduct.ProductPrice,
            WishlistUserName = p.WishlistUser.UserName
        }).ToList();
    }

    // Nuevo método que recibe una lista de items
    public async Task AddWishlistItems(List<WishlistItem> wishlistItems)
    {
        await _wishlistRepository.AddWishlistItems(wishlistItems); // Ajustado para manejar una lista
    }

    public async Task RemoveWishlistItem(int id)
    {
        await _wishlistRepository.RemoveWishlistItem(id);
    }
}
