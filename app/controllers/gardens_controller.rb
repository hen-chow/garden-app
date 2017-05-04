class GardensController < ApplicationController

  def new
    @garden = Garden.new
  end

  def create
    if @current_user.present?
      garden = Garden.create(user_id: @current_user.id, width: params[:width], height: params[:height])
    end

    if garden.save
      render json: {message: "success"}
    # end
    #
    # if garden.save
      # respond_to do |format|
      #   render json: garden.id
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
