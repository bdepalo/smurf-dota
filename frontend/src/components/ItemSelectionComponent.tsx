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
                <button onClick={() => {
                    this.setState(prevState => {
                        return {max: Math.max(prevState.max - 1, 0)}
                    })
                }}>
                    -
                </button>
                <p>{this.props.name}</p>
                <img src={this.props.imageUrl} alt={this.props.name}/>
                <button onClick={() => {
                    this.setState(prevState => {
                        return {max: prevState.max + 1}
                    })
                }}>
                    +
                </button>
            </div>
        );
    }
}