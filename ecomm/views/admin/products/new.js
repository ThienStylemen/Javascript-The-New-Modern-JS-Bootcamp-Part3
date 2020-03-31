const layout = require('../layout');
const {getError} = require('../../helpers');
module.exports = ({erorrs})=>{
    return layout({// default of <form> is methos="GET", get would chang the form of url, make new request to the server
    // enctype: encoding type: Take information out of the form and get it ready to be transmitted, default: enctype="application/x-www-form-urlencoded"
    content: `
            <form method="POST" enctype="multipart/form-data">
                <input placeholder="Title" name="title" />
                <input placeholder="Price" name ="price" />
                <input type="file" name="image" />
                <button>Submit</button>
            </form>
        `
    });
};
