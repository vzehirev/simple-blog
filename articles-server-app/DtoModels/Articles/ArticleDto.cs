namespace articles_server_app.Articles.DtoModels
{
    public class ArticleDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public bool IsCreator { get; set; }
    }
}
