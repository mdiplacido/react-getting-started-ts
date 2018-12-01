import * as React from 'react';
// tslint:disable:jsx-no-lambda

export interface IAnswerProp {
    selectedNumbers: number[],
    removeNumber: (n: number) => void;
}

export const Answer = (props: IAnswerProp) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((n, i) => <span key={i} onClick={() => props.removeNumber(n)}>{n}</span>)}
        </div>
    );
}