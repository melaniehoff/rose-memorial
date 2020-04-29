import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import GetShare from './components/Share/GetShare';

const pub = process.env.PUBLIC_URL;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        err : null,
        isLoaded : false,
        records : []
    };
  }
  componentDidMount() {
      fetch(".netlify/functions/main")
    .then( response => response.json())
        .then( (data) => {
          this.setState({
              isLoaded : true,
              meow : data,
              records: data.records
          });
        console.log('airtable', data.records)
      })
    .catch(err => {
    this.setState({
              isLoaded: true,
              err
          });
    console.log(err)
  });
  }

render() {
    const { records } = this.state;
    return (
      <Router>
        <div className="App">
          {/* LOGO */}
          <header className="App-header">
          </header>
          {/* CALENDAR SEPARATE PAGE */}
          <nav>
          <Link to="/share">Share your rose</Link>
          </nav>
          {/* CONTENT */}


          {/* NAVIGATION */}
          <Switch>
            <Route path="/share">
              <GetShare />
            </Route>
            <Route path="/">
              <Home records={records} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
function Home(props) {
  return (
    <div>
        <div className="Content">
        </div>
      </div>
  );
}
function Share() {
  return (
    <div>
      <GetShare/>
      </div>

  );
}
export default App;
