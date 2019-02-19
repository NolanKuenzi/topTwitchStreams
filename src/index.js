import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';
import './myStyles.scss';

const App = () => {
  return (
    <div>
      <Main />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
