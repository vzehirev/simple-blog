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

        Task<int> AddArticle(string title, string content, string userId);
    }
}
