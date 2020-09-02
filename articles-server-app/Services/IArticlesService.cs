using articles_server_app.DtoModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace articles_server_app.Services
{
    public interface IArticlesService
    {
        Task<IEnumerable<ArticleDto>> GetAll(string userId);

        Task<int> AddArticle(AddArticleDto article, string userId);

        Task<bool> IsCreator(int articleId, string userId);

        Task<bool> DeleteArticle(int articleId, string userId);

        Task<bool> EditArticle(EditArticleDto article, string userId);
    }
}
