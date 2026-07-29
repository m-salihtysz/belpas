using Microsoft.EntityFrameworkCore;
using Belpas.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// DbContext ve PostgreSQL kaydı
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// CORS Ayarları (Angular uygulaması için)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // Veritabanını ve tabloları oluşturup seed verilerini basar
    DbSeeder.Seed(context); 
}

// Swagger sadece geliştirme ortamında değil, her zaman açık olması istenir veya isteğe göre yapılandırılır
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// CORS aktifleştirme
app.UseCors("AngularApp");

app.UseAuthorization();

app.MapControllers();

// Root path'e gelince Swagger'a yönlendir
app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();
