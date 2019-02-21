# mongoose-model-validator
This package helps you in validating mongoose model instance.


# Code Examples

```
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
    
    Now create model instance
    
    let book = new Book({
                title: "Beauty and the Beast",
                authorName: "Gabrielle-Suzanne de Villeneuve",
                price: 1000
            });
            
    let promise = book.validateDocument();
    
    promise.then((result) => {
        if(!result.hasError){
            return book.save();
        }
    }).catch((error) => {
        // error.errors contains array of all validation errors
        return Promise.reject({error: error.errors}); 
    });      
```

You can also use async/await with validateDocument() method as it is returning a promise.
