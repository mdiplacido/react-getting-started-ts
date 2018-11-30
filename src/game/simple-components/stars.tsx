import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react';

export const Stars = () => {
    const numberOfStars = 1 + Math.floor(Math.random() * 9);

    const stars = [];

    for (let i = 0; i < numberOfStars; i++) {
        stars.push(<FontAwesomeIcon icon="stroopwafel" />);
    }

    return (
        <div className="col-5">
            {stars}
        </div>
    );
}
