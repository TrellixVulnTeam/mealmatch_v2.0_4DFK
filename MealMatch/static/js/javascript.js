var ingredientArray = [];

console.log(ingredientArray);
 $(function(){
 $( ".search_bar" ).keyup(function( event ) {

        ajax_func();

      //automatiskKomplettering();
    });
 });

 function getCookie(name) { //function that returns a cookie
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function ajax_func(){
    var csrftoken = getCookie('csrftoken'); //retrieve the specified csrftoken cookie
    //console.log(csrftoken)
    var inputs = $('#ingredient-form').val()
//    console.log(inputs);

    $.ajax({ //do an ajax request, since default prevented
        url : "autocorrect/", // the endpoint
        type : "POST", // http method
        data : {csrfmiddlewaretoken: csrftoken, input: inputs},// data sent with the post request
        dataType: "json",
        // handle a successful response
        success : function(array){
            console.log(array);
            array = JSON.parse(array);
            automatiskKomplettering(array);

        }
        // handle a non-successful response
        //error :"",
    });
}


function setCookies(){
    document.cookie = "input =" + ingredientArray;



    }
// Adds the ingredient list from the startpage, to the filter on the left side, after a matching has been done
function addItemMyIng() {

     input_array = getCookie('input').split(',')
     console.log(input_array)
    input_array.forEach(function(element){

            var li = document.createElement("li");
            li.innerHTML = element;
            li.setAttribute('id', "item"+ lastid, 'class', 'list-group-item');
            var removeSpan = document.createElement('span');
            removeSpan.setAttribute('class','pull-right');
            li.appendChild(removeSpan);
            console.log(document.getElementById("ingredients"));
            document.getElementById("ingredients").appendChild(li);
            var removeButton = document.createElement('button');
            removeButton.appendChild(document.createTextNode('X'));
            removeButton.setAttribute("id","removeButton" );
            removeButton.setAttribute('onClick', 'removeIngredient("' + 'item' + lastid + '")');
            removeSpan.appendChild(removeButton);
            input_array.value = "";
            lastid += 1;
    })


}
// Adds ingredient to search list, on startpage
var lastid = 0;
function addItem(){
        var ing = "ing";
        var li = document.createElement("li");
        var input = document.getElementById("ingredient-form");

        //if(":" in input remove....)


        if (input.value.length > 0){
            //funktionsanrop till något som städar bort ogiltiga tecken
            ingredientArray.push(input.value);
            li.innerHTML = ingredientArray[(ingredientArray.length - 1)];




            li.setAttribute('id', "item"+ lastid, 'class', 'list-group-item');
            var removeSpan = document.createElement('span');
            removeSpan.setAttribute('class','pull-right');
            li.appendChild(removeSpan);

            document.getElementById("ingredients").appendChild(li);
            var removeButton = document.createElement('button');
            removeButton.appendChild(document.createTextNode('X'));
            removeButton.setAttribute("id","removeButton" );
            removeButton.setAttribute('onClick', 'removeIngredient("' + 'item' + lastid + '")');
            removeSpan.appendChild(removeButton);

            input.value = "";

             // document.querySelector(".column_remove").appendChild(removeButton);

            lastid += 1;
        }
    }

function removeIngredient(itemid){
     console.log(document.getElementById(itemid).textContent);
     var item2 = document.getElementById(itemid).textContent;
     var res = item2.slice(0, (item2.length-1));
     console.log(res);

     for (i = 0; i < (ingredientArray.length - 1); i++){
        if (ingredientArray[i] == res){
            ingredientArray.splice(i,1);
            }
     }

     var item = document.getElementById(itemid);
     console.log("ta bort:" + item.value);
     document.getElementById('ingredients').removeChild(item);

}
function automatiskKomplettering(array){
        //console.log(array);

        var availableTags = array
        $( "#ingredient-form" ).autocomplete({
        source: availableTags
        });
        //$( "#ui-id-1" ).autocomplete("widget").attr("max-height", 100px);
}

function putInList(){

    var ing = document.getElementById("item0").childNodes.item(0).nodeValue;
 console.log(ing)
//     ing = document.getElementById("item1").childNodes.item(0).nodeValue;


}

function extractRecipe(recipe){


       console.log(recipe.title)
       console.log(recipe.ingredients_list)
       console.log(recipe.sevings)
       console.log(recipe.directions)
       console.log(recipe.author)
       console.log(recipe.tags)
}

/*$(document).ready(function(){
        /*$("#recipe_box").click(function(){

            ///var val = $(this).children();
            var val = $(this).find(":input").triggerHandler("click")
            window.alert(val)
            $(".single_recipe").submit(val)

        });
    });*/
