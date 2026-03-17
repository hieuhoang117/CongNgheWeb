using System;
using System.Collections.Generic;

namespace API.Models;

public partial class User
{
    public string UserId { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Role { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<MovieView> MovieViews { get; set; } = new List<MovieView>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
