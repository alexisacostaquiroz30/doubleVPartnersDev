using DoubleVPartners.Models;
using Microsoft.EntityFrameworkCore;
using System;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllCategories();
    Task<Category> GetCategoryById(int id);
    Task AddCategory(Category category);
}


public class CategoryRepository : ICategoryRepository
{
    private readonly DoubleVpartnersContext _context;

    public CategoryRepository(DoubleVpartnersContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>> GetAllCategories()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<Category> GetCategoryById(int id)
    {
        return await _context.Categories.FindAsync(id);
    }

    public async Task AddCategory(Category category)
    {
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();
    }
}
