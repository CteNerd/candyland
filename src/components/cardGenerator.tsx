import React, { useEffect, useState } from 'react';
import { Card } from '../types/card';
import { Pawn } from '../types/pawn';
import purpleLollipop from '../assets/purple_lollipop.svg';
import mint from '../assets/mint.png';
import chocolateDrop from '../assets/chocolate_drop.png';
import chocolateIceCreamCone from '../assets/chocolate_ice_cream_cone.png';
import greenGumdrop from '../assets/green_gumdrop.png';
import './cardGenerator.css';

const cardDeck: Card[] = [
  { color: 'Purple', squares: 1, count: 3 },
  { color: 'Purple', squares: 2, count: 3 },
  { color: 'Yellow', squares: 1, count: 4 },
  { color: 'Yellow', squares: 2, count: 3 },
  { color: 'Red', squares: 1, count: 3 },
  { color: 'Red', squares: 2, count: 3 },
  { color: 'Blue', squares: 1, count: 3 },
  { color: 'Blue', squares: 2, count: 3 },
  { color: 'Orange', squares: 1, count: 4 },
  { color: 'Orange', squares: 2, count: 3 },
  { color: 'Green', squares: 1, count: 4 },
  { color: 'Green', squares: 2, count: 3 },
  { color: 'Purple Lollipop', squares: null, count: 1 },
  { color: 'Chocolate Drop', squares: null, count: 1 },
  { color: 'Mint', squares: null, count: 1 },
  { color: 'Chocolate Ice Cream Cone', squares: null, count: 1 },
  { color: 'Green Gumdrop', squares: null, count: 1 }
];

const generateDeck = () => {
  const deck: Card[] = [];
  cardDeck.forEach(card => {
    for (let i = 0; i < card.count; i++) {
      deck.push({
        color: card.color, squares: card.squares,
        count: 0
      });
    }
  });
  return deck;
};

interface CardGeneratorProps {
  players: Pawn[];
  numberOfPlayers: number;
  drawEnabled: boolean;
}

const CardGenerator = (props: CardGeneratorProps) => {
  const [currentCard, setCurrentCard] = useState<Card>();
  const [currentPlayer, setCurrentPlayer] = useState<Pawn>();
  const [drawEnabled, setDrawEnabled] = useState<boolean>(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const deck = generateDeck();

  const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    setCurrentCard(deck[randomIndex] as any);
    setCurrentPlayerIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % props.players.length;
      setCurrentPlayer(props.players[nextIndex]);
      return nextIndex;
    });
  };

  const handleSpecialCard = (card: Card) => {
    switch (card.color) {
      case 'Purple Lollipop':
        console.log('You drew a Purple Lollipop!');
        return purpleLollipop;
      case 'Chocolate Drop':
        console.log('You drew a Chocolate Drop!');
        return chocolateDrop;
      case 'Mint':
        console.log('You drew a Mint!');
        return mint;
      case 'Chocolate Ice Cream Cone':
        console.log('You drew a Chocolate Ice Cream Cone!');
        return chocolateIceCreamCone;
      case 'Green Gumdrop':
        console.log('You drew a Green Gumdrop!');
        return greenGumdrop;
      default:
        console.log('Unknown special card!');
    }
  };

  useEffect(() => {
    setCurrentPlayer(props.players[0]);
    if (props.drawEnabled) {
      setDrawEnabled(currentPlayer !== undefined);
    }
  }, [props.players, props.drawEnabled]);

  return (
    <div>
      <h2>CandyLand Card Generator</h2>
      <button onClick={drawCard} disabled={!drawEnabled}>Draw a Card {currentPlayer?.name}</button>
      {currentCard && (
        <div className="card-container">
          <div className="card">
            <h3>Card Drawn:</h3>
            {currentCard.squares === null ? (
              <img src={handleSpecialCard(currentCard)} alt={currentCard.color} className="card-image" />
            ) : (
              <div className="color-squares">
                {Array.from({ length: currentCard.squares }, (_, index) => (
                  <div key={index} className="color-square" style={{ backgroundColor: currentCard.color.toLowerCase() }}></div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGenerator;
