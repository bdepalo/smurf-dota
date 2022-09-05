import * as React from "react";
import styled from "styled-components";
import ItemSelectionInterface from '../interfaces/ItemSelectionInterface'

export const ItemSelection = styled.div`
  display: grid;
  grid-template-rows: 25px 25px 25px;
  gap: 10px;
  grid-template-columns: 25px 100px 25px;
`;

export const ItemName = styled.div`
  grid-column: 2;
  grid-row: 1;
`;

export const ItemPicture = styled.div`
  grid-column: 2;
  grid-row: 2 / span 2;
`;

export const ItemMin = styled.div`
  grid-column: 1;
  grid-row: 2;
`;

export const ItemMax = styled.div`
  grid-column: 3;
  grid-row: 2;
`;

export const ItemMinPlus = styled.div`
  grid-column: 1;
  grid-row: 1;
`;

export const ItemMinMinus = styled.div`
  grid-column: 1;
  grid-row: 3;
`;

export const ItemMaxPlus = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

export const ItemMaxMinus = styled.div`
  grid-column: 3;
  grid-row: 3;
`;

export default class ItemSelectionComponent extends React.Component<ItemSelectionInterface, {}> {


    constructor(props: ItemSelectionInterface) {
        super(props);
    }


    render() {
        return (
            <ItemSelection>
                <ItemName>
                    {this.props.name}
                </ItemName>
                <ItemPicture>
                    <img src={this.props.imageUrl} alt={this.props.name} width="50"
                         height="50"/>
                </ItemPicture>
                <ItemMin>
                    [{(this.props.items.get(this.props.name) ?? [0, 6])[0]}]
                </ItemMin>
                <ItemMax>
                    [{(this.props.items.get(this.props.name) ?? [0, 6])[1]}]
                </ItemMax>
                <ItemMinPlus>
                    <button onClick={() => {
                        this.props.plusMin(this.props.name);
                    }}>
                        +
                    </button>
                </ItemMinPlus>
                <ItemMinMinus>
                    <button onClick={() => {
                        this.props.minusMin(this.props.name);
                    }}>
                        -
                    </button>
                </ItemMinMinus>
                <ItemMaxPlus>
                    <button onClick={() => {
                        this.props.plusMax(this.props.name);
                    }}>
                        +
                    </button>
                </ItemMaxPlus>
                <ItemMaxMinus>
                    <button onClick={() => {
                        this.props.minusMax(this.props.name);
                    }}>
                        -
                    </button>
                </ItemMaxMinus>
            </ItemSelection>
        );
    }
}