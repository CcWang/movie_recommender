require 'json'
require 'net/http'
require 'open-uri'
# require 'constants.rb'
class ApisController < ApplicationController
  $get_top_movie = "http://api.themoviedb.org/3/movie/top_rated?api_key="+APP_ID
  def self.get_top_movie

    uri = $get_top_movie +"&page="+$counter.to_s
    data = open(uri)
   $movies = JSON.load(data)
    #  render :text =>data
    # redirect_to :controller=>'users', :action=>'set_up', :id=>current_user.id
  end
  def top_rated_next
    $counter +=1

    redirect_to :controller=>'users', :action=>'set_up', :id=>current_user.id
  end
  def top_rated_prev
    $counter -=1
    redirect_to :controller=>'users', :action=>'set_up', :id=>current_user.id
  end

end
