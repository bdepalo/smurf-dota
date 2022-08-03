import * as React from "react";
import ItemSelectionInterface from '../interfaces/ItemSelectionInterface'

export default class ItemSelectionComponent extends React.Component<ItemSelectionInterface, { max: number }> {

    constructor(props: ItemSelectionInterface) {
        super(props);
        this.state = {max: 0};
    }


    render() {
        return (
            <div>
                <p>
                    <button onClick={() => {
                        this.setState(prevState => {
                            return {max: Math.max(prevState.max - 1, 0)}
                        })
                    }}>
                        -
                    </button>
                    {this.props.name} <img src={this.props.imageUrl} alt={this.props.name} width="50"
                                           height="50"/> [{this.state.max}]
                    <button onClick={() => {
                        this.setState(prevState => {
                            return {max: prevState.max + 1}
                        })
                    }}>
                        +
                    </button>
                </p>
            </div>
        );
    }
}