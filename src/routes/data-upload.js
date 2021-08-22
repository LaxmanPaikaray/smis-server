'use strict'; 
const express = require( 'express' ),
    router = express.Router();
const AuthController = require( '../controllers/AuthController' );
const ExcelDataUploadController = require('../controllers/ExcelDataUploadController'); 

router.get( '/:id', AuthController.checkLogin, ExcelDataUploadController.get );
router.post( '/', [ ExcelDataUploadController.upload.single( 'file' ) ], ExcelDataUploadController.insert );
router.delete( '/:id', AuthController.checkLogin, ExcelDataUploadController.delete );


module.exports = router;
