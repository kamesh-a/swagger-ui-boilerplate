const YAML = require('yamljs');
const {extname} = require('path');
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');

const {
    openApiDocs
} = require('../util/walk-dir');

/**
 * Extra configuration options for swagger
 * for customization
 */
const options = {
    explorer: false
}

// https://www.npmjs.com/package/swagger-ui-express
// section: Modify swagger file on the fly before load
const dynamicOpenApiDocMiddleware = function (req, res, next) {
    const fileName = req.params.fileName;
    if( !openApiDocs[fileName]) {
        return res.send(`Invalid API fileName: ${fileName}`);
    }
    /**
     * {
     *  fileName: `swagger.json`
     *  filePath: `/director/swagger.json`
     * }
     */
    const { filePath } = openApiDocs[fileName];
    const swaggerDocument = extname(filePath) === '.json'? require(filePath) : YAML.load(filePath)
    req.swaggerDoc = swaggerDocument;
    next();
};

router.use('/api/docs', swaggerUi.serve);
router.get('/api/docs/:fileName', dynamicOpenApiDocMiddleware, swaggerUi.setup(null,options));

module.exports = router;