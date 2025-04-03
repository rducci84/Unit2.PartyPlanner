/*const recipes = [
    {name: "Mapo tofu"},
    {name: "Mac and cheese"},
    {name: "Crispy Carnitas"},
    {name: "Korean Army Stew"}
]

const recipeList = document.querySelector("#recipeList")
const button = document.querySelector("#addRec")

const render = () => {
    const html = recipes.map((recipe) => {
        return `
            <div>
                <h2>${recipe.name}</h2>
            </div>
        `
    })
    recipeList.innerHTML = html.join('')

}

button.addEventListener("click", () => {
    const rnd = Math.ceil(Math.random()*1000)
    const recName = `Recipe - ${rnd}` 
    const newRec = {
        name: recName
    }
    recipes.push(newRec)
    render()
})

render()*/

let recipes = []
const recipeList = document.querySelector("#recipeList")
const recipeForm = document.querySelector("#recipeForm")

const render = () => {
    const html = recipes.map((recipe) => {
        return `
            <div>
                <h2>${recipe.name}</h2>
                <p>
                    ${recipe.description}
                </p>
                <img src=${recipe.imageUrl}/>
                <button class="deleteButton" name=${recipe.id} >Delete</button>
            </div>
        `
    })
    recipeList.innerHTML = html.join("")
}

const fetchRecipes = async () => {
    const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-am/recipes")
    //console.log(response)
    const json = await response.json()
    //console.log(json)
    recipes = json.data
    //console.log(recipes)
    render()
}

fetchRecipes()

recipeForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const newRecipe = {
        name: event.target.name.value,
        imageUrl: event.target.imgUrl.value,
        description: event.target.description.value
    }
    try {
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-am/recipes", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        })
        const data = await response.json()
        console.log(data)
        recipes.push(data.data)
        render()
    } catch (error) {
        console.error(error)
    }
})

recipeList.addEventListener("click", async (event) => {
    
    if(event.target.classList.contains("deleteButton")){
        const recpID = event.target.name
        
        try {
            await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-am/recipes/${recpID}`, {
                method: "DELETE"
            })
            //fetchRecipes()
            event.target.parentElement.remove()
            
        } catch (error) {
            console.error(error)
        }

    }
    
})