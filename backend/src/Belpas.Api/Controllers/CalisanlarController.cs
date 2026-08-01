using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Belpas.Api.Data;
using Belpas.Api.Models;

namespace Belpas.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalisanlarController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CalisanlarController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Calisan>>> GetCalisanlar()
        {
            return await _context.Calisanlar
                .Where(c => c.Aktif)
                .OrderBy(c => c.Sira)
                .ThenBy(c => c.Id)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Calisan>> GetCalisan(int id)
        {
            var calisan = await _context.Calisanlar.FindAsync(id);

            if (calisan == null)
            {
                return NotFound();
            }

            return calisan;
        }

        [HttpPost]
        public async Task<ActionResult<Calisan>> CreateCalisan(Calisan calisan)
        {
            _context.Calisanlar.Add(calisan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCalisan), new { id = calisan.Id }, calisan);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCalisan(int id, Calisan calisan)
        {
            if (id != calisan.Id)
            {
                return BadRequest();
            }

            _context.Entry(calisan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Calisanlar.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCalisan(int id)
        {
            var calisan = await _context.Calisanlar.FindAsync(id);
            if (calisan == null)
            {
                return NotFound();
            }

            _context.Calisanlar.Remove(calisan);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
