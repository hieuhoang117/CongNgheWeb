using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Director
{
    public string Iddirector { get; set; } = null!;

    public string DirectorName { get; set; } = null!;

    public DateOnly? BirthDate { get; set; }

    public string? Nationality { get; set; }

    public virtual ICollection<Movie> Idmovies { get; set; } = new List<Movie>();

    public virtual ICollection<Series> Idseries { get; set; } = new List<Series>();
}
