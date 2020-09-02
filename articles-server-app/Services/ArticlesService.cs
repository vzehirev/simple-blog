using articles_server_app.Data;
using articles_server_app.Data.Models;
using articles_server_app.DtoModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Security.Cryptography.X509Certificates;
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
                Id = a.Id,
                Title = a.Title,
                Content = a.Content,
                IsCreator = a.UserId == userId
            })
                .ToArrayAsync();
        }

        public async Task<int> AddArticle(AddArticleDto article, string userId)
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

        public async Task<bool> IsCreator(int articleId, string userId)
        {
            var article = await this.dbContext.Articles.SingleOrDefaultAsync(a => a.Id == articleId);

            if (article != null)
            {
                return article.UserId == userId;
            }

            return false;
        }

        public async Task<bool> DeleteArticle(int articleId, string userId)
        {
            var article = await this.dbContext.Articles.SingleOrDefaultAsync(a => a.Id == articleId);

            if (article != null && article.UserId == userId)
            {
                this.dbContext.Articles.Remove(article);
            }

            return await this.dbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> EditArticle(EditArticleDto article, string userId)
        {
            var oldArticle = await this.dbContext.Articles.FindAsync(article.Id);

            if (oldArticle != null && oldArticle.UserId == userId)
            {
                oldArticle.Title = article.Title;
                oldArticle.Content = article.Content;
            }

            return await this.dbContext.SaveChangesAsync() > 0;
        }
    }
}
