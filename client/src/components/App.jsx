import React from "react";

import {QuestionsTable} from "./QuestionsTable.jsx"
import {SearchForm} from "./SearchForm.jsx"
import {checkStatus, parseJson, log} from "../utils"


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isPending: false};
    this.searchQuestions = this.searchQuestions.bind(this);
  }

  render() {
    return (
      <div>
        <SearchForm
          isPending={this.state.isPending}
          onSubmit={this.searchQuestions}
        />
        {this.questionsTable()}
      </div>
    );
  }

  questionsTable() {
    if (this.state.questions === undefined)
      return "";
    else
      return <QuestionsTable questions={this.state.questions} />;
  }

  searchQuestions(question, site) {
    question = question.trim();
    if (!question || this.state.isPending)
      return

    const url = (process.env.NODE_ENV == "production") ?
      `/similar?question=${encodeURIComponent(question)}&site=${site}` :
      "/sample-questions.json";

    this.setState({isPending: true});
    fetch(url)
      .then(checkStatus)
      .then(parseJson)
      .then(parsed => {
        this.setState({isPending: false, questions: parsed});
      })
      .catch(error => {
        this.setState({isPending: false});
        console.log(error);
      });
  }
}
