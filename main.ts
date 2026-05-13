namespace SpriteKind {
    export const Cursor = SpriteKind.create()
    export const ScoreNumber = SpriteKind.create()
}
function BOOM (boomx: number, boomy: number, protectedNewlyspawnedX: number, protectedNewlyspawnedY: number) {
    for (let index = 0; index <= 2; index++) {
        for (let index2 = 0; index2 <= 2; index2++) {
            deleteX = Math.constrain(boomx + (index - 1), 0, 7)
            deleteY = Math.constrain(boomy + (index2 - 1), 0, 7)
            if (!(deleteX == protectedNewlyspawnedX && deleteY == protectedNewlyspawnedY)) {
                if (deleteX != boomx || deleteY != boomy) {
                    if (The_grid[deleteX][deleteY] > 7) {
                        if (The_grid[deleteX][deleteY] < 15) {
                            BOOM(deleteX, deleteY, -1, -1)
                        }
                    }
                }
                The_grid[deleteX][deleteY] = 0
            }
        }
    }
    updateBoard()
    queuedpause = true
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.down.isPressed()) {
        sco_re = game.askForNumber("enter score", 10)
    }
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
                for (let index22 = 0; index22 <= 7; index22++) {
                    if (dupedgrid[0][index22] == 0) {
                        temp = randint(1, 7)
                        fate.push(temp)
                        if (fate.indexOf(temp) < 0) {
                            fate.push(temp)
                        }
                        dupedgrid[0][index22] = fate[fate.length - 1]
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
            }
            for (let index32 = 0; index32 <= 7; index32++) {
                for (let o = 0; o <= 7; o++) {
                    if (dupedgrid[o][index32] == 0) {
                        fate.push(randint(1, 7))
                        console.log("bandaid fix proc'd")
                        dupedgrid[o][index32] = fate[fate.length - 1]
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
        	
        } else {
            console.log(":)")
            return fate.shift()
        }
        return 0
    } else {
        if (!(fate[0] > 0)) {
            fate.shift()
        }
        if (!(fate[0] > 0)) {
        	
        } else {
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
    for (let index222 = 0; index222 <= array.length - 1; index222++) {
        if (index222 == 0) {
            clone[index222] = []
        } else {
            clone.push([])
        }
        for (let q = 0; q <= array[index222].length - 1; q++) {
            if (clone[index222].length - 1 < array[index222].length - 1) {
                clone[index222].push(array[index222][q])
            } else {
                clone[index222][q] = array[index222][q]
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
            if (The_grid[identifiedMatch[0]][identifiedMatch[1]] % 7 == The_grid[identifiedMatch[0]][lengthofmatch + identifiedMatch[1]] % 7) {
                lengthofmatch += 1
                console.log("+1")
            } else {
                break;
            }
        }
    } else {
        while (lengthofmatch + identifiedMatch[0] < 8) {
            if (The_grid[identifiedMatch[0]][identifiedMatch[1]] % 7 == The_grid[lengthofmatch + identifiedMatch[0]][identifiedMatch[1]] % 7) {
                lengthofmatch += 1
                console.log("+1")
            } else {
                break;
            }
        }
    }
    matchColor = The_grid[identifiedMatch[0]][0 + identifiedMatch[1]]
    protectloc = [-1, -1]
    if (identifiedMatch[2] == 0) {
        while (matchColor > 7) {
            matchColor += -7
        }
        for (let index2222 = 0; index2222 <= lengthofmatch - 1; index2222++) {
            if (The_grid[identifiedMatch[0]][index2222 + identifiedMatch[1]] > 7 && The_grid[identifiedMatch[0]][index2222 + identifiedMatch[1]] <= 14) {
                BOOM(identifiedMatch[0], index2222 + identifiedMatch[1], protectloc[0], protectloc[1])
            }
            if (index2222 == 2 && lengthofmatch == 4) {
                The_grid[identifiedMatch[0]][index2222 + identifiedMatch[1]] = matchColor + 7
                protectloc = [identifiedMatch[0], index2222 + identifiedMatch[1]]
            } else {
                The_grid[identifiedMatch[0]][index2222 + identifiedMatch[1]] = 0
            }
        }
    } else {
        for (let index23 = 0; index23 <= lengthofmatch - 1; index23++) {
            console.log(The_grid[index23 + identifiedMatch[0]][identifiedMatch[1]])
            if (The_grid[index23 + identifiedMatch[0]][identifiedMatch[1]] > 7 && The_grid[index23 + identifiedMatch[0]][identifiedMatch[1]] <= 14) {
                BOOM(index23 + identifiedMatch[0], identifiedMatch[1], protectloc[0], protectloc[1])
            }
            if (index23 == 2 && lengthofmatch == 4) {
                The_grid[index23 + identifiedMatch[0]][identifiedMatch[1]] = matchColor + 7
                protectloc = [index23 + identifiedMatch[0], identifiedMatch[1]]
            } else {
                The_grid[index23 + identifiedMatch[0]][identifiedMatch[1]] = 0
            }
        }
    }
    sco_re += 100
    updateBoard()
    if (queuedpause) {
        queuedpause = false
        pause(100)
    }
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
let scoreNums: number[] = []
let yoffset = 0
let xoffset = 0
let list_score: number[] = []
let cba: number[] = []
let protectloc: number[] = []
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
let sco_re = 0
let queuedpause = false
let deleteY = 0
let deleteX = 0
let mySprite: Sprite = null
let The_grid: number[][] = []
let fate: number[] = []
let truecursorpos: number[] = []
truecursorpos = [0, 0]
namespace userconfig { export const ARCADE_SCREEN_WIDTH = 176; export const ARCADE_SCREEN_HEIGHT = 128; }
let nums = [
assets.image`myImage7`,
assets.image`haha one`,
assets.image`myImage`,
assets.image`myImage0`,
assets.image`myImage1`,
assets.image`myImage2`,
assets.image`myImage3`,
assets.image`myImage4`,
assets.image`myImage5`,
assets.image`myImage6`
]
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
game.onUpdate(function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.ScoreNumber)
    list_score = []
    temp = sco_re
    while (temp != 0) {
        list_score.unshift(temp % 10)
        temp = temp / 10
        temp = temp - temp % 1
    }
    if (list_score.length == 0) {
        list_score.unshift(0)
    }
    xoffset = 2
    yoffset = 5
    scoreNums = []
    for (let value of list_score) {
        if (value == 1) {
            xoffset += -1
        }
        sprites.create(nums[value], SpriteKind.ScoreNumber).setPosition(xoffset, yoffset)
        if (value != 1) {
            xoffset += 1
        }
        xoffset += 3
    }
    for (let value2 of sprites.allOfKind(SpriteKind.ScoreNumber)) {
        value2.x += (48 - xoffset) / 2 + 2
    }
})
