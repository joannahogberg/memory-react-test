export function saveStatToLocalStorage(totalPoints, gamesPlayed){
    // localStorage.setItem('totalPoints', totalPoints);
    // localStorage.setItem('gamesPlayed', gamesPlayed);
    localStorage.setItem("totalPoints", Number(JSON.stringify(totalPoints)));
    localStorage.setItem("gamesPlayed", Number(JSON.stringify(gamesPlayed)));
  }
  
  export function getStatFromLocalStorage(){
    const totalPoints = localStorage.getItem('totalPoints');
    const gamesPlayed = localStorage.getItem('gamesPlayed');
    return {totalPoints: Number(totalPoints), gamesPlayed: Number(gamesPlayed)};
  }
  
  export function removeStatFromLocalStorage(){
    localStorage.removeItem('totalPoints');
    localStorage.removeItem('gamesPlayed');
  }