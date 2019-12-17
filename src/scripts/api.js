//API query team names - dummy data
var userOne = document.getElementById('js-userOne')
var userTwo = document.getElementById('js-userTwo')
var userThree = document.getElementById('js-userThree')
var userFour = document.getElementById('js-userFour')
fetch('https://jsonplaceholder.typicode.com/users')
  .then(function (response){
    console.log(response)
    return response.json()
  })
  .then(function(user){
    userOne.innerHTML = user[0].name
    userTwo.innerHTML = user[1].name
    userThree.innerHTML = user[2].name
    userFour.innerHTML = user[3].name
  })
  .catch(function(){
    console.log('¡Algo ha fallado - Users!')
  })
