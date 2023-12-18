export function calcTime(reservationTime){
    if(!reservationTime){
        return 0;
    }
    const reservationEnd = new Date(reservationTime);
    const timeNow = new Date();
    return Math.floor((reservationEnd - timeNow) / (1000 * 60));
}