'use strict' ; 
const { Service } = require('../../system/services/Service') ; 
const readXlsxFile = require("read-excel-file/node");
const { HttpResponse } = require('../../system/helpers/HttpResponse');
const config = require( '../../config/config' ).getConfig()


class ExcelDataUploadService extends Service {
    constructor(model) {
        super(model)
    }

    readExcelFile = async (req, res) => {
        try {
            if (req.file == undefined) {
                return res.status(400).send("Please upload an excel file!");
            }

            let path = config.UPLOAD_EXCEL_PATH + "/" + req.file.filename;

            return await readXlsxFile(path).then((rows) => {
                let columns = Object.values(rows[0])
            // skip header
                rows.shift();

                let docs = [];

                rows.forEach((row) => {
                    let doc = {};
                    columns.forEach((col, index) => {
                        doc[col] = row[index]
                    })

                    docs.push(doc);
                });

                return docs
                // try {
                //     const options = { ordered: true };
                //     const resp = await srvcInstance.insertMany(docs, options)
        
                //     if ( result ) {
                //         return new HttpResponse( result );
                //     }
                //     throw new Error( 'Something wrong happened' );
                    
                // } catch ( error ) {
                //     throw error;
                // }
                
            });
        } catch (error) {
            throw error
        }
        };

    

}

module.exports = { ExcelDataUploadService }