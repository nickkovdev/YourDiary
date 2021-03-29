using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourDiary.Model;

namespace YourDiary.Data
{
    public class DiaryContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DiaryContext(DbContextOptions<DiaryContext> options) : base(options) {}
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Server=127.0.0.1; port=5433; user id = diaryadmin; password = blogadmin; database=YourDiary; pooling = true");
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var releationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                releationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            ConfigureModelBuilderForUser(modelBuilder);
        }

        void ConfigureModelBuilderForUser(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
                .Property(user => user.Username)
                .HasMaxLength(60)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(user => user.Email)
                .HasMaxLength(60)
                .IsRequired();
        }
    }
}
