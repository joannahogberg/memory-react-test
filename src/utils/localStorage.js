export function saveStatToLocalStorage(totalPoints, gamesPlayed){
    localStorage.setItem('totalPoints', totalPoints);
    localStorage.setItem('gamesPlayed', gamesPlayed);
    // localStorage.setItem("totalPoints", Number(JSON.stringify(totalPoints)));
    // localStorage.setItem("gamesPlayed", Number(JSON.stringify(gamesPlayed)));
  }
  
  export function getStatFromLocalStorage(){
    const totalPoints = localStorage.getItem('totalPoints');
    const gamesPlayed = localStorage.getItem('gamesPlayed');
    return {totalPoints: parseInt(totalPoints, 10), gamesPlayed: parseInt(gamesPlayed, 10)};
  }
  
  export function removeStatFromLocalStorage(){
    localStorage.removeItem('totalPoints');
    localStorage.removeItem('gamesPlayed');
  }