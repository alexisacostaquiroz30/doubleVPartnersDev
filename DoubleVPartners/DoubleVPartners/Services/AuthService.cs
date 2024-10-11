using DoubleVPartners.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class AuthService
{
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;

    public AuthService(IConfiguration configuration, IUserRepository userRepository)
    {
        _configuration = configuration;
        _userRepository = userRepository;
    }

    public async Task<User> GetUserByEmail(string email)
    {
        return await _userRepository.GetUserByEmail(email);
    }

    public async Task<bool> VerifyPassword(string email, string password)
    {
        // Obtener el usuario por email
        var user = await _userRepository.GetUserByEmail(email);

        if (user == null)
        {
            // Si no existe un usuario con ese email
            return false;
        }

        // Verificar si la contraseña ingresada coincide con el hash en la base de datos
        return BCrypt.Net.BCrypt.Verify(password, user.UserPassword);
    }


    public string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:Key"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.UserEmail)
            }),
            Expires = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["JwtSettings:DurationInMinutes"])),
            Issuer = _configuration["JwtSettings:Issuer"],
            Audience = _configuration["JwtSettings:Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
