const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var CryptoJS = require('aes.js');

function encrypt(str) {
  var key = '712A9C5160267739'
  var iv = '712A9C5160267739'
  var pwd = CryptoJS.encrypt(str, key, iv)
  //console.log('AES加密:' + pwd)
  return pwd
}

function decrypt(pwd) {
  var key = '712A9C5160267739'
  var iv = '712A9C5160267739'
  var ori = CryptoJS.decrypt(pwd, key, iv);
  return ori
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  formatTime: formatTime
}