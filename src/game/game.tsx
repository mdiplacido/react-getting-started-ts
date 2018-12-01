import * as React from 'react';
import { Answer } from './simple-components/answer';
import { Button } from './simple-components/button';
import { Numbers } from './simple-components/numbers';
import { Stars } from './simple-components/stars';

export interface IGameState {
    selectedNumbers: number[];
    numberOfStars: number;
    answerIsCorrect: boolean | null;
}

export class Game extends React.Component<any, IGameState> {
    public state = {
        answerIsCorrect: null,
        numberOfStars: 1 + Math.floor(Math.random() * 9),
        selectedNumbers: [2, 4],
    }

    public selectNumber = (clickedNumber: number) => {
        this.setState(prevState => ({ selectedNumbers: [...prevState.selectedNumbers, clickedNumber] }));
    };

    public removeNumber = (clickedNumber: number) => {
        this.setState(prevState => ({ selectedNumbers: prevState.selectedNumbers.filter(c => c !== clickedNumber) }));
    }

    public checkAnswer = () => {
        this.setState(prev => ({
            ...prev,
            answerIsCorrect: prev.numberOfStars === prev.selectedNumbers.reduce((acc, curr) => acc + curr, 0)
        }));
    }

    public render() {
        const { numberOfStars, selectedNumbers, answerIsCorrect } = this.state;
        return (
            <div className="container">
                <h3>Play nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={numberOfStars} />
                    <Button selectedNumbers={selectedNumbers} checkAnswer={this.checkAnswer} answerIsCorrect={answerIsCorrect} />
                    <Answer selectedNumbers={selectedNumbers} removeNumber={this.removeNumber} />
                </div>
                <br />
                <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} />
            </div>
        );
    }
}