import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//App Components
import SearchForm from './components/SearchForm';
import PhotoContainer from './components/PhotoContainer';
import Nav from './components/Nav.js';
import NotFound from './components/NotFound';

//api config key
import apiKey from './config.js'

//import main topics
import mainTopics from './mainTopics.js';


class App extends Component {
  constructor() {
    super();
    this.state={
      topic: "",
      photos: [],
      isLoading: true
    }
  }

  performSearch = (topic) => {
    if (topic !== this.state.topic) {
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${topic}&per_page=24&format=json&nojsoncallback=1`;
      fetch(url)
        .then(response => response.json())
        .then(results => {this.setState({photos: results.photos.photo, isLoading: false, topic})})
        .catch(error => console.error('Error fetching and parsing data', error));
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <SearchForm />
          <Nav />
          <Switch>
            <Route exact path="/"
              render={(props) => (
                <PhotoContainer 
                  onSearch={this.performSearch}
                  photos={this.state.photos}
                  isLoading={this.state.isLoading}
                  topic={props.location.search.replace("?searchTopic=","")}
                />)}
            />
            {mainTopics.map((topic) => (
              <Route exact path={`/${topic}`}
                key={topic}
                render={(props) => (
                  <PhotoContainer 
                    onSearch={this.performSearch}
                    photos={this.state.photos}
                    isLoading={this.state.isLoading}
                    topic={topic}
                  />)}
              />))
            }

            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;