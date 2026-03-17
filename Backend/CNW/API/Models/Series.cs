using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Series
{
    public string Idseries { get; set; } = null!;

    public string SeriesName { get; set; } = null!;

    public string? Description { get; set; }

    public int? ReleaseYear { get; set; }

    public string? Country { get; set; }

    public bool? Status { get; set; }

    public string? ContentId { get; set; }

    public virtual Content? Content { get; set; }

    public virtual ICollection<Episode> Episodes { get; set; } = new List<Episode>();

    public virtual ICollection<SeriesActor> SeriesActors { get; set; } = new List<SeriesActor>();

    public virtual ICollection<Director> Iddirectors { get; set; } = new List<Director>();
}
