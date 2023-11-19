export function calcTime(reservationTime){
    if(!reservationTime){
        return 0;
    }
    const timestamp = new Date(reservationTime).getTime();
    const timeNow = new Date().getTime();
    const timeRemaining = timeNow - timestamp;
    const timePassed = 60 * 60 * 1000 - timeRemaining;
    const timeToMin = Math.ceil(60 - ((60 * 60 * 1000 - timePassed) / (60 * 1000)));
    return Math.max(timeToMin, 0);
}