import { Router } from 'express';
import { getAllReservations, addNewReservation, getOneReservationById, updateReservationById, deleteReservationById} from '../controllers/reservationsController.js';
import { checkDate } from '../middlewares/checkDate.js';

const router = Router({mergeParams:true});

router.get('/', getAllReservations);
router.post('/', checkDate, addNewReservation);
router.get('/:reserve_id', getOneReservationById);
router.patch('/:reserve_id', checkDate, updateReservationById);
router.delete('/:reserve_id', deleteReservationById);

export default router;