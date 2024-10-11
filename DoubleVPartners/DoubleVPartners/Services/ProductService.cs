using DoubleVPartners.Models;

public class ProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProducts()
    {
        var products = await _productRepository.GetAllProducts();

        return products.Select(p => new ProductDto
        {
            ProductId = p.ProductId,
            ProductName = p.ProductName,
            ProductPrice = p.ProductPrice,
            ProductDescription = p.ProductDescription,
            ProductCategoryId = (int)p.ProductCategoryId,
            ProductCategoryName = p.ProductCategory.CategoryName
        });
    }


    public async Task<Product> GetProductById(int id)
    {
        return await _productRepository.GetProductById(id);
    }

    public async Task AddProduct(Product product)
    {
        await _productRepository.AddProduct(product);
    }
}
