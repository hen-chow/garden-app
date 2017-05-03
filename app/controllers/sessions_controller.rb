class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_by_email(params[:email])
    if user
      if user.authenticate(params[:password])
        # we have a real user
        session[:user_id] = user
        redirect_to root_path
      else
        render :new
      end
    else
      flash[:error] = "Wrong email address or password"
      render :new
    end
  end

  def destroy
    session.delete(:user_id)
    flash[:success] = "Successfully logged out"
    redirect_to root_path
  end

end
