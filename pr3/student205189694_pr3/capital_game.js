// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {

	// Initialize Cloud Firestore through Firebase
	var db = firebase.firestore();

	// Disable deprecated features
	db.settings({
		timestampsInSnapshots: true
	})

	// Ajax html request to return country capital pairs
	$.ajax({
		type: "GET",
		url: "https://s3.ap-northeast-2.amazonaws.com/cs374\
		-csv/country_capital_pairs.csv",
		dataType: "text",
		async: false, //Synchronous
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


	var country_capital_pairs = window.pairs;
	country = ''
	capital = '' 

	// Create list of capitals for autocomplete
	capitals = [];
	for (var i=0; i<country_capital_pairs.length; i++){
		var c = country_capital_pairs[i]['capital'];
		capitals.push(c);}


	// Page refresh
	window.onload = function(){
		db.collection("rows").get().then(function(querySnapshot) {
		    querySnapshot.forEach(function(doc) {
		    	var firestore_id = doc.id;
			    var html_start_row = "<tr ";
		 		var html_docRef_id = "data-firestoreID=" + firestore_id + " ";
		 		var markup = html_start_row + html_docRef_id + String(doc.data()["row_markup"]);
		    	console.log(markup);
		        $("#capitals_game_table tbody tr:nth-child(2)").after(markup);
		    });
		});
		new_question();
	}

	// Input box autocomplete
	$("#pr2__answer").autocomplete({
	  source: capitals,
	  minLength: 2,
	  select: function( event, ui ) {
	  	evaluate_append();
	  	new_question();
	  	$(this).val(''); return false;
	  }
	});

	// "Submit button"
  	$("#pr2__submit").click(function(){
 		evaluate_append();
 		new_question();
 	});

  	// Delegated click handler for dynamically created row delete buttons
 	$("#capitals_game_table").on('click', '#remove', function() {
 		var doc_id = $(this).parent().parent().attr("data-firestoreID")
 		db.collection("rows").doc(doc_id).delete().then(function() {
		    console.log("Document successfully deleted!");
		}).catch(function(error) {
		    console.error("Error removing document: ", error);
		});
 		$(this).parent().parent().remove();
	});

	function new_question(){
		$("#pr2__answer").val("");
		$("#pr2__answer").focus();

		// Choose random country:capital pair
		var rand = country_capital_pairs[Math.floor(Math.random() * country_capital_pairs.length)];
		country = rand["country"];
		capital = rand["capital"];

		// Print new country and print answer to javascript log 
		document.getElementById("pr2__question").innerHTML = country;
		console.log(`The Capital is ${capital}`);
	}

	function evaluate_append(){
		user_answer = document.getElementById("pr2__answer").value;
		var answer = '';

		delete_button = '<button id="remove" type="button">Delete</button>';
		if (capital == user_answer){
			row_type = "class=\"correct\">";
			if ($("input[name='filter'][value='3']").length > 0){
				show_all()
				$("input[name='filter'][value='1']").prop("checked",true);
			}
			var html_row = row_type + "<td>" + country + "</td><td>" + user_answer + "</td><td>" + "<i class=\"fas fa-check\"></i>" + " " + delete_button + "</td></tr>";
 		} else {
 			row_type = "class=\"incorrect\">";
 			if ($("input[name='filter'][value='2']").length > 0){
				show_all()
				$("input[name='filter'][value='1']").prop("checked",true);
			}
 			var html_row = row_type + "<td>" + country + '</td><td class="crossed_out">' + user_answer + "</td><td>" + capital + " " + delete_button + "</td></tr>";
 		}

 		// Add markup to the firestore database
 		db.collection("rows").add({
	    	row_markup: html_row
		})
		.then(function(docRef) {
		    console.log("Document written with ID: ", docRef.id);
		    var firestore_id = docRef.id;
		    html_start_row = "<tr ";
	 		html_docRef_id = "data-firestoreID=" + firestore_id + " ";
	 		var markup = html_start_row + html_docRef_id + html_row;
	 		console.log(markup);
	 		
	 		attach_row(markup);
		})
		.catch(function(error) {
		    console.error("Error adding document: ", error);
		});

		function attach_row(markup){
			$("#capitals_game_table tbody tr:nth-child(2)").after(markup);
		}
	};

	function show_all(){
		$("#capitals_game_table tbody tr.incorrect").show();
		$("#capitals_game_table tbody tr.correct").show();
	}

	function hide_incorrect(){
		$("#capitals_game_table tbody tr.correct").show();
		$("#capitals_game_table tbody tr.incorrect").hide();
	}

	function hide_correct(){
		$("#capitals_game_table tbody tr.correct").hide();
		$("#capitals_game_table tbody tr.incorrect").show();
	}

	// Filter based off radio buttons
	$("input[type=radio]").change(function(){
    	if ($(this).val() == 1){
    		show_all();
    	}
    	if ($(this).val() == 2){
    		hide_incorrect();
    	}
    	if ($(this).val() == 3){
    		hide_correct();
    	}
    });

});