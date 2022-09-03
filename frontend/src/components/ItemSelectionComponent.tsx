import * as React from "react";
import ItemSelectionInterface from '../interfaces/ItemSelectionInterface'

export default class ItemSelectionComponent extends React.Component<ItemSelectionInterface, {}> {

    constructor(props: ItemSelectionInterface) {
        super(props);
    }


    render() {
        return (
            <div>
                <p>
                    <button onClick={() => {
                        this.props.minusMax(this.props.name);
                    }}>
                        -
                    </button>
                    {this.props.name} <img src={this.props.imageUrl} alt={this.props.name} width="50"
                                           height="50"/> [{this.props.max}]
                    <button onClick={() => {
                        this.props.plusMax(this.props.name);
                    }}>
                        +
                    </button>
                </p>
            </div>
        );
    }
}