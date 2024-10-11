using DoubleVPartners.Models;
using Microsoft.EntityFrameworkCore;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllProducts();
    Task<Product> GetProductById(int id);
    Task AddProduct(Product product);
}

public class ProductRepository : IProductRepository
{
    private readonly DoubleVpartnersContext _context;

    public ProductRepository(DoubleVpartnersContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetAllProducts()
    {
        return _context.Products.Include(p => p.ProductCategory).AsQueryable();
    }

    public async Task<Product> GetProductById(int id)
    {
        return await _context.Products.Include(p => p.ProductCategory).FirstOrDefaultAsync(p => p.ProductId == id);
    }

    public async Task AddProduct(Product product)
    {
        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();
    }
}
