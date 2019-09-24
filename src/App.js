import React, { Component } from 'react';
import './App.css';
import PictureCard from './components/PictureCard';
import Wrapper from './components/Wrapper';
import cards from './cards.json';

class App extends Component {
  // sets states to cards json
  state = {
    cards,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: '',
    shakeit: 'false'
  };
  clickPicture = id => {
    // randomizes picture order
    const shuffledArray = this.shuffleArray(cards);
    this.setState({ cards: shuffledArray });

    // end game if same image is clicked
    if (this.state.clickedArray.includes(id)) {
      this.setState({
        score: 0,
        clickedArray: [],
        message: 'Beat Stopped! Click on any image to try again.',
        shakeit: 'true'
      });
    } else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: '...and the beat goes on.',
        shakeit: 'false'
      });
    }
    // top score
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
  };

  shuffleArray = picturesArray => {
    for (let i = picturesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [picturesArray[i], picturesArray[j]] = [
        picturesArray[j],
        picturesArray[i]
      ];
    }
    return picturesArray;
  };
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Dance Clicky Game</h1>
        </header>
        <h3 className='App-intro'>
          <p className='score'>
            <strong>
              Score: {this.state.score} | TopScore: {this.state.topScore}
            </strong>
          </p>
          <p className='message'>
            <strong>{this.state.message}</strong>
          </p>
        </h3>
        <Wrapper
          shakeWrapper={this.state.shakeit}
          pictures={this.state.cards.map(picture => (
            <PictureCard
              clickPicture={this.clickPicture}
              id={picture.id}
              key={picture.id}
              name={picture.name}
              image={picture.image}
            />
          ))}
        />
      </div>
    );
  }
}

export default App;
