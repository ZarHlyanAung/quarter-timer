export const saveRecord = (minutes: number) => {
  //save minutes to local storage with json stringify
  localStorage.setItem('minutes', JSON.stringify(minutes));
};
