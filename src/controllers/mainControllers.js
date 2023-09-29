import { request, response } from "express";
import 'dotenv/config';
import connectToMysql from "../database/connection.js";

const { DB_HOST, DB_USER, DB_DATABASE, DB_PASS, DB_PORT } = process.env;
const connection = await connectToMysql( DB_HOST, DB_USER, DB_DATABASE, DB_PASS, DB_PORT );

const home = async (req = request, res = response)=>{
    const title = "Home";
    const sql = "SELECT * FROM clientes";

    const [ rows ] = await connection.execute(sql);
    
    res.render("index", { title, rows });
}
const crearClientePagina = (req = request, res = response)=>{
    const title = "Crear Clientes";
    res.render("crear-clientes", { title });
}
const eliminarCliente = async (req = request, res = response)=>{
    const { id } = req.query;
    const sql = "DELETE FROM clientes WHERE id_cliente = ?";

     const [affectedRows] = await connection.execute(sql, [id]);

    res.redirect("/");
}
const ingresarCliente = async(req = request, res = response)=>{
   try {
        const {nombre, apellido, cedula, edad, direccion} = req.body;
        const sql = "INSERT INTO clientes(nombre, apellido, cedula, edad, direccion) VALUES(?, ?, ?, ?, ?)";

        const edadInt = parseInt(edad);

        const [ ResultSetHeader ] = await connection.execute(sql, [nombre, apellido, cedula, edadInt, direccion]);

        const { affectedRows, insertId } = ResultSetHeader;

        // console.log( affectedRows, insertId);
        res.redirect("/");
   } catch (error) {
        res.send(error.message)
   }
}

const editarCliente = async(req = request, res = response)=>{
    const title = "Actualizar cliente";
    const { id } = req.query;
    
    const sql = "SELECT * FROM clientes WHERE id_cliente = ?";

    const [ [ cliente ] ] = await connection.execute(sql, [ id ]);
    
    res.render("editar-cliente",  { title, cliente });

}

const editandoCliente = async (req = request, res = response)=>{
    const {nombre, apellido, cedula, edad, direccion, id} = req.body;

    const sql = `
        UPDATE clientes SET nombre = ?, apellido = ?, cedula = ?, edad = ?, direccion = ?
        WHERE id_cliente = ?
    `;

    const [{affectedRows}] = await connection.execute(sql, [nombre, apellido, cedula, edad,direccion, id]);
    
    // console.log(affectedRows);

    res.redirect("/");
    
}

export{ home, crearClientePagina, eliminarCliente, ingresarCliente, editarCliente, editandoCliente }