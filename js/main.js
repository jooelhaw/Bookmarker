var siteNameInput = document.getElementById('bookName');
var siteURLInput = document.getElementById('bookURL');
var submitBtn = document.getElementById('submitBtn');
var closeBtn = document.getElementById('closePanelBtn');
var validationDiv = document.getElementById('validateDiv');
var nameRegEX = /^[a-zA-Z0-9]{3,8}$/
var urlRegEX = /^(((http|https):\/\/)?(www\.))?[a-zA-Z0-9_]{2,256}\.[a-z]{2,6}$/;
// check bookMarks from the local storage
var bookmarks = [];
function loadBookMarks() {
  if (localStorage.getItem('bookmarks') !== null) {
    bookMarks = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookMarks(bookMarks);
  }
}
loadBookMarks();

// close panel button event
closeBtn.addEventListener('click', function (e) {
  validationDiv.style.display = 'none';
})


// add bookmark when submit button is clicked
submitBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  addBookMark();
})
// validate the bookmark name 
siteNameInput.addEventListener('input', function (e) {
  e.stopPropagation();
  checkValidatioin(siteNameInput, nameRegEX);
})
// validate the bookmark url
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

function addBookMark() {
  var bookURL = siteURLInput.value;
  if (!bookURL.toLowerCase().startsWith("h")) {
    bookURL = "https://" + siteURLInput.value;
  }
  var bookMark = {
    name: siteNameInput.value,
    url: bookURL
  }
  if (!checkFieldsNotNull()) {
    checkBookEntered(bookMark.name, bookMark.url);
  }
  if (!siteNameInput.classList.contains('is-invalid') && !siteURLInput.classList.contains('is-invalid')) {
    bookmarks.push(bookMark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookMarks(bookmarks);
    clearFields();
  } else {
    validationDiv.style.display = 'block';
  }
}


function clearFields() {
  siteNameInput.value = null;
  siteURLInput.value = null;
}

function displayBookMarks(arr) {
  var bookMarksContainer = ``;
  for (var i = 0; i < arr.length; i++) {
    bookMarksContainer += `
          <tr class="align-baseline">
            <th scope="row">${i + 1}</th>
            <td class="align-items-center">${arr[i].name}</td>
            <td>
            <a href="${arr[i].url}" target="_blank" class="btn btn-primary submitBtn">
            Visit
            </a>
            </td>
            <td><button onclick ="deleteBookMark(${i});" class="btn btn-danger">Delete</button></td>
          </tr>`
  }
  document.getElementById('tableBody').innerHTML = bookMarksContainer;
}

function validate(input, regex) {
  return regex.test(input);
}

function deleteBookMark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookMarks(bookmarks);
}

function checkBookEntered(name, url) {
  if (localStorage.getItem('bookmarks') !== null) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].name === name) {
        siteNameInput.classList.add('is-invalid');
      }
    }
  }
}
function checkFieldsNotNull() {
  if (siteNameInput.value == "") {
    siteNameInput.classList.add('is-invalid');
    return true;
  } else if (siteURLInput.value == "") {
    siteURLInput.classList.add('is-invalid');
    return true;
  } else {
    return false;
  }
}