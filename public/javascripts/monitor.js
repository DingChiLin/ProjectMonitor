function main() {
    console.log("hello project monitor")

    const monitorTable = document.getElementById('monitor_table');

    for (let i = 0; i < 4; i ++) {
        let tableRow = document.createElement('tr');
        for (let j = 0; j < 5; j ++) {
            let tableData = document.createElement('td');
            let valueNode = document.createTextNode("i:" + i + " " + "j:" + j);
            tableData.appendChild(valueNode);
            tableRow.append(tableData);
        }
        monitorTable.appendChild(tableRow);
    }


    // var url = "api/v1.0/user/profile";
    // $.ajax({
    //     headers: {
    //         'Authorization': `Bearer ${access_token}`,
    //     },
    //     type: "GET",
    //     url,
    //     success: function(data)
    //     {
    //         console.log(data);
    //         const profileNode = document.createTextNode(JSON.stringify(data));
    //         const root = document.getElementById('root')
    //         root.appendChild(profileNode);
    //     },
    //     error: function(err)
    //     {
    //         console.log(err);
    //         alert(err.responseText)
    //     }
    // });


}

main();