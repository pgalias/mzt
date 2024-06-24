interface Products {
  products: {
    thumbnail: string;
    images: string[];
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
  }[];
  total: number;
}

interface Recipes {
  recipes: {
    id: number;
    ingredients: string[];
    instructions: string[];
    image: string;
  }[];
  total: number;
}

const url = {
  "offers": "https://dummyjson.com/products",
  "contracts": "https://dummyjson.com/recipes"
}

export default async function Page({ params }: { params: { page: "offers" | "contracts" } }) {
  const items = await fetch(url[params.page])
    .then(res => res.json() as Promise<Products | Recipes>)

  return (
    <div className="">
      <h1 className="text-2xl">List of your {params.page}</h1>
      <div className={`grid gap-2 ${"products" in items ? "grid-cols-3" : "grid-cols-2"}`}>
        {"products" in items ? items.products.map((item) => (
          <div key={item.id} className="border border-amber-500 p-4">
            <img src={item.thumbnail} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>${item.price}</p>
          </div>
        )) : items.recipes.map(item => (
          <div key={item.id} className="border border-amber-500 p-4">
            <img src={item.image} alt={`Recipe ${item.id}`} />
            <h3 className="text-xl border-b-2 border-b-amber-100">Ingredients</h3>
            <ul>
              {item.ingredients.map(ingredient => (
                <li key={ingredient}>- {ingredient}</li>
              ))}
            </ul>
            <h3 className="text-xl border-b-2 border-b-amber-100">Instructions</h3>
            <ol>
              {item.instructions.map((instruction, index) => (
                <li key={instruction}>{index + 1}. {instruction}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  )
}
