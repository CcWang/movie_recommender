var Setup = React.createClass({
  getInitialState(){
    var favs = {};
    this.props.movies.results.forEach(function(movie) {
      favs[movie.id] = false;
    });
    return {
      favs: favs
    };
  },
   handleSubmit: function ( formData, action ) {
    $.ajax({
      data: formData,
      url: action,
      type: "POST",
      dataType: "json",
      success: function ( data ) {
        this.setState({ userlists: data });
      }.bind(this)
    });
  },
  _updateFavs(id) {
    var favs = this.state.favs;
    favs[id] = !favs[id];
    this.setState({
      favs: favs
    });
  },

  render() {
    
    return(
      <div>
        <h1>Movie</h1>
        <List 
          movies={this.props.movies.results} 
          updateFavs={this._updateFavs}
          favs={this.state.favs}
        />
         <UserList 
          movies={this.props.movies.results} 
          updateFavs={this._updateFavs}
          favs={this.state.favs}
          authenticity_token={this.props.authenticity_token}
          onUserListSubmit={ this.handleSubmit }
        />
      </div>
    );
  }
});

var List = React.createClass({
  _onClick(id) {
    this.props.updateFavs(id);
  },

  render(){
    return (
      <div>
        {this.props.movies.map(function(movie, idx) {
          return (
            <Movie 
              key={'movie'+idx} 
              {...movie} 
              fav={this.props.favs[movie.id]}
              onClick={this._onClick}
            />
          );
        }.bind(this))}
      </div>
    );
  }
});

var Movie = React.createClass({
  getInitialState() {
    return {
      hover: false
    };
  },

  _onMouseOver(e) {
    this.setState({
      hover: true
    });
  },

  _onMouseOut(e){
    this.setState({
      hover: false
    });
  },

  _onClick(e) {
    this.props.onClick(this.props.id);
  },

  render(){
    var hover = null;
    var style = {
      color:"#6cf",
      backgroundColor:"yellow"
    };
    if (this.state.hover) {
      hover = <p style={style} className="col-sm-6"><b>{this.props.overview}</b></p>;
    }
    var imgStyle = {
      opacity: this.props.fav ? 0.4 : 1.0
    };
    return(
      <div className="col-sm-6" >
        <h3>{this.props.title}</h3>
        <img 
          src={'http://image.tmdb.org/t/p/w500'+this.props.poster_path} 
          style={imgStyle}
          width="300" 
          onMouseOver={this._onMouseOver} 
          onMouseOut={this._onMouseOut}
          onClick={this._onClick}
        />
        <div>{hover}</div>
      </div>
    );
  }
});

var UserList = React.createClass({
   _onClick(id) {
    this.props.updateFavs(id);
  },
   handleSubmit: function ( event ) {
    event.preventDefault();

    
    // submit
    // change formData to object then pass to controller
    var formData = $( this.refs.form.getDOMNode() ).serialize();
    this.props.onUserListSubmit( formData, '/users/carts' );

  },

  render(){

    return (
      <div className="col-sm-6">
        <h3>Set Your List</h3>
        <form ref='form' acceptCharset="UTF-8" action='/users/carts' method='post' onSubmit={ this.handleSubmit }>
         <input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />
        {this.props.movies.map(function(movie, idx) {
          if (this.props.favs[movie.id]) {
            return (
              <UserMovie 
                key={'movie'+idx} 
                {...movie} 
                fav={this.props.favs[movie.id]}
                onClick={this._onClick}
              
              />  
            );
          }else{
            return null
          }
        }.bind(this))};
        <p><button type="submit" className='btn btn-success'>Set</button></p>
        </form>
      </div>
    );
  }
})

var UserMovie = React.createClass({
   _onClick(e) {
    this.props.onClick(this.props.id);
  },
  render(){

    return(
     <div className="col-sm-4" >
      <h3>{this.props.title}</h3>
        <img 
          src={'http://image.tmdb.org/t/p/w500'+this.props.poster_path} 
          width="150" 
          onClick={this._onClick}
        />
        <input type='hidden' name='movie_id' value={this.props.id} />
        <input type='hidden' name='movie_title' value={this.props.title}/>
      </div>
    );
  }
});
