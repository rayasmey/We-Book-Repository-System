import {Router} from 'express';
import { checkRole } from '../middlewares/checkRole.js';
import { addNewRoom, deleteRoomById, getAllRooms, getNearByRooms, getOneRoomById, updateRoomById } from '../controllers/roomsController.js';
import reservationRouter from './reservationsRouter.js';
import pictureRouter from './picturesRouter.js';
import { deleteResForUser, getAllReservationsForAUser, getOneReservationForUser, updateReservationForUser } from '../controllers/reservationsController.js';
import { checkAuth } from '../middlewares/authChecker.js';
import { checkDate } from '../middlewares/checkDate.js';


const router = Router();
router.get('/reservations', checkAuth,getAllReservationsForAUser);
router.get('/', checkAuth,getAllRooms);
router.get('/:room_id', checkAuth, getOneRoomById);
router.post('/nearby', checkAuth, getNearByRooms);
router.post('/', checkAuth,checkRole, addNewRoom);
router.put('/:room_id', checkAuth, checkRole, updateRoomById);
router.delete('/:room_id', checkAuth, checkRole, deleteRoomById);
router.put('/reservations/:reserve_id', checkDate, checkAuth, updateReservationForUser);
router.get('/reservations/:reserve_id', checkAuth, getOneReservationForUser);
router.delete('/reservations/:reserve_id', checkAuth, deleteResForUser);

router.use('/:room_id/reservations', checkAuth, reservationRouter);
router.use('/:room_id/pictures', pictureRouter);

export default router;