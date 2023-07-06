export async function checkDate(req, res, next){
 
    const { checkInDate, checkOutDate } = req.body;
    const now = new Date().toISOString().slice(0,10);
    if(checkInDate >= checkOutDate){
        return next(new Error('Check-out date should be later than Check-in date'));
    }
    if(checkInDate < now ){
        return next(new Error('Check-in date should be later than today'));
    }
    if(checkOutDate <= now){
       return next(new Error('Check-out date should be later than today'));
    }else{
       return next();
  }
}