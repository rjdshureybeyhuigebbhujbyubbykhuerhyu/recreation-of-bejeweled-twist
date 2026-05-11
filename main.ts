namespace SpriteKind {
    export const Cursor = SpriteKind.create()
}
function areThereMatchedGems (array: number[][]) {
    if (array[0][0] != 99) {
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if (array[i][j] != 0) {
                    if (j < 6) {
                        if (array[i][j] == array[i][j + 1]) {
                            if (array[i][j] == array[i][j + 2]) {
                                return true
                            }
                        }
                    }
                    if (i < 6) {
                        if (array[i][j] == array[i + 1][j]) {
                            if (array[i][j] == array[i + 2][j]) {
                                return true
                            }
                        }
                    }
                }
            }
        }
    }
    return false
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    changecursorpos(0, -1)
})
function userSpin () {
    The_grid = Rotate(truecursorpos[0], truecursorpos[1])
    matchloc = butLikeWhere()
    if (matchloc[0] != -1) {
        while (true) {
            // very inefficient. fix later?
            matchloc = butLikeWhere()
            if (matchloc[0] == -1) {
                break;
            } else {
                clearGems(matchloc)
            }
        }
    } else {
    	
    }
    theGravityOfTheSituation()
    updateBoard()
}
function isAMovePossible () {
    for (let k = 0; k <= 6; k++) {
        for (let l = 0; l <= 6; l++) {
            if (areThereMatchedGems(Rotate(k, l))) {
                return true
            }
        }
    }
    return false
}
function Reset_board () {
    latestmatchedcall = true
    while (latestmatchedcall) {
        tries += 1
        gemlist = [
        assets.tile`nothing`,
        assets.tile`blue`,
        assets.tile`red`,
        assets.tile`yellow`,
        assets.tile`orang`,
        assets.tile`whit`,
        assets.tile`ourple`,
        assets.tile`geen`
        ]
        The_grid = [[randint(1, 7)]]
        for (let m = 0; m <= 7; m++) {
            if (The_grid.length - 1 != m) {
                The_grid.push([randint(1, 7)])
            }
            for (let n = 0; n <= 7; n++) {
                if (The_grid[m].length - 1 != n) {
                    The_grid[m].push(randint(1, 7))
                }
            }
        }
        latestmatchedcall = areThereMatchedGems(The_grid)
        if (!(latestmatchedcall)) {
            latestmatchedcall = !(isAMovePossible())
            console.log("wow it prevented an impossible board")
        }
        console.log(tries)
    }
    updateBoard()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    userSpin()
})
function changecursorpos (col: number, row: number) {
    truecursorpos = [Math.constrain(truecursorpos[0] + col, 0, 6), Math.constrain(truecursorpos[1] + row, 0, 6)]
    placeCursorOnGrid(truecursorpos[0], truecursorpos[1])
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    changecursorpos(-1, 0)
})
function theGravityOfTheSituation () {
    for (let index = 0; index < 8; index++) {
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
            	
            }
        }
    }
}
function duplicate2DList (array: number[][]) {
    clone = [[0]]
    for (let index = 0; index <= array.length - 1; index++) {
        if (index == 0) {
            clone[index] = []
        } else {
            clone.push([])
        }
        for (let o = 0; o <= array[index].length - 1; o++) {
            if (clone[index].length - 1 < array[index].length - 1) {
                clone[index].push(array[index][o])
            } else {
                clone[index][o] = array[index][o]
            }
        }
    }
    return clone
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    changecursorpos(1, 0)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    changecursorpos(0, 1)
})
function clearGems (identifiedMatch: number[]) {
    lengthofmatch = 3
    if (identifiedMatch[2] == 0) {
        while (lengthofmatch + identifiedMatch[1] < 8) {
            if (The_grid[identifiedMatch[0]][identifiedMatch[1]] == The_grid[identifiedMatch[0]][lengthofmatch + identifiedMatch[1]]) {
                lengthofmatch += 1
                console.log("+1")
            } else {
                break;
            }
        }
    } else {
        while (lengthofmatch + identifiedMatch[0] < 8) {
            if (The_grid[identifiedMatch[0]][identifiedMatch[1]] == The_grid[lengthofmatch + identifiedMatch[0]][identifiedMatch[1]]) {
                lengthofmatch += 1
                console.log("+1")
            } else {
                break;
            }
        }
    }
    if (identifiedMatch[2] == 0) {
        for (let index2 = 0; index2 <= lengthofmatch - 1; index2++) {
            The_grid[identifiedMatch[0]][index2 + identifiedMatch[1]] = 0
        }
    } else {
        for (let index2 = 0; index2 <= lengthofmatch - 1; index2++) {
            The_grid[index2 + identifiedMatch[0]][identifiedMatch[1]] = 0
        }
    }
}
function placeCursorOnGrid (col: number, row: number) {
    tiles.placeOnTile(mySprite, tiles.getTileLocation(col + 3, row))
    mySprite.x += 8
    mySprite.y += 8
}
function updateBoard () {
    for (let p = 0; p <= 7; p++) {
        for (let q = 0; q <= 7; q++) {
            tiles.setTileAt(tiles.getTileLocation(q + 3, p), gemlist[The_grid[p][q]])
        }
    }
}
function Rotate (col: number, row: number) {
    dupedgrid = duplicate2DList(The_grid)
    cba = [0, 1]
    cba = [dupedgrid[row + 1][col]]
    cba.push(dupedgrid[row][col])
    cba.push(dupedgrid[row][col + 1])
    cba.push(dupedgrid[row + 1][col + 1])
    dupedgrid[row][col] = cba[0]
    dupedgrid[row][col + 1] = cba[1]
    dupedgrid[row + 1][col + 1] = cba[2]
    dupedgrid[row + 1][col] = cba[3]
    return dupedgrid
}
function butLikeWhere () {
    if (The_grid[0][0] != 99) {
        for (let r = 0; r <= 7; r++) {
            for (let s = 0; s <= 7; s++) {
                if (The_grid[r][s] != 0) {
                    if (s < 6) {
                        if (The_grid[r][s] == The_grid[r][s + 1]) {
                            if (The_grid[r][s] == The_grid[r][s + 2]) {
                                return [r, s, 0]
                            }
                        }
                    }
                    if (r < 6) {
                        if (The_grid[r][s] == The_grid[r + 1][s]) {
                            if (The_grid[r][s] == The_grid[r + 2][s]) {
                                return [r, s, 1]
                            }
                        }
                    }
                }
            }
        }
    }
    return [-1, -1, -1]
}
let cba: number[] = []
let dupedgrid: number[][] = []
let lengthofmatch = 0
let clone: number[][] = []
let gemlist: Image[] = []
let tries = 0
let latestmatchedcall = false
let matchloc: number[] = []
let truecursorpos: number[] = []
let mySprite: Sprite = null
let The_grid: number[][] = []
namespace userconfig { export const ARCADE_SCREEN_WIDTH = 176; export const ARCADE_SCREEN_HEIGHT = 128; }
The_grid = [[randint(1, 7)]]
tiles.setCurrentTilemap(tilemap`level`)
Reset_board()
mySprite = sprites.create(assets.image`circlesimple`, SpriteKind.Cursor)
placeCursorOnGrid(0, 0)
truecursorpos = [0, 0]
scene.setBackgroundColor(12)
animation.runImageAnimation(
mySprite,
assets.animation`spinnycircle`,
20,
true
)
