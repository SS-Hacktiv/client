# SS-Hacktiv: Dictionary

## **Table of Contents**
- [Description](#description)
- [URL](#url)
- Methods
    - [Get Word Data](#word)
    - [Get Audio Data](#audio)

## <a id="description"></a> Description
This is the "Dictionary" section of SS-Hacktiv

## <a id="url"></a> URL
http://localhost:3000/dictionary

## <a id="word"></a>Methods
Route | HTTP | Description
------|------|------------
/dictionary/:word | GET | retrieve the data for a single word

### Data Params
None

### URL Params
word: the word to search for

### Success Response

Code: 200

Content: 

    array: 
    [
        {
            "datasets": [
            "ldoce5",
            "dictionary",
            "sandbox"
            ],
            "headword": "Corona",
            "id": "cqAF71H1Ex",
            "senses": [
            {
                "definition": [
                "a type of Mexican beer, sold especially in the US and also available in the UK"
                ]
            }
            ],
            "url": "/v2/dictionaries/entries/cqAF71H1Ex"
        },
    ]
    

### Error Response

Code: 500

Content: 

    {
        message: <err.message>,
        note: 'Please see console log for details'
    }


# <a id="audio"></a>Method 
Route | HTTP | Description
------|------|------------
/dictionary/audio/:word | GET | retrieve the audio for a specific word

### Data Params
None

### Data Params
word: the specific word to search for

### Success Response

Code: 200

Content: 

    {
        audioLink: "URL of audio"
    }

### Error Response

Code: 500

Content:

    {
        message: <err.message>, 
        note: 'Please see console log for details'
    }