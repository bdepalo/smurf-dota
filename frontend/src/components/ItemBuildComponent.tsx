import * as React from "react";
import ItemBuildInterface from '../interfaces/ItemBuildInterface'

export default class ItemBuildComponent extends React.Component<ItemBuildInterface, {}> {
    constructor(props: ItemBuildInterface) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Item Build</h1>
                <b>{this.props.name}</b> : <b>{this.props.quantity}</b>
            </div>
        );
    }
}