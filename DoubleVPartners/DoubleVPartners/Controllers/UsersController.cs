using DoubleVPartners.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;
    private readonly AuthService _authService;

    public UsersController(UserService userService, AuthService authService)
    {
        _userService = userService;
        _authService = authService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userService.GetAllUsers();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _userService.GetUserById(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> PostUser([FromBody] User user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        user.UserPassword = BCrypt.Net.BCrypt.HashPassword(user.UserPassword);
        user.WishlistItems = new List<WishlistItem>();

        await _userService.AddUser(user);
        return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Login login)
    {

        var isValidUser = await _authService.VerifyPassword(login.UserEmail, login.UserPassword);

        if (!isValidUser)
        {
            return Unauthorized();
        }

        var user = await _authService.GetUserByEmail(login.UserEmail);
        var token = _authService.GenerateJwtToken(user);

        return Ok(new { Token = token, userId = user.UserId });
    }
}
