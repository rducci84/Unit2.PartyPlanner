/*const recipes = [
    {name: "Mapo tofu"},
    {name: "Mac and cheese"},
    {name: "Crispy Carnitas"},
    {name: "Korean Army Stew"}
]

const recipeList = document.querySelector("#recipeList")
const button = document.querySelector("#addRecipe")

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

button.addEventListener('click', () => {
    const rnd = Math.ceil(Math.random() * 1000)
    const recipeName = `Recipe ${rnd}`
    const newRecipe = {name: recipeName}
    recipes.push(newRecipe)
    render()
})

render()
*/

let recipes = []
const recipeList = document.querySelector("#recipeList")

const render = () => {
    const html = recipes.map((recipe) => {
        return `
            <div>
                <h2>${recipe.name}</h2>
                <p>
                    ${recipe.description}
                </p>
                <img src=${recipe.imageUrl} />
            </div>
        `
    })

    recipeList.innerHTML = html.join("")
}

const fetchRecipes = async () => {
    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310/recipes')
    console.log(response)
    const json = await response.json()
    console.log(json)
    recipes = json.data
    console.log(recipes)
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
    //console.log(newRecipe)
    try {
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-am/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        })
        const data = await response.json()
        console.log(data)
        recipes.push(data.data)
        render()
    }
    catch (error) {
        console.error(error)
    }
})