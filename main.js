
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2 ');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const togglePlay = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn =$('.btn-next');
const prevBtn =$('.btn-prev');
const randomBtn = $('.btn-random');


const listSong ={
  isPlaying: false,
  currentIndex: 0,
  isRandom: false,
   songs:[
    {
        name : 'Blinding Light',
        singer: 'The Weekend',
        path :'./music/jesse_pinkmans_tone.mp3',
        image:'./img/pic1.jpg'
    },
    {
        name :'In your eyes',
        singer :'The Weekend',
        path :'./music/jesse_pinkmans_tone.mp3',
        image:'./img/pic1.jpg'
    },
    {
        name :'Save your tear',
        singer :'The Weekend',
        path :'./music/jesse_pinkmans_tone.mp3',
        image:'./img/pic1.jpg'
    }
   ],
   render : function(){
    const htmls = this.songs.map(function(song){
        return ` <div class="playlist">
        <div class = "song">
          <div class = "thumb" style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="artist">${song.singer}</p>
          </div>
        </div>
        <div class = "option"></div>
         <i class ="fas fa-ellipsis-h"></i>
      </div>`
    })
    $('.playlist').innerHTML = htmls.join('\n') 
   },
   defineProperties: function(){
    Object.defineProperty(this,'currentSong',{
        get: function(){
          return this.songs[this.currentIndex];
      }
    })
   },
   // process load the 1st song
   loadCurrentSong: function(){

    heading.textContent =this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path;
    
   },
   //process minimize thumb
   handlerEvents: function(){
    const cd = $('.cd')
    const cdWidth = cd.offsetWidth

    //process rotate cdthumb
    const cdThumbAnimate = cdThumb.animate([
      {
        transform: 'rotate(360deg)',
      }
    ],{
      duration: 10000,
      iterations: Infinity, // lặp :vô hạn
    })
    cdThumbAnimate.pause();

    // console.log(cdWidth)
    document.onscroll = function(){
      const scrollTop = document.documentElement.scrollTop;
      const newcdWidth = cdWidth - scrollTop;

      // console.log(newcdWidth)
      cd.style.width = newcdWidth > 0 ? newcdWidth + 'px':0;
      cd.style.opacity = newcdWidth/cdWidth
    }
    //process when click play button
    togglePlay.onclick = function(){
      if (listSong.isPlaying){
        audio.pause();
      }
      else{
        audio.play();
      }
    }
    //when song played 
    audio.onplay = function(){
      listSong.isPlaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play();
    }
    //when song paused 
    audio.onpause = function(){
      listSong.isPlaying = false;
      player.classList.remove('playing');
      cdThumbAnimate.pause();
    }
    //when song is running 
    audio.ontimeupdate = function(){
      if(audio.duration){
        const progressPercent = Math.floor(audio.currentTime/audio.duration *100);
        progress.value = progressPercent; 
      } // tính phần trăm bài hát 
    }
    // seek song  
    progress.onchange = function(e){
      const seekTime = audio.duration / 100*e.target.value;
      audio.currentTime = seekTime;
    }
    // prev song 
    
    //next song 
    nextBtn.onclick= function(){
      listSong.nextSong();
      audio.play();
    }
    //prev song 
    prevBtn.onclick= function(){
      listSong.prevSong();
      audio.play();
    }
    //random play 
    randomBtn.onclick = function(e){
      listSong.isRandom =!listSong.isRandom;
      randomBtn.classList.toggle('active',listSong.isRandom);
    }
   },
   // go next song
   nextSong: function(){
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length ){
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function(){
    this.currentIndex--;
    if (this.currentIndex <0 ){
      this.currentIndex = this.songs.length -1;
    }
    this.loadCurrentSong();
  },
  playRandom: function(){
    let newIndex
    do{
      newIndex = Math.floor(Math.random()*this.songs.length)
    }while (newIndex!==this.currentIndex)
    console.log(newIndex)
  },
   start : function(){
    //define att for each object
    this.defineProperties()

    // listen and process DOM events 
    this.handlerEvents();
    // load the 1st song into UI while run app
    this.loadCurrentSong();
    // render playlist
    this.render();
   }
}
listSong.start()