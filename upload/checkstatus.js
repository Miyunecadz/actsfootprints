function checkStatus()
{
    fetch('./assets/php/status.php')
    .then(function(response){
        return response.text()
    }).then(function(text){
        //console.log(text);
        let jsonData = JSON.parse(text);
        let StatusMessage = document.getElementById('StatusMessage');

        if(jsonData.message[0].is_flagged == 0)
        {
            StatusMessage.setAttribute('class','bg-success p-3');
            StatusMessage.innerHTML = '<span>Please observe health protocols when going out.</span>';

            //console.log("zero ang answer");
        }
        else{
            StatusMessage.setAttribute('class','bg-danger p-3');
            StatusMessage.innerHTML = '<span>Please get yourself isolated/quarantined.</span><br><span>Contact your local RHU when you have flu-like symptoms.</span>';
            console.log("one ang answer");
        }
       // Ustat.innerHTML(jsonData.message[0].is_flagged); 
    })
}