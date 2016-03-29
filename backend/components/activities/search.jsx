import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';

class Search extends React.Component {

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="activities-search-container">
        <form>
          <input className="form-control" name="search" placeholder={t('backend.activities.search')} />
          <button className="btn btn-primary"><i className="fa fa-search"></i></button>
        </form>
      </div>
    );
  }
}

ReactMixin(Search.prototype, ReactI18n);

export default Search;