const { getRecipeById } = require('../../data/recipes');

Page({
  data: {
    recipe: null,
    ingredients: [],
    purchasedCount: 0
  },

  onLoad(options) {
    const recipe = getRecipeById(options.id);
    const purchasedIds = wx.getStorageSync(this.storageKey(recipe.id)) || [];
    const ingredients = recipe.ingredients.map((item) => ({
      ...item,
      purchased: purchasedIds.indexOf(item.id) > -1,
      expanded: false
    }));
    this.setData({ recipe, ingredients }, () => this.updatePurchasedCount());
  },

  storageKey(recipeId) {
    return `shopping:${recipeId}`;
  },

  togglePurchased(event) {
    const id = event.currentTarget.dataset.id;
    const ingredients = this.data.ingredients.map((item) => (
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
    const purchasedIds = ingredients.filter((item) => item.purchased).map((item) => item.id);

    wx.setStorageSync(this.storageKey(this.data.recipe.id), purchasedIds);
    this.setData({ ingredients }, () => this.updatePurchasedCount());
  },

  toggleTips(event) {
    const id = event.currentTarget.dataset.id;
    const ingredients = this.data.ingredients.map((item) => (
      item.id === id ? { ...item, expanded: !item.expanded } : item
    ));
    this.setData({ ingredients });
  },

  updatePurchasedCount() {
    this.setData({
      purchasedCount: this.data.ingredients.filter((item) => item.purchased).length
    });
  },

  copyList() {
    const text = this.data.ingredients
      .map((item) => `${item.name} ${item.amount} ${item.required ? '必需' : '可选'}`)
      .join('\n');

    wx.setClipboardData({ data: text });
  },

  goPrep() {
    wx.navigateTo({
      url: `/pages/prep/prep?id=${this.data.recipe.id}`
    });
  }
});
