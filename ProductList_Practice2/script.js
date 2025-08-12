const filterDropdown = document.getElementById('categoryFilter');
const productList = document.getElementById('productList');
const products = productList.getElementsByClassName('product');

filterDropdown.addEventListener('change', function () {
  const selectedCategory = this.value;
  for (let product of products) {
    const category = product.getAttribute('data-category');
    product.style.display =
      selectedCategory === 'all' || category === selectedCategory
        ? 'block'
        : 'none';
  }
});
