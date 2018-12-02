import * as React from 'react';
import { Answer } from './simple-components/answer';
import { Button } from './simple-components/button';
import { Numbers } from './simple-components/numbers';
import { Stars } from './simple-components/stars';

export interface IGameState {
    selectedNumbers: number[];
    usedNumbers: number[];
    numberOfStars: number;
    answerIsCorrect: boolean | null;
    redraws: number;
}

function makeRandomStars(): number {
    return 1 + Math.floor(Math.random() * 9);
}

export class Game extends React.Component<any, IGameState> {
    public state = {
        answerIsCorrect: null,
        numberOfStars: makeRandomStars(),
        redraws: 5,
        selectedNumbers: [],
        usedNumbers: [],
    }

    public selectNumber = (clickedNumber: number) => {
        this.setState(prevState => ({ answerIsCorrect: null, selectedNumbers: [...prevState.selectedNumbers, clickedNumber] }));
    };

    public removeNumber = (clickedNumber: number) => {
        this.setState(prevState => ({ answerIsCorrect: null, selectedNumbers: prevState.selectedNumbers.filter(c => c !== clickedNumber) }));
    }

    public checkAnswer = () => {
        this.setState(prev => ({
            answerIsCorrect: prev.numberOfStars === prev.selectedNumbers.reduce((acc, curr) => acc + curr, 0)
        }));
    }

    public acceptAnswer = () => {
        this.setState(prev => ({
            answerIsCorrect: null,
            numberOfStars: makeRandomStars(),
            selectedNumbers: [],
            usedNumbers: [...prev.usedNumbers, ...prev.selectedNumbers],
        }));
    };

    public redraw = () => {
        if (this.state.redraws === 0) {
            return;
        }
        this.setState(prev => ({
            answerIsCorrect: null,
            numberOfStars: makeRandomStars(),
            redraws: prev.redraws - 1,
            selectedNumbers: [],
        }));
    };

    public render() {
        const { numberOfStars, selectedNumbers, answerIsCorrect, usedNumbers, redraws } = this.state;
        return (
            <div className="container">
                <h3>Play nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={numberOfStars} />
                    <Button
                        selectedNumbers={selectedNumbers}
                        checkAnswer={this.checkAnswer}
                        answerIsCorrect={answerIsCorrect}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        redraws={redraws} />
                    <Answer selectedNumbers={selectedNumbers} removeNumber={this.removeNumber} />
                </div>
                <br />
                <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers} />
            </div>
        );
    }

}