import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT 

app.use(cors({
    origin:process.env.CORS_ORIGIN ,
    credentials: true,
}));
app.use(express.json());

import userRoutes from "./routes/user.routes.js";
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
export default app;