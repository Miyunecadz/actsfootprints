function allEntry()
{
    const loadingBTN = document.getElementById("fetchingBTN");
    const allentryBTN = document.getElementById("allentryBTN");

    let checkElementExist = document.getElementById("tableData");
    if(checkElementExist != null)
    {
        checkElementExist.remove();
    }

    loadingBTN.setAttribute("style","display:block !important");
    allentryBTN.setAttribute("style","display:none !important");
    
    fetch('assets/php/allentry.php')
    .then(function(response){
        return response.text()
    }).then(function(text){
        let responseData = JSON.parse(text);
        //console.log(responseData);

        allentryBTN.setAttribute("style","display:block !important");
        loadingBTN.setAttribute("style","display:none !important");

        if(responseData.status == "success")
        {
            let mytable = document.createElement('table');
            mytable.setAttribute("class","table table-hover container");
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
        
        //console.log(text);
    })
}