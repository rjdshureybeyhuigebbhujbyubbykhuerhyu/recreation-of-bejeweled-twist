namespace SpriteKind {
    export const Cursor = SpriteKind.create()
}
function areThereMatchedGems (array: number[][]) {
    if (array[0][0] != 99) {
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if (array[i][j] != 0) {
                    if (j < 6) {
                        if (array[i][j] % 7 == array[i][j + 1] % 7) {
                            if (array[i][j] % 7 == array[i][j + 2] % 7) {
                                return true
                            }
                        }
                    }
                    if (i < 6) {
                        if (array[i][j] % 7 == array[i + 1][j] % 7) {
                            if (array[i][j] == array[i + 2][j] % 7) {
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
        theGravityOfTheSituation()
    } else {
    	
    }
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
        assets.tile`geen`,
        assets.tile`myTile`,
        assets.tile`red0`,
        assets.tile`yellow0`,
        assets.tile`orang0`,
        assets.tile`whit0`,
        assets.tile`ourple0`,
        assets.tile`geen0`
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
function addGemAlgo () {
    if (!(fated)) {
        while (true) {
            while (fate.length > 0) {
                fate.shift()
            }
            didGravII = true
            dupedgrid = duplicate2DList(The_grid)
            for (let index = 0; index < 8; index++) {
                for (let index2 = 0; index2 <= 7; index2++) {
                    if (dupedgrid[0][index2] == 0) {
                        temp = randint(1, 7)
                        fate.push(temp)
                        if (fate.indexOf(temp) < 0) {
                            fate.push(temp)
                        }
                        console.log("+1, =" + fate.length)
                        dupedgrid[0][index2] = fate[fate.length - 1]
                    }
                }
                didGravII = false
                for (let row = 0; row <= 6; row++) {
                    for (let col = 0; col <= 7; col++) {
                        if (dupedgrid[7 - row][7 - col] == 0) {
                            didGravII = true
                            dupedgrid[7 - row][7 - col] = dupedgrid[6 - row][7 - col]
                            dupedgrid[6 - row][7 - col] = 0
                        }
                    }
                }
                console.log("grav with " + fate.length)
            }
            for (let index3 = 0; index3 <= 7; index3++) {
                for (let o = 0; o <= 7; o++) {
                    if (dupedgrid[o][index3] == 0) {
                        fate.push(randint(1, 7))
                        console.log("bandaid fix proc'd")
                        dupedgrid[o][index3] = fate[fate.length - 1]
                    }
                }
            }
            if (!(fate[0] > 0)) {
                fate.shift()
            }
            savedGrid = duplicate2DList(The_grid)
            The_grid = duplicate2DList(dupedgrid)
            if (isAMovePossible() || areThereMatchedGems(The_grid)) {
                The_grid = duplicate2DList(savedGrid)
                break;
            } else {
                The_grid = duplicate2DList(savedGrid)
            }
        }
        fated = true
        if (!(fate[0] > 0)) {
            console.log("crap (" + fate + ")")
        } else {
            console.log(":)")
            return fate.shift()
        }
        return 0
    } else {
        console.log("I sure hope this isn't 0: " + fate.length)
        if (!(fate[0] > 0)) {
            fate.shift()
        }
        if (!(fate[0] > 0)) {
            console.log("crap (" + fate[0] + ")")
        } else {
            console.log(":)")
            return fate.shift()
        }
        return 0
    }
}
function changecursorpos (col: number, row: number) {
    truecursorpos = [Math.constrain(truecursorpos[0] + col, 0, 6), Math.constrain(truecursorpos[1] + row, 0, 6)]
    placeCursorOnGrid(truecursorpos[0], truecursorpos[1])
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    changecursorpos(-1, 0)
})
function theGravityOfTheSituation () {
    pause(20)
    while (true) {
        for (let index = 0; index < 8; index++) {
            updateBoard()
            didGrav = false
            for (let row2 = 0; row2 <= 6; row2++) {
                for (let col2 = 0; col2 <= 7; col2++) {
                    if (The_grid[7 - row2][7 - col2] == 0) {
                        didGrav = true
                        The_grid[7 - row2][7 - col2] = The_grid[6 - row2][7 - col2]
                        The_grid[6 - row2][7 - col2] = 0
                    }
                }
            }
            pause(60)
            updateBoard()
            for (let completelynewloopvar = 0; completelynewloopvar <= 7; completelynewloopvar++) {
                if (The_grid[0][completelynewloopvar] == 0) {
                    // Why in the world is this necessary.
                    // Too bad!
                    gemAlgoReturn = addGemAlgo()
                    The_grid[0][completelynewloopvar] = gemAlgoReturn
                }
            }
            updateBoard()
            if (!(didGrav)) {
                break;
            }
        }
        fated = false
        matchloc = butLikeWhere()
        if (matchloc[0] == -1) {
            break;
        } else {
            while (matchloc[0] != -1) {
                clearGems(matchloc)
                matchloc = butLikeWhere()
            }
        }
    }
}
function duplicate2DList (array: number[][]) {
    clone = [[0]]
    for (let index22 = 0; index22 <= array.length - 1; index22++) {
        if (index22 == 0) {
            clone[index22] = []
        } else {
            clone.push([])
        }
        for (let q = 0; q <= array[index22].length - 1; q++) {
            if (clone[index22].length - 1 < array[index22].length - 1) {
                clone[index22].push(array[index22][q])
            } else {
                clone[index22][q] = array[index22][q]
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
    updateBoard()
    pause(20)
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
    matchColor = The_grid[identifiedMatch[0]][0 + identifiedMatch[1]]
    if (identifiedMatch[2] == 0) {
        for (let index222 = 0; index222 <= lengthofmatch - 1; index222++) {
            if (index222 == 2 && lengthofmatch == 4) {
                The_grid[identifiedMatch[0]][index222 + identifiedMatch[1]] = matchColor + 7
            } else {
                The_grid[identifiedMatch[0]][index222 + identifiedMatch[1]] = 0
            }
        }
    } else {
        for (let index23 = 0; index23 <= lengthofmatch - 1; index23++) {
            if (index23 == 2 && lengthofmatch == 4) {
                The_grid[index23 + identifiedMatch[0]][identifiedMatch[1]] = matchColor + 7
            } else {
                The_grid[index23 + identifiedMatch[0]][identifiedMatch[1]] = 0
            }
        }
    }
    updateBoard()
    pause(20)
}
function placeCursorOnGrid (col: number, row: number) {
    tiles.placeOnTile(mySprite, tiles.getTileLocation(col + 3, row))
    mySprite.x += 8
    mySprite.y += 8
}
function updateBoard () {
    for (let r = 0; r <= 7; r++) {
        for (let s = 0; s <= 7; s++) {
            tiles.setTileAt(tiles.getTileLocation(s + 3, r), gemlist[The_grid[r][s]])
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
        for (let t = 0; t <= 7; t++) {
            for (let u = 0; u <= 7; u++) {
                if (The_grid[t][u] != 0) {
                    if (u < 6) {
                        if (The_grid[t][u] % 7 == The_grid[t][u + 1] % 7) {
                            if (The_grid[t][u] % 7 == The_grid[t][u + 2] % 7) {
                                return [t, u, 0]
                            }
                        }
                    }
                    if (t < 6) {
                        if (The_grid[t][u] % 7 == The_grid[t + 1][u] % 7) {
                            if (The_grid[t][u] % 7 == The_grid[t + 2][u] % 7) {
                                return [t, u, 1]
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
let matchColor = 0
let lengthofmatch = 0
let clone: number[][] = []
let gemAlgoReturn = 0
let didGrav = false
let savedGrid: number[][] = []
let temp = 0
let dupedgrid: number[][] = []
let didGravII = false
let fated = false
let gemlist: Image[] = []
let tries = 0
let latestmatchedcall = false
let matchloc: number[] = []
let truecursorpos: number[] = []
let mySprite: Sprite = null
let The_grid: number[][] = []
let fate: number[] = []
namespace userconfig { export const ARCADE_SCREEN_WIDTH = 176; export const ARCADE_SCREEN_HEIGHT = 128; }
fate = [0]
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
