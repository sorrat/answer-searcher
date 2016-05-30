import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from 'react-dropdown';


const SITES = [
  'stackoverflow',
  'serverfault',
  'superuser',
  'askubuntu',
  'webapps',
  'gaming',
  'webmasters',
  'cooking',
  'gamedev',
  'photo',
  'stats',
  'math',
  'diy',
  'gis',
  'tex',
]
const SITES_OPTIONS = SITES.map(name =>
  ({value: name, label: name})
)
const DEFAULT_SITE = SITES[0]


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {site: DEFAULT_SITE};

    this.onSubmit = this.onSubmit.bind(this);
    this.setSite = this.setSite.bind(this);
  }

  render() {
    return (
      <form className="flex-row" onSubmit={this.onSubmit}>
        <input
          ref="questionInput"
          className="flex-9"
          type="text"
          placeholder="Enter your question"
        />
        <Dropdown
          placeholder="Select an option"
          options={SITES_OPTIONS}
          value={DEFAULT_SITE}
          onChange={this.setSite}
        />
        <button>Search!</button>
      </form>
    );
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.questionInput).focus();
  }

  shouldComponentUpdate() {
    return false;
  }

  setSite(option) {
    this.setState({site: option.label});
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.refs.questionInput.value,
      this.state.site);
  }
}

export {SearchForm};
