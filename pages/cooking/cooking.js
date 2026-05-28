const { getRecipeById } = require('../../data/recipes');

Page({
  data: {
    recipe: null,
    steps: [],
    currentIndex: 0,
    currentStep: null
  },

  onLoad(options) {
    const recipe = getRecipeById(options.id);
    const savedIndex = wx.getStorageSync(this.storageKey(recipe.id));
    const currentIndex = Number.isInteger(savedIndex) ? savedIndex : 0;
    this.setData({
      recipe,
      steps: recipe.cookingSteps
    }, () => this.setCurrentIndex(currentIndex));
  },

  storageKey(recipeId) {
    return `cooking:${recipeId}:step`;
  },

  setCurrentIndex(index) {
    const maxIndex = this.data.steps.length - 1;
    const nextIndex = Math.min(Math.max(index, 0), maxIndex);
    wx.setStorageSync(this.storageKey(this.data.recipe.id), nextIndex);
    this.setData({
      currentIndex: nextIndex,
      currentStep: this.data.steps[nextIndex]
    });
  },

  prevStep() {
    this.setCurrentIndex(this.data.currentIndex - 1);
  },

  nextStep() {
    if (this.data.currentIndex >= this.data.steps.length - 1) {
      wx.showModal({
        title: '这道菜完成了',
        content: '可以关火盛盘。下次进入仍会从最后一步继续。',
        showCancel: false
      });
      return;
    }

    this.setCurrentIndex(this.data.currentIndex + 1);
  },

  resetProgress() {
    this.setCurrentIndex(0);
    wx.showToast({
      title: '已回到第 1 步',
      icon: 'none'
    });
  }
});
