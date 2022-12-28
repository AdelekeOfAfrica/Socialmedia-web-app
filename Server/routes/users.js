import express from  "express";
import{
        getUser,
        getUserFriends,
        addRemoveFriend
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ of the crud function

router.get("/:id", verifyToken, getUser); // this is going to be users/some id 
router.get("/:id/friends", verifyToken, getUserFriends);

//update of the routes function 
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;

