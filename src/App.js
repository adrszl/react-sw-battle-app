import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Header from './components/Header';
import RadioGameType from './components/RadioGameType';
import PlayerCard from './components/PlayerCard';
import StarshipCard from './components/StarshipCard';
import Dropdown from 'react-bootstrap/Dropdown'
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
      error: '',
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
    this.state.radioSelected === '' ? this.setState({ error: 'Please choose game type' }) : this.setState({ error: '' });

    if( this.state.radioSelected === 'People' ) {
      let personNum = Math.floor(Math.random() * 90);
      fetch(`https://swapi.co/api/people/${personNum}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ firstPlayer: data });
        });

      personNum = Math.floor(Math.random() * 90);

      fetch(`https://swapi.co/api/people/${personNum}`)
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
      fetch(`https://swapi.co/api/starships/${starshipPageNumStr}`)
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

      fetch(`https://swapi.co/api/starships/${starshipPageNumStr}`)
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

        {/* <div className="input-group mx-auto">
          <div className="input-group-prepend ml-auto">
            <div className="d-flex flex-column input-group-text">
              <label htmlFor="People">People</label>
              <input type="radio" name="game_type" value="People" onChange={ this.handleRadioChange } />
            </div>
          </div>
          <div className="input-group-append mr-auto">
            <div className="d-flex flex-column input-group-text">
              <label htmlFor="Starhips">Starhips</label>
              <input type="radio" name="game_type" value="Starships" onChange={ this.handleRadioChange } />
            </div>
          </div>
        </div> */}

        { this.state.radioSelected !== '' ?
          <div className="mt-4 text-center">
            <Dropdown onSelect={this.handleDropdownSelect}>
              <Dropdown.Toggle variant="secondary">
                Play against {this.state.playAgainst}
              </Dropdown.Toggle>

              { this.state.radioSelected === 'People' ?
                <Dropdown.Menu>
                  <Dropdown.Item eventKey={'height'}>Height</Dropdown.Item>
                  <Dropdown.Item eventKey={'mass'}>Mass</Dropdown.Item>
                </Dropdown.Menu>
                :
                <Dropdown.Menu>
                  <Dropdown.Item eventKey={'cost_in_credits'}>Cost In Credits</Dropdown.Item>
                  <Dropdown.Item eventKey={'length'}>Length</Dropdown.Item>
                  <Dropdown.Item eventKey={'max_atmosphering_speed'}>Max Atmosphering Speed</Dropdown.Item>
                  <Dropdown.Item eventKey={'crew'}>Crew</Dropdown.Item>
                  <Dropdown.Item eventKey={'passengers'}>Passengers</Dropdown.Item>
                  <Dropdown.Item eventKey={'cargo_capacity'}>Cargo Capacity</Dropdown.Item>
                </Dropdown.Menu>
              }

            </Dropdown>
          </div>
          : null
        }

        <div className="text-center mt-4">
          <Button variant="success" onClick={ this.fetchFighters }>GET NEW PLAYERS</Button>
        </div>
        
        { this.state.error !== '' ? <div className="text-center mt-3"><span className="text-danger">{this.state.error}</span></div> : null }
        
        { this.state.showScore ? 
          <div className="text-center mt-3">
            <span>First Player Score: {this.state.firstPlayerScore}</span>
            <span> | </span>
            <span>Second Player Score: {this.state.secondPlayerScore}</span>
          </div> 
          : null
        }

        { this.state.fightResult !== '' ? 
          this.state.fightResult !== 'draw' ?
            <div className="text-center mt-3">
              <span style={classes.capitalize}><strong>{this.state.fightResult} Player Won!</strong></span>
            </div>
            : <div className="text-center mt-3"><span><strong>It's a draw!</strong></span></div>
          : null
        }        

        { this.state.newGameStarted && this.state.loading && this.state.error === '' ? 
          <div className="text-center mt-3"><Spinner animation="border" /></div>
          : null
        }

        { this.state.newGameStarted && !this.state.loading && this.state.radioSelected === 'People' ?
          <div>
            <div className="d-flex flex-row justify-content-around mt-4">
              <div className="card-container" style={classes.cards}>
                <PlayerCard 
                  name={this.state.firstPlayer.name} 
                  height={this.state.firstPlayer.height}
                  mass={this.state.firstPlayer.mass}
                  hairColor={this.state.firstPlayer.hair_color}
                  skinColor={this.state.firstPlayer.skin_color}
                  eyeColor={this.state.firstPlayer.eye_color}
                  birthYear={this.state.firstPlayer.birth_year}
                  gender={this.state.firstPlayer.gender}
                  resultClass={resultClassFirst}
                />
              </div>
              <p>VS</p>
              <div className="card-container" style={classes.cards}>
                <PlayerCard 
                  name={this.state.secondPlayer.name} 
                  height={this.state.secondPlayer.height}
                  mass={this.state.secondPlayer.mass}
                  hairColor={this.state.secondPlayer.hair_color}
                  skinColor={this.state.secondPlayer.skin_color}
                  eyeColor={this.state.secondPlayer.eye_color}
                  birthYear={this.state.secondPlayer.birth_year}
                  gender={this.state.secondPlayer.gender}
                  resultClass={resultClassSecond}
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
                  name={this.state.firstPlayer.name}
                  model={this.state.firstPlayer.model}
                  manufacturer={this.state.firstPlayer.manufacturer}
                  costInCredits={this.state.firstPlayer.cost_in_credits}
                  length={this.state.firstPlayer.length}
                  maxAtmospheringSpeed={this.state.firstPlayer.max_atmosphering_speed}
                  crew={this.state.firstPlayer.crew}
                  passengers={this.state.firstPlayer.passengers}
                  cargoCapacity={this.state.firstPlayer.cargo_capacity}
                  consumables={this.state.firstPlayer.consumables}
                  hyperdriveRating={this.state.firstPlayer.hyperdrive_rating}
                  mglt={this.state.firstPlayer.MGLT}
                  starshipClass={this.state.firstPlayer.starship_class}
                  resultClass={resultClassFirst}
                />
              </div>
              <p>VS</p>
              <div className="card-container" style={classes.cards}>
              <StarshipCard 
                  name={this.state.secondPlayer.name}
                  model={this.state.secondPlayer.model}
                  manufacturer={this.state.secondPlayer.manufacturer}
                  costInCredits={this.state.secondPlayer.cost_in_credits}
                  length={this.state.secondPlayer.length}
                  maxAtmospheringSpeed={this.state.secondPlayer.max_atmosphering_speed}
                  crew={this.state.secondPlayer.crew}
                  passengers={this.state.secondPlayer.passengers}
                  cargoCapacity={this.state.secondPlayer.cargo_capacity}
                  consumables={this.state.secondPlayer.consumables}
                  hyperdriveRating={this.state.secondPlayer.hyperdrive_rating}
                  mglt={this.state.secondPlayer.MGLT}
                  starshipClass={this.state.secondPlayer.starship_class}
                  resultClass={resultClassSecond}
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
