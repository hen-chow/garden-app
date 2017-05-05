class GardensController < ApplicationController
  
  def new
    @garden = Garden.new
  end

  def create
    if @current_user.present?
      garden = Garden.create(user_id: @current_user.id, width: params[:width], height: params[:height])
    end

    if garden.save
      render json: garden.id
    end
  end

  def update
    garden = Garden.find(params[:garden_id])
    garden.update_attributes(width: params[:width], height: params[:height])

    render json: {message: "success!"}
  end

  def show
  end

  private

  def clean_params
    params.require(:garden).permit(:name, :lon, :lat, :user_id, :width, :height, :img_src, :left, :top, :ratio)
  end

end
