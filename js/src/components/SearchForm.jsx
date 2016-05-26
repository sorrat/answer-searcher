import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <form className="flex-row" onSubmit={this.onSubmit}>
        <input
          ref="searchInput"
          className="flex-9"
          type="text"
          placeholder="Enter your question"
        />
        <button
          className="flex-1">
          Search!
        </button>
      </form>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.refs.searchInput.value);
  }
}

export {SearchForm};
