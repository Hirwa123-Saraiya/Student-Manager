using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagerAPI.Data;
using StudentManagerAPI.Models;

namespace StudentManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == user.Email);

            if (existingUser != null)
            {
                return BadRequest(new { message = "User already exists with this email." });
            }

            var allowedDomains = new[] { "gmail.com", "yahoo.in" };
            var emailDomain = user.Email?.Split('@').Last();

            if (emailDomain == null || !allowedDomains.Contains(emailDomain))
            {
                return BadRequest(new { message = "Only Gmail and Yahoo India emails are allowed." });
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration successful", user.Email });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginData)
        {
            var email = loginData.Email?.Trim().ToLower();
            var password = loginData.Password?.Trim();

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email != null &&
                                        u.Email.ToLower() == email &&
                                        u.Password == password);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            return Ok(new { message = "Login successful", user.Email });
        }
    }
}