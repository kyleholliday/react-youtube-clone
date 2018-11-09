import React, { Component } from "react";

// regular component should only be made into class based when you need extra functionality
class SearchBar extends Component {
  constructor(props) {
    super(props);

    // Manipulating state should only take place in constructor function
    this.state = { term: '' };
  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
          placeholder="Search"
        />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
