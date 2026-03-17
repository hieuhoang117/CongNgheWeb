using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

public partial class BtlwebContext : DbContext
{
    public BtlwebContext()
    {
    }

    public BtlwebContext(DbContextOptions<BtlwebContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Actor> Actors { get; set; }

    public virtual DbSet<Content> Contents { get; set; }

    public virtual DbSet<Director> Directors { get; set; }

    public virtual DbSet<Episode> Episodes { get; set; }

    public virtual DbSet<Movie> Movies { get; set; }

    public virtual DbSet<MovieActor> MovieActors { get; set; }

    public virtual DbSet<MovieView> MovieViews { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Series> Series { get; set; }

    public virtual DbSet<SeriesActor> SeriesActors { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=MSICUAHIEU\\MAY1;Database=BTLWeb;User Id=sa;Password=hieuday2403;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Actor>(entity =>
        {
            entity.HasKey(e => e.Idactor).HasName("PK__Actor__EDA2CDFA4A26F658");

            entity.ToTable("Actor");

            entity.Property(e => e.Idactor)
                .HasMaxLength(10)
                .HasColumnName("IDactor");
            entity.Property(e => e.ActorName).HasMaxLength(100);
            entity.Property(e => e.Nationality).HasMaxLength(50);
        });

        modelBuilder.Entity<Content>(entity =>
        {
            entity.HasKey(e => e.ContentId).HasName("PK__Content__2907A87E8C2DCA60");

            entity.ToTable("Content");

            entity.Property(e => e.ContentId)
                .HasMaxLength(10)
                .HasColumnName("ContentID");
            entity.Property(e => e.ContentName).HasMaxLength(100);
            entity.Property(e => e.ContentType).HasMaxLength(20);
        });

        modelBuilder.Entity<Director>(entity =>
        {
            entity.HasKey(e => e.Iddirector).HasName("PK__Director__30A37B5DB0A6C21F");

            entity.ToTable("Director");

            entity.Property(e => e.Iddirector)
                .HasMaxLength(10)
                .HasColumnName("IDdirector");
            entity.Property(e => e.DirectorName).HasMaxLength(100);
            entity.Property(e => e.Nationality).HasMaxLength(50);
        });

        modelBuilder.Entity<Episode>(entity =>
        {
            entity.HasKey(e => e.Idepisode).HasName("PK__Episode__94DBE4FD1A19D2F4");

            entity.ToTable("Episode");

            entity.Property(e => e.Idepisode)
                .HasMaxLength(10)
                .HasColumnName("IDEpisode");
            entity.Property(e => e.ContentId)
                .HasMaxLength(10)
                .HasColumnName("ContentID");
            entity.Property(e => e.EpisodeName).HasMaxLength(100);
            entity.Property(e => e.Idseries)
                .HasMaxLength(10)
                .HasColumnName("IDseries");

            entity.HasOne(d => d.Content).WithMany(p => p.Episodes)
                .HasForeignKey(d => d.ContentId)
                .HasConstraintName("FK__Episode__Content__6C190EBB");

            entity.HasOne(d => d.IdseriesNavigation).WithMany(p => p.Episodes)
                .HasForeignKey(d => d.Idseries)
                .HasConstraintName("FK__Episode__IDserie__5FB337D6");
        });

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasKey(e => e.Idmovie).HasName("PK__Movie__18996DB96B71BFA3");

            entity.ToTable("Movie");

            entity.Property(e => e.Idmovie)
                .HasMaxLength(10)
                .HasColumnName("IDmovie");
            entity.Property(e => e.Category).HasMaxLength(50);
            entity.Property(e => e.ContentId)
                .HasMaxLength(10)
                .HasColumnName("ContentID");
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.Director).HasMaxLength(50);
            entity.Property(e => e.NameMovie).HasMaxLength(50);
            entity.Property(e => e.Status).HasDefaultValue(true);

            entity.HasOne(d => d.Content).WithMany(p => p.Movies)
                .HasForeignKey(d => d.ContentId)
                .HasConstraintName("FK__Movie__ContentID__6A30C649");

            entity.HasMany(d => d.Iddirectors).WithMany(p => p.Idmovies)
                .UsingEntity<Dictionary<string, object>>(
                    "DirectorActor",
                    r => r.HasOne<Director>().WithMany()
                        .HasForeignKey("Iddirector")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DirectorA__IDdir__59FA5E80"),
                    l => l.HasOne<Movie>().WithMany()
                        .HasForeignKey("Idmovie")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DirectorA__IDmov__59063A47"),
                    j =>
                    {
                        j.HasKey("Idmovie", "Iddirector").HasName("PK__Director__DB935A0CC2AE8587");
                        j.ToTable("DirectorActor");
                        j.IndexerProperty<string>("Idmovie")
                            .HasMaxLength(10)
                            .HasColumnName("IDmovie");
                        j.IndexerProperty<string>("Iddirector")
                            .HasMaxLength(10)
                            .HasColumnName("IDdirector");
                    });
        });

        modelBuilder.Entity<MovieActor>(entity =>
        {
            entity.HasKey(e => new { e.Idmovie, e.Idactor }).HasName("PK__MovieAct__A6434166F987A777");

            entity.ToTable("MovieActor");

            entity.Property(e => e.Idmovie)
                .HasMaxLength(10)
                .HasColumnName("IDmovie");
            entity.Property(e => e.Idactor)
                .HasMaxLength(10)
                .HasColumnName("IDactor");
            entity.Property(e => e.RoleName).HasMaxLength(100);

            entity.HasOne(d => d.IdactorNavigation).WithMany(p => p.MovieActors)
                .HasForeignKey(d => d.Idactor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MovieActo__IDact__3D5E1FD2");

            entity.HasOne(d => d.IdmovieNavigation).WithMany(p => p.MovieActors)
                .HasForeignKey(d => d.Idmovie)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MovieActo__IDmov__3C69FB99");
        });

        modelBuilder.Entity<MovieView>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MovieVie__3214EC2799B80F3E");

            entity.ToTable("MovieView");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Idmovie)
                .HasMaxLength(10)
                .HasColumnName("IDmovie");
            entity.Property(e => e.UserId)
                .HasMaxLength(10)
                .HasColumnName("UserID");
            entity.Property(e => e.ViewDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.IdmovieNavigation).WithMany(p => p.MovieViews)
                .HasForeignKey(d => d.Idmovie)
                .HasConstraintName("FK__MovieView__IDmov__4CA06362");

            entity.HasOne(d => d.User).WithMany(p => p.MovieViews)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__MovieView__UserI__5441852A");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.ReviewId).HasName("PK__Review__74BC79AEBB5CDE6D");

            entity.ToTable("Review");

            entity.Property(e => e.ReviewId).HasColumnName("ReviewID");
            entity.Property(e => e.CommentText).HasMaxLength(1000);
            entity.Property(e => e.ContentId)
                .HasMaxLength(10)
                .HasColumnName("ContentID");
            entity.Property(e => e.ReviewDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserId)
                .HasMaxLength(10)
                .HasColumnName("UserID");

            entity.HasOne(d => d.Content).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.ContentId)
                .HasConstraintName("FK__Review__ContentI__71D1E811");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Review__UserID__70DDC3D8");
        });

        modelBuilder.Entity<Series>(entity =>
        {
            entity.HasKey(e => e.Idseries).HasName("PK__Series__3EE0536DC161B5A2");

            entity.Property(e => e.Idseries)
                .HasMaxLength(10)
                .HasColumnName("IDseries");
            entity.Property(e => e.ContentId)
                .HasMaxLength(10)
                .HasColumnName("ContentID");
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.SeriesName).HasMaxLength(100);
            entity.Property(e => e.Status).HasDefaultValue(true);

            entity.HasOne(d => d.Content).WithMany(p => p.Series)
                .HasForeignKey(d => d.ContentId)
                .HasConstraintName("FK__Series__ContentI__6B24EA82");

            entity.HasMany(d => d.Iddirectors).WithMany(p => p.Idseries)
                .UsingEntity<Dictionary<string, object>>(
                    "SeriesDirector",
                    r => r.HasOne<Director>().WithMany()
                        .HasForeignKey("Iddirector")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__SeriesDir__IDdir__6754599E"),
                    l => l.HasOne<Series>().WithMany()
                        .HasForeignKey("Idseries")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__SeriesDir__IDser__66603565"),
                    j =>
                    {
                        j.HasKey("Idseries", "Iddirector").HasName("PK__SeriesDi__FDEA64D87DB910CF");
                        j.ToTable("SeriesDirector");
                        j.IndexerProperty<string>("Idseries")
                            .HasMaxLength(10)
                            .HasColumnName("IDseries");
                        j.IndexerProperty<string>("Iddirector")
                            .HasMaxLength(10)
                            .HasColumnName("IDdirector");
                    });
        });

        modelBuilder.Entity<SeriesActor>(entity =>
        {
            entity.HasKey(e => new { e.Idseries, e.Idactor }).HasName("PK__SeriesAc__803A7FB2C089182D");

            entity.ToTable("SeriesActor");

            entity.Property(e => e.Idseries)
                .HasMaxLength(10)
                .HasColumnName("IDseries");
            entity.Property(e => e.Idactor)
                .HasMaxLength(10)
                .HasColumnName("IDactor");
            entity.Property(e => e.RoleName).HasMaxLength(100);

            entity.HasOne(d => d.IdactorNavigation).WithMany(p => p.SeriesActors)
                .HasForeignKey(d => d.Idactor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SeriesAct__IDact__6383C8BA");

            entity.HasOne(d => d.IdseriesNavigation).WithMany(p => p.SeriesActors)
                .HasForeignKey(d => d.Idseries)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SeriesAct__IDser__628FA481");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCACA4CBFE3F");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D105345F631759").IsUnique();

            entity.Property(e => e.UserId)
                .HasMaxLength(10)
                .HasColumnName("UserID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(15);
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .HasDefaultValue("User");
            entity.Property(e => e.Status).HasDefaultValue(true);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
