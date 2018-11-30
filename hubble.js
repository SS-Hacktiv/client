$(document).ready(function(){
    getHubble()
})

function getHubble(){
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/hubble'
    })
        .done(response=>{
            // console.log(response)
            response.map(item=>{
                $.ajax({
                    method: 'get',
                    url: `http://localhost:3000/hubble/details/${item.id}`
                })
                    .done(imageUrl=>{
                        // console.log(imageUrl)
                        if(!(imageUrl.includes('.tif'))){
                            $('#image').append(`
                                <div class="card mb-3">
                                    <img class="card-img-top" src="${imageUrl}" alt="Card image cap">
                                    <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <div class="fb-share-button" data-href="${imageUrl}" data-layout="button"
                                        data-size="small" data-mobile-iframe="true"><a target="_blank" class="fb-xfbml-parse-ignore">Share</a></div>
                                    <div>
                                    </div>
                                </div>
               
                            `)
                        }
                    })
                    .fail(err=>console.log(err))
            })
        })
        .fail(err=>{
            console.log(err)
        })
}

$('#toSpaceX').on('click', function(e){
    $('#homepage').hide()
    e.preventDefault()
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/hubble/launches'
    })
        .done(response=>{
            response.map(launch=>{
                if(launch.links.reddit_campaign && launch.details){
                    $('#space-x').append(`
                        <div class="card">
                            <h5 class="card-header">${launch.mission_name}</h5>
                            <div class="card-body">
                            <h5 class="card-title">rocket: ${launch.rocket.rocket_name}</h5>
                            <p class="card-text">${launch.details}</p>
                            <a href="${launch.links.reddit_campaign}" class="btn btn-primary">More Info</a>
                            </div>
                        </div>
                    `)
                }
            })
            console.log(response)
            
        })
        .fail(err=>{
            console.log(err)
        })
    
})