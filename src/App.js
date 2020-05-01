import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Header from './components/Header';
import RadioGameType from './components/RadioGameType';
import DropdownPlayAgainst from './components/DropdownPlayAgainst';
import ScoreCounter from './components/ScoreCounter';
import PlayerCard from './components/PlayerCard';
import StarshipCard from './components/StarshipCard';
import Snackbar from '@material-ui/core/Snackbar';
import ResultInfo from './components/ResultInfo';
import LoadingSpinner from './components/Spinner';
import './App.css';

const classes = {
  cards: {
    width: '300px'
  },
  capitalize: {
    textTransform: 'capitalize'
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      radioSelected: '',
      playAgainst: '',
      errorOccurred: false,
      errorMessage: '',
      newGameStarted: false,
      loading: true,
      showScore: false,
      firstPlayer: {},
      secondPlayer: {},
      fightResult: '',
      firstPlayerScore: 0,
      secondPlayerScore: 0
    };
    this.fetchFighters = this.fetchFighters.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleFight = this.handleFight.bind(this);
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
  }

  handleRadioChange(event) {
    if( event.target.value === 'People') {
      this.setState({ playAgainst: 'mass' },
        this.setState({ radioSelected: event.target.value, newGameStarted: false }));
    } else {
      this.setState({ playAgainst: 'crew' },
        this.setState({ radioSelected: event.target.value, newGameStarted: false }));
    }
  }

  fetchFighters() {
    this.setState({ loading: true, newGameStarted: true, fightResult: '' });
    this.state.radioSelected === '' ? 
      this.setState({ errorOccurred: true, errorMessage: 'Please choose game type' }) 
      : this.setState({ error: '' });

    if( this.state.radioSelected === 'People' ) {
      let personNum = Math.floor(Math.random() * 90);
      fetch(`https://swapi.dev/api/people/${personNum}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ firstPlayer: data });
        });

      personNum = Math.floor(Math.random() * 90);

      fetch(`https://swapi.dev/api/people/${personNum}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ secondPlayer: data, loading: false });
        });
    } else if ( this.state.radioSelected === 'Starships' ) {
      let starshipPageNum = Math.floor(Math.random() * 4) + 1;
      let starshipPageNumStr = '';
      let randomResult = 0;
      starshipPageNum === 1 ? starshipPageNumStr = '' : starshipPageNumStr = `?page=${starshipPageNum}`; 
      fetch(`https://swapi.dev/api/starships/${starshipPageNumStr}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if(starshipPageNum === 4) randomResult = Math.floor(Math.random() * 7);
          else randomResult = Math.floor(Math.random() * 10);
          this.setState({ firstPlayer: data.results[randomResult] });
        });

      starshipPageNum = Math.floor(Math.random() * 4) + 1;
      starshipPageNumStr = '';
      randomResult = 0;
      starshipPageNum === 1 ? starshipPageNumStr = '' : starshipPageNumStr = `?page=${starshipPageNum}`; 

      fetch(`https://swapi.dev/api/starships/${starshipPageNumStr}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if(starshipPageNum === 4) randomResult = Math.floor(Math.random() * 7);
          else randomResult = Math.floor(Math.random() * 10);
          this.setState({ secondPlayer: data.results[randomResult], loading: false });
        });
    }
  }

  handleFight() {    
    if( this.state.firstPlayer[this.state.playAgainst] === 'unknown' || this.state.firstPlayer[this.state.playAgainst] === 'n/a' ) {

      this.state.secondPlayer[this.state.playAgainst] === 'unknown' || this.state.secondPlayer[this.state.playAgainst] === 'n/a' ? 
        this.setState({ fightResult: 'draw' }) 
        : this.setState({ showScore: true, fightResult: 'second', secondPlayerScore: this.state.secondPlayerScore + 1 })

    } else if ( this.state.secondPlayer[this.state.playAgainst] === 'unknown' || this.state.secondPlayer[this.state.playAgainst] === 'n/a' ) {
      this.setState({ showScore: true, fightResult: 'first', firstPlayerScore: this.state.firstPlayerScore + 1 })
    } else {
      if( this.state.firstPlayer[this.state.playAgainst] === this.state.secondPlayer[this.state.playAgainst] ) this.setState({ fightResult: 'draw' });

      else {
        let firstValue = parseInt(this.state.firstPlayer[this.state.playAgainst]);
        let secondValue = parseInt(this.state.secondPlayer[this.state.playAgainst]);
        if (firstValue > secondValue) {
          this.setState({ showScore: true, fightResult: 'first', firstPlayerScore: this.state.firstPlayerScore + 1 });
        } else {
          this.setState({ showScore: true, fightResult: 'second', secondPlayerScore: this.state.secondPlayerScore + 1 })
        }
      }
    }
  }

  handleDropdownSelect(eventKey) {
    this.setState({ playAgainst: eventKey });
  }

  render() {
    let resultClassFirst = '';
    let resultClassSecond = '';
    if( this.state.fightResult === 'first' ) {
      resultClassFirst = 'winner';
      resultClassSecond = 'loser';
    } else if ( this.state.fightResult === 'second' ) {
      resultClassFirst = 'loser';
      resultClassSecond = 'winner';
    } else {
      resultClassFirst = '';
      resultClassSecond = '';
    }
    return (
      <div className="pb-4">
        
        <Header />
        <RadioGameType handleRadioChange={ this.handleRadioChange } />
        
        <DropdownPlayAgainst 
          gameType={this.state.radioSelected} 
          handleSelect={this.handleDropdownSelect} 
          playAgainst={this.state.playAgainst} />

        <div className="text-center mt-4">
          <Button variant="success" onClick={this.fetchFighters}>GET NEW PLAYERS</Button>
        </div>

        <ScoreCounter show={this.state.showScore} first={this.state.firstPlayerScore} second={this.state.secondPlayerScore} />

        <Snackbar
          open={this.state.errorOccurred}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          autoHideDuration={2000}
          onClose={() => this.setState({ errorOccurred: false, errorMessage: '' })}
          message={this.state.errorMessage}
        />

        <ResultInfo fightResult={this.state.fightResult} style={classes.capitalize} />

        <LoadingSpinner newGame={this.state.newGameStarted} loading={this.state.loading} error={this.state.error} />

        { this.state.newGameStarted && !this.state.loading && this.state.radioSelected === 'People' ?
          <div>
            <div className="d-flex flex-row justify-content-around mt-4">
              <div className="card-container" style={classes.cards}>
                <PlayerCard 
                  resultClass={resultClassFirst}
                  player={this.state.firstPlayer}
                />
              </div>
              <p>VS</p>
              <div className="card-container" style={classes.cards}>
                <PlayerCard 
                  resultClass={resultClassSecond}
                  player={this.state.secondPlayer}
                />
              </div>
            </div>
            
            <div className="text-center mt-4">
              <Button variant="danger" onClick={ this.handleFight }>FIGHT</Button>
            </div>

          </div>
          : null
        }
        
        { this.state.newGameStarted && !this.state.loading && this.state.radioSelected === 'Starships' ?
          <div>
            <div className="d-flex flex-row justify-content-around mt-4">
              <div className="card-container" style={classes.cards}>
                <StarshipCard 
                  resultClass={resultClassFirst}
                  player={this.state.firstPlayer}
                />
              </div>
              <p>VS</p>
              <div className="card-container" style={classes.cards}>
              <StarshipCard 
                  resultClass={resultClassSecond}
                  player={this.state.secondPlayer}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <Button variant="danger" onClick={ this.handleFight }>FIGHT</Button>
            </div>

          </div>
          : null
        }

      </div>
    );
  }
}

export default App;
