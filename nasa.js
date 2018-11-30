$(document).ready(() => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/nasa/apod'
    })
        .done(response => {
            $('#apod').append(`
            <div class="card mb-3">
                    <img class="card-img-top" src="${response.hdurl}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${response.title}</h5>
                        <button class="btn" data-toggle="collapse" data-target="#explanation">Readmore</button>
                            <div id="explanation" class="collapse"> 
                            <p class="card-text" >${response.explanation}</p>
                            </div>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            `)
        })
        .fail(err => {
            console.log(err)
        })
    // $.ajax({
    //     method: 'GET',
    //     url: 'http://localhost:3000/nasa/mars'
    // })
    //     .done(response => {
    //         $('#mars').append(`
    //         <div class="card mb-3">
    //                 <img class="card-img-top" src="${response.hdurl}" alt="Card image cap">
    //                 <div class="card-body">
    //                     <h5 class="card-title">${response.title}</h5>
    //                     <button class="btn" data-toggle="collapse" data-target="#explanation">Readmore</button>
    //                         <div id="explanation" class="collapse"> 
    //                         <p class="card-text" >${response.explanation}</p>
    //                         </div>
    //                     <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    //                 </div>
    //             </div>
    //         `)

    //     })

})
// $('.collapse').collapse()
$('#searchNasa').keyup(() => {
    let input = $('#searchNasa').val()
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/nasa/search?keyword=${input}`

    })
        .done(response => {
            console.log(response)
            if (response.collection.items.length === 0) {
                $('#listNasa').html('<h5>Not found</h5>')
            } else {
                $('#listNasa').html('')
                response.collection.items.forEach((list, index) => {
                    $('#listNasa').append(`
                  <div class="card mb-3">
                        <img class="card-img-top" src="${list.links[0].href}" alt="Card image cap">
                  <div class="card-body">
                        <h5 class="card-title">${list.data[0].title}</h5> 
                        <p class="card-text" >${list.data[0].description}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                     </div>
                 </div>`)

                })

            }

        })
        .fail(err => {
            if (err.responseJSON === null) {
                $('#listNasa').html('<h5>Not found</h5>')
            }

        })

})