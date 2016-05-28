import React from 'react';

import {QuestionsTable} from './QuestionsTable.jsx'
import {SearchForm} from './SearchForm.jsx'
import {checkStatus, parseJson, log} from '../utils'


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.searchQuestions = this.searchQuestions.bind(this);
  }

  render() {
    return (
      <div>
        <SearchForm onSubmit={this.searchQuestions} />
        {this.questionsTable()}
      </div>
    );
  }

  questionsTable() {
    if (this.state.questions === undefined)
      return '';
    else
      return <QuestionsTable questions={this.state.questions} />;
  }

  searchQuestions(question) {
    question = question.trim();
    if (!question)
      return

    let url = "/sample-questions.json";
    fetch(url)
      .then(checkStatus)
      .then(parseJson)
      .then(parsed => this.setState({questions: parsed}))
      .catch(log);
  }
}
