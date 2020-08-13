const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    const sounds = document.querySelectorAll('.sound-picker button');
    // Display Time
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    // length
    const outlineLength = outline.getTotalLength();
    let fakeDuration = 600;
    
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
  // different sounds
  sounds.forEach(sound => {
      sound.addEventListener('click', function(){
           song.src = this.getAttribute('data-sound');
           video.src = this.getAttribute('data-video');
           checkPlay(song);
      })
  })
    //play sound
    play.addEventListener("click", () => {
        checkPlay(song);
    });
        //select sound 
     timeSelect.forEach(option => {
         option.addEventListener('click', function(){
             fakeDuration = this.getAttribute("data-time");
             timeDisplay.textContent = `${Math.floor(fakeDuration /60)} : ${Math.floor(fakeDuration % 60)}`
         })
     })

    // create pause and play function
    const checkPlay = song => {
        if (song.paused){
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        } else{
            song.pause();
            video.pause();
        }
    };
  
// animating the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elasped = fakeDuration - currentTime;
        let seconds = Math.floor(elasped % 60);
        let minutes = Math.floor(elasped/60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
         timeDisplay.textContent = `${minutes}: ${seconds}`;
        if (currentTime > fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
        };

};
app()