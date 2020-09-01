using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using articles_server_app.Data;
using articles_server_app.Data.Models;
using articles_server_app.DtoModels;
using articles_server_app.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace articles_server_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> usersManager;
        private readonly IArticlesService articlesService;

        public ArticlesController(UserManager<ApplicationUser> usersManager, IArticlesService articlesService)
        {
            this.usersManager = usersManager;
            this.articlesService = articlesService;
        }

        [Route("get-all")]
        [HttpGet]
        public async Task<IEnumerable<ArticleDto>> GetAll()
        {
            return await this.articlesService.GetAll(this.usersManager.GetUserId(this.User));
        }

        [Route("add-article")]
        [Authorize]
        [HttpPost]
        public async Task<int> AddArticle([FromBody] ArticleDto article)
        {
            return await this.articlesService.AddArticle(article, this.usersManager.GetUserId(this.User));
        }
    }
}
