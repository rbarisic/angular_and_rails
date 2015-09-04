class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :update, :destroy]
  
  # GET /articles
  def index
    @articles = Article.all

    render json: @articles
  end

  # GET /articles/1
  def show
    render json: @article
  end

  # POST /articles
  def create

    # @author = Author.find_by(name: params['article']['author'])
    
    puts Author.find_by(name: params['article']['author'])

    # puts article_params['author']
    @article = Article.new(
      title: params['article']['title'],
      content: params['article']['content'],
      author: Author.find_by(name: params['article']['author'])
    )

    if @article.save
      render json: @article, :status => :created, :location => @article
    else
      render json: @article.errors, :status => :unprocessable_entity
    end
  end

  # PATCH/PUT /articles/1
  def update
    if @article.update(article_params)
      render json: @article
    else
      render json: @article.errors, :status => :unprocessable_entity
    end
  end

  # DELETE /articles/1
  def destroy
    @article.destroy
  end

  private
    # Use Callbacks to share common setup or constraints between actions
    def set_article
      @article = Article.find(params[:id])
    end

    def article_params
      params.require(:article).permit(:title, :content, :author)
    end
end
