describe("Should make board with current height/width setting using makeBoard()", () => {
    it("Should make nested arrays equal to height", () => {
        expect(board.length).toEqual(HEIGHT);
    });

    it("Should make each nested array to have 'WIDTH' amount of values", () => {
        for(let arr of board) {
            expect(arr.length).toEqual(WIDTH);
        };
    });
});

describe("Find the correct y-coordinate using findSpotForCol(x)", () => {
    it("should get the correct y-coordinate", () => {
        expect(findSpotForCol(4)).toEqual(5);
    })

    it("should get the correct y-coordinate after piece has been placed", () => {
        placeInTable(5,4);
        expect(findSpotForCol(4)).toEqual(4);
    })
})
