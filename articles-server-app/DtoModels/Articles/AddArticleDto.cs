﻿using System.ComponentModel.DataAnnotations;

namespace articles_server_app.Articles.DtoModels
{
    public class AddArticleDto
    {
        [Required, MinLength(10), MaxLength(100)]
        public string Title { get; set; }

        [Required, MinLength(100), MaxLength(1000)]
        public string Content { get; set; }
    }
}
