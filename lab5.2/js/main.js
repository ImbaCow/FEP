var NUMBER_OF_VIEWABLE_FILMS = 4;
var POP_STEPS = 100;
var POP_TIME = 500;

window.onload = onWindowLoaded;

function onWindowLoaded() {

	addListener("email_link", "click", onEmailOpen);
 	addListener("email_container", "click", onEmailClose);

	addListener("form_container", "submit", onFormSubmit);
	onRequiredFocus();

	hideExtraFilms();
	addListener("all_films_button", "click", unhideExtraFilms);
}


function findFirstElementByClass(className) {
	var collection = document.body.getElementsByClassName(className);
	return (collection.length) ? collection[0] : null;
}

function addListener(className, eventName, func) {
	var el = findFirstElementByClass(className);
	if (el) {
		el.addEventListener(eventName, func);
	};
}

function onEmailOpen() {
		findFirstElementByClass("email_container").style.display = "block";
		document.body.style.overflowY = "hidden";
}

function onEmailClose() {
	var requiredBlocks = document.body.getElementsByClassName("required");
	if((event.target == findFirstElementByClass("email_container")) || (event.target == findFirstElementByClass("form_exit"))) {
		findFirstElementByClass("email_container").style.display = null;
		document.body.style.overflowY = null;
		for(i = 0; i < requiredBlocks.length; i++) {
			requiredBlocks[i].style.border = null;
		};
	};
}

function onFormSubmit() {
	var requiredBlocks = document.body.getElementsByClassName("required");
		for(i = 0; i < requiredBlocks.length; i++) {
			if (requiredBlocks[i].value == "") {
	  			event.preventDefault();
				requiredBlocks[i].style.border	= "2px solid #f12323";
			};
		};
}

function onRequiredFocus() {
	var requiredBlocks = document.body.getElementsByClassName("required");
	for(i = 0; i < requiredBlocks.length; i++) {
		requiredBlocks[i].addEventListener("focus", function() {
			event.target.style.border = null;
		});
	};	
}

function hideExtraFilms() {
	var films = findFirstElementByClass('films');

	if (films) {
		films = films.getElementsByTagName("div");
		for(i = NUMBER_OF_VIEWABLE_FILMS; i < films.length; i++) {
			films[i].style.display = "none";
			films[i].style.opacity = "0";
		};
	};

	if (findFirstElementByClass("all_films_button")) {
		findFirstElementByClass("all_films_button").style.display = "block";
	};
}

function unhideExtraFilms() {
	if (findFirstElementByClass("all_films_button")) {
		findFirstElementByClass("all_films_button").style.display = null;
	};	

	var films = findFirstElementByClass('films');

	if (films) {
		films = films.getElementsByTagName("div");
		var blockPop = setInterval(function() {
		
			for(i = NUMBER_OF_VIEWABLE_FILMS; i < films.length; i++) {

				films[i].style.display = null;
				films[i].style.opacity = +films[i].style.opacity + (1 / POP_STEPS);

				if(films[i].style.opacity >= 1) {
					clearInterval(blockPop);
				};
			};
		}, (POP_TIME / POP_STEPS));
	};
}