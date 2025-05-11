using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data
{
    public class MainDbContext : DbContext
    {
        public MainDbContext(DbContextOptions<MainDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuarios> Users { get; set; }

        // Configuração para o provedor MySQL
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var serverVersion = new MySqlServerVersion(new Version(8, 0, 28));

                // Conexão
                optionsBuilder.UseMySql("server=localhost;port=3306;database=gestao_usuarios;user=root;password=teste;", serverVersion);
            }
        }
    }
}
