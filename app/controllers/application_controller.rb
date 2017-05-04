class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :fetch_user

  private

  def fetch_user
    # user = session[:user_id]
    @current_user = User.find_by_id(session[:user_id])
  end

  def authenticate_user
    if @current_user.nil?
      flash[:error] = "Access denied"
      render json: {status: :unauthorized}
      redirect_to root_path
    end
  end

end
