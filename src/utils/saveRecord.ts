export const saveRecord = (minutes) => {
  //save minutes to local storage with json stringify
  localStorage.setItem('minutes', JSON.stringify(minutes));
};
