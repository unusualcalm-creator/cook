const { getRecipeById } = require('../../data/recipes');

Page({
  data: {
    recipe: null,
    prepSteps: [],
    doneCount: 0
  },

  onLoad(options) {
    const recipe = getRecipeById(options.id);
    const doneIds = wx.getStorageSync(this.storageKey(recipe.id)) || [];
    const prepSteps = recipe.prepSteps.map((step) => ({
      ...step,
      done: doneIds.indexOf(step.id) > -1
    }));
    this.setData({ recipe, prepSteps }, () => this.updateDoneCount());
  },

  storageKey(recipeId) {
    return `prep:${recipeId}`;
  },

  toggleDone(event) {
    const id = event.currentTarget.dataset.id;
    const prepSteps = this.data.prepSteps.map((step) => (
      step.id === id ? { ...step, done: !step.done } : step
    ));
    const doneIds = prepSteps.filter((step) => step.done).map((step) => step.id);

    wx.setStorageSync(this.storageKey(this.data.recipe.id), doneIds);
    this.setData({ prepSteps }, () => this.updateDoneCount());
  },

  updateDoneCount() {
    this.setData({
      doneCount: this.data.prepSteps.filter((step) => step.done).length
    });
  },

  startCooking() {
    const allDone = this.data.doneCount === this.data.prepSteps.length;
    if (!allDone) {
      wx.showModal({
        title: '还有备菜未完成',
        content: '继续开火也可以，但可能会手忙脚乱。确定继续吗？',
        confirmText: '继续',
        success: (res) => {
          if (res.confirm) {
            this.goCooking();
          }
        }
      });
      return;
    }

    this.goCooking();
  },

  goCooking() {
    wx.navigateTo({
      url: `/pages/cooking/cooking?id=${this.data.recipe.id}`
    });
  }
});
