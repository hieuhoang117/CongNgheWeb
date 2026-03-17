using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Review
{
    public int ReviewId { get; set; }

    public string? UserId { get; set; }

    public string? ContentId { get; set; }

    public string? CommentText { get; set; }

    public int? Score { get; set; }

    public DateTime? ReviewDate { get; set; }

    public virtual Content? Content { get; set; }

    public virtual User? User { get; set; }
}
