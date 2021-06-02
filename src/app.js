const express = require('express');
const swaggerRouter = require('./router/swagger-route');

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: Add support for swagger editor
// TODO: Add support for swagger codegen

app.use(swaggerRouter);

app.listen(PORT, function(){
    console.log(`Swagger UI running on PORT:${PORT}`);
});