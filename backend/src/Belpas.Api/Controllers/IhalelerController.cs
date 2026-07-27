using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Belpas.Api.Data;
using Belpas.Api.Models;

namespace Belpas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IhalelerController : ControllerBase
{
    private readonly AppDbContext _context;

    public IhalelerController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ihale>>> GetIhaleler()
    {
        return await _context.Ihaleler.OrderByDescending(i => i.Tarih).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Ihale>> GetIhale(int id)
    {
        var ihale = await _context.Ihaleler.FindAsync(id);
        if (ihale == null) return NotFound();
        return ihale;
    }

    [HttpPost]
    public async Task<ActionResult<Ihale>> PostIhale(Ihale ihale)
    {
        _context.Ihaleler.Add(ihale);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetIhale), new { id = ihale.Id }, ihale);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutIhale(int id, Ihale ihale)
    {
        if (id != ihale.Id) return BadRequest();
        _context.Entry(ihale).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Ihaleler.Any(e => e.Id == id)) return NotFound();
            throw;
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteIhale(int id)
    {
        var ihale = await _context.Ihaleler.FindAsync(id);
        if (ihale == null) return NotFound();
        _context.Ihaleler.Remove(ihale);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
