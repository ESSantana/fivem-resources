fx_version 'celurean'

game 'gta5'

author 'Emerson'
description 'Car manager resource'
version '1.0.0'

client_script 'index.js'

ui_page './html/index.html'

files {
  './html/index.html',
  './html/index.js',
  './html/style.css',
  './html/sounds/car_lock.ogg',
  './html/icons/lock-off.png',
  './html/icons/lock-on.png',
  './html/icons/seatbelt-off.png',
  './html/icons/seatbelt-on.png',
}

dependencies {
  "utils"
}
