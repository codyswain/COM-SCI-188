// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
	var country_capital_pairs = pairs

	function new_question(){
		document.getElementById("pr2__answer").value = '';

		// Choose random country:capital pair
		var rand = country_capital_pairs[Math.floor(Math.random() * country_capital_pairs.length)];
		country = rand["country"];
		capital = rand["capital"];

		// Print new country and print answer to javascript log 
		document.getElementById("pr2__question").innerHTML = country;
		console.log(`The Capital is ${capital}`);
	}

	function evaluate_append(){
			var answer = ''
			if (capital == user_answer){
				row_type = "<tr class=\"correct\">";
	 			answer = "Correct"
	 		} else {
	 			answer = "Incorrect"
	 			row_type = "<tr class=\"incorrect\">";
	 		}
			var markup = row_type + "<td>" + country + "</td><td>" + capital + "</td><td>" + answer + "</td></tr>";
			$("#capitals_game_table tbody tr:first").after(markup);
		};

	// Page refresh
	window.onload = function(){
		new_question();
	}

	// "Submit button"
  	document.getElementById("pr2__submit").onclick = function(){
 		user_answer = document.getElementById("pr2__answer").value;
 		console.log(`User's answer is ${user_answer}`);
 		if (capital == user_answer){
 			console.log("Correct")
 		} else {
 			console.log("Incorrect")
 		}
 		evaluate_append()
 		new_question()

 
  }
});