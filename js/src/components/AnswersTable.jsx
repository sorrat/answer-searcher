import React, {PropTypes} from 'react';

import JsonTable from 'react-json-table';



/*
const tableSettings = {
  cellClass: (currentClass, column, row) => column,
  headerClass: (currentClass, column) => column,
  rowClass: (currentClass, row) => (row['solved'] ? 'solved' : 'not-solved'),
  keyField: 'date',
}

function redirectToAnswer(event, answer) {
  window.location.href = answer['link'];
}
*/

class AnswersTable extends React.Component {

  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      solved: PropTypes.bool.isRequired,
      link: PropTypes.string.isRequired,
    }))
  };

  render() {
    let {answers} = this.props;
    return (
      <JsonTable
        className={answers.length == 0 ? 'no-items' : ''}
        columns={['date', 'title', 'author']}
        rows={answers}
        settings={this.tableSettings}
        onClickRow={this.redirectToAnswer}
      />
    );
  }

  redirectToAnswer(event, answer) {
    window.location.href = answer['link'];
  }

  tableSettings = {
    cellClass: (currentClass, column, row) => column,
    headerClass: (currentClass, column) => column,
    rowClass: (currentClass, row) => (row['solved'] ? 'solved' : 'not-solved'),
    keyField: 'date',
  }
}

export {AnswersTable};
