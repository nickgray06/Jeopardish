class CategoriesController < ApplicationController
  def index
    @categories = Category.all

    render json: @categories, include: :clues
  end

  def show
    @category = Category.find(params[:id])

    render json: @category, include: :clues
  end
end
