using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Belpas.Api.Data;
using Belpas.Api.Models;

namespace Belpas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EtkinliklerController : ControllerBase
{
    private readonly AppDbContext _context;

    public EtkinliklerController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Etkinlik>>> GetEtkinlikler()
    {
        return await _context.Etkinlikler.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Etkinlik>> GetEtkinlik(int id)
    {
        var etkinlik = await _context.Etkinlikler.FindAsync(id);
        if (etkinlik == null) return NotFound();
        return etkinlik;
    }

    [HttpPost]
    public async Task<ActionResult<Etkinlik>> PostEtkinlik(Etkinlik etkinlik)
    {
        _context.Etkinlikler.Add(etkinlik);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEtkinlik), new { id = etkinlik.Id }, etkinlik);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutEtkinlik(int id, Etkinlik etkinlik)
    {
        if (id != etkinlik.Id) return BadRequest();
        _context.Entry(etkinlik).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Etkinlikler.Any(e => e.Id == id)) return NotFound();
            throw;
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEtkinlik(int id)
    {
        var etkinlik = await _context.Etkinlikler.FindAsync(id);
        if (etkinlik == null) return NotFound();
        _context.Etkinlikler.Remove(etkinlik);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
