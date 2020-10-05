let changePasswordForm = document.getElementById("changePasswordForm");


changePasswordForm.addEventListener('submit',function(e){
    const errorMessage = document.getElementById("ChangePassErrorContainer");
    const loadingBTN = document.getElementById("changePassUpdatingBTN");
    const changePassBTN = document.getElementById("changePassBTN");
    const newPass = document.getElementById("newPassword");
    const rePass = document.getElementById("rePass");


    
    e.preventDefault();

    const formData = new FormData(this);

    loadingBTN.setAttribute("style","display:block !important");
    changePassBTN.setAttribute("style","display:none !important");
    
    fetch('assets/php/password.php',{
        method : 'post',
        body : formData,
        
    }).then(function(response){
        return response.text()
    }).then(function(text){
        //console.log(window.location.pathname);
        //console.log(text);
        let responseData = JSON.parse(text);
        //console.log(responseData);

        if(responseData.status == "success")
        {
            errorMessage.setAttribute("style", "display: block !important");
            errorMessage.setAttribute("class", "bg-success p-2")
            changePassBTN.setAttribute("style", "display: block !important");
            loadingBTN.setAttribute("style", "display: none !important");
            errorMessage.innerHTML = responseData.message;
            rePass.value = '';
            newPass.value = '';
            setTimeout(function(){errorMessage.style.display = "none"}, 5000);
        }
        else if(responseData.status == "fillup" || responseData.status == "invalid")
        {
            errorMessage.setAttribute("style", "display: block !important");
            errorMessage.innerHTML = responseData.message;
            changePassBTN.setAttribute("style", "display: block !important");
            loadingBTN.setAttribute("style", "display: none !important");
        }
        else if(responseData.status == "error")
        {
            errorMessage.setAttribute("style", "display: block !important");
            errorMessage.innerHTML = responseData.message;
            changePassBTN.setAttribute("style", "display: block !important");
            loadingBTN.setAttribute("style", "display: none !important");
        }

    }).catch(function(error){
        console.error(error);
    });
    
});
