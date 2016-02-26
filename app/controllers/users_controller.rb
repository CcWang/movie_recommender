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
      # render :set_up
      redirect_to :controller=>'users', :action=>'set_up', :id=>current_user.id
    end
  end

  def show
  end

  def set_up
    ApisController.get_top_movie
  end

  def carts
    puts params[:favs].inspect
    #you can save to db table
    render :json =>{}
  end
  private
  def user_params
    params.require(:user).permit(:email,:first_name,:last_name,:password,:password_confirmation)
  end
end
