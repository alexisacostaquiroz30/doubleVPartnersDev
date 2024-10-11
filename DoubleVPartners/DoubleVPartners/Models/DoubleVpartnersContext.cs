using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DoubleVPartners.Models;

public partial class DoubleVpartnersContext : DbContext
{
    public DoubleVpartnersContext()
    {
    }

    public DoubleVpartnersContext(DbContextOptions<DoubleVpartnersContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WishlistItem> WishlistItems { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=ALEXIS;Database=doubleVPartners ;Trusted_Connection=SSPI;MultipleActiveResultSets=true;Trust Server Certificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Categori__23CAF1D89F1525BC");

            entity.Property(e => e.CategoryId).HasColumnName("categoryId");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(100)
                .HasColumnName("categoryName");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Products__2D10D16A10C55EE0");

            entity.HasIndex(e => e.ProductCategoryId, "IDX_Products_CategoryId");

            entity.Property(e => e.ProductId).HasColumnName("productId");
            entity.Property(e => e.ProductCategoryId).HasColumnName("productCategoryId");
            entity.Property(e => e.ProductDescription)
                .HasMaxLength(255)
                .HasColumnName("productDescription");
            entity.Property(e => e.ProductName)
                .HasMaxLength(100)
                .HasColumnName("productName");
            entity.Property(e => e.ProductPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("productPrice");

            entity.HasOne(d => d.ProductCategory).WithMany(p => p.Products)
                .HasForeignKey(d => d.ProductCategoryId)
                .HasConstraintName("FK_Products_Categories");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__CB9A1CFF86893286");

            entity.HasIndex(e => e.UserEmail, "IDX_Users_Email").IsUnique();

            entity.HasIndex(e => e.UserEmail, "UQ__Users__D54ADF553F6D7671").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("userId");
            entity.Property(e => e.RegistrationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserEmail)
                .HasMaxLength(100)
                .HasColumnName("userEmail");
            entity.Property(e => e.UserName)
                .HasMaxLength(100)
                .HasColumnName("userName");
            entity.Property(e => e.UserPassword)
                .HasMaxLength(100)
                .HasColumnName("userPassword");
        });

        modelBuilder.Entity<WishlistItem>(entity =>
        {
            entity.HasKey(e => e.WishlistItemId).HasName("PK__Wishlist__AF932F02C99F03A0");

            entity.HasIndex(e => e.WishlistProductId, "IDX_WishlistItems_ProductId");

            entity.HasIndex(e => e.WishlistUserId, "IDX_WishlistItems_UserId");

            entity.Property(e => e.WishlistItemId).HasColumnName("wishlistItemId");
            entity.Property(e => e.WishlistAddedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("wishlistAddedDate");
            entity.Property(e => e.WishlistProductId).HasColumnName("wishlistProductId");
            entity.Property(e => e.WishlistUserId).HasColumnName("wishlistUserId");

            entity.HasOne(d => d.WishlistProduct).WithMany(p => p.WishlistItems)
                .HasForeignKey(d => d.WishlistProductId)
                .HasConstraintName("FK_WishlistItems_Products");

            entity.HasOne(d => d.WishlistUser).WithMany(p => p.WishlistItems)
                .HasForeignKey(d => d.WishlistUserId)
                .HasConstraintName("FK_WishlistItems_Users");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
