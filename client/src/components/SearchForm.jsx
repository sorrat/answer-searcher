import React from 'react';
import Dropdown from 'react-dropdown';

const sites = [
  {value: 'stackoverflow', label: 'stackoverflow'},
  {value: 'serverfault', label: 'serverfault'},
]

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div>
      <form className="flex-row" onSubmit={this.onSubmit}>
        <input
          ref="searchInput"
          className="flex-9"
          type="text"
          placeholder="Enter your question"
        />
        <Dropdown
          name="site"
          value="stackoverflow"
          placeholder="Select an option"
          options={sites}
        />
        <button className="flex-1">
          Search!
        </button>
      </form>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.refs.searchInput.value);
  }
}

export {SearchForm};
