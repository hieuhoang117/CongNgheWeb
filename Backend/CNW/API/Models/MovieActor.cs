using System;
using System.Collections.Generic;

namespace API.Models;

public partial class MovieActor
{
    public string Idmovie { get; set; } = null!;

    public string Idactor { get; set; } = null!;

    public string? RoleName { get; set; }

    public virtual Actor IdactorNavigation { get; set; } = null!;

    public virtual Movie IdmovieNavigation { get; set; } = null!;
}
