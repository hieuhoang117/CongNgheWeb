using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Episode
{
    public string Idepisode { get; set; } = null!;

    public string? Idseries { get; set; }

    public int? SeasonNumber { get; set; }

    public int? EpisodeNumber { get; set; }

    public string? EpisodeName { get; set; }

    public int? Duration { get; set; }

    public DateOnly? ReleaseDate { get; set; }

    public string? ContentId { get; set; }

    public virtual Content? Content { get; set; }

    public virtual Series? IdseriesNavigation { get; set; }
}
