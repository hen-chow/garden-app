class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(clean_params)
    if @user.save
      session[:user_id] = @user.id
      respond_to do |format|
        format.html do
          redirect_to new_garden_path
        end
        format.json do
          render json: @user.id
        end
      end
    else
      render :new
    end
  end

  # def check
  #   @user = User.find(session[:user_id])
  #   if @user.present?
  #     render json: @user.id
  #   else
  #     render json: {message: "user not found"}
  #   end
  # end

  def show
    @user = User.find(params[:id])
  end

  private

  def clean_params
    params.require(:user).permit(:email, :name, :password)
  end

end
