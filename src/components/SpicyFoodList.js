import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data/index";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    console.log(newFood);
    setFoods([...foods, newFood]);
  }

  function handleRemoveFood(id) {
    let user = prompt('Remove/Increase heat: ')

    if(user.toLowerCase() === "remove") {
      let removedFood = foods.filter(food => food.id !== id);
      setFoods(removedFood);
    }
    else if(user.toLowerCase() === "heat" || user.toLowerCase() === "increase heat") {
      let removedFood = foods.map((food) => {
        if(food.id === id){food.heatLevel++}
        return food
      });
      setFoods(removedFood);
    }
  }

  const [foodType, setFoodType] = useState("All")
  
  const sorted = (type)=>{
    setFoodType(type.target.value)
  }

  const foodDisplay = foods.filter(food=>{
    return (foodType==="All")? true : food.cuisine === foodType
  })

  const foodList = foodDisplay.map((food) => (
    <li key={food.id} onClick={()=>handleRemoveFood(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));


  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={(e)=>sorted(e)}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
