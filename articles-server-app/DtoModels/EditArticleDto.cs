using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace articles_server_app.DtoModels
{
    public class EditArticleDto
    {
        [Required]
        public int Id { get; set; }

        [Required, MinLength(10)]
        public string Title { get; set; }

        [Required, MinLength(100)]
        public string Content { get; set; }
    }
}
