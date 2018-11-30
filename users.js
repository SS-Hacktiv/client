var checkCapcai = null

function login() {
    let token = localStorage.getItem('token')
    if (token) {
        $('#hasLogin').show()
        $('#loginForm').hide()
        $('#registerForm').hide()
        $('#alertLogin').hide()
        $('#alertRegister').hide()
    } else {
        $('#hasLogin').hide()
        $('#loginForm').show()
        $('#registerForm').show()
        $('#alertLogin').hide()
        $('#alertRegister').hide()
    }
}

login()

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
            $('#alertLogin').html(`<strong>${err.responseJSON.msg}</strong>`)
            $('#alertLogin').show()
        })
})

$('#registerForm').submit((event) => {
    event.preventDefault()
    if (checkCapcai !== true) {
        $('#alertRegister').html(`<strong>get your capcai</strong>`)
        $('#alertRegister').show()
    } else {
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
                if (err.responseJSON.err.errors) {
                    $('#alertRegister').html('')
                    for (let key in err.responseJSON.err.errors) {
                        $('#alertRegister').append(`<strong>${err.responseJSON.err.errors[key].message}</strong><br>`)
                        $('#alertRegister').show()
                    }
                } else {
                    console.log(err)
                    $('#alertRegister').html(`<strong>email duplicated</strong>`)
                    $('#alertRegister').show()
                }
            })
    }

})


function checkLoginState() {
    FB.getLoginStatus(function (response) {
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

function successCapcai() {
    checkCapcai = true
}
checkRecaptcha()