// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {

	// Ajax html request to return country capital pairs
	$.ajax({
		type: "GET",
		url: "https://s3.ap-northeast-2.amazonaws.com/cs374\
		-csv/country_capital_pairs.csv",
		dataType: "text",
		success: function(result){
			window.pairs  = [];

			// Universal split on line return
			var rough_list = result.split(/\r?\n|\r/);

			// First element entries are column values 
			// (key values for row dicts)
			var key1 = rough_list[0].split(',')[0];
			var key2 = rough_list[0].split(',')[1];

			// Create row dicts; Append to pairs list
			for (var i = 1; i < rough_list.length; i++){
				var indiv_pair = rough_list[i].split(',');
				var row_dict = {};
				row_dict[key1] = indiv_pair[0];
				row_dict[key2] = indiv_pair[1];
				pairs.push(row_dict);
			}
		},
		error: function(){
			return "Error";
		}

	})



// 	var country_capital_pairs = window.pairs;
// 	country = ''
// 	capital = '' 

// 	// Page refredsh
// 	window.onload = function(){
// 		new_question();
// 	}

// 	// Create list of capitals for autocomplete
// 	capitals = [];
// 	for (var i=0; i<country_capital_pairs.length; i++){
// 		var c = country_capital_pairs[i]['capital'];
// 		capitals.push(c);}

// 	// Input box autocomplete
// 	$("#pr2__answer").autocomplete({
// 	  source: capitals,
// 	  minLength: 2,
// 	  select: function( event, ui ) {
// 	  	evaluate_append();
// 	  	new_question();
// 	  	$(this).val(''); return false;
// 	  }
// 	});

// 	// "Submit button"
//   	$("#pr2__submit").click(function(){
//  		evaluate_append();
//  		new_question();
//  	});

//   	// Delegated click handler for dynamically created row delete buttons
//  	$("#capitals_game_table").on('click', '#remove', function() {
//  		$(this).parent().parent().remove();
// 	});

// 	function new_question(){
// 		$("#pr2__answer").val("");
// 		$("#pr2__answer").focus();

// 		// Choose random country:capital pair
// 		var rand = country_capital_pairs[Math.floor(Math.random() * country_capital_pairs.length)];
// 		country = rand["country"];
// 		capital = rand["capital"];

// 		// Print new country and print answer to javascript log 
// 		document.getElementById("pr2__question").innerHTML = country;
// 		console.log(`The Capital is ${capital}`);
// 	}

// 	function evaluate_append(){
// 		user_answer = document.getElementById("pr2__answer").value;
// 		var answer = '';

// 		delete_button = '<button id="remove" type="button">Delete</button>';
// 		if (capital == user_answer){
// 			row_type = "<tr class=\"correct\">";
// 			if ($("input[name='filter'][value='3']").length > 0){
// 				show_all()
// 				$("input[name='filter'][value='1']").prop("checked",true);
// 			}

// 			var markup = row_type + "<td>" + country + "</td><td>" + user_answer + "</td><td>" + "<i class=\"fas fa-check\"></i>" + " " + delete_button + "</td></tr>";
//  		} else {
//  			row_type = "<tr class=\"incorrect\">";
//  			if ($("input[name='filter'][value='2']").length > 0){
// 				show_all()
// 				$("input[name='filter'][value='1']").prop("checked",true);
// 			}
//  			var markup = row_type + "<td>" + country + '</td><td class="crossed_out">' + user_answer + "</td><td>" + capital + " " + delete_button + "</td></tr>";
//  		}
// 		$("#capitals_game_table tbody tr:nth-child(2)").after(markup);
// 	};

// 	function show_all(){
// 		$("#capitals_game_table tbody tr.incorrect").show();
// 		$("#capitals_game_table tbody tr.correct").show();
// 	}

// 	function hide_incorrect(){
// 		$("#capitals_game_table tbody tr.correct").show();
// 		$("#capitals_game_table tbody tr.incorrect").hide();
// 	}

// 	function hide_correct(){
// 		$("#capitals_game_table tbody tr.correct").hide();
// 		$("#capitals_game_table tbody tr.incorrect").show();
// 	}

// 	// Filter based off radio buttons
// 	$("input[type=radio]").change(function(){
//     	if ($(this).val() == 1){
//     		show_all();
//     	}
//     	if ($(this).val() == 2){
//     		hide_incorrect();
//     	}
//     	if ($(this).val() == 3){
//     		hide_correct();
//     	}
//     });

});