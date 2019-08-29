import React, { Component } from 'react';
import Navbar from './Navbar';
import Card from './Card'
import './App.css';


const cardState = {
  HIDING: 0,
  SHOW: 1,
  MATCHING: 2
};

class App extends Component {
  // Durstenfeld shuffle algorithm
  // Run time of this algorithm is O(n)
  shuffleArray(cardsArray) {
    const cards = cardsArray.slice();
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    };
    return cards;
  };
  
  constructor(props) {
    super(props);
    // Defining array of cards before set to state
    let cards = [
      {id:0, cardState: cardState.HIDING, backgroundColor: 'red'},
      {id:1, cardState: cardState.HIDING, backgroundColor: 'red'},
      {id:2, cardState: cardState.HIDING, backgroundColor: 'black'},
      {id:3, cardState: cardState.HIDING, backgroundColor: 'black'},
      {id:4, cardState: cardState.HIDING, backgroundColor: 'blue'},
      {id:5, cardState: cardState.HIDING, backgroundColor: 'blue'},
      {id:6, cardState: cardState.HIDING, backgroundColor: 'orange'},
      {id:7, cardState: cardState.HIDING, backgroundColor: 'orange'},
      {id:8, cardState: cardState.HIDING, backgroundColor: 'yellow'},
      {id:9, cardState: cardState.HIDING, backgroundColor: 'yellow'},
      {id:10, cardState: cardState.HIDING, backgroundColor: 'purple'},
      {id:11, cardState: cardState.HIDING, backgroundColor: 'purple'},
      {id:12, cardState: cardState.HIDING, backgroundColor: 'brown'},
      {id:13, cardState: cardState.HIDING, backgroundColor: 'brown'},
      {id:14, cardState: cardState.HIDING, backgroundColor: 'green'},
      {id:15, cardState: cardState.HIDING, backgroundColor: 'green'}
    ]
    // State is defined by passing through Durstenfeld shuffle algorithm
    cards = this.shuffleArray(cards);
    this.state ={cards, noClick: false}
   this.handleClick = this.handleClick.bind(this);
   this.handleNewGame = this.handleNewGame.bind(this);
  };
  // Handle users click on cards
  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if(idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    }

    const foundCard = this.state.cards.find(c => c.id === id);

    if(this.state.noClick || foundCard.cardState !== cardState.HIDING) {
      return;
    }
    
    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], cardState.SHOWING);

    const showingCards = cards.filter((c) => c.cardState === cardState.SHOWING);

    const ids = showingCards.map(c => c.id);

    if(showingCards.length === 2 && 
        showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
          cards = mapCardState(cards,ids,cardState.MATCHING);
        } else if(showingCards.length === 2) {
          let hidingCards = mapCardState(cards,ids,cardState.HIDING);

          noClick = true;
          
          this.setState({cards,noClick}, () => {
            setTimeout(() => {
              this.setState({cards: hidingCards, noClick:false});
            },1300);
          });
          return;
        }
        this.setState({cards, noClick});

        // add game finished and win banner
        //commit to github
        // card flip animation
  }

  handleNewGame() {
    let cards = this.state.cards.map(c => ({
      ...c,
      cardState: cardState.HIDING
    }));
     cards = this.shuffleArray(cards)
     this.setState({cards});
  };
  render() {
    // Map over state and returns Card component with related data 
    const cards = this.state.cards.map((card) => (
      <Card
        key={card.id}
        showing={card.cardState !== cardState.HIDING}
        backgroundColor={card.backgroundColor}
        onClick={() => this.handleClick(card.id)}
      />
    ));
    return (
      <div className='game'>
          <Navbar onNewGame={this.handleNewGame} />
          <div className='container'> 
              {cards}
          </div>
      </div>)
    
  }
}

export default App;