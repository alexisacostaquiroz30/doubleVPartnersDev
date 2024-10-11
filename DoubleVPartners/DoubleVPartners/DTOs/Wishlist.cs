using DoubleVPartners.Models;

public class WishlistDto
{
    public int WishlistItemId { get; set; }

    public int? WishlistUserId { get; set; }

    public int? WishlistProductId { get; set; }

    public DateTime? WishlistAddedDate { get; set; }

    public string WishlistProductName { get; set; }
    public string WishlistProductDescription { get; set; }
    public decimal WishlistProductPrice { get; set; }

    public string WishlistUserName { get; set; }
}
