using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DoubleVPartners.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public decimal ProductPrice { get; set; }

    public string? ProductDescription { get; set; }

    public int? ProductCategoryId { get; set; }

    public virtual Category ProductCategory { get; set; }

    public virtual ICollection<WishlistItem> WishlistItems { get; set; } = new List<WishlistItem>();
}