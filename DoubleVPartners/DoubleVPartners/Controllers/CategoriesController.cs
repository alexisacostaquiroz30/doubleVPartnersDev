using DoubleVPartners.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly CategoryService _categoryService;

    public CategoriesController(CategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _categoryService.GetAllCategories();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(int id)
    {
        var category = await _categoryService.GetCategoryById(id);
        if (category == null)
        {
            return NotFound();
        }
        return Ok(category);
    }

    [HttpPost]
    public async Task<IActionResult> PostCategory([FromBody] Category category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _categoryService.AddCategory(category);
        return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryId }, category);
    }
}
