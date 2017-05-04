class GardensController < ApplicationController

  def new
    @garden = Garden.new
  end

  def create
    if @user
      garden = Garden.create(clean_params)
    end
  end

  def update
  end

  def show
  end

  private

  def clean_params
    params.require(:garden).permit(:name, :lon, :lat, :user_id, :width, :height, :img_src)
  end

end
