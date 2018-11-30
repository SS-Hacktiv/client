function login () {
    let token = localStorage.getItem('token')
    if(token) {
        $('#loginForm').hide()
        $('#registerForm').hide()
    } else {
        $('#loginForm').show()
        $('#registerForm').show()
    }
}

$('#loginForm').submit((event) => {
    event.preventDefault()
    let email = $('#loginEmail').val()
    let password = $('#loginPassword').val()
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users/login',
        dataType: 'json',
        data: {
            email: email,
            password: password
        }
    })
    .done(data => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', email)
        login()
    })
    .fail(err => {
        alert(err.responseJSON.msg)
    })
})

$('#registerForm').submit((event) => {
    event.preventDefault()
    let email = $('#registerEmail').val()
    let name = $('#registerName').val()
    let password = $('#registerPassword').val()
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users/register',
        dataType: 'json',
        data: {
            email: email,
            name: name,
            password: password
        }
    })
    .done(data => {
        alert('success register, now you can login')
    })
    .fail(err => {
        if(err.responseJSON.err.errors) {
            for(let key in err.responseJSON.err.errors) {
                alert(err.responseJSON.err.errors[key].message)
            }
        } else {
            console.log(err.responseJSON.err)
            alert(err.responseJSON.err.errmsg)
        }
    })
})


function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    console.log(response)
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/fblogin',
        dataType: 'json',
        data: {
            token: response.authResponse.accessToken
        }
    })
    .done(data => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        localStorage.setItem('email', data.email)
        login()
    })
    fail(err => {
        alert(err)
    })
}

$('#logout').click(() => {
    localStorage.clear()
    login()
})

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/googlelogin',
        dataType: 'json',
        data: {
            name: profile.getName(),
            email: profile.getEmail()
        }
    })
    .done(data => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', data.email)
        localStorage.setItem('name', data.name)
        login()
    })
    .fail(err => {
        alert(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear()
    login()
}
