module.exports = ( {content} )=>{ // content is going to be a string
    return `
    <!DOCTYPE html>
    <html>
        <head>
        </head>

        <body>
            ${content}  
        </body>
    </html>
    `
}