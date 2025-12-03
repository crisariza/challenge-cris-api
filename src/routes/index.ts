import { Router } from "express";
import appRoutes from "./routes";

const router = Router();

router.use("/paisabank", appRoutes);

export default router;
