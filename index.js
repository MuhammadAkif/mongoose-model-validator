

class ValidateModel {
    constructor() {
        this.hasError = false;
        this.type = null;
        this.errors = [];
    };

    /**
     * @param {Object}              [modelInsatnce={}(document object)]
     *
     * @returns {Promise}
     */

    static validateDocument() {
        const validator = new ValidateModel();
        return new Promise((resolve, reject) => {
            this.validate((err) => {
                if (err) {
                    validator.hasError = true;
                    if (err.name === 'ValidationError') {
                        validator.type = 'ValidationError';
                        for (let field in err.errors) {
                            validator.errors.push(err.errors[field].message);
                        }
                        reject(validator);
                    }
                }
                return resolve(validator);
            });
        });
    }

}


module.exports = function (schema) {
    schema.methods.validateDocument = ValidateModel.validateDocument;
};
