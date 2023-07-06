import Room from '../models/roomsModel.js';

export async function addNewRoom(req, res, next) {
    const new_room = req.body;
    try {
        const room = await Room.create(new_room);
        res.json({ success: true, data: room });
    } catch (error) {
        next(error);
    }
}
 export async function getNearByRooms(req, res, next){
    const { location } = req.body;
    try {
        const result = await Room.find({location: {$near: location}});
        res.json({success: true, data: result});
    } catch (error) {
        next(error);
    }
 }

export async function getAllRooms(req, res, next) {
    try {
        const result = await Room.find({});
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}

export async function getOneRoomById(req, res, next) {
    const { room_id } = req.params;
    try {
        const room = await Room.findOne({ _id: room_id });
        if (!room) {
            return res.status(process.env.NOT_FOUND).json({ error: 'Room not found' });
        }
        res.json({ success: true, data: room });
    } catch (error) {
        next(error);
    }
}

export async function updateRoomById(req, res, next) {
    const { room_id } = req.params;
    const { type, price_per_day, hotel_name, location } = req.body;
    try {
        
        const result = await Room.updateOne({ _id: room_id }, 
            { $set: {type: type, price_per_day: price_per_day, hotel_name: hotel_name, location: location}});
        if (!result) {
            return next(new Error("Room doesnt exist"));
        }
        res.json({ success: true, data: result });
    } catch (error) {
        next(e);
    }
}

export async function deleteRoomById(req, res, next) {
    const { room_id } = req.params;
    try {
        const result = await Room.deleteOne({_id: room_id });
        if (!result) {
            return res.status(process.env.NOT_FOUND).json({ error: 'Room not found' });
        }
        res.json({ success: true, data: result });
    } catch (error) {

    }
}