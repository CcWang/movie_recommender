class UsersController < ApplicationController
  def index

  end

  def create
    @user = User.new(user_params)
    if !@user.save
      flash[:errors] = @user.errors.full_messages
      redirect_to :back

    else
      #save user, get top rated movies for users to pick
      @user.save
      session[:user_id] = @user.id
      redirect_to "/users/#{current_user.id}/set_up"
    end
  end

  def show

  end

  def set_up

  end

  private
  def user_params
    params.require(:user).permit(:email,:first_name,:last_name,:password,:password_confirmation)
  end
end
