const suits = ['♠', '♥', '♣', '♦' ]
const values = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q','K']
const compSlot = document.querySelector('.computer-card-slot')
const compCardsLeft = document.querySelector('.computer-deck')
const playerCardsLeft = document.querySelector('.player-deck')
const playerSlot = document.querySelector('.player-card-slot')
const text = document.querySelector('.text')
const button = document.querySelector('.draw')
let playerDeck
let computerDeck
let round //boolean
const cardValue = {
    '2' : 2, '3' : 3, '4' : 4, '5' : 5, '6' : 6, '7' : 7, '8' : 8, '9' : 9, '10' : 10, 'J' : 11, 'Q' : 12, 'K' : 13, 'A' : 14

}

// Create Deck 
  class Deck {
    constructor(cards = fullDeck()) {
        this.cards = cards
    }

    get totalCards() {
        return this.cards.length
    }

    pop() {
        return this.cards.shift()
    }

    push(card) {
        this.cards.push(card)
    }

    shuffle() {
        this.cards.sort((a, b) => 0.5 - Math.random())

        }

       
    }

//Create Cards
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value 
    }
    get color() {
        return this.suit === '♥' || this.suit === '♦' ? 'red' : 'black'
    }

    addToPage() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add('card', this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv

    }
}


//Creates all cards for Deck 
function fullDeck () {
     return suits.flatMap (suit => {
         return values.map (value =>{
            return new Card (suit, value)

    
        })
     })
}


// 'draw' button 
button.addEventListener('click', () => {
    if(stop) {
        newGame()
        return
    }
    
    else if(round) {
        newCard()
    }
    else { nextCard()}

})






//start the Game
const newGame = () => {
    const deck = new Deck()
    deck.shuffle()
    

    const splitDeck = deck.totalCards / 2
    playerDeck = new Deck(deck.cards.slice(0, splitDeck))
    computerDeck = new Deck(deck.cards.slice(26, deck.totalCards))
    round = false
    stop = false


        newCard()
}


//flips cards 
const nextCard = () => { 
    round = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    playerSlot.appendChild(playerCard.addToPage())
    compSlot.appendChild(computerCard.addToPage())

    updateDeckCount()

    if (roundWinner(playerCard, computerCard)) {
        text.innerText = 'You Win'
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)

    }
    else if  (roundWinner(computerCard, playerCard)) {
            text.innerText = 'You Lose'
            computerDeck.push(playerCard)
            computerDeck.push(computerCard)
    }
    else { 
             text.innerText = 'Draw'
            playerDeck.push(playerCard)
            computerDeck.push(computerCard)
    }

if (roundResults(playerDeck)){
    text.innerText = 'YOU LOSE'
    stop = true 
}
else if (roundResults(computerDeck)){
    text.innerText = 'YOU WIN'
    stop = true 
}

finishGame()


}


const newCard = () => { 
    round = false
    compSlot.innerHTML = ''
    playerSlot.innerHTML = ''
    text.innerText = ''

    updateDeckCount ()
}

const updateDeckCount = () => {
    compCardsLeft.innerText = computerDeck.totalCards
    playerCardsLeft.innerText = playerDeck.totalCards
}

const roundWinner = (cardOne, cardTwo) => {
    return cardValue[cardOne.value] > cardValue[cardTwo.value]
}

const roundResults = (deck) => {
    return deck.totalCards === 0 
    
}

const finishGame = () => {
    if (playerDeck === '0' ) {
        console.alert('YOU LOST THE GAME ')
        newGame()
    }
    else if (computerDeck === '0') {
        console.alert('YOU WON THE GAME')
        newGame()
    }
}

newGame()


