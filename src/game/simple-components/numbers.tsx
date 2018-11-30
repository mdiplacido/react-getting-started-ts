import * as React from 'react';

export const Numbers = () => {
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((n, i) => <span key={i}>{n}</span>)}

                {/* <span className="selected">2</span>
                <span className="used">3</span> */}
            </div>
        </div>
    );
}

Numbers.list = new Array(9).fill(0).map((_, index) => index + 1);

