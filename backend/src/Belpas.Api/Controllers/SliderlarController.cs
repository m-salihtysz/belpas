using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Belpas.Api.Data;
using Belpas.Api.Models;

namespace Belpas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SliderlarController : ControllerBase
{
    private readonly AppDbContext _context;

    public SliderlarController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Slider>>> GetSliderlar()
    {
        return await _context.Sliderlar
            .Where(s => s.Aktif)
            .OrderBy(s => s.Sira)
            .ThenBy(s => s.Id)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Slider>> GetSlider(int id)
    {
        var slider = await _context.Sliderlar.FindAsync(id);
        if (slider == null) return NotFound();
        return slider;
    }

    [HttpPost]
    public async Task<ActionResult<Slider>> PostSlider(Slider slider)
    {
        _context.Sliderlar.Add(slider);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSlider), new { id = slider.Id }, slider);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutSlider(int id, Slider slider)
    {
        if (id != slider.Id) return BadRequest();
        _context.Entry(slider).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Sliderlar.Any(e => e.Id == id)) return NotFound();
            throw;
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSlider(int id)
    {
        var slider = await _context.Sliderlar.FindAsync(id);
        if (slider == null) return NotFound();
        _context.Sliderlar.Remove(slider);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
