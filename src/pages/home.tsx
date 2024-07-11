import './home.css';

export default function Home() {
    return (
        <div className="container">
            <h1>Candyland Game</h1>
            <p>
                This project was created to mimic Hasbro's CandyLand game for the purpose of demonstrating technical skills. 
                Please note that this application is not intended to replace the actual game. 
                It only includes the card drawing functionality and does not involve moving pieces across a game board.
            </p>
            <div className="button-container">
                <button onClick={() => window.location.href = '/game'}>Go to Game</button>
            </div>
        </div>
    );
}