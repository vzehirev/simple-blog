using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using articles_server_app.Data;
using articles_server_app.Data.Models;
using articles_server_app.DtoModels;
using articles_server_app.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;

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
        public async Task<int> AddArticle([FromBody] AddArticleDto article)
        {
            string userId = this.usersManager.GetUserId(this.User);

            return await this.articlesService.AddArticle(article,
                this.User.Claims.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value);
        }

        [Route("is-creator/{articleId}")]
        [Authorize]
        [HttpGet]
        public async Task<bool> IsCreator(int articleId)
        {
            var userId = this.usersManager.GetUserId(this.User);

            return await this.articlesService.IsCreator(articleId, userId);
        }

        [Route("delete/{articleId}")]
        [Authorize]
        [HttpDelete]
        public async Task<bool> Delete(int articleId)
        {
            var userId = this.usersManager.GetUserId(this.User);

            return await this.articlesService.DeleteArticle(articleId, userId);
        }

        [Route("edit")]
        [Authorize]
        [HttpPatch]
        public async Task<bool> Edit(EditArticleDto article)
        {
            var userId = this.usersManager.GetUserId(this.User);

            return await this.articlesService.EditArticle(article, userId);
        }
    }
}
