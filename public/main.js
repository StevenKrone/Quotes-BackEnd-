
var update = document.getElementById('update');

update.addEventListener('click', function () {
  // Send PUT Request here
  fetch('quotes', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': 'Darth Vader',
    'quote': 'I find your lack of faith disturbing.'
  })
}).then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
})

var del = document.getElementById('delete');

//I've moved on from trying to have the "correct" value extracted from name.
//Instead of ejs, I'd like to be using AngularJS. 
//I can figure it out for ejs, but I'd have to relearn the solution.
var name = document.getElementById('name_delete').value;


del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': name
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload()
  })
})


//Used to Check what value is Passed from the 'name' constant

//I've moved on from trying to have the "correct" value extracted from name.

var check = document.getElementById("display value");
var doe = document.getElementById("show");

doe.addEventListener('click', function(){
    //name = 'Bla Bla Bla';
    check.value = name;
})


