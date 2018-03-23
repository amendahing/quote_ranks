var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.use(bodyParser.json());
var path = require('path');
app.use(express.static( __dirname + '/angular/dist' ));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost/authors_crud');
mongoose.Promise = global.Promise;

var AuthorSchema = new mongoose.Schema({
    full_name: {type: String, required: true, minlength: 3}, quote: [{cont:{type: String}, vote:{type: Number, default:0}}]
});

// var AuthorSchema = new mongoose.Schema({
//     full_name: {type: String, required: [true,"Author must have a name"],
//         minlength: [3, "Author name must be more than 3 characters"]},
//         //array of quotes and each object has two attributes in it
//      quote: [{ cont: { type: String, required: [true, "Quote must be provided"],
//              minlength: [3, "Quote must be more than 3 characters"]},
//                 vote: { type: Number, default: 0}}],
// }, { timestamps: true });

// var AuthorSchema = new mongoose.Schema({
//     full_name: {type: String, required: true, minlength: 3}, quote: [{cont:{type: String}, vote:{type: Number, default:0}}]
// });

mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author')


app.get('/authors', function(req, res) {
    Author.find({}, function(err, data){
        if (err) {
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message:"Success", authors: data})
        }
    })
})


app.post("/authors/new", function(req, res){
    console.log(req.body);
    var author = new Author ({full_name: req.body.full_name});
    author.save(function(err, data){
        if(err) {
            console.log('something went wrong');
            res.json({errors: "Name needs to be at least 3 characters."});
            // res.json(err)
        } else {
          console.log('Successfully added author:', req.body.full_name);
          console.log(data);
          res.json(data);
        }
    })
})


app.get("/authors/:id", function(req, res){
    Author.findOne({_id: req.params.id}, function(err, data){
        if (err) {
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message:"Display", data: data})
        }
    })
})


app.delete("/authors/remove/:id", function(req, res){
    Author.remove({_id: req.params.id}, function(err, data) {
        if (err) {
            console.log('something went wrong');
            res.json({message: "Error", error: err});
        }
        else {
            console.log('removed', req.params.task);
            res.json({message:"Removed"})
        }
    })
})


app.put("/authors/update/:id", function(req, res) {
    Author.find({_id: req.params.id}, function(err, data){
        if (err) {
            res.json({message: "Error", error: err})
        }
        else {
            if (req.body.full_name.length < 3) {
                console.log("Author's name must be at least 3 chars to edit");
                res.json({errors: "Name needs to be at least 3 characters."});
            }
            else {
                Author.update({_id: req.params.id}, {full_name: req.body.full_name}, function(err, data){
                    if (err) {
                        console.log('something went wrong');
                        res.json({message: "Error", error: err})
                    }
                    else {
                        console.log(data);
                        res.json({message: "Updated", full_name: req.body.full_name})
                    }
                })
            }
        }
    })
})


app.get('/author_quotes/:id', function(req, res){
    console.log(req.params.id);
    Author.findOne({_id: req.params.id}, function(err, data){
        if (err) {
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message:"Display", data: data})
        }
    })
})

app.put('/author_quotes/new/:id', function(req, res) {
    console.log("Quote submitted for author:", req.params.id, req.body.data);
    Author.findOne({_id:req.params.id},function(err,data){
        if(err){
            console.log(err)
            res.status(500).send(err)
        }else{
            console.log(data.quote)
            data.quote.push({cont:req.body.data})
            data.save()
            res.json(data)
        }
    })
})

app.post('/author_quotes/delete/:id', function(req, res) {
    console.log("FROM DELETE SERVER", req.params.id, req.body.data);
    Author.update({_id: req.params.id}, {$pull: {quote: {_id: req.body.data}}}, function(err, data) {
        if (err) {
            console.log('something went wrong');
            res.json({message: "Error", error: err});
        }
        else {
            console.log('removed', req.body.data);
            res.json({message:"Removed"})
        }
    })
})


app.post('/author_quotes/upvote/:id', function(req, res) {
    console.log('hit the server', req.params.id, req.body.data);
    Author.update({'quote._id': req.body.data}, {$inc: {'quote.$.vote': 1}}, function(err, data) {
        if (err) {
            console.log('upvote did not work');
            res.json({message: "Error", error: err});
        }
        else {
            console.log('quote has been upvoted', req.body.data);
            res.json({message:"Upvoted"})
        }
    })

})


app.post('/author_quotes/downvote/:id', function(req, res) {
    console.log('hit the server', req.params.id, req.body.data);
    Author.update({'quote._id': req.body.data}, {$inc: {'quote.$.vote': -1}}, function(err, data) {
        if (err) {
            console.log('upvote did not work');
            res.json({message: "Error", error: err});
        }
        else {
            console.log('quote has been upvoted', req.body.data);
            res.json({message:"Upvoted"})
        }
    })

})



app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./angular/dist/index.html"))
    });


app.listen(8000, function() {
    console.log("listening on port 8000");
})

    // full_name: {type: String, required: true, minlength: 3}, quote: [{cont:{type: String}, vote:{type: Number, default:0}}] //Bo's Suggestion

// Author.update({_id: req.params.id}, {quote: "added quote" }, function(err, data){
//     if (err) {
//         console.log("Something went wrong; quote not added")
//         res.json({message: "Error", error: err})
//     }
//     else {
//         console.log(data);
//         res.json({message: "Added quote!", quote: req.body.data})
//     }
// })

// Author.update({_id: req.params.id}, function (err, data) {
//     data.quote.push({content: " Added Quote !!!!!!!!!!!"})
//     if (err) {
//         console.log("Something went wrong; quote not added")
//         res.json({message: "Error", error: err})
//     }
//     else {
//         console.log(data);
//         res.json({message: "Added quote!"})
//     }
// })
