namespace StudentManagerAPI.Models
{
    public class Student
    {
        public int Id { get; set; } // primary key
        public string Name { get; set; } = "";
        public int Age { get; set; }
        public double Marks { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}