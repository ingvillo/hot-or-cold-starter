
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});

// START of Ingvill's JS modification journey

$(document).ready(function(){
	
	/*--- Variable Declarations ---*/
	var secretNumber;
	var guessFlag;
	var guessCount;
	var userChoice;
	var correctNumber = false;
	var newGuess;
    var oldGuess;
	

	/*--- Creating a new Game ---*/
	newGame();


	

	/*--- On Submit ---*/
	$("form").submit(function(event){
		
		event.preventDefault();
    	

		  /*--- Sets oldGuess to 0 only when undefined ie first run ---*/
		if(typeof oldGuess == "undefined"){
			oldGuess = 0;
			//alert(oldGuess);
		}
		else {
			oldGuess = newGuess;
		}

		alert(oldGuess);


    	if (!correctNumber) {
			userChoice = $('#userGuess').val();
			newGuess = userChoice;
			console.log("User Choice = "+ userChoice);
			clearText();
			setFocus();
			guessFlag = checkChoice(userChoice);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userChoice + "</li>");
				guessFlag = checkTemparature(Math.abs(secretNumber - userChoice));




				alert(oldGuess);
				if (oldGuess !== 0) {
					var oldDiff = Math.abs(secretNumber-oldGuess);
					var newDiff = Math.abs(secretNumber-newGuess);

					var setRealtiveFeedback = "";
						if (newDiff < oldDiff){
							setRealtiveFeedback = "Getting Warmer";
						}
						else if (newDiff == oldDiff){
				 			setRealtiveFeedback = "Try Again";
						}
						else {
							setRealtiveFeedback = "Getting Colder";
						}
					$('#relativeFeedback').text(setRealtiveFeedback);	
				};

			};

		} else {
			setFeedback("Please start a new game.");
		};


  	});


  	/*--- Creat new game on click ---*/
  	$(".new").click(function(event){
  		event.preventDefault();
  		newGame();
  	});

	/*--- Create a New Game! ---*/
	function newGame() {
		guessFlag = true;
		guessCount = 0;
		correctNumber = false;
		$("ul#guessList li").remove();
		setFeedback("Make your guess!");
		setCount(guessCount);
		secretNumber = generateNumber();
		setFocus();
		clearText();
	}

	/*--- Generate Random Number ---*/
	function generateNumber() {

		var generatedNumber = Math.floor((Math.random()*100)+1);
		console.log("Generated Random Number = "+ generatedNumber);

		return generatedNumber;
	}
	
	/*--- Set focus to the inputbox ---*/
	function setFocus() {
		document.getElementById("userGuess").focus();
	}

	/*--- Clear the text box ---*/
	function clearText() {
		$('#userGuess').val('');
	}

	/*--- Set the guess count ---*/
	function setCount(count) {
		$('#count').text(guessCount);
	}

	/*--- Prompt for User's Guess ---*/
	function getChoice() {
		var userChoice = prompt("Guess the Number","Your Guess");
		console.log("User Choice = "+ userChoice);
		return userChoice;
	}

	/*--- Check if the User's Guess meets the rules---*/
	function checkChoice(userChoice) {
		if (isNaN(userChoice)) {
			setFeedback("No luck! I accept only numbers.");
			return true;
		} else if (userChoice <= 1 || userChoice >= 100) {
			setFeedback("Oops! Your guess has to be a number between 1 and 100!");
			return true;
		}else if ($.trim(userChoice) == '') {
			setFeedback("Please enter your guess!");
			return true;
		} else {
			return false;
		};
	}

	/*--- Check the temparature for feedback ---*/
	function checkTemparature(guessDifference) {

		if (guessDifference === 0) {
			setFeedback("Yay! You guessed it!");
			correctNumber = true;
			return false;
		} else if (guessDifference <= 5) {
			setFeedback("You're streaming hot!");
			return true;
		} else if (guessDifference <= 10){
			setFeedback("You're getting hot!");
			return true;
		} else if (guessDifference <= 20) {
			setFeedback("You're getting warm!");
			return true;
		} else if (guessDifference <= 30) {
			setFeedback("You're getting cold!");
			return true;
		} else if (guessDifference <= 50) {
			setFeedback("You're getting icy!");
			return true;
		} else {
			setFeedback("You're freezing cold!");
			return true;
		}

	}


	
	/*--- Set the feedback ---*/
	function setFeedback(feedback) {
		$('#feedback').text(feedback);

	}
	


});