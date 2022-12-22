import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from 'multer';
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from "url";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url); // this is the module that we import that time 
const __dirname = path.dirname(__filename); 
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({ limit:"30mb", extended:true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */ //location of where all your images are going to be saved when they upload an image for our storagewe use multer 
const storage = multer.diskStorage({
    destination: function (req, file,cb){
        cb(null, "public/assets");
    },
    filename: function(req, file,cb){
        cb(null, file.originalname);

    }
});

const upload = multer({ storage });

/* MONGOOSE SETUP*/

mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 6001;//if d port those not work go to port 6001 as backup;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() =>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));

})
.catch((error)=>console.log(`${error} did not connect `));