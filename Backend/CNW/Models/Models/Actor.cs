using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Actor
{
    public string Idactor { get; set; } = null!;

    public string ActorName { get; set; } = null!;

    public DateOnly? BirthDate { get; set; }

    public string? Nationality { get; set; }

    public virtual ICollection<MovieActor> MovieActors { get; set; } = new List<MovieActor>();

    public virtual ICollection<SeriesActor> SeriesActors { get; set; } = new List<SeriesActor>();
}
