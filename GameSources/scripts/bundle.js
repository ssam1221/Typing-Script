(()=>{"use strict";let t=null;class e{constructor({filename:t}){this.filename=t}static setDebugMode(e){console.log(`Set debug mode to : ${e}`),t=e}getFormattedDate(){const t=new Date;return`[${t.getFullYear()}/${("00"+(t.getMonth()+1)).substr(-2)}/${("00"+t.getDate()).substr(-2)} ${("00"+(t.getHours()+1)).substr(-2)}:${("00"+(t.getMinutes()+1)).substr(-2)}:${("00"+(t.getSeconds()+1)).substr(-2)}]`}info(...t){const e=`                         ${this.filename}`.substr(-20);console.info(`[ INFO]${this.getFormattedDate()}[${e}] `,...t)}warn(...t){const e=`                         ${this.filename}`.substr(-20);console.warn(`[ WARN]${this.getFormattedDate()}[${e}] `,...t)}error(...t){const e=`                         ${this.filename}`.substr(-20);console.error(`[ERROR]${this.getFormattedDate()}[${e}] `,...t)}log(...t){const e=`                         ${this.filename}`.substr(-20);console.log(`[  LOG]${this.getFormattedDate()}[${e}] `,...t)}}const s=new e({filename:"BGMDatabase"});class i{static BGMDataList={};static player;static async initialize(){try{s.log("Initializing..."),this.BGMDataList=await(await fetch("data/BGMList.json")).json();for(let t=0;t<this.BGMDataList.length;t++){const e=this.BGMDataList[t];this.BGMDataList[t].coverImage=this.getCoverImage(e.title);const i=await(await fetch(`data/notes/${e.title}.json`)).json();this.BGMDataList[t].data.noteList=i,s.log(`Loading [${e.title}]...`)}s.log("BGM Data : ",this.BGMDataList)}catch(t){s.error(t)}}static getCoverImage(t){return`data/coverImages/${t}.png`}static getDataByTitle(t){for(const e of this.BGMDataList)if(e.title===t)return e;return null}static getDataByIndex(t){return this.BGMDataList[t]}}const a=new e({filename:"BGMSelector"});class n{static selectedIdx=0;static BGMData={};static async initialize(){a.log("Initializing..."),this.BGMData=await(await fetch("data/BGMList.json")).json();for(const t in this.BGMData)this.BGMData[t].coverImage=i.getCoverImage(t)}static getBGMListInfo(){return this.BGMData}static onBGMSelected(t){"ArrowLeft"===t.key?(this.selectedIdx=(this.BGMData.length+this.selectedIdx-1)%this.BGMData.length,a.log(`Selected title : [${this.selectedIdx}] ${this.BGMData[this.selectedIdx].title}`)):"ArrowRight"===t.key?(this.selectedIdx=(this.selectedIdx+1)%this.BGMData.length,a.log(`Selected title : [${this.selectedIdx}] ${this.BGMData[this.selectedIdx].title}`)):"Enter"!==t.key&&" "!==t.key||a.log("Selected")}}const o=new e({filename:"DOMConatinerController"});class r{static Containers={Difficulty:null,GetReadyText:null,keynotesContainerBackground:null,pressedkeynotesContainer:null,keynotesContainerContainer:null,keynotesContainers:null,keynoteCheckerContainer:null,keynoteCheckers:null};static initialize(){o.log("Initialize..."),this.Containers.Difficulty=document.getElementById("Difficulty"),this.Containers.GetReadyText=document.getElementById("getReadyText"),this.Containers.keynotesContainerBackground=document.getElementById("keynotesContainerBackground"),this.Containers.pressedkeynotesContainer=document.getElementById("keynotePressedContainer"),this.Containers.keynotesContainerContainer=document.getElementById("keynotesContainer"),this.Containers.keynotesContainers=document.getElementsByClassName("keynotesContainer"),this.Containers.keynoteCheckerContainer=document.getElementById("keynoteChecker"),this.Containers.keynoteCheckers=document.getElementsByClassName("keynoteChecker")}static get(){return this.Containers}}class c{static SfxPlayerContainer;static NUM_AUDIO_TAG=100;static AudioTags=[];static currentAudioTagIndex=0;static initialize(){this.SfxPlayerContainer=document.getElementById("sfxPlayerContainer");for(let t=0;t<this.NUM_AUDIO_TAG;t++){const e=document.createElement("audio");e.id=`SFXPlayer_${t}`,e.setAttribute="SFXPlayer",this.SfxPlayerContainer.appendChild(e),this.AudioTags[t]=e}}static play(t){"string"==typeof t&&(this.AudioTags[this.currentAudioTagIndex].src=t,this.AudioTags[this.currentAudioTagIndex].play(),this.currentAudioTagIndex=++this.currentAudioTagIndex%this.NUM_AUDIO_TAG)}}const l=new e({filename:"NoteCreator"});class d{static Difficulty={EASY:"Easy",NORMAL:"Normal",HARD:"Hard"};static currentDifficulty="";static MUSIC_NOTE_CLASS_NAME="MUSIC_NOTE";static PRESSED_CLASS_NAME="PRESSED_NOTE";static MAX_KEYPRESS_NOTES=100;static KEYPRESS_FPS=1e3/this.MAX_KEYPRESS_NOTES;static currentNoteIndex=0;static currentKeyPressNoteIndex=0;static NOTE_SPEED=2;static NOTE_ACTIVATING_TIMESTAMP=1300;static NOTE_SHOWING_TIMESTAMP=1e3*this.NOTE_SPEED;static NOTE_CHECK_DELAY_TIMESTAMP=1200;static keypressDivInterval;static isPaused=!1;static noteList=[];static musicNoteList=[];static keypressNotes=[];static timeoutFunctionList=[];static activateNoteList=[];static StartTime=null;static NOTE_STATUS={IDLE:"Idle",SHOWING:"Showing",ACTIVATING:"Activating",USED:"Used"};static NOTE_SIZE={HEIGHT:"128px"};static NOTE_POSITION={"`1234567890-=\\~!@#$%^&*()_+|":0,"qwertyuiop[]QWERTYUIOP{}":1,"asdfghjkl;'ASDFGHJKL:\"":2,"zxcvbnm,./ZXCVBNM<>?":3};static PointCheck={Perfect:0,Good:0,Bad:0,Miss:0};static initialize(){l.log("Initializing..."),this.createkeypressNotes()}static getCurrentNoteIndex(){return this.currentNoteIndex=++this.currentNoteIndex%this.MAX_KEYPRESS_NOTES,this.currentNoteIndex}static getCurrentKeyPressNoteIndex(){return this.currentKeyPressNoteIndex=++this.currentKeyPressNoteIndex%this.MAX_KEYPRESS_NOTES,this.currentKeyPressNoteIndex}static getCurrentDifficulty(){return this.currentDifficulty}static setNotes(t,e){l.log(`Set notes for title : [${e}][${t}]...`),this.noteList=i.getDataByTitle(t).data.noteList[e];for(let t=0;t<this.noteList.length;t++)this.noteList[t].status=this.NOTE_STATUS.IDLE;this.currentDifficulty=e,document.getElementById("Difficulty").innerHTML=`Difficulty : ${e}`,l.log("Notes : ",this.noteList)}static createkeypressNotes(){for(let t=0;t<this.MAX_KEYPRESS_NOTES;t++){const e=document.createElement("div");e.id=`musicNote_${t}`,e.setAttribute("class",this.MUSIC_NOTE_CLASS_NAME),r.get().keynotesContainerContainer.appendChild(e);const s=document.createElement("div");s.id=`keypressNote_${t}`,s.setAttribute("class",this.PRESSED_CLASS_NAME),r.get().pressedkeynotesContainer.appendChild(s)}}static add({what:t,timestamp:e}){}static read(){}static create(){}static pop(){this.StartTime.getTime(),(new Date).getTime()}static async start(){const t=this;l.log("Start to create notes..."),l.log(`Note create delay : ${t.NOTE_CHECK_DELAY_TIMESTAMP}`),this.setNotes("두근두근! 드디어!! 대모험 시작!!!",this.Difficulty.NORMAL);for(const e of this.noteList)(e=>{this.timeoutFunctionList.push(setTimeout((()=>{this.renderMusicNote(e.key),e.status=t.NOTE_STATUS.SHOWING,setTimeout((()=>{e.status=t.NOTE_STATUS.ACTIVATING}),t.NOTE_ACTIVATING_TIMESTAMP),setTimeout((()=>{e.status=t.NOTE_STATUS.USED}),t.NOTE_SHOWING_TIMESTAMP)}),e.timestamp-t.NOTE_CHECK_DELAY_TIMESTAMP))})(e);this.StartTime=new Date}static stop(){this.noteList=[];for(const t of this.timeoutFunctionList)clearTimeout(t)}static setNotePosition(t){const e=t.innerText;for(const s in this.NOTE_POSITION)if(s.indexOf(e)>-1){const e=160*this.NOTE_POSITION[s];t.setAttribute("position",this.NOTE_POSITION[s]),t.style.top=`calc(50% - ${320-e}px`;break}}static renderMusicNote(t){const e=this;(t=>{const s=document.getElementById(`musicNote_${this.getCurrentNoteIndex()}`);s.innerText=t,this.setNotePosition(s),s.setAttribute("class",`${this.MUSIC_NOTE_CLASS_NAME} showNote`),setTimeout((()=>{s.setAttribute("class",`${this.MUSIC_NOTE_CLASS_NAME}`),s.innerText=""}),e.NOTE_SHOWING_TIMESTAMP)})(t)}static keypressNote(t){c.play("./data/sfx/hat.mp3"),(t=>{const e=document.getElementById(`keypressNote_${this.getCurrentKeyPressNoteIndex()}`);e.innerText=t,this.setNotePosition(e),e.setAttribute("class",`${this.PRESSED_CLASS_NAME} showNote`),this.checkPressedKeyCorrected(t),setTimeout((()=>{e.setAttribute("class",`${this.PRESSED_CLASS_NAME}`),e.innerText=""}),1e3)})(t)}static checkPressedKeyCorrected(t){const e=(new Date).getTime()-this.StartTime;l.log(`Key pressed ${t} with timestamp : ${e}`),this.currentKeyPressNoteIndex}static onkeypress(t){!0===y.isGameStart&&1===t.key.length&&this.keypressNote(t.key)}}const u=new e({filename:"BGMPlayer"});class y{static currentBGM="";static isBGMStart=!1;static isGameStart=!1;static player;static initialize(){}static setVideo(t,e){const s=this;u.log(`SetVideo : [${t}]`);const a=i.getDataByTitle(t);u.log(a),s.player=new YT.Player("youtubeVideoPlayer",{height:"800",width:"800",videoId:a.data.youtube,playerVars:{controls:0},events:{onReady:function(t){s.player.playVideo()},onStateChange:async function(t){!1===s.isBGMStart&&(s.isBGMStart=!0,s.player.stopVideo(),await new Promise(((t,e)=>{r.get().GetReadyText.innerHTML="Get<br>Ready?",c.play("data/sfx/voice/get_ready.wav"),r.get().GetReadyText.setAttribute("class","GetReadyAnimation"),setTimeout((()=>{r.get().GetReadyText.setAttribute("class",""),c.play("data/sfx/voice/three.wav"),r.get().GetReadyText.innerHTML="3",setTimeout((()=>{r.get().GetReadyText.setAttribute("class","GetReadyAnimation")}))}),1e3),setTimeout((()=>{r.get().GetReadyText.setAttribute("class",""),c.play("data/sfx/voice/two.wav"),r.get().GetReadyText.innerHTML="2",setTimeout((()=>{r.get().GetReadyText.setAttribute("class","GetReadyAnimation")}))}),2e3),setTimeout((()=>{r.get().GetReadyText.setAttribute("class",""),c.play("data/sfx/voice/one.wav"),r.get().GetReadyText.innerHTML="1",setTimeout((()=>{r.get().GetReadyText.setAttribute("class","GetReadyAnimation")}))}),3e3),setTimeout((()=>{r.get().GetReadyText.setAttribute("class",""),c.play("data/sfx/voice/start.wav"),r.get().GetReadyText.innerHTML="Start!",setTimeout((()=>{r.get().GetReadyText.setAttribute("class","GetReadyAnimation")}))}),4e3),setTimeout((()=>{const e=r.get().keynotesContainerBackground.getAttribute("class"),s=r.get().keynoteCheckerContainer.getAttribute("class"),i=r.get().keynotesContainers[0].getAttribute("class");r.get().keynoteCheckerContainer.setAttribute("class",`${s} transparentFadeIn`),r.get().Difficulty.style.opacity=1,r.get().keynotesContainerBackground.setAttribute("class",`${e} transparentFadeIn`);for(const t of r.get().keynotesContainers)t.setAttribute("class",`${i} transparentFadeIn`);setTimeout((()=>{r.get().keynotesContainerBackground.style.opacity=.2,r.get().keynoteCheckerContainer.style.opacity=.2;for(const t of r.get().keynotesContainers)t.style.opacity=.2})),r.get().GetReadyText.setAttribute("class",""),r.get().GetReadyText.innerHTML="",t()}),5e3)})),u.log("self.isBGMStart ",s.isBGMStart),s.isGameStart=!0,console.log(YT.PlayerState),e({status:"GameReady",payload:{play:()=>{s.player.playVideo()}}})),!0===s.isBGMStart&&t.data===YT.PlayerState.ENDED&&e({status:"GameCompleted",payload:{}})}}})}static play(){this.player.playVideo()}}class h{static _currentMode="";static get getCurrentMode(){return this._currentMode}static setCurrentMode(t){this._currentMode=t}static addKeyboardEventListener(){document.addEventListener("keydown",(t=>{switch(this._currentMode){case"":case"MainMenu":case"Loading":break;case"SelectBGM":n.onBGMSelected(t);break;case"GamePlaying":d.onkeypress(t)}}))}}window.onload=async()=>{e.setDebugMode("debug");const t=new e({filename:"MainPlayer"});t.log("Start"),r.initialize(),c.initialize(),await i.initialize(),await n.initialize(),await y.initialize(),d.initialize(),t.log(n.getBGMListInfo()),h.setCurrentMode("GamePlaying"),h.addKeyboardEventListener(),document.oncontextmenu=e=>{t.log("Right click"),e.preventDefault()},document.onclick=async t=>{console.log(t),y.setVideo("두근두근! 드디어!! 대모험 시작!!!",(({status:t,payload:e})=>{"GameReady"===t&&(d.start(),e.play())}))}}})();