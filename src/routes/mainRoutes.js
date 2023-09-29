import { Router } from "express";
import { home, crearClientePagina, eliminarCliente, ingresarCliente, editarCliente, editandoCliente } from "../controllers/mainControllers.js";

const routes = Router();


routes.get("/", home);
routes.get("/crear-clientes", crearClientePagina);
routes.get("/eliminar", eliminarCliente);
routes.post("/ingresar-clientes", ingresarCliente);
routes.get("/editar", editarCliente);
routes.post("/editando-cliente", editandoCliente);

export default routes;





