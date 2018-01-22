
export function saveStatToLocalStorage(totalPoints, gamesPlayed){
    localStorage.setItem('totalPoints', totalPoints);
    localStorage.setItem('gamesPlayed', gamesPlayed);
  }
  
  export function getStatFromLocalStorage(){
    const totalPoints = localStorage.getItem('totalPoints');
    const gamesPlayed = localStorage.getItem('gamesPlayed');
    if(typeof(gamesPlayed) === "undefined"){
        return {totalPoints: 0, gamesPlayed: 0};
    }
    return {totalPoints: Number(totalPoints), gamesPlayed: Number(gamesPlayed)};
  }
  
  export function removeStatFromLocalStorage(){
    localStorage.removeItem('totalPoints');
    localStorage.removeItem('gamesPlayed');
  }