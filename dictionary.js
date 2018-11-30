$(document).ready(function(){
    function loading() {
        $('#dictionary').show()  
        $('#dict_loading').removeAttr('style')
    }
    function loaded() {
        $('#dictionary').show()  
        $('#dict_loading').attr("style", "display:none")
    }
    $('#dictSearch').on('submit', function(event) {
        event.preventDefault()
        loading()
        $('#dictError').hide()
        $('#dictAudio').html('')
        $('#dictDefinition').html('')
        $('#dictWord').html(``)
        let word = $('#searchVal').val()
        $.ajax({
            method: "GET",
            url: `http://localhost:3000/dictionary/${word}`
        })
        .done(response => {  
            if(response.length > 0) {
                $.ajax({
                        method: "GET",
                        url: `http://localhost:3000/dictionary/audio/${word}`
                    })                
                    .done(audio => {
                        $('#dictWord').html(`${word}`)
                        $.each(response, function(index, definition) {
                            let part_of_speech = ""
                            if(definition.part_of_speech) {
                                part_of_speech = definition.part_of_speech
                            }
                            let relatedWord = ""
                            if(definition.headword !== word) {
                                relatedWord = definition.headword
                            }
                            $('#dictDefinition').append(
                                `<div class ="dictContent">  
                                <h3 style="font-size:22px">${relatedWord}</h3>
                                <div class="speech"> ${part_of_speech}</div>
                                <div class = "definition"> <h3 style="font-size:18px">Definition:</h3> ${definition.senses[0].definition}</div> 
                                </div<`)
                        })
                        if(audio.audioLink.length > 0) {
                            $('#dictAudio').html(`
                            <audio controls>
                                <source src="http://api.pearson.com/${audio.audioLink}" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>`)
                        }
                        loaded()
                    })
                    .fail(function (err) {
                        console.log(err.responseJSON)
                        loaded()
                        $('#dictError').html(err.responseJSON)
                        $('#dictError').show()
                    })
            } else {
                $('#dict_loading').hide()  
                $('#dictError').html('Search not Found')
                $('#dictError').show()
            }
        })
        .fail(function (err) {
            console.log(err.responseJSON)
            $('#dict_loading').hide()  
            $('#dictError').html("Search not Found")
            $('#dictError').show()
        })
    })
});
