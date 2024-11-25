var siteNameInput = document.getElementById('bookName');
var siteURLInput = document.getElementById('bookURL');
var submitBtn = document.getElementById('submitBtn');
var nameRegEX = /^[a-zA-Z0-9]{3,8}$/
var urlRegEX = /^(((http|https):\/\/)?(www\.))?[a-zA-Z0-9_]{2,256}\.[a-z]{2,6}$/;
submitBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  console.log('hello joo');
  addBookMark();
})

siteNameInput.addEventListener('input', function (e) {
  e.stopPropagation();
  checkValidatioin(siteNameInput, nameRegEX);
})
siteURLInput.addEventListener('input', function (e) {
  e.stopPropagation();
  checkValidatioin(siteURLInput, urlRegEX);
})

function checkValidatioin(field, regex) {
  if (validate(field.value, regex) == true) {
    field.classList.replace('is-invalid', 'is-valid');

  } else {

    if (field.classList.contains('is-valid')) {
      field.classList.replace('is-valid', 'is-invalid');
    } else {
      field.classList.add('is-invalid');
    }
  }
}

// function checkURL(){
//   if (validate(siteURLInput.value, urlRegEX) == true)
//     {
//       siteURLInput.classList.replace('is-invalid', 'is-valid');

//     }else {

//       if (siteURLInput.classList.contains('is-valid'))
//       {
//         siteURLInput.classList.replace('is-valid', 'is-invalid');
//       }else {
//         siteURLInput.classList.add('is-invalid');
//       }
//     }
// }

function addBookMark() {

}

function validate(input, regex) {
  return regex.test(input);
}