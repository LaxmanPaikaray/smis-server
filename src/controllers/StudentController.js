const { Controller } = require( '../../system/controllers/Controller' );
const { Student } = require('../models/Student');
const { StudentService } = require('../services/StudentService');
const autoBind = require( 'auto-bind' );
    
const studentService = new StudentService(
        new Student().getInstance()
    );

class StudentController extends Controller {

    constructor( service ) {
        super( service );
        autoBind( this );
    }

}

module.exports = new StudentController( studentService );
