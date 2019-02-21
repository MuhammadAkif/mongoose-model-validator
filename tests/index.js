'use strict';

let mongoose = require('mongoose');
let expect = require('chai').expect;
let mongooseModelValidator = require('../index');

let BookSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: [5, 'Title must be 10 characters long'],
        require:[true, 'Please provide a title']
    },
    authorName: {
        type: String,
        minlength: [2, 'Author name must be 2 characters long'],
        maxlength: [100, 'Author name should be less than 100 characters'],
        require:[true, 'Please provide a title']
    },
    price: {
        type: Number,
        min: 10,
        max: 1000000
    }
});

BookSchema.plugin(mongooseModelValidator);

let Book = mongoose.model('Book', BookSchema);

describe('mongoose-model-validation', function() {
    it('should validate the model', function () {
        let book = new Book({
            title: "Beauty and the Beast",
            authorName: "Gabrielle-Suzanne de Villeneuve",
            price: 1000
        });
        let promise = book.validateDocument();
        promise.then((result) => {
            expect(result.hasError).to.equal(false);
            expect(result.type).to.be.null;
            expect(result.errors).to.have.length(0);

        }).catch((error) => {
            console.error(error);
        });
    });

    it('should return validation error for title and price', function() {
        let book = new Book({
            title: "Bea",
            authorName: "Gabrielle-Suzanne de Villeneuve",
            price: -1
        });
        let promise = book.validateDocument();
        promise.then().catch((error) => {
            expect(error.hasError).to.equal(true);
            expect(error.type).to.equal("ValidationError");
            expect(error.errors).to.have.length(2);
        }).catch((error) => {
            console.error(error);
        });
    });

    it('should return validation error for Author Name', function() {
        let book = new Book({
            title: "Beauty and the Beast",
            authorName: "D",
            price: 100
        });
        let promise = book.validateDocument();
        promise.then().catch((error) => {
            expect(error.hasError).to.equal(true);
            expect(error.type).to.equal("ValidationError");
            expect(error.errors).to.have.length(1);
        }).catch((error) => {
            console.error(error);
        });
    });

    it('should return proper validation message', function(done) {
        let book = new Book({
            title: "Beauty and the Beast",
            authorName: "D",
            price: 100
        });
        let promise = book.validateDocument();
        promise.then().catch((error) => {
            expect(error.hasError).to.equal(true);
            expect(error.type).to.equal("ValidationError");
            expect(error.errors).to.have.length(1);
            expect(error.errors).to.include("Author name must be 2 characters long");
            done();
        }).catch((error) => {
            console.error(error);
        });
    });
});
