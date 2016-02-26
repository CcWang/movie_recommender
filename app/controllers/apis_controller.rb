require 'json'
require 'net/http'
require 'open-uri'
# require 'constants.rb'

class ApisController < ApplicationController
  $get_top_movie = "http://api.themoviedb.org/3/movie/top_rated?api_key="+APP_ID
  def self.get_top_movie
    uri = $get_top_movie +"&page=1"
    data = open(uri)
    $movies = JSON.load(data)['results']
  end

  def get_movie
    uri = $get_top_movie + "&page=" + params[:page].to_s
    data = open(uri)
    render :json => JSON.load(data)['results']
  end
end
