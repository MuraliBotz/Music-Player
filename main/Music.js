let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
// Hii
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let canvas = document.getElementById('visualizer');  
let ctx = canvas.getContext('2d');

let audioContext;
let analyser;
let bufferLength;
let dataArray;
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        name: 'Alan Walker Mix',
        artist: 'Alan Walker',
        music: 'music/Alone_X_On_My_Way_X_Faded_X_Alone_Pt_2_Alan_Walker_Mashup_Aesthetic.mp3'
    },
    {
        name: 'Alan Walker All Remix',
        artist: 'Alan walker',
        music: 'music/[Switching Vocals] - Alone II ✘ Lost Control ✘ On My Way _ Alan Walker (Walker The Fox 126 YT)(M4A_128K).m4a'
    },
    {
        name: 'Banali Badalago',
        artist: 'Sonu Nigam',
        music: 'music/BANALI.mp3'
    },
    {
        name: 'Andavo Andavu Kannada Nadu',
        artist: 'Unknown',
        music: 'music/Andavo Andavu Kannada Naadu Video Song _ Ambarish _ Mallige Hoove Kannada Movie Songs(M4A_128K).m4a'
    },
    {
        name: 'Jannat ve',
        artist: 'Darshan Rajval',
        music: 'music/128-Jannat Ve - Darshan Raval 128 Kbps.mp3'
    },
    {
        name: 'BEAUZ',
        artist: 'BEAUZ',
        music: 'music/BEAUZ.mp3'
    },
    {
        name: 'Broken Angel',
        artist: 'Arash',
        music: 'music/Broken.mp3'
    },
    {
        name: 'warriyo mortals',
        artist: 'laura brehm',
        music: 'music/warriyo - mortals [edit audio] ft. (laura brehm)(720P_60FPS).mp3'
    },
    {
        name: 'Cartoon On & On',
        artist: 'Cartoon feat. Daniel Levi',
        music: 'music/Cartoon.mp3'
    },
    {
        name: 'Love Nwantiti',
        artist: 'CKay',
        music: 'music/Love_Nwantiti.mp3'
    },
    {
        name: 'Middle Of The Night',
        artist: 'Elley Duhé',
        music: 'music/MIDDLE OF THE NIGHT.mp3'
    },
    {
        name: 'Cupid',
        artist: 'Fifty Fifty',
        music: 'music/FIFTY FIFTY - Cupid (sped up) Twin Version (Lyrics) _I_m feeling lonely_(M4A_128K).m4a'
    },
    {
        name: 'Gaganave Baagi',
        artist: 'Unknown',
        music: 'music/Gaganave Baagi Slow Song(MP3_160K).mp3'
    },
    {
        name: 'Infinity X Anbe',
        artist: 'Unknown',
        music: 'music/Infinity X Anbe En Anbe (Lyrics) _ trending song(M4A_128K).m4a'
    },
    {
        name: 'Killers From The North',
        artist: 'KordHell',
        music: 'music/Killers From The Northside(MP3_70K).mp3'
    },
    {
        name: 'Lost Control',
        artist: 'Alan Walker',
        music: 'music/Lost_Control.mp3'
    },
    {
        name: 'Imagination',
        artist: 'Naron',
        music: 'music/Naron - Imagination (Inspired By Alan Walker) [NCN Release](MP3_70K).mp3'
    },
    {
        name: 'Noorondu Nenapu',
        artist: 'Unknown',
        music: 'music/Noorondu Nenapu - Lofi Mix _ Bandhana _ Dr.Vishnuvardhan_ Suhasini _ Kannada Old Song _mrtmusic(MP3_160K).mp3'
    },
    {
        name: 'Oh Angel Sent From Up',
        artist: 'Unknown',
        music: 'music/oh angel sent from up above(MP3_70K).mp3'
    },
    {
        name: 'Choices',
        artist: 'PatrickReza',
        music: 'music/PatrickReza - Choices [NCS Release](360P)(mp3).mp3'
    },
    {
        name: 'Tinak Tin Tana',
        artist: 'Unknown',
        music: 'music/Tinak Tin Nachu Mai X  Apke Pyar Me ------ _xml(M4A_128K).m4a'
    },
    {
        name: 'Heroes Tonight',
        artist: 'Janji feat. Johnning',
        music: 'music/--Janji-Heroes Tonight-- (feat. Johnning)Música épica para Jugar Juegos y para Creadores de Contenido(MP3_70K).mp3'
    },
    {
        name: 'One Day',
        artist: 'Arash feat. Helena',
        music: 'music/ARASH feat Helena - ONE DAY (Official Video) [rjBsQ9SygnE].m4a'
    },
    {
        name: 'Blue Eyes',
        artist: 'Yo Yo Honey Singh',
        music: 'music/Blue_Eyes_Full_Video_Song_Yo_Yo_Honey_Singh_Blockbuster_NbyHNASFi6U.m4a'
    },
    {
        name: 'Doraemon',
        artist: 'Unknown',
        music: 'music/Doraemon 3 Magical Swordsmen Song Hindi With Lyrics __ AC Lyrics __(MP3_70K).mp3'
    },
    {
        name: 'Fenekot',
        artist: 'Mockingbird',
        music: 'music/fenekot - Mockingbird (Sped Up)(MP3_160K).mp3'
    },
    {
        name: 'Lat Lag Gayee',
        artist: 'Benny Dayal & Shalmali Kholgade',
        music: 'music/Lat Lag Gayee _ Race 2 _ Saif Ali Khan _ Jacqueline Fernandez _ Benny Dayal _ Shalmali  Kholgade(MP3_70K).mp3'
    },
    {
        name: 'Levitating X Woh Ladki',
        artist: 'Unknown',
        music: 'music/Levitating_x_Woh_Ladki_Jo_Dj_Ruchir_Mashup_｜_Instagram_Trending.m4a'
    },
    {
        name: 'Dreams Pt. II',
        artist: 'Lost Sky feat. Sara Skinner',
        music: 'music/Lost Sky - Dreams pt. II (feat. Sara Skinner) [NCS Release](MP3_70K).mp3'
    },
    {
        name: 'Naino Wale Ne X Sugar',
        artist: 'Unknown',
        music: 'music/Nainowale Ne x Sugar _ Brownies Mashup __ Music Mix Box(M4A_128K).m4a'
    },
    {
        name: 'Rise Up',
        artist: 'TheFatRat',
        music: 'music/Nightcore - Rise Up (TheFatRat) - (Lyrics)(MP3_70K).mp3'
    },
    {
        name: 'Sahara',
        artist: 'Unknown',
        music: 'music/Sahara(M4A_128K).m4a'
    },
    {
        name: 'Suzume',
        artist: 'Unknown',
        music: 'music/Suzume_No_Tojimari_8D_Audio_ASAL_MUSIC_mTjBoepY9e4_140.mp3'
    }
];


loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    
    fetch('https://nekos.best/api/v2/neko')
        .then(response => response.json())
        .then(data => {
            
            const imageUrl = data.results[0].url;
            
            track_art.style.backgroundImage = `url(${imageUrl})`;
        })
        .catch(error => {
            console.error('Error fetching Neko image:', error);
        });

    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);

  
    if (!audioContext) {
        setupVisualizer();
    }
}


function setupVisualizer() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let source = audioContext.createMediaElementSource(curr_track);
    analyser = audioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    drawVisualizer();
}

function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

    
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `rgb(${barHeight + 100}, 50, 150)`); // Pinkish red
        gradient.addColorStop(0.2, `rgb(50, ${barHeight + 100}, 200)`); // Blueish
        gradient.addColorStop(0.4, `rgb(50, 250, ${barHeight + 100})`); // Greenish
        gradient.addColorStop(0.6, `rgb(${barHeight + 100}, 250, 50)`); // Yellowish
        gradient.addColorStop(1, `rgb(255, ${barHeight}, 150)`); // Red to Yellow
        
        ctx.fillStyle = gradient;

     
        ctx.shadowBlur = 20;
        ctx.shadowColor = gradient;

    
        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
    }
}





function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}


function playTrack() {
    curr_track.play();
    isPlaying = true;
   
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';

    
    if (audioContext) {
        audioContext.resume();
    }
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;

    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';

    
    if (audioContext) {
        audioContext.suspend();
    }
}


function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
