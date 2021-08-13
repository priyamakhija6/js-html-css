/* Idea to build the carousel is to have
ul - carousel
next and previous buttons
nav - navigation dots

Most important part is 'how to position slides' so if there is change in number of slides, the JS doesn't have to
be changed.
To achieve this, we position the slides using getBoundClientRect() DOM method and selecting left of the returned object.

****The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.****
****This method returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height.******

On click of next button, it should move to the next slide, make the current slide's dot active and if it is the right
most image, it should also hide the next button.

On click of prev button, it should move to the prev slide, make the current slide's dot active and if it is the left
most image, it should also hide the prev button.

On click of dot, it should move the slide which is at 'clicked' dot's index, change the active/inactive dots(toggle),
and also if it is left/right most slide, it should hide the left/right arrow buttons.

 */

// SELECT CAROUSEL
const carousel = document.querySelector(".carousel");

// SELECT NEXT BUTTON
const nextButton = document.querySelector(".right-btn");

// SELECT LEFT BUTTON
const previousButton = document.querySelector(".left-btn");

// SELECT THE NAV
const nav = document.querySelector(".nav");

// SELECT ALL THE DOTS
const dots = [...nav.children];

// SELECT ALL THE SLIDES INSIDE THE CAROUSEL - Make array of <li> i.e. slides
const slides = [...carousel.children];

// CALCULATE THE SLIDE WIDTH
let slideWidth = slides[0].getBoundingClientRect().width;

// POSITION THE SLIDES HORIZONTALLY
function positionSlides(slides){
    for(let index = 0; index < slides.length; index++){
        slides[index].style.left = slideWidth * index + "px";
    }
}

positionSlides(slides);

// ON RIGHT BUTTON CLICK, WE MOVE(TranslateX) THE CAROUSEL TO THE LEFT
nextButton.addEventListener("click", function(){
    const currentSlide = carousel.querySelector(".active");
    const nextSlide = currentSlide.nextElementSibling;

    moveToSlide(carousel, currentSlide, nextSlide);
    hideButton(nextSlide, slides);
    moveToDot(nextSlide, slides, nav, dots);
});

// ON LEFT BUTTON CLICK, WE MOVE(TranslateX) THE CAROUSEL TO THE RIGHT
previousButton.addEventListener("click", function(){
    const currentSlide = carousel.querySelector(".active");
    const previousSlide = currentSlide.previousElementSibling;

    moveToSlide(carousel, currentSlide, previousSlide);
    hideButton(previousSlide, slides);
    moveToDot(previousSlide, slides, nav, dots);
});

// ON DOT CLICK
nav.addEventListener("click", function(e){

    // if we didn't click on a dot, we exit
    if(e.target === nav) return;

    // SELECT THE CLICKED DOT
    const targetDot = e.target;

    // SELECT THE CURRENT DOT
    const currentDot = nav.querySelector(".active");

    // SELECT THE CURRENT SLIDE
    const currentSlide = carousel.querySelector(".active");

    // find the index of the dot, so we can target the right slide
    let targetDotIndex = findIndex(targetDot, dots);

    // SELECT THE TARGET SLIDE
    const targetSlide = slides[targetDotIndex];

    moveToSlide(carousel, currentSlide, targetSlide);
    toggleActive(currentDot, targetDot);
    hideButton(targetSlide, slides);
})

// MOVE TO DOT
function moveToDot(targetSlide, slides, nav, dots){
    let slideIndex = findIndex(targetSlide, slides);
    const currentDot = nav.querySelector(".active");
    const targetDot = dots[slideIndex];
    toggleActive(currentDot, targetDot);
}
// MOVE TO SLIDE
function moveToSlide(carousel, currentSlide, targetSlide){
    const position = targetSlide.style.left;
    carousel.style.transform = `translateX(-${position})`;
    toggleActive(currentSlide, targetSlide);
}

// Toggle ACTIVE CLASS
function toggleActive(current, target){
    current.classList.remove("active");
    target.classList.add("active");
}

// HIDE BUTTON
function hideButton(targetSlide, slides){
    // If the target slide is the first slide the previous button must be hidden
    // and the next button must be shown
    if(targetSlide === slides[0]){
        previousButton.classList.add("hide");
        nextButton.classList.remove("hide");
    }else if(targetSlide === slides[slides.length - 1]){
        // If the target slide is the last slide the next button must be hidden
        // and the previous button must be shown
        nextButton.classList.add("hide");
        previousButton.classList.remove("hide");
    }else{
        // if none of the above is true, we show both the next and prevoius button
        previousButton.classList.remove("hide");
        nextButton.classList.remove("hide");
    }
}

// FIND THE INDEX OF AN ITEM, INSIDE AN ARRAY OF ITEMS
function findIndex(item, items){
    for(let index = 0; index < items.length; index++){
        if(item === items[index]){
            return index;
        }
    }
}
