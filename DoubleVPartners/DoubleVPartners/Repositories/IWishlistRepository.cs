using DoubleVPartners.Models;
using Microsoft.EntityFrameworkCore;

public interface IWishlistRepository
{
    Task<List<WishlistItem>> GetAllWishlistItems(int userId);
    Task AddWishlistItems(List<WishlistItem> wishlistItems); // Cambiado para manejar lista
    Task RemoveWishlistItem(int id);
}

public class WishlistRepository : IWishlistRepository
{
    private readonly DoubleVpartnersContext _context;

    public WishlistRepository(DoubleVpartnersContext context)
    {
        _context = context;
    }

    public async Task<List<WishlistItem>> GetAllWishlistItems(int userId)
    {
        return await _context.WishlistItems
            .Include(p => p.WishlistProduct)
            .Include(p => p.WishlistUser)
            .Where(w => w.WishlistUserId == userId)
            .ToListAsync();
    }

    // Nuevo método que agrega múltiples elementos
    public async Task AddWishlistItems(List<WishlistItem> wishlistItems)
    {
        await _context.WishlistItems.AddRangeAsync(wishlistItems); // Cambiado a AddRangeAsync para lista
        await _context.SaveChangesAsync();
    }

    public async Task RemoveWishlistItem(int id)
    {
        var wishlistItem = await _context.WishlistItems.FindAsync(id);
        if (wishlistItem != null)
        {
            _context.WishlistItems.Remove(wishlistItem);
            await _context.SaveChangesAsync();
        }
    }
}
