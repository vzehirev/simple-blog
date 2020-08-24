using System.Collections.Generic;
using articles_server_app.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace articles_server_app.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ArticlesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var articles = new object[]
            {
                new { Id = 1, Title = "Title1", Content = "Content1" },
                new { Id = 1, Title = "Title1", Content = "Content1" }
            };

            return Ok(articles);
        }
    }
}
