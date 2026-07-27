using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Belpas.Api.Data;
using Belpas.Api.Models;

namespace Belpas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HaberlerController : ControllerBase
{
    private readonly AppDbContext _context;

    public HaberlerController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Haber>>> GetHaberler()
    {
        return await _context.Haberler.Where(h => h.Aktif).OrderByDescending(h => h.OlusturmaTarihi).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Haber>> GetHaber(int id)
    {
        var haber = await _context.Haberler.FindAsync(id);
        if (haber == null) return NotFound();
        return haber;
    }

    [HttpPost]
    public async Task<ActionResult<Haber>> PostHaber(Haber haber)
    {
        _context.Haberler.Add(haber);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetHaber), new { id = haber.Id }, haber);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutHaber(int id, Haber haber)
    {
        if (id != haber.Id) return BadRequest();
        _context.Entry(haber).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Haberler.Any(e => e.Id == id)) return NotFound();
            throw;
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHaber(int id)
    {
        var haber = await _context.Haberler.FindAsync(id);
        if (haber == null) return NotFound();
        _context.Haberler.Remove(haber);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
