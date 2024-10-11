using DoubleVPartners.Models;
using Microsoft.EntityFrameworkCore;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllUsers();
    Task<User> GetUserById(int id);
    Task<User> GetUserByEmail(string email);
    Task AddUser(User user);
}

public class UserRepository : IUserRepository
{
    private readonly DoubleVpartnersContext _context;

    public UserRepository(DoubleVpartnersContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllUsers()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User> GetUserById(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> GetUserByEmail(string email)
    {
        // Busca el usuario por email
        return await _context.Users.FirstOrDefaultAsync(u => u.UserEmail == email);
    }


    public async Task AddUser(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }
}
