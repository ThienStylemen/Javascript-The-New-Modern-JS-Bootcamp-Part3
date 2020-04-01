const layout = require('../layout');

module.exports = ({products})=>{
    const renderedProducts = products.map((eachProduct)=>{
        return `
            <div>${eachProduct.title}</div>
        `;
    }).join('');    // joint all elements of array renderedProducts become a string
    
    return layout({
        content: `
            <h1class="title"> Products</h1>
            ${renderedProducts}
        `
    })
}