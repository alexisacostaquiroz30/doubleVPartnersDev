using DoubleVPartners.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class WishlistController : ControllerBase
{
    private readonly WishlistService _wishlistService;

    public WishlistController(WishlistService wishlistService)
    {
        _wishlistService = wishlistService;
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetWishlistItems(int userId)
    {
        var wishlistItems = await _wishlistService.GetAllWishlistItems(userId);
        return Ok(wishlistItems);
    }

    [HttpPost]
    public async Task<IActionResult> PostWishlistItems([FromBody] WishlistRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _wishlistService.AddWishlistItems(request.WishlistItems); // Ajustado para múltiples items
        return Ok(request.WishlistItems);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWishlistItem(int id)
    {
        await _wishlistService.RemoveWishlistItem(id);
        return NoContent();
    }
}
