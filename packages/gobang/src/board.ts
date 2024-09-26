export enum EPieceType {
  'black' = 'black',
  'white' = 'white',
  'empty' = 'empty',
}

export interface IPosition {
  color: EPieceType
}

export function genBoard(x: number, y: number) {
  const board: IPosition[][] = []

  for (let index = 0; index < x; index++) {
    const row: IPosition[] = []
    for (let index = 0; index < y; index++) {
      row.push({
        color: EPieceType.empty,
      })
    }
    board.push(row)
  }

  return board
}
