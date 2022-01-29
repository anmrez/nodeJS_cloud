const fs = require('fs')
let data;
exports.SetLogging = function(req){
  date = new Date();
  fs.appendFile("Temp/logUsers.json", `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}    | ip: "${req.ip}" ||  id: "${req.session.id}" \n`, function(error){
      if(error) throw error; // если возникла ошибка
  });
}
