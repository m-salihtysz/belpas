using Microsoft.EntityFrameworkCore;
using Belpas.Api.Models;

namespace Belpas.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Haber> Haberler => Set<Haber>();
    public DbSet<Tesis> Tesisler => Set<Tesis>();
    public DbSet<Calisan> Calisanlar => Set<Calisan>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
