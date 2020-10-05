function checkSession()
{
    let INIT_URL = window.location.protocol+"//" + window.location.hostname + "/sites/login.html"
    //let INIT_URL1 = "https://" + window.location.hostname + "/actsindividual/sites/login.html"
    let URI ='';
    if(window.location.href == INIT_URL)
    {
        URI = '../assets/php/sessions.php';;
    }
    else{
        URI = './assets/php/sessions.php';
    }

    fetch(URI)
    .then(function(response){
        return response.text()
    }).then(function(text){
        //console.log(text);
        let responseData = JSON.parse(text);
        //console.log(responseData.response);

        if(responseData.response != "null")
        {

            let URL = window.location.protocol+"//" + window.location.hostname + "/index.html"
            //let URL1 = "https://" + window.location.hostname + "index.html"
            if(URL != window.location.href)
            {
                 //console.log(URL);
                 //console.log(window.location.href);
                window.location.replace("./index.html");
            }
        }
        else
        {
            let URL = window.location.protocol+"//" + window.location.hostname + "/sites/login.html"
            //let URL1 = "https://" + window.location.hostname + "/actsindividual/sites/login.html"
            if(URL != window.location.href )
            {
                // console.log(URL);
                // console.log(window.location.href);
               window.location.replace("./sites/login.html");
            }
        }

    }).catch(function(error){
        console.error(error);
    })
    
}