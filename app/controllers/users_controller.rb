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
      $counter = 1
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
    @movie_title = params[:movie_title]
    @movie_id = params[:movie_id]
    @movie_pic = params[:movie_pic]
    (session[:movie_list] ||= []) << (params[:movie_pic] if !session[:movie_pic].include?params[:movie_pic])
    session[:movie_list] = session[:movie_list]-[nil]
    render :json => { 
    :movie_list =>session[:movie_list]
    }
  end
  private
  def user_params
    params.require(:user).permit(:email,:first_name,:last_name,:password,:password_confirmation)
  end
end
