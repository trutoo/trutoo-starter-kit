import React from 'react';
import ReactDOM from 'react-dom';

import Test from 'component/Test';

export default class App extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Test/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));