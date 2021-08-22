const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );
const slugify = require( 'slugify' );

class Student {

    initSchema() {
        const schema = new Schema( {
            'student_name': {
                'type': String,
                'required': true,
            },
            'roll_no': {
                'type': String,
                'required': true,
            },
            'father_name': {
                'type': String,
                'required': true,
            },
            'mother_name': {
                'type': String,
                'required': true,
            },
            'father_occupation': {
                'type': String,
                'required': true,
            },
            'mother_occupation': {
                'type': String,
                'required': true,
            },
            'section_id_fk': {
                'type': String,
                'required': true,
            },
            'address': {
                'type': String,
                'required': true,
            },
            'profile_photo': {
                'type': String,
                'required': true,
            },
            'isContinuing': {
                'type': Boolean,
                'required': true,
            }
        }, { 'timestamps': true })

        schema.pre( 'save', function( next ) {
            const student = this;
            return next();
        } );
        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'student', schema );
        } catch ( e ) {

        }
    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'student' );
    }
}

module.exports = { Student };