const { recipes } = require('../../data/recipes');

Page({
  data: {
    keyword: '',
    activeCategory: '全部',
    categories: ['全部', '快手菜', '下饭菜', '一人食'],
    recipes: []
  },

  onLoad() {
    this.applyFilters();
  },

  onSearchInput(event) {
    this.setData({ keyword: event.detail.value }, () => this.applyFilters());
  },

  switchCategory(event) {
    this.setData({ activeCategory: event.currentTarget.dataset.category }, () => this.applyFilters());
  },

  applyFilters() {
    const keyword = this.data.keyword.trim();
    const activeCategory = this.data.activeCategory;
    const filtered = recipes
      .filter((recipe) => recipe.status === 'published')
      .filter((recipe) => !keyword || recipe.name.indexOf(keyword) > -1)
      .filter((recipe) => activeCategory === '全部' || recipe.categories.indexOf(activeCategory) > -1)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    this.setData({ recipes: filtered });
  },

  goDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}`
    });
  }
});
