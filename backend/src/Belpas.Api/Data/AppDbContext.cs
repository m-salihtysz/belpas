using Microsoft.EntityFrameworkCore;
using Belpas.Api.Models;

namespace Belpas.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Haber> Haberler => Set<Haber>();
    public DbSet<Ihale> Ihaleler => Set<Ihale>();
    public DbSet<Tesis> Tesisler => Set<Tesis>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Tablo yapılandırmaları ve ilk örnek (seed) veriler burada tanımlanabilir
    }
}
