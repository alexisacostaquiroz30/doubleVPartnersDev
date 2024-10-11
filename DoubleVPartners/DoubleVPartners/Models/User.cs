using System;
using System.Collections.Generic;

namespace DoubleVPartners.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string UserEmail { get; set; } = null!;

    public string UserPassword { get; set; } = null!;

    public DateTime? RegistrationDate { get; set; }

    public virtual ICollection<WishlistItem> WishlistItems { get; set; } = new List<WishlistItem>();
}
