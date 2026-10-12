console.log("LETS WRITE JAVASCRIPT")

let play=document.querySelector(".play-btn") 
let isplaying=false;
play.addEventListener("click",function(){   
    isplaying= !isplaying;
    if(isplaying){
        audio.pause()
        play.src="play.svg"
    }
    else{
        audio.play()
        play.src="pause.svg"
    }
})
window.addEventListener("keydown",function(event){
    if(event.code=="Space"){
        event.preventDefault()  /*AVOIDS THE PAGE TO SCROLL DOWN ON PRESSING SPACE BAR*/
        isplaying= !isplaying;
        if(isplaying){
            audio.pause()
            play.src="play.svg"
        }
        else{
            audio.play()
            play.src="pause.svg"
        }
}
})
let vol=document.querySelector(".sound")
let ismute=false;
let vol1=document.querySelector("#volume")
let lastvol=document.querySelector("#volume").value
vol.addEventListener("click",function(){   
    ismute= !ismute;
    if(ismute){
        vol.src="mute.svg"
        vol1.value=0
        audio.volume=0
    }
    else{
         vol1.value=lastvol
        vol.src="volume.svg"
        audio.volume=vol1.value/100
    }
    console.log("Button clicked")
})
vol1.addEventListener("input",function(){
    audio.volume=vol1.value/100
    if(vol1.value==0){
        ismute=true
        vol.src="mute.svg"
    }
    else if(vol1.value>=70){
        ismute=false
        vol.src="volume-up.svg"
        lastvol=vol1.value
    }
    else{
        ismute=false
        vol.src="volume.svg"
        lastvol=vol1.value
    }
})

let audio=new Audio()
let songs=[]
let cards=document.querySelectorAll(".card")
cards.forEach(function(card,index){
    let song={
        title:card.querySelector(".sname").textContent,
        artist:card.querySelector(".aname").textContent,
        aud:card.getAttribute("data-song"),
        cover:card.querySelector("img").src
    };
    songs.push(song)
    card.addEventListener("click",function(){
        play.src="pause.svg"
        playSong(index)
    })
});
let cov=document.querySelector("#now-cover")
let tit=document.querySelector("#now-title")
let art=document.querySelector("#now-artist")
let duration=document.querySelector("#total-time")
let currentIndex=0


 audio.addEventListener("loadedmetadata",()=>{
        let dur=audio.duration
        let mins=Math.floor(dur/60)
        let secs=Math.floor(dur%60)
        let padmins=String(mins).padStart(2,'0')
        let padsecs=String(secs).padStart(2,'0')
        duration.innerHTML=`${padmins}:${padsecs}`
 })
function playSong(index){
    music=songs[index]
    cov.style.width='90px'
    cov.style.height='120px'
    currentIndex=index
    audio.src=music.aud;
    audio.play()
    seekbar.value=0
    currentTime.innerHTML="00:00"
    cov.setAttribute('src',music.cover)
    tit.innerHTML=music.title
    art.innerHTML=music.artist
    console.log("Now Playing:",music.title)
    console.log(music)
    }


let prevbtn=document.querySelector(".prev-btn")
let nxtbtn=document.querySelector(".next-btn")
nxtbtn.addEventListener("click",function(){
    currentIndex=(currentIndex+1)%songs.length
    playSong(currentIndex)
})
prevbtn.addEventListener("click",function(){
    currentIndex=(currentIndex-1+songs.length)%songs.length
    playSong(currentIndex)
})
audio.addEventListener("ended",function(){
    currentIndex=(currentIndex+1)%songs.length
    playSong(currentIndex)
})


// SEEKBAR
let seekbar=document.querySelector("#seekbar")
let currentTime=document.querySelector("#current-time")
audio.addEventListener("timeupdate",()=>{
    let progress_percent=(audio.currentTime/audio.duration)*100
    seekbar.value=progress_percent
        let dur=audio.duration
        let mins=Math.floor(audio.currentTime/60)
        let secs=Math.floor(audio.currentTime%60)
        let padmins=String(mins).padStart(2,'0')
        let padsecs=String(secs).padStart(2,'0')
        currentTime.innerHTML=`${padmins}:${padsecs}`
})

seekbar.addEventListener("input",()=>{
    let newtime=(seekbar.value/100)*audio.duration
    audio.currentTime=newtime
})
let hamburger=document.querySelector("#hamburger")
let overlay=document.querySelector("#overlay")
let leftbox=document.querySelector(".leftbox")
hamburger.addEventListener("click",function(){
    leftbox.classList.toggle("active")
    overlay.classList.toggle("active")
    hamburger.classList.toggle("active")
})
overlay.addEventListener("click",function(){
    leftbox.classList.remove("active")
    overlay.classList.remove("active")
    hamburger.classList.remove("active")
})
