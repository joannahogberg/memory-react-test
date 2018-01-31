import * as localStorageUtils from '../../utils/localStorage';

beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    localStorage.clear();
});


it('should get false value from localStorage', () => {
    const getStat = localStorageUtils.getStatFromLocalStorage();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(getStat.gamesPlayed).toBeFalsy();
});

it('should get stats from localStorage', () => {
    const totalPoints = 24;
    const gamesPlayed = 2;
    localStorageUtils.saveStatToLocalStorage(totalPoints, gamesPlayed)
    const getStat = localStorageUtils.getStatFromLocalStorage();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(getStat.gamesPlayed).toEqual(gamesPlayed);
});

it('should get false value from localStorage', () => {
    localStorageUtils.removeStatFromLocalStorage();
    const getStat = localStorageUtils.getStatFromLocalStorage();
    expect(getStat.gamesPlayed).toBe(0);
    expect(getStat.totalPoints).toBe(0);
});