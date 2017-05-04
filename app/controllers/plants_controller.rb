class PlantsController < ApplicationController

  def new
  end

  def create
    plant = Plant.create(garden_id: params[:garden_id], name: params[:name], left: params[:left], top: params[:top], img_src: params[:img_src])

    if plant.save
      render json: plant.id
    end
  end

  def show
  end

  def update
    plant = Plant.find(params[:plant_id])
    plant.update_attributes(left: params[:left], top: params[:top])

    render json: {message: "Successful update"}
  end

  private

  def clean_params
    params.require[:plant].permit[:name, :garden_id, :left, :top, :img_src]
  end
end
