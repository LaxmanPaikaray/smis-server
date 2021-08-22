'use strict';
const { Service } = require( '../../system/services/Service' );

class StudentService extends Service {
    constructor( model ) {
        super( model );
    }

}

module.exports = { StudentService };
