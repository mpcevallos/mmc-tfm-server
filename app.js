require("dotenv").config();
const express = require("express");
const cors = require("cors");
const citaRouter = require("./api/cita/cita.router");
const catalogoRouter = require("./api/catalogo/catalogo.router");
const app = express();

const usuarioRouter = require("./api/usuario/usuario.router");
// Habilitar CORS para todas las rutas
app.use(cors());
app.use(express.json());

app.use("/api/usuario", usuarioRouter);

app.use("/api/cita", citaRouter);
app.use("/api/catalogo", catalogoRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on PORT:", process.env.APP_PORT);
});

// app.get('/api', (req, res) => {
//     res.json({
//         success: 1,
//         message: 'This API is working',
//     });
// });
