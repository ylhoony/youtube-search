import React, { Component } from "react";
import _ from "lodash";
import YTSearch from "youtube-api-search";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import SearchBar from "./components/search_bar";

// Create a new component which should produce some HTML
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
  }

  componentDidMount() {
    this.videoSearch("surfboards");
  }

  videoSearch(term) {
    YTSearch(
      { key: process.env.REACT_APP_YOUTUBE_API_KEY, term: term },
      videos => {
        this.setState({
          videos: videos,
          selectedVideo: videos[0]
        });
      }
    );
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

export default App;
