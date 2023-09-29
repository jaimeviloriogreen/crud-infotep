import express from "express";
import routes from "./routes/mainRoutes.js";
import hbs from "hbs";


const port = process.env.PORT || 4500;

const app = express();

const { pathname:viewHBS } = new URL("./views", import.meta.url);
const { pathname:partialHBS } = new URL("./views/partials", import.meta.url);

app.use(express.urlencoded({extended:true}));
app.use(express.json({"Content-Type":"application/json"}))
app.use(routes);
app.use(express.static("src/public"));
app.set("view engine", "hbs");
hbs.registerPartials( partialHBS , (err)=> {});


app.set("views", viewHBS);

app.listen(port, ()=> console.log(`Running on port ${port}`));