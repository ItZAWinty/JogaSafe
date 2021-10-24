// Content
const sections = document.querySelectorAll("section");
const balls = document.querySelectorAll(".ball-disabled");
const downButton = document.querySelector("#down-button");
const menu = document.querySelector("#menu");
const menuItems = document.querySelectorAll(".menu-item");

let menuElements = Array.from(menuItems);
menuElements.unshift(menu)

// Menu button
let menuMoving = false;
let hasBeenOpened = false;

function MenuButton(){
    
    if(!menuMoving){
        menuMoving = true;

        if(menu.classList.contains("menu-on")){
            menu.classList.remove("menu-on")
            menu.style.width = "100vw";
            ChangeMenuState("off")
        }

        if(menu.classList.contains("menu-off") || (menu.classList[0] == null && !hasBeenOpened)){
            hasBeenOpened = true;
            menu.classList.remove("menu-off")
            menu.style.width = "0vw";
            ChangeMenuState("on")
        }

    }
}

function ChangeMenuState(status) {
    setTimeout(function () {
        menu.classList.add("menu-" + status)
        enableMenuButton()
    }, 10);
}

function enableMenuButton() {
    setTimeout(function () {
        menuMoving = false;
    }, 1000);
}



const setActiveSection = (section) => { activeSection = section; }

var ballSet = false;


// Additional functions
const actionSectionHandler = (currentSectionId) => {

}


// Intersection observer
const sectionWatcherCallback = (section, sectionIndex) => {
    section.forEach(section => {
        if (!section.isIntersecting) { return }
        
        if(!ballSet || canMove)
        {
            changeBall(section.target.id)
            ballSet = true
        }

        setActiveSection(section.target)
    })
}

const sectionWatcherOptions = {
    threshold: 0.6
}

const sectionWatcher = new
    IntersectionObserver(
        sectionWatcherCallback,
        sectionWatcherOptions
    )

sections.forEach(section => {
    sectionWatcher.observe(section);
})

// #region Scroll behaviour

// #region Scroll Locking
canMove = true;
shortDelay = 500;
longDelay = 800;

function cancelScroll(delay) {
    setTimeout(function () {
        canMove = true
    }, delay);
}
// #endregion

// #region Change Sections
const goToPreviousSection = () => {
    if(canMove){
        canMove = false
        var previousSection = activeSection.previousElementSibling;
        if (previousSection == null) { 
            cancelScroll(longDelay)
            previousSection = sections[sections.length - 1]
        }
        else{ cancelScroll(shortDelay) }
        previousSection.scrollIntoView();
        changeBall(previousSection.id)
    }
}

const goToNextSection = (isBall, ballDestination) => {
    if(canMove){
        canMove = false
        var nextSection = activeSection.nextElementSibling;
        if (nextSection == null || isBall) { 
            cancelScroll(longDelay)
            nextSection = sections[0]
            if(isBall){
                nextSection = document.querySelector("#" + ballDestination);
            }
        }
        else{ cancelScroll(shortDelay) }
        nextSection.scrollIntoView();
        changeBall(nextSection.id)
    }
}
// #endregion

// #region Ball changing
function changeBall(newSectionId){
    balls.forEach(ball => {
        ball.classList.remove("ball-enabled")
        if(ball.getAttribute("id") === "ball-" + newSectionId)
        { ball.classList.add("ball-enabled"); }
    });
}
// #endregion

// #endregion

// #regions Keyboard

window.addEventListener('keydown', (key) => {
    if (key.code === 'ArrowUp' || key.code === 'ArrowLeft') {
        key.preventDefault();
        if (canMove) {
            goToPreviousSection();
        }
    }

    if (key.code === 'ArrowDown' || key.code === 'ArrowRight') {
        key.preventDefault();
        if (canMove) {
            goToNextSection();
        }
    }
})