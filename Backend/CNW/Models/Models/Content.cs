using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Content
{
    public string ContentId { get; set; } = null!;

    public string? ContentName { get; set; }

    public string? ContentType { get; set; }

    public virtual ICollection<Episode> Episodes { get; set; } = new List<Episode>();

    public virtual ICollection<Movie> Movies { get; set; } = new List<Movie>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<Series> Series { get; set; } = new List<Series>();
}
