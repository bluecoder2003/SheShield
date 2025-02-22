import { Router } from "express"
import userRouter from "../routes/auth.js"
import reportRouter from "../routes/report.js"
const route=Router();
route.use('/auth', userRouter);
route.use('/report',reportRouter);
export default route;