// src/components/RecipeDisplay.jsx
import React from 'react';

const RecipeDisplay = ({ recipe }) => {
  if (!recipe) {
    return (
      <div className="text-center py-32">
        <div className="text-8xl mb-6">Cooking Pot</div>
        <h1 className="text-4xl font-bold text-gray-700 mb-4">Make Your Recipe</h1>
        <p className="text-gray-500 text-lg">Tell the chef what you have → Get magic here</p>
      </div>
    );
  }

  const { title, time, servings, ingredients = [], steps = [] } = recipe;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-orange-700 mb-6">{title}</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        {time && (
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
            <span>Clock</span>
            <span className="font-medium">{time}</span>
          </div>
        )}
        {servings && (
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
            <span>People</span>
            <span className="font-medium">{servings}</span>
          </div>
        )}
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Ingredients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ingredients.map((ing, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="font-semibold text-gray-900">{ing.name}</div>
              <div className="text-sm text-gray-600 mt-1">{ing.quantity}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Instructions</h2>
        <ol className="space-y-5">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <p className="text-gray-700 leading-relaxed pt-1 text-base">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDisplay;