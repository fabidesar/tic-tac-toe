const jogodavelha = {

    // ATTRIBUT

    board: ['', '', '', '', '', '', '', '', ''],
    symbols: {
         options: ["X", "O"],
         turnIndex: 0,
         change(){
            this.turnIndex = ( this.turnIndex === 0 ? 1:0 )
        }
    },
    containerElement: null,
    gameover: false,
    winnerSequence: [
          [0,1,2],
          [0,4,8],
          [0,3,6],
          [1,4,7],
          [2,5,8],
          [3,4,5],
          [6,7,8],
          [2,4,6]
    ],
    opponent: {
         options: ["friend", "machine"],
         index: 1
    },
    turn: false,
    bot: {
        index:1
    },

    // FUNCTIONS

    init(container){
        this.containerElement = container
    },
    makePlay(position) {
      if(this.gameover) return false
      if(this.board[position] === ""){
            this.board[position] = this.symbols.options[this.symbols.turnIndex]
            this.draw()
        let winnerIndex = this.checkwinnerSequence(this.symbols.options[this.symbols.turnIndex])
            if (winnerIndex >= 0){
                this.GameIsOver()
            } else if (this.checkTied()) {
                this.Tied()
            } else {
                this.symbols.change()
                if (this.opponent.index ==1 && this.symbols.turnIndex == 1){
                    setTimeout ( () => {
                    this.machinePlay(this.symbols.options[this.symbols.turnIndex])
                }, 220)
                }
            }
            return true
        }
    },

    draw(){
        let content = ''
        for (i in this.board) {
        content += `<div onclick="jogodavelha.makePlay(${i})" class="" id="id${i}">` + this.board[i] +   `</div>`
        }
        this.containerElement.innerHTML = content
    },

    checkTied() {
        for (i in this.board) {
            if (this.board[i] == '')
                return false
        }
        return true
    },

    Tied() {
        this.gameover = true
        console.log('Game Over')
        setTimeout ( () => {
            window.alert('Velha')
        }, 210)
    },

    GameIsOver() {
        this.gameover = true
        console.log('Game Over')
        setTimeout ( () => {
        window.alert('Acabou')
    }, 210)
    },


        checkwinnerSequence(symbols) {
            for (i in this.winnerSequence) {
                if (this.board[this.winnerSequence[i][0]] == symbols &&
                    this.board[this.winnerSequence[i][1]] == symbols &&
                    this.board[this.winnerSequence[i][2]] == symbols) {
                    this.currentWinner = symbols;
                    return i
                }
            }
            return -1
        },
  
    restart(){
            this.currentWinner == 'O' ? this.symbols.change() : this.currentWinner == '';
            this.currentWinner == '';
            this.board.fill('')
            this.draw()
            this.gameover = false
     },

     machinePlay() {
        if (this.machineStrategic(this.symbols.options[this.turnIndex === 0 ? 1 : 0]) > -1) {
            this.makePlay(this.machineStrategic(this.symbols.options[this.turnIndex === 0 ? 1 : 0]));    
        }
        else if (this.machineStrategic(this.symbols.options[this.symbols.turnIndex]) > -1) {
                this.makePlay(this.machineRandom(this.symbols.options[this.symbols.turnIndex]));    
        }
        else {
            this.makePlay(this.machineRandom());
        }
    },
    
    machineStrategic(symbol) {
        let score;
        for (i in this.winnerSequence) {
            score = 0;
            if (this.board[this.winnerSequence[i][0]] == symbol)
                score++;
            if (this.board[this.winnerSequence[i][1]] == symbol)
                score++;
            if (this.board[this.winnerSequence[i][2]] == symbol)
                score++;
            if (score == 2) {
                if (this.board[this.winnerSequence[i][0]] == '') {
                    return this.winnerSequence[i][0]
                }
                if (this.board[this.winnerSequence[i][1]] == '') {
                    return this.winnerSequence[i][1]
                }
                if (this.board[this.winnerSequence[i][2]] == '') {
                    return this.winnerSequence[i][2]
                }
            }
        }
        return -1;
    },
    
    machineRandom() {
        let position
        do {
            position = Math.floor(Math.random() * 10 )
        }
        while (this.board[position] != '')
        return position    
    }
}
