console.log('May the Nodemon be unleashed!')

const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

//View engine for Display of 
app.set('view engine', 'ejs');

//Allows for Server to read JSON
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

//Allows Express access to files in 'public' folder
app.use(express.static('public'))



MongoClient.connect('mongodb://skrone:tribes@ds161041.mlab.com:61041/tribes', (err, database) => {
	if(err) return console.log(err)
	db = database
	app.listen(3002, () => {
		console.log('listening on 3002')
	})
})

app.listen(3001, function() {
	console.log('listening on 3001')
})


//URL Get that Displays a webpage (No angular representation)
// app.get('/', (request,response) => {
// 	response.sendFile(__dirname + '/index.html')
// })

app.post('/quotes', (req,res) =>{
	db.collection('quotes').save(req.body, (err,result) => {
		if(err) return console.log(err)

		console.log('saved to database (Collection: quotes)')
		res.redirect('/')
	})
} )

app.put('/quotes', (req,res) => {
	db.collection('quotes')
	.findOneAndUpdate({name: 'Yoda'},
	{
		$set: {
			name: req.body.name,
			quote: req.body.quote
		}
	},
	{
		sort: {_id: -1},
		upsert: true
	}, 
	(err, result) => {
		if(err) return res.send(err)
		res.send(result)
	})
})

app.delete('/quotes', (req,res) => {
	db.collection('quotes').findOneAndDelete(
	{name: req.body.name},
  	(err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A darth vadar quote got deleted'})
  })
})


app.post('/CreateNewUser', (req,res) =>{

	db.collection('UserPerson').save(req.body, (err,result) => {

		if(err) return console.log(err)

		console.log('saved to database (Collection: UserPerson)')
		res.redirect('/signin')
	})
} )


//URL Get that gets a MongoDB collection of quotes
app.get('/', (req,res) => {
	var cursor = db.collection('quotes').find()

	db.collection('quotes').find().toArray(function(err, results) {
  	if (err) return console.log(err)
  	//console.log(results)

  	// send HTML file populated with quotes here
 	 res.render('index.ejs', {quotes:results} )
	})
	
	//console.log(cursor)

})


app.get('/register', (req,res) => {
	// console.log('Hit');
	res.render('register.ejs');
})

app.get('/signin', (req,res) => {
	// console.log('Hit');
	res.render('signin.ejs');
})


app.get('/home', (req,res) => {

	console.log('Looking for Person in DB');

	console.log(req.body);

	var isHeAUser = false;

	db.collection('UserPerson').find({'username':username,'password':password}, function(err, user)
	{
		if(err)
		{
			console.log('Signup Error');
			return done(err);
		}

		if(user.length!=0){
			if(user[0].username){
				isHeAUser = true;
			}
			var err = new Error();
			err.status = 310;
			return done(err);
			
		}

	} )

	var collectionArray = db.collection('UserPerson').find().toArray(function(err, results) {
  	if (err) return console.log(err);})
	console.log(person);

	var isHeAUser = true;
	if(isHeAUser)
		res.render('signin_homepage.ejs');
	else
		res.render('signin.ejs');

})





