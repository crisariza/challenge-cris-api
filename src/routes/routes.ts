import { Router } from "express";
import { login } from "../controllers/login/login.controller";
import { getCards } from "../controllers/cards/cards.controller";
import {
  getLastMovements,
  getAllMovements,
} from "../controllers/movements/movements.controller";
import { validateToken } from "../middleware/auth";

const router = Router();

router.post("/login", login);
router.get("/cards", validateToken, getCards);
router.get("/movements/last", validateToken, getLastMovements);
router.get("/movements/all", validateToken, getAllMovements);

export default router;
