using System;
using System.Collections.Generic;

namespace API.Models;

public partial class MovieView
{
    public int Id { get; set; }

    public string? Idmovie { get; set; }

    public string? UserId { get; set; }

    public DateTime? ViewDate { get; set; }

    public virtual Movie? IdmovieNavigation { get; set; }

    public virtual User? User { get; set; }
}
