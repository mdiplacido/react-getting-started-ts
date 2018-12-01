
import * as React from 'react';

export interface IButtonProps {
    answerIsCorrect: boolean | null;
    selectedNumbers: number[];
    checkAnswer: () => void;
}

export const Button = (props: IButtonProps) => {
    let button;

    switch (props.answerIsCorrect) {
        case true:
            button =
                <button className="btn btn-success" onClick={props.checkAnswer}>
                    <i className="fa fa-check" />
                </button>
            break;
        case false:
            button =
                <button className="btn btn-danger" onClick={props.checkAnswer}>
                    <i className="fa fa-times" />
                </button>
            break;
        default:
            button = <button onClick={props.checkAnswer} className="btn btn-primary" disabled={props.selectedNumbers.length === 0}>=</button>
            break;
    }

    return (
        <div className="col-2">
            {button}
        </div>
    );
}