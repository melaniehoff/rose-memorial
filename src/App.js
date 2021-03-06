import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
  useParams
} from "react-router-dom";
import './App.css';
import {Share, Home,Garden, Flower, About} from './components'


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
    if(window.location.href.includes("/?frame")){
      window.location.href = "/garden_frame.png"
    }
    fetch("/.netlify/functions/roseGarden")
    .then( response => response.json())
        .then( (data) => {
          this.setState({
              isLoaded : true,
              records: data.records
          });
        // console.log('airtable', data)
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
{/* <nav>
        <Link to="/share">Share your rose</Link>
          </nav>*/}


          {/* NAVIGATION */}
          <Switch>
            <Route path="/share">
              <Share flowers={records} />
            </Route>
            <Route path="/flower/:id"  >
              <Flower records={records}/>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/garden">
              <Garden records={records} />
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

export default App;
