const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );

class ExcelDataUpload {

    initSchema() {
        const schema = new Schema( {
            'originalname': {
                'type': String,
                'required': false,
            },
            'encoding': {
                'type': String,
                'required': false,
            },
            'mimetype': {
                'type': String,
                'required': false,
            },
            'filename': {
                'type': String,
                'required': false,
            },
            'path': {
                'type': String,
                'required': false,
            },
            'size': {
                'type': Number,
                'required': false,
            }
        }, { 'timestamps': true } );

        try {
            mongoose.model( 'exceldataupload', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'exceldataupload' );
    }
}

module.exports = { ExcelDataUpload };
