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
    data.forEach(el=>item(el))
  })
}

window.onload = onceData




function randamcolor(){
  const r = parseInt(Math.random()*255)
  const g = parseInt(Math.random()*255)
  const b = parseInt(Math.random()*255)
  const color1 = `rgb(${r},${g},${b})`
  const color2 = `rgb(${r-20},${g-20},${b-20})`
  const color3 = `rgb(${r+20},${g+20},${b+20})`
  return [color1,color2,color3]
}

function item(data) {
  //外包
  const block = document.createElement('div')
  block.className = 'dialog-block'
  // 左圖
  const blockLeft = document.createElement('div')
  blockLeft.className = 'dialog-left'
  data.color.forEach
  data.color.forEach(color=>{
    const photo = document.createElement('div')
    photo.className = 'dialog-photo'
    photo.style.backgroundColor = `${color}`
    blockLeft.appendChild(photo)
  })
  //右圖
  const blockRight = document.createElement('div')
  blockRight.className = 'dialog-right'
  // name
  const name = document.createElement('div')
  name.className = 'dialog-name'
  name.textContent = data.name
  // text
  const text = document.createElement('div')
  text.className = 'dialog-text'
  text.textContent = data.text
  blockRight.appendChild(name)
  blockRight.appendChild(text)
  //串接
  parent.appendChild(block)
  block.appendChild(blockLeft)
  block.appendChild(blockRight)
}