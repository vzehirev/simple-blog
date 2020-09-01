using articles_server_app.Data;
using articles_server_app.Data.Models;
using articles_server_app.DtoModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace articles_server_app.Services
{
    public class ArticlesService : IArticlesService
    {
        private readonly ApplicationDbContext dbContext;

        public ArticlesService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<ArticleDto>> GetAll(string userId)
        {
            return await this.dbContext.Articles.Select(a => new ArticleDto
            {
                Title = a.Title,
                Content = a.Content,
                IsCreator = a.UserId == userId
            })
                .ToArrayAsync();
        }

        public async Task<int> AddArticle(ArticleDto article, string userId)
        {
            var articleToAdd = new Article
            {
                Title = article.Title,
                Content = article.Content,
                UserId = userId
            };

            this.dbContext.Articles.Add(articleToAdd);
            return await this.dbContext.SaveChangesAsync();
        }
    }
}
