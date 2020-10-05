let loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit',function(e){
    var errorContainer = document.getElementById("errorContainer");
    var loginBtn = document.getElementById("loginBtn");
    var loadingBtn = document.getElementById("loadingBtn");
    e.preventDefault();
    
    const formData = new FormData(this);

    loginBtn.setAttribute("style", "display: none !important");
    loadingBtn.setAttribute("style", "display: block !important");

    fetch('../assets/php/login.php',{
        method : 'post',
        body : formData,
        
    }).then(function(response){
        return response.text()
    }).then(function(text){
        let responseData = JSON.parse(text);
        //console.log(responseData);
        //console.log(text);

        if(responseData.status == "success")
        {
            errorContainer.setAttribute("style", "display: none !important");
            loginBtn.setAttribute("style", "display: block !important");
            loadingBtn.setAttribute("style", "display: none !important");
            window.location.replace("../index.html");
        }
        else if(responseData.status == "fillup" || responseData.status == "invalid")
        {
            errorContainer.setAttribute("style", "display: block !important");
            errorContainer.innerHTML = "Invalid Credentials";
            loginBtn.setAttribute("style", "display: block !important");
            loadingBtn.setAttribute("style", "display: none !important");
        }
        else if(responseData.status == "error")
        {
            errorContainer.setAttribute("style", "display: block !important");
            errorContainer.innerHTML = responseData.message;
            loginBtn.setAttribute("style", "display: block !important");
            loadingBtn.setAttribute("style", "display: none !important");
        }

    }).catch(function(error){
        console.error(error);
    });
    
});