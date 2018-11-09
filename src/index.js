// Importing "_" is used to import lodash ... go figure
import _ from "lodash";
// Two libraries for React and ReactDOM
import React, { Component } from "react";
import ReactDOM from "react-dom";
// YouTubeSearch API component
import YTSearch from "youtube-api-search";
// The rest of the components that are in this projct
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
// Our API Key for the YouTube API
const API_KEY = "AIzaSyCKzyZm3FdDB39xvA0twZO544VO5cB1SYE";

// Create a new component that should produce some HTML
class App extends Component {
  // constructor is always called with props
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('gymkhana');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    // debounce returns a new function that can only be called every x amount of milliseconds
    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar
          onSearchTermChange={videoSearch}
        />
        <VideoDetail
          video={this.state.selectedVideo}
        />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));
