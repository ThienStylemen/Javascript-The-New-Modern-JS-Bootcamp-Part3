const layout = require('../layout');    // require our layout function
const {getError} = require('../../helper'); 
module.exports = ({errors}) => {
    return layout( {
        content: `
            <div>
                <form method="POST">
                <input name="email" placeholder="email" />
                ${getError(errors, 'email')}
                <input name="password" placeholder="password" />
                ${getError(errors, 'password')}
                <button>Sign In</button>
                </form> 
            </div>
        `
    });
}