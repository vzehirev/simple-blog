using articles_server_app.Articles.DtoModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace articles_server_app.Articles.Services
{
    public interface IArticlesService
    {
        Task<IEnumerable<ArticleDto>> GetAll(string userId);

        Task<bool> AddArticle(AddArticleDto article, string userId);

        Task<bool> IsCreator(int articleId, string userId);

        Task<bool> DeleteArticle(int articleId, string userId);

        Task<bool> EditArticle(EditArticleDto article, string userId);
    }
}
