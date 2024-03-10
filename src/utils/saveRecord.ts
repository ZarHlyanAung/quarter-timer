export const saveRecord = (minutes: number) => {
  //save minutes to local storage with json stringify
  if (localStorage.getItem('minutes') === null) {
    localStorage.setItem('minutes', JSON.stringify(minutes));
  } else {
    const minutesSaved = JSON.parse(localStorage.getItem('minutes') || '0');
    localStorage.setItem('minutes', JSON.stringify(minutesSaved + minutes));
  }
};
