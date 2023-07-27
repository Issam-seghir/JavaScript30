const playButton = document.querySelector("button.player__button");
const video = document.querySelector("video.player__video");
const progressFilled = document.querySelector(".progress__filled");


function handleVideoClick(e){



    this.classList.toggle("toggle");
    console.log(this.classList);
    if (!this.classList.contains("toggle")){
        video.play();

        this.innerHTML = "⏸";
    }
    else{
        video.pause()
        this.innerHTML = "▶";
    }

}

function handleVideoPlay(e) {

console.log(`${((video.currentTime * 100) / video.duration).toFixed(2)}%`);
const progress = `${((video.currentTime * 100) / video.duration).toFixed(2)}%`;
console.log(video);
progressFilled.style.flexBasis = `${progress}`;
}

playButton.addEventListener("click", handleVideoClick);
video.addEventListener("timeupdate", handleVideoPlay);
