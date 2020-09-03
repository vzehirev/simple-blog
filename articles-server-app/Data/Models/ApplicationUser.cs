using Microsoft.AspNetCore.Identity;
using System.Collections;
using System.Collections.Generic;

namespace articles_server_app.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ISet<Article> Articles { get; set; } = new HashSet<Article>();
    }
}
