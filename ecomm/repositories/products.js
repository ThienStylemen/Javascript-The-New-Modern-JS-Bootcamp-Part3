const Repository = require('./repository');

class ProductsRepository extends Repository{ }

//create an instance of ProductsRepository and exports its
module.exports = new ProductsRepository('products.json');