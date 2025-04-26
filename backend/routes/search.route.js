import express from "express";
import { searchMovie,searchPerson,searchTv,getSearchHistory,deleteItemFromSearchHistory } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query",searchPerson);
router.get("/movie/:query",searchMovie);
router.get("/tv/:query",searchTv);

router.get("/history", getSearchHistory);
router.delete("/history/:id",deleteItemFromSearchHistory);


export default router;