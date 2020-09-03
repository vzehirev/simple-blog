using System.Collections.Generic;
using System.Threading.Tasks;
using articles_server_app.Articles.DtoModels;
using articles_server_app.Articles.Services;
using articles_server_app.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
            var userId = this.usersManager.GetUserId(this.User);
            return await this.articlesService.GetAll(userId);
        }

        [Route("add-article")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddArticle([FromBody] AddArticleDto article)
        {
            var userId = this.usersManager.GetUserId(this.User);

            var success = await this.articlesService.AddArticle(article, userId);

            if (success)
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        [Route("is-creator/{articleId}")]
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> IsCreator(int articleId)
        {
            var userId = this.usersManager.GetUserId(this.User);

            var success = await this.articlesService.IsCreator(articleId, userId);

            if (success)
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        [Route("delete/{articleId}")]
        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete(int articleId)
        {
            var userId = this.usersManager.GetUserId(this.User);

            var success = await this.articlesService.DeleteArticle(articleId, userId);

            if (success)
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        [Route("edit")]
        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Edit(EditArticleDto article)
        {
            var userId = this.usersManager.GetUserId(this.User);

            var success = await this.articlesService.EditArticle(article, userId);

            if (success)
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
