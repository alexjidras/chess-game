const pieceCodes = {
    white: {
        PAWN: 9817,
        KNIGHT: 9816,
        BISHOP: 9815,
        ROOK: 9814,
        QUEEN: 9813,
        KING: 9812
    },
    black: {}
};
for (let x in pieceCodes.white) {
    pieceCodes.black[x]= pieceCodes.white[x] + 6;
}

export { pieceCodes };