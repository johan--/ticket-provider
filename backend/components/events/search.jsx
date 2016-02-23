import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';

class Search extends React.Component {

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="events-search-container">
        <form>
          <input className="form-control" name="search" placeholder={t('backend.events.search')} />
          <button className="btn btn-primary"><i className="fa fa-search"></i></button>
        </form>
      </div>
    );
  }
}

ReactMixin(Search.prototype, ReactI18n);

export default Search;