function logout()
{
    fetch('assets/php/logout.php')
    .then(function(response){
        return response.text()
    }).then(function(text){
        //console.log(text);
        window.location.reload();
    })
}