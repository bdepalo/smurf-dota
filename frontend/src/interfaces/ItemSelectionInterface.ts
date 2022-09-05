export default interface ItemSelection {
    imageUrl: string,
    name: string,
    items: Map<string,number[]>,
    plusMax: Function,
    plusMin: Function,
    minusMax: Function,
    minusMin: Function
}