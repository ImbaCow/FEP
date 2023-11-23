var NUMBER_OF_VIEWABLE_FILMS = 4;
var POP_STEPS = 100;
var POP_TIME = 500;

window.onload = onWindowLoaded;

function onWindowLoaded() {

	addListener("email_link", "click", onEmailOpen);
 	addListener("email_container", "click", onEmailClose);

	$(".email_container .form_container").submit(onEmailSubmit);
	onRequiredFocus();

	hideExtraFilms();
	addListener("all_films_button", "click", unhideExtraFilms);

	scrollToHref();

	$(".header .hamburger_button").click(onHumburgerClick);
	$(".links a").click(closeMenu);

	$(".links .new_film").click(onNewFilmOpen);
	$(".new_film_container").click(onNewFilmClose);
	$(".new_film_container .form_container").submit(onFilmSubmit);
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
}

function onEmailClose() {
	var requiredBlocks = $(".email_container .required");
	if((event.target == findFirstElementByClass("email_container")) || ($(event.target).hasClass("form_exit"))) {
		findFirstElementByClass("email_container").style.display = null;
		for(i = 0; i < requiredBlocks.length; i++) {
			requiredBlocks[i].style.border = null;
		};
	};
}

function onEmailSubmit() {
	var requiredBlocks = $(".email_container .required");
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

function scrollToHref() {
	if ($(document).width() > 1024) {
		$('.smooth-scroll').smoothScroll({
		    speed: 1000
		});
	} else {
		var topOffset = -1 * $(".header .links").css("height") / 2;
		$('.smooth-scroll').smoothScroll({
			    speed: 1000,
			    beforeScroll: closeMenu
		});
	}
}

function onHumburgerClick() {
 	if ($(".header .links").hasClass("closed")) {
		revealMenu();
 	} else {
 		hideMenu();
 	}
}

function revealMenu() {
	$(".header .links").animate({height: screen.height - 50}, 300);
	$(".header .links").css("visibility", "visible");
	$("html").css("overflow", "hidden");
	$(".header .hamburger_button").css("background-image", "url(images/exit_img.png)");
	$(".header .links").removeClass("closed");
	$(".header .links").addClass("open"); 
}

function hideMenu() {
	$(".header .links").animate({height: 0}, 300);
	$(".header .links").css("visibility", "auto");
	$("html").css("overflow", "auto");
	$(".header .hamburger_button").css("background-image", "auto");
	$(".header .links").removeClass("open");
	$(".header .links").addClass("closed");
}

function closeMenu() {
	$(".header .links").css("height", "0");
	hideMenu();
}

function onNewFilmOpen() {
	$(".new_film_container").css("display", "block");
}

function onNewFilmClose() {
	if(($(event.target).hasClass("new_film_container")) || ($(event.target).hasClass("form_exit"))) {
		$(".new_film_container").css("display", "auto");
		$(".new_film_container .required").css("border", "auto");
	};
}

function onFilmSubmit() {
	event.preventDefault();
	var requiredBlocks = $(".new_film_container .required");
	var filmAddedFlag = true;
	for(i = 0; i < requiredBlocks.length; i++) {
		if (requiredBlocks[i].value == "") {
	  	filmAddedFlag = false;
			requiredBlocks[i].style.border	= "2px solid #f12323";
		};
	};
	if (filmAddedFlag) {
		addFilm();
	}
}

function addFilm() {
	var img_src = $("input.img_src").val();
	var film_name = $("input.film_name").val();
	var film_discr = $("textarea.film_discr").val();

	$(".favourite_films .films").append('<div class=\"added\"><img src=\"' + img_src + '\" alt=\"added_film\"><p class=\"favourite_films_tittle\">' + film_name + '</p><p class=\"favourite_films_text\">' + film_discr + '</p></div>');
	$(".new_film_container").css("display", "auto");

	if (($(".films div").length > 4) && ($(".films div")[4].style.display == "none")) {
		$(".added").css({"display" : "none", "opacity" : "0"});
	};
}