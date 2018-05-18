// an array to store the class names of the cards 
let openCards = [];
// an array to manipulate the cards on the HTML after action
let currentElements = [];

// Create a list that holds all of your cards
let cardConfig = [
'fa fa-diamond',
'fa fa-diamond',
'fa fa-paper-plane-o',
'fa fa-paper-plane-o',
'fa fa-anchor',
'fa fa-anchor',
'fa fa-bolt',
'fa fa-bolt',
'fa fa-cube',
'fa fa-cube',
'fa fa-leaf',
'fa fa-leaf'];

// - shuffle the list of cards using the provided "shuffle" method below
let newCardConfig = shuffle(cardConfig);
// create elements and document fragment for performance
const deckClass = document.querySelector('.deck');
const fragment = document.createDocumentFragment();

// Display the cards on the page
// iterate through shuffled card list and add them to the document fragment
newCardConfig.forEach(function(card) {
	let iElement = document.createElement('i');
	iElement.setAttribute('class', card);
	const liElement = document.createElement('li');
	liElement.setAttribute('class', 'card');
	liElement.appendChild(iElement);
	deckClass.appendChild(liElement);
	// append elements in loop to a fragment doc for performace
	fragment.appendChild(deckClass);
});
// append ALL li elements after the loop
document.body.appendChild(fragment);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function moveCounter() {

}

function matchCheck() {
	// if the list already has another card, check to see if the two cards match
	if (openCards.length === 2) {
	 	if(openCards[0] === openCards[1]) {
	 		for (let i = 0; i <= currentElements.length; i++) {
	 			let currentIndex = currentElements[i];
	 			currentIndex.className += ' match';
	 		}
	 		// empty array when done checking two cards
	 		currentElements = [];
	 	} else {
	 		for (let i = 0; i <= currentElements.length; i++) {
	 			let currentIndex = currentElements[i];
	 			currentIndex.className += ' mismatch';
	 		}
	 		currentElements = [];
	 		console.log(currentElements.length);
	 	}
	} 
}

// * set up the event listener for a card. If a card is clicked:
let deckClassElements = document.getElementsByClassName('card');
Array.from(deckClassElements).forEach(function(element) {
	element.addEventListener('click', function whenClicked() {
		// displays number of moves player has made
		moveCounter();
		// display the card's symbol 
		element.classList.add('open');
		element.classList.add('show');
		// add the card to a *list* of "open" cards
		openCards.push(element.querySelector('i').className);
		currentElements.push(element);
		matchCheck();
			
	});

});
 // 	
 // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 // *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 // *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 // *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 // *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 
