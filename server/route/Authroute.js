import signup from "../controllers/Authentication/Signup.js";
import verifyotp from "../controllers/Authentication/Verifyotp.js";
import login from "../controllers/Authentication/Login.js";
import changepassword from "../controllers/Authentication/Changepassword.js";
import verifyJwt from "../middleware/Verifyjwt.js";
import logout from "../controllers/Authentication/Logout.js";
import addstore from "../controllers/Storeowner/Addstore.js";
import Viewstore from "../controllers/User/ViewStore.js";
import Ratingstore from "../controllers/User/RatingStore.js";
import ViweStoreOnwer from "../controllers/Storeowner/ViewTheirstore.js";
import Fetchratinguser from "../controllers/Storeowner/ViewALLraringformuser.js";
import Searchstore from "../controllers/User/SearchStore.js";
import ADDuserSystemStore from "../controllers/SystemAdministration/ADDuser.js";
import ADDuserSystemoruser from "../controllers/SystemAdministration/Addnewuserorstore.js";
import GetAluser from "../controllers/SystemAdministration/AlltheuserAdmin.js";
import GetAlStore from "../controllers/SystemAdministration/Allthestoreowner.js";
import Getyourinfo from "../controllers/Authentication/GetYourinfo.js";
import express from 'express';

const router = express.Router();
router.post('/signup', signup);
router.post('/verify-otp', verifyotp);
router.post('/login', login);
router.post('/change-password', verifyJwt, changepassword);
router.get('/logout', verifyJwt, logout);
router.post('/add-store', verifyJwt, addstore);
router.get("/logoutstoreowner", logout);
router.post("/change-passwordstoreowner", verifyJwt, changepassword);
router.get("/view-stores", verifyJwt, Viewstore);
router.post("/rate-store", verifyJwt, Ratingstore);
router.get("/ownerviewstote", verifyJwt, ViweStoreOnwer)
router.get("/fetchallratingbyuser", verifyJwt, Fetchratinguser)
router.post("/searchstore", verifyJwt, Searchstore)
router.post("/adduserasystem", verifyJwt, ADDuserSystemStore)
router.post("/ADDuserSystemoruser", verifyJwt, ADDuserSystemoruser);
router.get("/aluser", verifyJwt, GetAluser)
router.get("/getallstore", verifyJwt, GetAlStore)
router.get("/infoget", verifyJwt, Getyourinfo)
export default router;