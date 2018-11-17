import * as React from 'react';
import { Answer } from './simple-components/answer';
import { Button } from './simple-components/button';
import { Numbers } from './simple-components/numbers';
import { Stars } from './simple-components/stars';

export class Game extends React.Component {
    public render() {
        return (
            <div className="container">
                <h3>Play nine</h3>
                <hr />
                <div className="row">
                    <Stars />
                    <Button />
                    <Answer />
                </div>
                <br />
                <Numbers />
            </div>
        );
    }
}