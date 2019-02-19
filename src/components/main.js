import React from 'react';
import Header from './header';
import TwitchData from '../containers/twitchApi';

const Main = () => {
  return (
    <div>
      <Header />
      <TwitchData />
    </div>
  );
};

export default Main;
