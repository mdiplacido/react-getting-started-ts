import * as React from 'react';

export interface IDoneFrameProps {
    doneStatus: string;
    resetGame: () => void;
}

export const DoneFrame = (props: IDoneFrameProps) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play Again</button>
        </div>
    );
}