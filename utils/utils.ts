export const formatTime: (time: number) => string = (time) => {

  let minutes: number = Math.floor(Math.round(time) / 60);
  let seconds: number = Math.floor(Math.round(time) % 60);

  let minutesString: string = '';
  let secondsString: string = '';

  if (minutes < 10) minutesString = '0' + minutes.toString();
  else minutesString = minutes.toString();

  if (seconds < 10) secondsString = '0' + seconds.toString();
  else secondsString = seconds.toString();


  return [minutesString, secondsString].join(':');
}