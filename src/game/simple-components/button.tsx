
import * as React from 'react';

export interface IButtonProps {
    selectedNumbers: number[];
}

export const Button = (props: IButtonProps) => {
    return (
        <div className="col-2">
            <button className="btn btn-primary" disabled={props.selectedNumbers.length === 0}>=</button>
        </div>
    );
}