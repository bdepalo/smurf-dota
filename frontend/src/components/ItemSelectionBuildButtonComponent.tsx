import * as React from "react";
import ItemSelectionBuildButtonInterface from '../interfaces/ItemSelectionBuildButtonInterface'

export default class ItemSelectionBuildButtonComponent extends React.Component<ItemSelectionBuildButtonInterface, { build: string }> {

    constructor(props: ItemSelectionBuildButtonInterface) {
        super(props);
        this.state = {build: "none"};
    }


    render() {
        return (
            <div>
                <h3>{this.props.header}</h3>
                <button onClick={() => this.getRandomWithCap().then(res => {
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

    getRandomWithCap(): Promise<string> {
        return fetch(this.props.endpoint, {
            referrerPolicy: "origin-when-cross-origin",
            mode: "cors",
            method: 'GET'
        })
            .then(res => res.text())
    }
}