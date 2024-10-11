using DoubleVPartners.Models;

public class CategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<Category>> GetAllCategories()
    {
        return await _categoryRepository.GetAllCategories();
    }

    public async Task<Category> GetCategoryById(int id)
    {
        return await _categoryRepository.GetCategoryById(id);
    }

    public async Task AddCategory(Category category)
    {
        await _categoryRepository.AddCategory(category);
    }
}
