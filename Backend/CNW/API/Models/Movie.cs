using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Movie
{
    public string Idmovie { get; set; } = null!;

    public string? NameMovie { get; set; }

    public string? Category { get; set; }

    public DateOnly? ReleaseDate { get; set; }

    public string? Director { get; set; }

    public int? Duration { get; set; }

    public string? Country { get; set; }

    public string? Description { get; set; }

    public bool? Status { get; set; }

    public string? ContentId { get; set; }

    public virtual Content? Content { get; set; }

    public virtual ICollection<MovieActor> MovieActors { get; set; } = new List<MovieActor>();

    public virtual ICollection<MovieView> MovieViews { get; set; } = new List<MovieView>();

    public virtual ICollection<Director> Iddirectors { get; set; } = new List<Director>();
}
