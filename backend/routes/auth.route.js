import express from "express";
import {
  login,
  logout,
  signup,
  authCheck,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/authcheck", protectRoute, authCheck);

export default router;

//NfaRLUKVWO3gLlRt
