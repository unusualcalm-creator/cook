const { getRecipeById } = require('../../data/recipes');

Page({
  data: {
    recipe: null,
    mainIngredients: []
  },

  onLoad(options) {
    const recipe = getRecipeById(options.id);
    const mainIngredients = recipe.ingredients.filter((item) => item.type !== '调味料');
    this.setData({ recipe, mainIngredients });
  },

  goShopping() {
    this.navigate('shopping');
  },

  goPrep() {
    this.navigate('prep');
  },

  goCooking() {
    this.navigate('cooking');
  },

  navigate(page) {
    wx.navigateTo({
      url: `/pages/${page}/${page}?id=${this.data.recipe.id}`
    });
  }
});
