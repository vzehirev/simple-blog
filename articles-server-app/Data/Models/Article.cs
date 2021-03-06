﻿using System.ComponentModel.DataAnnotations;

namespace articles_server_app.Data.Models
{
    public class Article
    {
        [Required, Key]
        public int Id { get; set; }

        [Required, MinLength(10), MaxLength(100)]
        public string Title { get; set; }

        [Required, MinLength(100), MaxLength(1000)]
        public string Content { get; set; }

        [Required]
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }
    }
}
