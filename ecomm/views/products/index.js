module.exports = ({products})=>{
    const renderdProducts = products.map(eachProduct=>{
        return `
            <li> ${eachProduct.title} - ${eachProduct.price}</li>
        `;
    }).join('');

    return `
        <ul>
            ${renderdProducts}
        </ul>
    `
};