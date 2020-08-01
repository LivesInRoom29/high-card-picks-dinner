$(document).ready(function() {
    // The div that will hold the populated images, past winners and dates
    const historyContainer = $('#past-recipe-cards');

    // const categoryEl = $('#icon_category');
    // //const searchEl = $('icon_search');
    // const searchBtn = $('button.search');
    // const nameEl = $('input#name');

    // array to be used to store the information which will be saves in local storage
    let historyData = [];

    // Gets info from local storage and stores it in the historyData variable if there is any available.
    function getHistory() {
        historyData = JSON.parse(localStorage.getItem('historyKEY')) || [{Name:"", Meal: "", Date:"", ImgURL: "", RecipeLink: ""}];
    };

    function populateHistory() {
        // If history data exists, create a card for each object and add the img, meal name, who picked it, date, and link
        if (historyData[0].Name) {
            historyData.forEach(function(object){
                const historyDiv = $('<div>').addClass('col s12 m6 l3'); //Changed these classes a little
                const historyCard = $('<div>').addClass('card');
                const cardImgDiv = $('<div>').addClass('card-img');
                const img = $('<img>').attr('src', object.ImgURL).attr('alt', object.Meal).addClass('past-recipe-img').width('100%');
                const cardContentDiv= $('<div>').addClass('card-content');
                const mealName = $('<p>').addClass('card-title past-recipe-name').text(object.Meal);
                const whoPickedPara = $('<p>').text('Picked by: ');
                const pickedBySpan = $('<span>').addClass('green-text past-picked-by').text(object.Name);
                const date = $('<p>').addClass('past-date').text(object.Date);
                const linkDiv = $('<div>').addClass('card-action');
                const pastRecipeLink = $('<a>').addClass('past-recipe-link').attr('href', object.RecipeLink).attr('target', '_blank').text('View Recipe');

                whoPickedPara.append(pickedBySpan);
                cardContentDiv.append(mealName, whoPickedPara, date);
                cardImgDiv.append(img);
                linkDiv.append(pastRecipeLink);
                historyCard.append(cardImgDiv, cardContentDiv, linkDiv);
                historyDiv.append(historyCard);
                historyContainer.append(historyDiv);
            });
        }
    };

    // Stores meal info in local storage
    // Format of newObj: {Name: "Molly", ImgURL: "https://www.themealdb.com/images/media/meals/vxuyrx1511302687.jpg", Date: "07/31/2020", Meal: "Bean & Sausage Hotpot", RecipeLink: "https://www.bbcgoodfood.com/recipes/339607/bean-and-sausage-hotpot"}
    // when called, call with pickedMeal
    function saveMeal(newObj) {
        // If the name in the first history object is blank, set the historyData to the new object; otherwise, ad the new object to the array
        if (!historyData[0].Name) {
            historyData = [newObj];
        } else {
            historyData.push(newObj);
        }
        localStorage.setItem('historyKEY', JSON.stringify(historyData));
    };

    // // Searches the API and calls the saveMeal function on data returned
    // function searchCategory(category) {
    //     // Filter by category
    //     $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}&apikey=1`)
    //         .then(function(response){
    //         console.log(response);

    //         //Use the meal id to make the call for the meal information (name, recipe link.
    //         $.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${response.meals[0].idMeal}&apikey=1`)
    //             .then(function(response){
    //                 console.log(response);
    //                 // Parameters: name of user; name of the meal; image of the meal, link to the recipe
    //                 saveMeal(nameEl.val(), response.meals[0].strMeal, response.meals[0].strMealThumb, response.meals[0].strSource);
    //             }
    //         );
    //     });
    // };



    //Get categories:
    // $.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list$apikey=1')
    //     .then(function(response){
    //         console.log(response);
    //         //use to provide dropdown to choose?
    //     })

    // Populates historyData with informations from local storage.
    // getHistory();
    populateHistory();

    searchBtn.on("click", function() {
        event.preventDefault();
        console.log(categoryEl.val());
        searchCategory(categoryEl.val());
    });

    // $("img.imgLink").on("click", function() {
    //     console.log($(this).attr('data-index'));
    //     // location.href=
    // });




});