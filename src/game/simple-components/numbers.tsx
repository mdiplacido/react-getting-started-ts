import * as React from 'react';

export interface INumbersProp {
    selectedNumbers: number[];
    usedNumbers: number[];
    selectNumber: (n: number) => void;
}

export const Numbers = (props: INumbersProp) => {
    const numberClassName = (n: number) => {
        if (props.usedNumbers.some(current => current === n)) {
            return 'used';
        }

        if (props.selectedNumbers.some(current => current === n)) {
            return 'selected';
        }

        return undefined;
    };

    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((n, i) => <span
                    key={i}
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={() => ![...props.selectedNumbers, ...props.usedNumbers].some(e => e === n) && props.selectNumber(n)}
                    className={numberClassName(n)}>{n}</span>)}

                {/* <span className="selected">2</span>
                <span className="used">3</span> */}
            </div>
        </div>
    );
}

Numbers.list = new Array(9).fill(0).map((_, index) => index + 1);

