import * as localStorageUtils from '../utils/localStorage';

beforeEach(() =>{
  localStorage.clear();
});

afterEach(() =>{
  localStorage.clear();
});

it("should get the statistic values from localStorage", () => {
    // localStorage.clear();
//   let stats = { totalPoints: '24', gamesPlayed: '2' };
  const val1= 24;
  const val2 = 2;
  
localStorage.setItem("totalPoints", 24);
  localStorage.setItem("gamesPlayed", 2);

  const getStats = localStorageUtils.getStatFromLocalStorage();
console.log(getStats)
//   expect(getStats).toBe(stats);
//   expect(localStorage.getItem).toHaveBeenCalled();
 
});
















// it("should get empty user from localStorage", () => {
//   const getStats = localStorageUtils.getStatFromLocalStorage();
//   expect(localStorage.getItem).toHaveBeenCalled();
//   expect(getStats.gamesPlayed).toBe(0);
// });