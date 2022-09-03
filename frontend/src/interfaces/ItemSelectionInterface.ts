export default interface ItemSelection {
    imageUrl: string,
    name: string,
    min: number,
    max: number,
    plusMax: Function,
    plusMin: Function,
    minusMax: Function,
    minusMin: Function
}