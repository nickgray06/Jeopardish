class CluesController < ApplicationController
  def index
    @clues = Clue.all

    render json: @clues, include: :category
  end

  def show
    @clue = Clue.find(params[:id])

    render json: @clue, include: :category
  end
end
