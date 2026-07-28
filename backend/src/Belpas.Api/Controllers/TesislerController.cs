using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Belpas.Api.Data;
using Belpas.Api.Models;

namespace Belpas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TesislerController : ControllerBase
{
    private readonly AppDbContext _context;

    public TesislerController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tesis>>> GetTesisler()
    {
        return await _context.Tesisler.Where(t => t.Aktif).ToListAsync();
    }

    [HttpGet("{idOrSlug}")]
    public async Task<ActionResult<Tesis>> GetTesis(string idOrSlug)
    {
        Tesis? tesis = null;
        if (int.TryParse(idOrSlug, out int id))
        {
            tesis = await _context.Tesisler.FirstOrDefaultAsync(t => t.Id == id);
        }

        if (tesis == null)
        {
            string slug = idOrSlug.ToLowerInvariant();
            tesis = await _context.Tesisler.FirstOrDefaultAsync(t => t.Slug == slug);
        }

        if (tesis == null) return NotFound();
        return tesis;
    }

    [HttpPost]
    public async Task<ActionResult<Tesis>> PostTesis(Tesis tesis)
    {
        _context.Tesisler.Add(tesis);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTesis), new { id = tesis.Id }, tesis);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutTesis(int id, Tesis tesis)
    {
        if (id != tesis.Id) return BadRequest();
        _context.Entry(tesis).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Tesisler.Any(e => e.Id == id)) return NotFound();
            throw;
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTesis(int id)
    {
        var tesis = await _context.Tesisler.FindAsync(id);
        if (tesis == null) return NotFound();
        _context.Tesisler.Remove(tesis);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
