
function nowrapSlider() {
	addCss();
	document.querySelectorAll(".nowrap-slider").forEach(function(element, index){

		if (element.children.length > 1) {
			var inside_wapper = document.createElement("div");
			var children = element.children;
			for (var i = children.length - 1; i >= 0; i--) {
				var child = children[i];
				inside_wapper.append(child);
			}
			element.append(inside_wapper);
		}
		
		element.firstElementChild.classList.add('ns-slider-contents');

		if (element.scrollWidth > element.offsetWidth ) {

			element.firstElementChild.style.overflow = 'hidden';

			var prevbtnwraper = document.createElement("div");
			prevbtnwraper.className = "ns-col-prev";
			var nextbtnwraper = document.createElement("div");
			nextbtnwraper.className = "ns-col-next";
			var prevbtn = document.createElement("button");
			var nextbtn = document.createElement("button");
			prevbtn.className = "ns-prev";
			nextbtn.className = "ns-next";
			var chevron_left = '<svg viewBox="0 0 24 24" height="36px" width="36px"><g><path d="M15.41 7.41l-1.41-1.41-6 6 6 6 1.41-1.41-4.58-4.59z"></path></g></svg>';
			var chevron_right = '<svg viewBox="0 0 24 24" height="36px" width="36px"><g><path d="M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z"></path></g></svg>';
			prevbtn.innerHTML = "<span class='icon'>"+chevron_left+"</span>";
			nextbtn.innerHTML = "<span class='icon'>"+chevron_right+"</span>";
			prevbtnwraper.append(prevbtn);
			nextbtnwraper.append(nextbtn);
			element.prepend(prevbtnwraper);
			element.append(nextbtnwraper);

			element.firstElementChild.classList.add("ns-hidden");

			element.querySelector(".ns-next").addEventListener("click", function (evt) {
				scrollRight(this.parentElement.previousElementSibling);
				element.querySelector(".ns-prev").parentElement.classList.remove("ns-hidden");
			},false);

			element.querySelector(".ns-prev").addEventListener("click", function (evt) {
				scrollLeft(this.parentElement.nextElementSibling);
				element.querySelector(".ns-next").parentElement.classList.remove("ns-hidden");
				updateScroll(element);
			},false);
			
			createScroll(element);
		}
	});
}


function scrollRight(ele) {
	animateScrollRight(ele , ele.scrollLeft+ele.offsetWidth);
}

function animateScrollRight(ele,station,bypxl = 0) {
	if (ele.scrollLeft+ele.offsetWidth >= ele.scrollWidth) {
		return true;
	}
	setTimeout(function() {
		ele.scrollLeft += bypxl;
		distance = station-ele.scrollLeft;
		bypxl = distance/8;
		if (bypxl < 1)
			bypxl = 1;
		if ((ele.scrollLeft < station) && (ele.scrollLeft+ele.offsetWidth < ele.scrollWidth)) {
			animateScrollRight(ele , station , bypxl);
		}else{
			if (ele.scrollLeft+ele.offsetWidth >= ele.scrollWidth) {
				ele.nextElementSibling.classList.add("ns-hidden");
				ele.previousElementSibling.classList.remove("ns-hidden");
				animateScrollRight(ele , ele.scrollWidth , bypxl);
			}
		}
		updateScroll(ele);
	}, 10);
}


function scrollLeft(ele) {
	animateScrollLeft(ele , ele.scrollLeft-ele.offsetWidth);
}

function animateScrollLeft(ele,station,bypxl = 0) {
	if (ele.scrollLeft <= 0) {
		return true;
	}
	setTimeout(function() {
		ele.scrollLeft -= bypxl;
		distance = ele.scrollLeft-station;
		bypxl = distance/8;
		if (bypxl < 1)
			bypxl = 1;
		if ((ele.scrollLeft > station) && (ele.scrollLeft > 0)) {
			animateScrollLeft(ele , station , bypxl);
		}else{
			if (ele.scrollLeft-ele.previousElementSibling.offsetWidth <= 0) {
				ele.previousElementSibling.classList.add("ns-hidden");
				ele.nextElementSibling.classList.remove("ns-hidden");
				animateScrollLeft(ele , 0 , bypxl);
			}
		}
		updateScroll(ele);
	}, 10);
}

function createScroll(element) {
	var scrollbar = document.createElement("div");
	scrollbar.className = "ns-scrollbar";
	var rail = document.createElement("div");
	var way = document.createElement("div");
	rail.className = "ns-rail";
	way.className = "ns-way";
	way.append(rail);
	scrollbar.append(way);
	element.append(scrollbar);
	// way.style.width = element.firstElementChild.nextElementSibling.offsetWidth + "px";
	rail.style.width = (element.offsetWidth/element.firstElementChild.nextElementSibling.scrollWidth) * way.offsetWidth + "px";
}

function updateScroll(element) {
	var slider = element.parentElement;
	var move = (element.scrollLeft/element.scrollWidth) * slider.querySelector(".ns-way").offsetWidth;
	var max_move = slider.querySelector(".ns-way").offsetWidth - slider.querySelector(".ns-rail").offsetWidth;
	(move>max_move) ? move = max_move : move = move;
	slider.querySelector(".ns-rail").style.marginLeft = move + "px";
}

function addCss() {
	var css = ' .nowrap-slider{white-space:nowrap;overflow:hidden;display:flex;vertical-align:middle;align-items:center;position:relative;} .nowrap-slider .ns-slider-contents > *{display: inline-block;white-space:normal;} .nowrap-slider .ns-prev , .nowrap-slider .ns-next {background: none; border: none; outline: none; cursor: pointer;} .nowrap-slider .ns-scrollbar{position:absolute;bottom:0;width:100%;} .nowrap-slider .ns-scrollbar .ns-way{display:block;width:100%;height:3px;margin:auto;overflow:hidden;} .nowrap-slider .ns-scrollbar .ns-rail{background-color:rgba(0,0,0,0.2);width:100px;height:100%;} .nowrap-slider .ns-hidden{visibility:hidden!important;display:none!important;} ';
	var style = document.createElement("style");
	style.innerHTML = css;
	document.head.append(style);
}
