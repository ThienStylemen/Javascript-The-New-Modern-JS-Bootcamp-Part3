const layout = require('../layout');

module.exports = ({items})=>{
    const renderedItems = items.map((eachItem) =>{
        return `
            <div> ${eachItem.product.title} - ${eachItem.product.price} </div>
        `;
    }).join('');
    return layout({
        content: `
            <h1>Cart </h1>
            ${renderedItems}
        `
    });
};