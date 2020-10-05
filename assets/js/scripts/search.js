let searchForm = document.getElementById("searchForm");

searchForm.addEventListener('submit',function(e){
    e.preventDefault();

    let checkElementExist = document.getElementById("tableData");
    if(checkElementExist != null)
    {
        checkElementExist.remove();
    }

    const datePicker = document.getElementById("trackDate");

    if(datePicker.value == ""){
        datePicker.setAttribute("class","border-danger form-control mr-2");
    }
    else{
        datePicker.setAttribute("class","form-control mr-2");
        let formData = new FormData(this);

        fetch('assets/php/search.php',{
            method: 'POST',
            body: formData,
        }).then(function(response){
            return response.text();
        }).then(function(text){
            let responseData = JSON.parse(text);
            //console.log(responseData.status);

            if(responseData.status == "success")
            {
                let mytable = document.createElement('table');
                mytable.setAttribute("class","table table-hover");
                mytable.setAttribute("id", "tableData");
    
                let tableHeader = document.createElement('thead');
                let tableHeadTr = document.createElement('tr');
                let headers = ["Date Time","Visited"]
                let ParentElement =  document.getElementById("dataTable");
                ParentElement.appendChild(mytable);
                mytable.appendChild(tableHeader);
                tableHeader.appendChild(tableHeadTr);
    
                for(let q = 0 ; q < 2; q++)
                {
                    let tableHeadItem = document.createElement('th');
                    tableHeadItem.innerHTML = headers[q];
                    tableHeadTr.appendChild(tableHeadItem);
                }
    
                let tableBody = document.createElement('tbody');
                mytable.appendChild(tableBody);
    
                for(let x = 0; x < responseData.message.length; x++)
                {
                    let tableBodyTr = document.createElement('tr');
                    tableBody.appendChild(tableBodyTr);
    
                    let tableBodyItem1 = document.createElement('th');
                    tableBodyItem1.innerHTML = responseData.message[x].entry_date;
                    tableBodyTr.appendChild(tableBodyItem1);
    
                    let tableBodyItem2 = document.createElement('th');
                    tableBodyItem2.innerHTML = responseData.message[x].visited;
                    tableBodyTr.appendChild(tableBodyItem2)
                }
            }
            else if(responseData.status = "fail")
            {
    
                let responseText = document.createElement("h3");
                responseText.setAttribute("id","tableData");
                responseText.innerHTML = responseData.message;
                let ParentElement =  document.getElementById("dataTable");
                ParentElement.appendChild(responseText);
            }
        })
    }
})