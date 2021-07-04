const randomMealEl = document.getElementById('meals');
// const favoriteMeals = document.getElementsByClassName()

const getRandomMeal = async() => {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    addMeal(randomMeal, true);
}

const getMealById = async(id) => {
    const mealById = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
}

const getMealsBySearch = async(term) => {
    const mealsBySearch = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term)
}
getRandomMeal();

const addMeal = (mealData, random = false) => {
        const meal = document.createElement('div');
        meal.classList.add('meal');
        meal.innerHTML = `
   
    
    <div class="meal-header">
    ${random ? `
    <span class="random">
    Random recipe
    </span>`: ''}
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn"><i class="fas fa-heart"></i></button>
    </div>
`;

const btn = meal.querySelector('.meal-body .fav-btn');
btn.addEventListener('click',() =>{
    if(btn.classList.contains('active')){
        removeMealsLS(mealData.idMeal);
        btn.classList.remove('active');
    } else{
        addMealLS(mealData.idMeal);
        btn.classList.add('active');
    }
  
})
randomMealEl.appendChild(meal);

}

const addMealLS = mealID =>{
const mealIDs = getMealsLS();

localStorage.setItem('mealIDs', JSON.stringify([...mealIDs, mealID]));
}

const removeMealsLS = mealID=>{
    const mealIDs = getMealsLS();

    localStorage.setItem('mealIDs', JSON.stringify(mealIDs.filter(id=>id!==mealID)));
}

const getMealsLS = () =>{
    const mealIDs = JSON.parse(localStorage.getItem('mealsIDs'));
    return mealIDs === null ? [] : mealIDs;
}