import React, {PropTypes} from 'react';
import JsonTable from 'react-json-table';

import {timestampToDate} from '../utils';


class QuestionsTable extends React.Component {

  static propTypes = {
    questions: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      is_answered: PropTypes.bool.isRequired,
      link: PropTypes.string.isRequired,
    }))
  };

  static columns = [
    {
      key: 'date',
      cell: (row) => timestampToDate(row['date']).toLocaleString('ru'),
    },
    'title',
    'owner',
  ];

  static settings = {
    cellClass: (currentClass, column, row) => column,
    headerClass: (currentClass, column) => column,
    rowClass: (currentClass, row) => (row['is_answered'] ? 'answered' : 'not-answered'),
    keyField: 'date',
    noRowsMessage: 'No results found',
  };


  render() {
    let {questions} = this.props;
    return (
      <JsonTable
        className={questions.length == 0 ? 'empty' : ''}
        rows={questions}
        columns={QuestionsTable.columns}
        settings={QuestionsTable.settings}
        onClickRow={this.redirectToQuestion}
      />
    );
  }

  redirectToQuestion(event, question) {
    window.location.href = question['link'];
  }

}

export {QuestionsTable};
