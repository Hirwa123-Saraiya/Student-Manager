using Microsoft.EntityFrameworkCore;
using StudentManagerAPI.Models;

namespace StudentManagerAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) {}

        public DbSet<Student> Students => Set<Student>();
        public DbSet<User> Users { get; set; }
    }
}