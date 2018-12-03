import * as React from 'react';

import { Answer } from './simple-components/answer';
import { Button } from './simple-components/button';
import { DoneFrame } from './simple-components/done-frame';
import { Numbers } from './simple-components/numbers';
import { Stars } from './simple-components/stars';

export interface IGameState {
    selectedNumbers: number[];
    usedNumbers: number[];
    numberOfStars: number;
    answerIsCorrect: boolean | null;
    redraws: number;
    doneStatus: string;
}

export class Game extends React.Component<any, IGameState> {
    private static makeRandomStars = () => 1 + Math.floor(Math.random() * 9);

    private static initialState: () => IGameState = () => ({
        answerIsCorrect: null,
        doneStatus: '',
        numberOfStars: Game.makeRandomStars(),
        redraws: 10,
        selectedNumbers: [],
        usedNumbers: [],
    });

    private static sum = (s: number[]) => s.reduce((acc, n) => acc + n, 0);

    public state = Game.initialState();

    public selectNumber = (clickedNumber: number) => {
        this.setState(prevState => ({ answerIsCorrect: null, selectedNumbers: [...prevState.selectedNumbers, clickedNumber] }));
    };

    public removeNumber = (clickedNumber: number) => {
        this.setState(prevState => ({ answerIsCorrect: null, selectedNumbers: prevState.selectedNumbers.filter(c => c !== clickedNumber) }));
    }

    public checkAnswer = () => {
        this.setState(prev => ({
            answerIsCorrect: prev.numberOfStars === Game.sum(prev.selectedNumbers),
        }));
    }

    public acceptAnswer = () => {
        this.setState(prev => ({
            answerIsCorrect: null,
            numberOfStars: Game.makeRandomStars(),
            selectedNumbers: [],
            usedNumbers: [...prev.usedNumbers, ...prev.selectedNumbers],
        }), this.updateDoneStatus);
    };

    public redraw = () => {
        if (this.state.redraws === 0) {
            return;
        }
        this.setState(prev => ({
            answerIsCorrect: null,
            numberOfStars: Game.makeRandomStars(),
            redraws: prev.redraws - 1,
            selectedNumbers: [],
        }), this.updateDoneStatus);
    };

    public updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return {
                    doneStatus: 'Done. Nice!'
                }
            }

            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return {
                    doneStatus: 'Game Over!'
                }
            }

            return {
                doneStatus: ""
            }
        });
    };

    public render() {
        const { numberOfStars, selectedNumbers, answerIsCorrect, usedNumbers, redraws, doneStatus } = this.state;
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
                {doneStatus ?
                    <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} /> :
                    <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers} />
                }
            </div>
        );
    }

    public resetGame = () => {
        this.setState(Game.initialState());
    }

    private possibleSolutions = (state: IGameState) => {
        const possibleNumbers = Numbers.list.filter(p => state.usedNumbers.every(u => u !== p));
        return this.searchForMatch(possibleNumbers.map(n => [n]), possibleNumbers, state.numberOfStars);
    };

    private searchForMatch(sets: number[][], possibleNumbers: number[], numberOfStars: number): boolean {
        if (sets.length === 0) {
            return false;
        }

        const possibleSets = sets
            .map(s => ({ set: s, sum: Game.sum(s) }))
            .filter(s => s.sum <= numberOfStars);

        // did we find a winner?
        if (possibleSets.some(s => s.sum === numberOfStars)) {
            return true;
        }

        // we did not find a winner, and all sets that have exceeded numberOfStars have been removed.
        // we now try and build more sets, rinse and repeat. 
        return this.searchForMatch(
            this.makeSets(possibleSets.map(s => s.set), possibleNumbers),
            possibleNumbers,
            numberOfStars);
    }

    private makeSets(sets: number[][], possibleNumbers: number[]): number[][] {
        // if we have numbers to add to our combinations then add them, otherwise we will return empty sets
        // to make the next sets we simply try and make new sets of size n + 1 with each possibleNumbers not currently in the set
        // if we didn't make any new sets then we return nothing.
        const newSets = sets
            .map(s =>
                possibleNumbers
                    .filter(pNumber => s.every(n => n !== pNumber))
                    .map(pNumber => [...s, pNumber]))
            .filter(candidateSets => candidateSets.length !== 0);

        // flatten.
        return newSets.reduce((acc, c) => [...acc, ...c], []);
    }
}