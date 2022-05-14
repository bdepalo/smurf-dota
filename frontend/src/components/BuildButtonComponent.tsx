import * as React from "react";
import BuildButtonInterface from '../interfaces/BuildButtonInterface'

export default class BuildButtonComponent extends React.Component<BuildButtonInterface, { build: string }> {

    constructor(props: BuildButtonInterface) {
        super(props);
        this.state = {build: "none"};
    }


    render() {
        return (
            <div>
                <h3>{this.props.header}</h3>
                <button onClick={() => this.getRandomNormal().then(res => {
                        this.setState(() => ({build: res}))
                    }
                )}>
                    {this.props.text}
                </button>
                <h3>The Build</h3>
                <p>{this.state.build}</p>
                <hr/>
            </div>
        );
    }

    getRandomNormal(): Promise<string> {
        return fetch(this.props.endpoint, {
            referrerPolicy: "origin-when-cross-origin",
            mode: "cors",
            method: 'GET'
        })
            .then(res => res.text())
    }
}