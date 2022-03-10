// массив в котором будут храниться все boolean
let arrBoolean = []

function checkValid(){
  arrBoolean = passBoolean.concat(nameBoolean.concat(emailBoolean))
  validation.unlockBtn(arrBoolean, btnChangeEmail)
}
