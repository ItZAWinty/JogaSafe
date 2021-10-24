const sectionsTime = document.querySelectorAll("section");
const bg = document.querySelector("#bg-fire");

const sectionWatcherCallbackTimes = (section, sectionIndex) => {
    section.forEach(section => {
        if (!section.isIntersecting) { return }
        changeBG(section.target.id)
    })
}

const sectionWatcherOptionsTimes = {
    threshold: 0.6
}

const sectionWatcherTimes = new
    IntersectionObserver(
        sectionWatcherCallbackTimes,
        sectionWatcherOptionsTimes
    )

sectionsTime.forEach(section => {
    sectionWatcherTimes.observe(section);
})

function changeBG(curSec) {
    switch (curSec) {

        default:
            bg.src = "../images/bgs/vector-fire.svg";
            break;

        case "bitter":
            bg.src = "../images/times/fundos/bitter-bug.svg";
            break;

        case "green":
            bg.src = "../images/times/fundos/green-ferret.svg";
            break;

        case "lemon":
            bg.src = "../images/times/fundos/lemon-viper.svg";
            break;

        case "orange":
            bg.src = "../images/times/fundos/orange-lynx.svg";
            break;

        case "pink":
            bg.src = "../images/times/fundos/pink-otter.svg";
            break;

        case "purple":
            bg.src = "../images/times/fundos/purple-raccoon.svg";
            break;

        case "red":
            bg.src = "../images/times/fundos/red-panda.svg";
            break;

        case "sunset":
            bg.src = "../images/times/fundos/sunset-wolf.svg";
            break;
    }
}