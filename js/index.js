// Content
const sections = document.querySelectorAll("section");
const downButton = document.querySelector("#down-button");

// document.getElementById("down-button").href="#" + sections[2].id;

curIndex = 0;



const setActiveSection = (section) => { activeSection = section; }



// Additional functions
const actionSectionHandler = (currentSectionId) => {

}


// Intersection observer
i = 0
const sectionWatcherCallback = (section, sectionIndex) => {
    section.forEach(section => {
        if (!section.isIntersecting) { return }

        setActiveSection(section.target)
        destinationSection = activeSection
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

// Keyboard

const goToPreviousSection = () => {
    var previousSection = activeSection.previousElementSibling;
    delay = 500
    if (previousSection == null) { 
        delay = 800
        previousSection = sections[sections.length - 1]
    }
    cancelScroll(delay)
    previousSection.scrollIntoView();
}

const goToNextSection = () => {
    if(canMove){
    canMove = false
    var next = activeSection.nextElementSibling;
    delay = 500
    if (next == null) { 
        delay = 800
        next = sections[0]
    }
    cancelScroll(delay)
    next.scrollIntoView();}
}

const KeyEventHandler = (keycode) => {
    switch (keycode) {
        case "ArrowUp":
            goToPreviousSection();
            break;
        case "ArrowDown":
            goToNextSection();
            break;
        default:
            console.log("invalid")
            break;
    }
}

canMove = true

window.addEventListener('keydown', (key) => {
    if (key.code === 'ArrowUp' || key.code === 'ArrowLeft') {
        key.preventDefault();
        if (canMove) {
            canMove = false
            goToPreviousSection();
        }

    }

    if (key.code === 'ArrowDown' || key.code === 'ArrowRight') {
        key.preventDefault();
        if (canMove) {
            goToNextSection();
        }
    }

    if (key.code === "Enter") {
        moving = true
        checkMove()
        sections[7].scrollIntoView();
    }

})

function cancelScroll(delay) {
    setTimeout(function () {
        canMove = true
    }, delay);
}
