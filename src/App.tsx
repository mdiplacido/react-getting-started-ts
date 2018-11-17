import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import * as React from 'react';
import './App.css';
import { Game } from './game/game';

// import logo from './logo.svg';

library.add(faStroopwafel)


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
