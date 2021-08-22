const { Controller } = require( '../../system/controllers/Controller' );
const autoBind = require( 'auto-bind' );
const multer = require( 'multer' );
const fs = require( 'fs' );
const { ExcelDataUploadService } = require('../services/ExcelDataUploadService');
const { ExcelDataUpload } = require('../models/ExcelDataUpload');
const { Student } = require('../models/Student');
const { StudentService } = require('../services/StudentService');
const utils = require( '../../system/helpers/Utility' ),
    config = require( '../../config/config' ).getConfig(),
    excelDataUploadService = new ExcelDataUploadService(
        new ExcelDataUpload().getInstance()
    );
    const studentService = new StudentService(
        new Student().getInstance()
    );
    const excelFilter = (req, file, cb) => {
        if (
          file.mimetype.includes("excel") ||
          file.mimetype.includes("spreadsheetml")
        ) {
          cb(null, true);
        } else {
          cb("Please upload only excel file.", false);
        }
      };

class ExcelDataUploadController extends Controller {

    // file upload using multer
    storage = multer.diskStorage( {
        'destination': function( req, file, cb ) {
            const dir = config.UPLOAD_EXCEL_PATH;

            fs.exists( dir, ( exist ) => {
                if ( !exist ) {
                    return fs.mkdir( dir, ( error ) => cb( error, dir ) );
                }
                return cb( null, dir );
            } );
        },
        'filename': function( req, file, cb ) {
            const fileOriginalName = utils.slugify( file.originalname );

            cb( null, `${( new Date() ).getTime() }-${ fileOriginalName}` );
        }
    } );
    upload = multer( {
        'fileFilter': excelFilter,
        'storage': this.storage,
        'limits': {
            'fileSize': 1024 * 1024 * 5
        }
    } );

    constructor( service ) {
        super( service );
        autoBind( this );
    }

    async insert( req, res, next ) {
        try {
            const uploadPath = config.UPLOAD_EXCEL_PATH;

            req.file.path = req.file.path.split( `${uploadPath }/` )[ 1 ];
            const uploadResponse = await this.service.insert( req.file );
            const docs = await this.service.readExcelFile(req, res)
            const response = await studentService.insertMany(docs)
            return res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }
    }

    

    async delete( req, res, next ) {
        const { id } = req.params;

        try {
            const response = await this.service.delete( id );
            // File Unlinking..

            if ( response.data.path ) {
                console.log( 'unlink item', response.data.path );
                fs.unlink( response.data.path, ( err ) => {
                    if ( err ) {
                        console.log( 'error deleting file' );
                        throw err;
                    }
                    console.log( 'File deleted!' );
                } );
            }
            return res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }
    }

}

module.exports = new ExcelDataUploadController( excelDataUploadService );
