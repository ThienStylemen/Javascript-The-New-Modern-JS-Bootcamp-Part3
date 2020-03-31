const layout = require('../layout');
const { getError } = require('../../helpers');
module.exports = ({ errors }) => {
    return layout({// default of <form> is methos="GET", get would chang the form of url, make new request to the server
        // enctype: encoding type: Take information out of the form and get it ready to be transmitted, default: enctype="application/x-www-form-urlencoded"
        content: `
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="subtitle">Create a Product</h1>

                    <form method="POST" enctype="multipart/form-data">
                        <div class="field">
                            <label class="label">Title</label>
                            <input class="input" placeholder="Title" name="title">
                            <p class="help is-danger">${getError(errors, 'title')}</p>
                        </div>
                        
                        <div class="field">
                            <label class="label">Price</label>
                            <input class="input" placeholder="Price" name="price">
                            <p class="help is-danger">${getError(errors, 'price')}</p>
                        </div>
                        
                        <div class="field">
                            <label class="label">Image</label>            
                            <input type="file" name="image" />
                        </div>
                        <br />
                        
                        <button class="button is-primary">Create</button>
                    </form>
                </div>
            </div>
        `
    });
};
