import ItemSelectionComponent from "../components/ItemSelectionComponent";

export default interface ItemSelectionBuildButton {
    header: string,
    text: string,
    endpoint: string
    items: ItemSelectionComponent[]
}