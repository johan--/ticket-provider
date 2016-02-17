import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <form>
          <fieldset className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
          </fieldset>
        </form>
        <button className="btn btn-primary">Create New Event</button>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));