
/*
 * Create a list that holds all of your cards
 */
const cardArray = [
	'<i class = "fa fa-diamond"></i>',
	'<i class = "fa fa-diamond"></i>',
	'<i class = "fa fa-paper-plane-o"></i>',
	'<i class = "fa fa-paper-plane-o"></i>',
	'<i class = "fa fa-anchor"></i>',
	'<i class = "fa fa-anchor"></i>',
	'<i class = "fa fa-bolt"></i>',
	'<i class = "fa fa-bolt"></i>',
	'<i class = "fa fa-cube"></i>',
	'<i class = "fa fa-cube"></i>',
	'<i class = "fa fa-leaf"></i>',
	'<i class = "fa fa-leaf"></i>',
	'<i class = "fa fa-bicycle"></i>',
	'<i class = "fa fa-bicycle"></i>',
	'<i class = "fa fa-bomb"></i>',
	'<i class = "fa fa-bomb"></i>'
];

/*
 * Display the cards on the page
 *   + shuffle the list of cards using the provided "shuffle" method below
 *   + loop through each card and create its HTML
 *   + add each card's HTML to the page
 */
function display() {
	const fragment = document.createDocumentFragment();

	shuffledCardArray = shuffle(cardArray);
	shuffledCardArray.forEach(function(element) {
		let liElement = document.createElement('li');
		liElement.setAttribute('class', 'card');
		liElement.insertAdjacentHTML('afterbegin', element);
		fragment.appendChild(liElement);
	});
	document.querySelector('.deck').appendChild(fragment);
}

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

// display cards on page in random order.
display();

//initialize empty open card list
let openCards = [];

function incrementSeconds() {
	seconds += 1;
	timeElement.innerText = seconds;
}

function cardActions(card) {
	// prevent function from adding two classes over and over again 
	if (!(card.classList.contains('open'))) {
		// display the card's symbol 
		card.className += ' open';
		card.className += ' show';
		// add card to list of open cards
		openCards.push(card);
		if(openCards.length === 2) {
			if(openCards[0].innerHTML === openCards[1].innerHTML) {
				// play pair sound
				pairSound.play();

				// add the match class
				Array.from(openCards).forEach(function(card){
					card.className += ' match';
				});

				// empty open cards
				openCards = [];

				// add one to cards matched
				cardsMatched++;
				if (cardsMatched === 8) {
					alert('You won the game in ' + seconds + ' seconds!');
					alert('You finished in ' + moveCount + ' moves!');
					alert('That means you earned ' + starCnt + ' star(s)!');
					timeElement.innerText = 0;
					let playAgain = prompt('Want to play again? (Y/N)');

					if (playAgain === 'Y') {
						location.reload();
					} 
					else if (playAgain === 'N') {
						alert('Thank you for playing!');
					} else {
						alert('Dont know what you said...');
						location.reload();
					}
				}
			} else {
				// play fail sound
				noPairSound.play();

				Array.from(openCards).forEach(function(card) {
					// add the mismatch class
					card.className += ' mismatch';
				});

				// flip cards around
				Array.from(openCards).forEach(function(card) {
					window.setTimeout(() => {
						card.classList.remove('mismatch')
						card.classList.remove('open');
						card.classList.remove('show');
					}, 1200);
				});
				
				// empty open cards
				openCards = [];
			}
			// add one to the moves
			moveCount++;
			document.querySelector('.moves').innerHTML = moveCount;
			// take away a star
			const starClass = document.querySelector('.stars');
			if (moveCount === 15 || moveCount === 19){
				starClass.removeChild(starClass.children[0]);
				starCnt--;
			}
		}
	}
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  + display the card's symbol (put this functionality in another function that you call from this one)
 *  + add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  + if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 
// keep track of moves to show the user
let moveCount = 0;

// keep track of cards matched
let cardsMatched = 0;

// access pop sound affect
let popSound = new Audio('mp3/pop.mp3');

// sounds when user misses a pair or makes a pair 
let pairSound = new Audio('mp3/point.mp3');
let noPairSound = new Audio('mp3/nopoint.mp3');

// set up for timer
let seconds = 0;
const timeElement = document.querySelector('.timer');

// start timer
const start = setInterval(incrementSeconds, 1000);

// star count
let starCnt = 3;

// * set up the event listener for a card. If a card is clicked:
let cardElements = document.querySelector('.deck').querySelectorAll('.card');
Array.from(cardElements).forEach(function(element) {
	element.addEventListener('click', function() {
		popSound.play();
		cardActions(element);
		document.querySelector('.restart').addEventListener('click', function() {
			location.reload();
		});
	});
});
