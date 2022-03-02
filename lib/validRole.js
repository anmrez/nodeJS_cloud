
  let role

module.exports = function(req, jwt){
  // проверка роли Админа
  if ( `ADMIN` == jwt ) {
    role = true
  } else {
    role = false
  }
  return role
}
