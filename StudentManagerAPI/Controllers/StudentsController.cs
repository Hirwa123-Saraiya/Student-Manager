using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagerAPI.Data;
using StudentManagerAPI.Models;

namespace StudentManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAll()
        {
            var students = await _context.Students.ToListAsync();
            return Ok(students);
        }

        // POST: api/students
        [HttpPost]
        public async Task<ActionResult<Student>> AddStudent(Student student)
        {
            if (string.IsNullOrWhiteSpace(student.Name) || student.Age <= 0 || student.Marks < 0)
            {
                return BadRequest("Invalid student data.");
            }

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            // Returns: 201 Created with new student
            return CreatedAtAction(nameof(GetAll), new { id = student.Id }, student);
        }

        // DELETE: api/students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return NotFound(new { Message = $"Student with ID {id} not found." });

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] Student updatedStudent)
        {
            var existingStudent = await _context.Students.FindAsync(id);
            if (existingStudent == null)
                return NotFound();

            existingStudent.Name = updatedStudent.Name;
            existingStudent.Age = updatedStudent.Age;
            existingStudent.Marks = updatedStudent.Marks;

            await _context.SaveChangesAsync();
            return Ok(existingStudent);
        }
    }
}