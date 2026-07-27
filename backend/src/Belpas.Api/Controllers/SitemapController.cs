using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Xml.Linq;
using Microsoft.EntityFrameworkCore;
using Belpas.Api.Data;

namespace Belpas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SitemapController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly string _frontendUrl = "https://belpas.sakarya.bel.tr";

    public SitemapController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("sitemap.xml")]
    public async Task<IActionResult> GetSitemap()
    {
        XNamespace xmlns = "http://www.sitemaps.org/schemas/sitemap/0.9";
        var urlset = new XElement(xmlns + "urlset");
        var today = DateTime.UtcNow.ToString("yyyy-MM-dd");

        // 1. Statik Ana Sayfalar
        var staticPages = new[]
        {
            ("",                                  "daily",   "1.0"),
            ("/kurumsal",                         "monthly", "0.8"),
            ("/kurumsal/hakkimizda",              "monthly", "0.7"),
            ("/kurumsal/organizasyon-semasi",     "monthly", "0.6"),
            ("/kurumsal/kurumsal-kimlik",         "monthly", "0.6"),
            ("/kurumsal/faaliyet-raporu",         "monthly", "0.6"),
            ("/tesisler",                         "weekly",  "0.9"),
            ("/ihaleler",                         "daily",   "0.9"),
            ("/ihaleler/ilanlar",                 "daily",   "0.8"),
            ("/ihaleler/komisyon",                "monthly", "0.6"),
            ("/ihaleler/kriterler",               "monthly", "0.6"),
            ("/ihaleler/surec",                   "monthly", "0.6"),
            ("/haberler",                         "daily",   "0.9"),
            ("/iletisim",                         "monthly", "0.7"),
        };

        foreach (var (path, freq, priority) in staticPages)
        {
            urlset.Add(new XElement(xmlns + "url",
                new XElement(xmlns + "loc", $"{_frontendUrl}{path}"),
                new XElement(xmlns + "lastmod", today),
                new XElement(xmlns + "changefreq", freq),
                new XElement(xmlns + "priority", priority)
            ));
        }

        // 2. Dinamik Tesis Detay Sayfaları
        var tesisler = await _context.Tesisler.Where(t => t.Aktif).ToListAsync();
        foreach (var tesis in tesisler)
        {
            urlset.Add(new XElement(xmlns + "url",
                new XElement(xmlns + "loc", $"{_frontendUrl}/tesisler/{tesis.Id}"),
                new XElement(xmlns + "lastmod", today),
                new XElement(xmlns + "changefreq", "monthly"),
                new XElement(xmlns + "priority", "0.8")
            ));
        }

        // 3. Dinamik Haber Detay Sayfaları
        var haberler = await _context.Haberler.Where(h => h.Aktif)
            .OrderByDescending(h => h.OlusturmaTarihi)
            .ToListAsync();
        foreach (var haber in haberler)
        {
            urlset.Add(new XElement(xmlns + "url",
                new XElement(xmlns + "loc", $"{_frontendUrl}/haberler/{haber.Id}"),
                new XElement(xmlns + "lastmod", haber.OlusturmaTarihi.ToString("yyyy-MM-dd")),
                new XElement(xmlns + "changefreq", "weekly"),
                new XElement(xmlns + "priority", "0.7")
            ));
        }

        var doc = new XDocument(new XDeclaration("1.0", "utf-8", "yes"), urlset);
        return Content(doc.Declaration?.ToString() + "\n" + doc.ToString(), "application/xml", Encoding.UTF8);
    }
}