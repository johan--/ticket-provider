import React from 'react';

class Search extends React.Component {

  render() {
    return (
      <div className="events-search-container">
        <form>
          <input className="form-control" name="search" placeholder="Search events"/>
          <button className="btn btn-primary"><i className="fa fa-search"></i></button>
        </form>
      </div>
    );
  }
}

export default Search;