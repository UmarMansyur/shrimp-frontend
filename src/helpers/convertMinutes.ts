

function convertMinutes(time: any) {
  if(!time.hours && !time.minutes && !time.seconds){
    return time;
  }
  if(time.hours < 10){
    time.hours = '0' + time.hours;
  }
  if(time.minutes < 10){
    time.minutes = '0' + time.minutes;
  }
  if(time.seconds < 10){
    time.seconds = '0' + time.seconds;
  }
  return time.hours + ':' + time.minutes + ':' + time.seconds;
}


export {
  convertMinutes
}