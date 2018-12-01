import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react';

export interface IStarsProp {
    numberOfStars: number;
}

export const Stars = (props: IStarsProp) => {

    const stars = new Array(props.numberOfStars)
        .fill(null)
        .map((_, i) => <FontAwesomeIcon key={i} icon="stroopwafel" />)

    return (
        <div className="col-5">
            {stars}
        </div>
    );
}
