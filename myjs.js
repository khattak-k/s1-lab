$(window).ready(function(){

    getData();
    
    $(".delete").on("click" , deleteRecord );
    $("#LoadData").on("click" , getData );
    $("#save").on("click" , addRecord );

});

function fetchID(){

    var id = $(this).closest("div.record").attr("id");

    $("#editModalsm").on("click" , function(){
        console.log("ID in edit is:");
        console.log(id);

        var name = $("#editName").val();
        var price = $("#editPrice").val();
        var color = $("#editColor").val();
        var department = $("#editDepartment").val();
        var description = $("#editDescription").val();

        var arr = [name,price,color,department,description];
    
        $.ajax({
            url:"https://usman-recipes.herokuapp.com/api/products/" + id  ,
            method:"PUT",
            data:{  name:arr[0] , price:arr[1] , color:arr[2] , department:arr[3] , description:arr[4] },
    
            success:function(response){
                getData();
            }
            });
    });

}


function getData(){

 
    $.ajax({

        url:"https://usman-recipes.herokuapp.com/api/products",
        method:"GET",

        success:function(response){

            console.log(response);
            //Loading Effect
            $(".data").empty();
            
            //For loop for all records in the file
            for( var i = 0 ; i < response.length ; i++ ){
                var id = response[i]._id;
                var name = response[i].name;
                var price = response[i].price;
                var color = response[i].color;
                var department = response[i].department;
                var description = response[i].description;

                $(".data").append("<div  id="+id+"  class= 'record'> Name:<span class='recordName'>"  + name + "</span></br>color: <span class='recordColor'>"  + color + "</span></br>Price: <span class='recordPrice'>"  + price + "</span></br>department: <span class='recordDepartment'>"  + department + "</span></br>Description: <span class='recordDescription'>"  + description + "</span> </br></br></div>");
                
            }


            $(".record").append("<button class='btn btn-warning edit' data-toggle='modal' data-target='#editModal' style='position:relative'>Edit</button>");
            $(".record").append("<button class='btn btn-danger delete' style=position:relative '>Delete</button>");


            $(".delete").on("click" , deleteRecord );
            $(".edit").on("click" , fetchID );

        },
        error:function(){
            console.log("No data loaded");
        }

    });

}


function deleteRecord(){

    var id = $(this).parent("div.record").attr("id");
    $.ajax({

        url:"https://usman-recipes.herokuapp.com/api/products/" + id  ,
        method:"DELETE",

        success:function(response){

            getData();

        }
        });


}


function addRecord(){

    var name = $("#modalName").val();
    var price = $("#modalPrice").val();
    var color = $("#modalColor").val();
    var department = $("#modalDepartment").val();
    var description = $("#modalDescription").val();

    $.ajax({

        url:"https://usman-recipes.herokuapp.com/api/products" ,
        method:"POST",
        data:{  name:name , price:price , color:color , department:department , description:description },

        success:function(response){
            getData();  
        }
    });
}