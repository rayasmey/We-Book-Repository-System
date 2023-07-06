import Room from '../models/roomsModel.js';
import {createReadStream} from 'fs';
import { join } from 'path';
import * as url from 'url';

export async function addNewPicture(req, res, next) {
    try {
        const { room_id } = req.params;
     
        const room = await Room.findById(room_id);
        if(!room){
            next(new Error("Room doesnt exist"));
        }
        room.pictures = [...room.pictures, { pictureName: req.file.filename }];
        await room.save();
        res.json(room.pictures)
    } catch (e) {
        next(e)
    }
}

export async function getPictureByName(req, res, next) {
    try {
        const { room_id, pictureName } = req.params;
        const room = await Room.findById(room_id)
        const picture = room.pictures.find(picture => picture.pictureName === pictureName);
        if(!picture){
            return next(new Error('Picture not found'));
        }
        createReadStream(join(url.fileURLToPath(new URL('.', import.meta.url)), '../', 'uploads', picture.pictureName)).pipe(res);
    } catch (e) {
        next(e)
    }
}
