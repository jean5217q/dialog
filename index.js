const inputName = document.querySelector('#name')
const inputText = document.querySelector('#text')
const parent = document.querySelector('.dialog-block-wrap')
const dialogWrap = document.querySelector('.dialog-wrap')
const form = document.querySelector('.add-dialog')


// 初始化 Firebase
var config = {
  apiKey: "AIzaSyDoUNBWlZMpYjK6dq3TXUdrahQwMWWpWhg",
  authDomain: "appworks-4626c.firebaseapp.com",
  databaseURL: "https://appworks-4626c.firebaseio.com",
  projectId: "appworks-4626c",
  storageBucket: "appworks-4626c.appspot.com",
  messagingSenderId: "432627002908"
};
firebase.initializeApp(config);



let db = firebase.database();






form.addEventListener('submit',submitHandler)

function submitHandler(e){
  e.preventDefault()
  const name = inputName.value
  const text = inputText.value
  if(!text||!name) return
  if(text.indexOf('alert') !==-1||text.indexOf('replace') !==-1 ||
  text.indexOf('<') !==-1 || text.indexOf('>') !==-1
  ) {
    inputName.value = ''
    inputText.value = ''
    return
  }
  const color = randamcolor()
  let ref = db.ref("/people");
  ref.push({
    name: name,
    text: text,
    color: color
  })
  console.log(name,text,color)
  dialogWrap.scrollTop = dialogWrap.scrollHeight
  inputName.value = ''
  inputText.value = ''
  parent.innerHTML=''
  onceData()
}

function onceData() {
  let ref = db.ref("/people");
  // ref.once('value').then(function(snapshots){
  //   let data = [];
  //   snapshots.forEach(snapshot => {
  //     let m = snapshot.val()
  //     m.key = snapshot.key
  //     data.push(m)
  //   })
  //   renderMarkUp(data)
  // })
  ref.on('value',function(snapshots){
    let data = [];
    snapshots.forEach(snapshot => {
      let m = snapshot.val()
      m.key = snapshot.key
      data.push(m)
    })
    renderMarkUp(data)
  })
}

window.onload = onceData

function renderMarkUp(data){
  let markup = ''
  data.forEach(el=>{
  markup = markup + `
  <div class="dialog-block">
    <div class="dialog-left">
      <div class="dialog-photo" style="background-color: ${el.color[0]}"></div>
      <div class="dialog-photo" style="background-color: ${el.color[1]}"></div>
      <div class="dialog-photo" style="background-color: ${el.color[2]}"></div>
    </div>
    <div class="dialog-right">
      <div class="dialog-name">${el.name}</div>
      <div class="dialog-text">${el.text}</div>
    </div>
  </div>
  `
  parent.innerHTML = markup
  })
  
}


function randamcolor(){
  const r = parseInt(Math.random()*255)
  const g = parseInt(Math.random()*255)
  const b = parseInt(Math.random()*255)
  const color1 = `rgb(${r},${g},${b})`
  const color2 = `rgb(${r-20},${g-20},${b-20})`
  const color3 = `rgb(${r+20},${g+20},${b+20})`
  return [color1,color2,color3]
}