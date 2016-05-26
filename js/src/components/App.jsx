import React from 'react';

import {AnswersTable} from './AnswersTable.jsx'
import {SearchForm} from './SearchForm.jsx'


const answers = [
  {date: '2015-01-13', title: 'First', author: 'Michel', solved: false, link: 'http://example.org'},
  {date: '2015-03-04', title: 'Second', author: 'John', solved: true, link: 'http://example.org'},
  {date: '2015-09-01', title: 'Third', author: 'Jason', solved: false, link: 'http://example.org'},
];



export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    };
    this.searchAnswer = this.searchAnswer.bind(this);
  }

  render() {
    return (
      <div>
        <SearchForm onSubmit={this.searchAnswer} />
        <AnswersTable answers={this.state.answers} />
      </div>
    );
  }

  searchAnswer(question) {
    console.log(question);
    this.setState({answers: answers});
  }

}
