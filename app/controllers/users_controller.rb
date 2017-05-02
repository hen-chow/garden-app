class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(clean_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path
    end
  end

  def show
    @user = User.find(params[:id])
  end

  private

  def clean_params
    params.require(:user).permit(:email, :name, :password)
  end

end
