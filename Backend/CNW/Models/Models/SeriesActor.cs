using System;
using System.Collections.Generic;

namespace API.Models;

public partial class SeriesActor
{
    public string Idseries { get; set; } = null!;

    public string Idactor { get; set; } = null!;

    public string? RoleName { get; set; }

    public virtual Actor IdactorNavigation { get; set; } = null!;

    public virtual Series IdseriesNavigation { get; set; } = null!;
}
