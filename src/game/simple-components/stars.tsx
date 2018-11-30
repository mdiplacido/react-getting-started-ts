import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react';

export const Stars = () => {
    const numberOfStars = 1 + Math.floor(Math.random() * 9);

    const stars = new Array(numberOfStars)
        .fill(null)
        .map((_, i) => <FontAwesomeIcon key={i} icon="stroopwafel" />)

    return (
        <div className="col-5">
            {stars}
        </div>
    );
}
