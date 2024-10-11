using System;
using System.Collections.Generic;

namespace DoubleVPartners.Models;

public partial class WishlistItem
{
    public int WishlistItemId { get; set; }

    public int? WishlistUserId { get; set; }

    public int? WishlistProductId { get; set; }

    public DateTime? WishlistAddedDate { get; set; }

    public virtual Product? WishlistProduct { get; set; }

    public virtual User? WishlistUser { get; set; }
}
