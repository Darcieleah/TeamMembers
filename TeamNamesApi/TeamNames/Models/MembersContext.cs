using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TeamNames.Models
{
    public class MembersContext : DbContext
    {
        public DbSet<TeamMember> TeamNames { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=teamnames.db");
        }
    }
}
