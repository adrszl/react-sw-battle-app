// REACT
import React, { Component } from 'react';

// REACT-BOOTSTRAP
import Button from 'react-bootstrap/Button';

// COMPONENTS
import Header from './components/Header';
import RadioGameType from './components/RadioGameType';
import DropdownPlayAgainst from './components/DropdownPlayAgainst';
import ScoreCounter from './components/ScoreCounter';
import PlayerCard from './components/PlayerCard';
import StarshipCard from './components/StarshipCard';
import ResultInfo from './components/ResultInfo';
import LoadingSpinner from './components/Spinner';

// MATERIAL UI
import Snackbar from '@material-ui/core/Snackbar';

// REDUX
import { connect } from "react-redux";
import { fetchFightersRedux } from "./redux/actions";

// OTHER
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
      
      this.props.dispatch(fetchFightersRedux(personNum, 'people', 'first player'));
      personNum = Math.floor(Math.random() * 90);
      this.props.dispatch(fetchFightersRedux(personNum, 'people', 'second player'));
    } else if ( this.state.radioSelected === 'Starships' ) {
      let starshipPageNum = Math.floor(Math.random() * (16 - 2)) + 2;
      
      this.props.dispatch(fetchFightersRedux(starshipPageNum, 'starships', 'first player'));
      starshipPageNum = Math.floor(Math.random() * (16 - 2)) + 2;
      this.props.dispatch(fetchFightersRedux(starshipPageNum, 'starships', 'second player'));
    }
  }

  handleFight() {
    if( this.props.firstFighter[this.state.playAgainst] === 'unknown' || this.props.firstFighter[this.state.playAgainst] === 'n/a' ) {

      this.props.secondFighter[this.state.playAgainst] === 'unknown' || this.props.secondFighter[this.state.playAgainst] === 'n/a' ? 
        this.setState({ fightResult: 'draw' }) 
        : this.setState({ showScore: true, fightResult: 'second', secondPlayerScore: this.state.secondPlayerScore + 1 })

    } else if ( this.props.secondFighter[this.state.playAgainst] === 'unknown' || this.props.secondFighter[this.state.playAgainst] === 'n/a' ) {
      this.setState({ showScore: true, fightResult: 'first', firstPlayerScore: this.state.firstPlayerScore + 1 })
    } else {
      if( this.props.firstFighter[this.state.playAgainst] === this.props.secondFighter[this.state.playAgainst] ) this.setState({ fightResult: 'draw' });

      else {
        let firstValue = parseInt(this.props.firstFighter[this.state.playAgainst]);
        let secondValue = parseInt(this.props.secondFighter[this.state.playAgainst]);
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

    const { loading, firstFighter, secondFighter } = this.props;

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

          <LoadingSpinner newGame={this.state.newGameStarted} loading={loading} error={this.state.error} />

          { this.state.newGameStarted && !loading && this.state.radioSelected === 'People' ?
            <div>
              <div className="d-flex flex-row justify-content-around mt-4">
                <div className="card-container" style={classes.cards}>
                  { firstFighter ? 
                    <PlayerCard 
                      resultClass={resultClassFirst}
                      player={ firstFighter }
                    />
                    : null
                  }
                </div>
                <p>VS</p>
                <div className="card-container" style={classes.cards}>
                  { secondFighter ? 
                    <PlayerCard 
                      resultClass={resultClassSecond}
                      player={ secondFighter }
                    />
                    : null
                  }
                </div>
              </div>
              
              <div className="text-center mt-4">
                <Button variant="danger" onClick={ this.handleFight }>FIGHT</Button>
              </div>

            </div>
            : null
          }
          
          { this.state.newGameStarted && !loading && this.state.radioSelected === 'Starships' ?
            <div>
              <div className="d-flex flex-row justify-content-around mt-4">
                <div className="card-container" style={classes.cards}>
                  { firstFighter ? 
                    <StarshipCard 
                    resultClass={resultClassFirst}
                    player={ firstFighter }
                  />
                  : null }
                </div>
                <p>VS</p>
                <div className="card-container" style={classes.cards}>
                { secondFighter ? 
                  <StarshipCard 
                    resultClass={resultClassSecond}
                    player={ secondFighter }
                  />
                  : null
                }
                </div>
              </div>

              <div className="text-center mt-4">
                <Button variant="danger" onClick={ this.handleFight }>FIGHT</Button>
              </div>

            </div>
            : null
          }

          <div className="text-center">Battle log [soon...]</div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  errorMsg: state.errorMsg,
  firstFighter: state.firstFighter,
  secondFighter: state.secondFighter
});

export default connect(mapStateToProps)(App);