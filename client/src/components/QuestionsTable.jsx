import React, {PropTypes} from 'react';

import JsonTable from 'react-json-table';


class QuestionsTable extends React.Component {

  static propTypes = {
    questions: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      is_answered: PropTypes.bool.isRequired,
      link: PropTypes.string.isRequired,
    }))
  };

  render() {
    let {questions} = this.props;
    return (
      <JsonTable
        className={questions.length == 0 ? 'empty' : ''}
        columns={['date', 'title', 'owner']}
        rows={questions}
        settings={this.tableSettings}
        onClickRow={this.redirectToQuestion}
      />
    );
  }

  redirectToQuestion(event, question) {
    window.location.href = question['link'];
  }

  tableSettings = {
    cellClass: (currentClass, column, row) => column,
    headerClass: (currentClass, column) => column,
    rowClass: (currentClass, row) => (row['is_answered'] ? 'answered' : 'not-answered'),
    keyField: 'date',
    noRowsMessage: 'No results found'
  }
}

export {QuestionsTable};
