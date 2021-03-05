let area = document.getElementById('area')
let cells = document.getElementsByClassName('cell') // yacheika
let whoWins = document.getElementById('whoWins')
let currentPlayer = document.getElementById('currentPl')
let roundHistory = []
let player = 'X'

let stat = {
    'X': 0,
    'O': 0,
    'D': 0
} // statisticanyn object shablonu

let winCombination = [ // utuu kombinaciyalary
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

for (let i = 1; i <= 9; i++) {
    area.innerHTML += `<div class="cell" pos="${i}"></div>`
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellOnclick)
}

function cellOnclick() {
    let data = []

    if (!this.innerHTML) {  // yacheikany teksherebiz
        this.innerHTML = player
    } else {
        alert('already occupied!')
        return;
    }

    for (let i in cells) {
        if (cells[i].innerHTML == player) {
            data.push(parseInt(cells[i].getAttribute('pos')))
        }
    }

    if (checkWinner(data)) {
        stat[player] += 1
        whoWins.innerHTML = 'Win ' + [player]
        roundHistory.push(whoWins.innerHTML)
        refresh()
    } else {
        let draw = true 
        for (let i in cells) {
            if (cells[i].innerHTML == '') draw = false;
        }

        if (draw) {
            stat.D += 1
            refresh()
            whoWins.innerHTML = 'Draw'
            roundHistory.push(whoWins.innerHTML)
        }
    }

    player = player === "X" ? "O" : "X"
    currentPlayer.innerHTML = player.toLocaleLowerCase()
}

function checkWinner(data) {
    for (let i in winCombination) {
        let win = true;
        for (let j in winCombination[i]) {
            let id = winCombination[i][j];
            let ind = data.indexOf(id)

            if(ind === -1) {
                win = false
            }
        }
        if (win) return true
    }
    return false
}

function refresh() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ''
    }
    updateStat()
    updateRoundHistory()
}

function updateStat() {
    document.getElementById('sX').innerHTML = stat.X
    document.getElementById('sO').innerHTML = stat.O
    document.getElementById('sD').innerHTML = stat.D
}

function updateRoundHistory() {
    document.getElementById('roundHistory').innerHTML = roundHistory
}