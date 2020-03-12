var jwt = require('jsonwebtoken');

function generateToken(user) {
    if(!user) return null;
    
    var  u = {
        email: user.email,
    };

    return token = jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

// return basic user details
function getCleanUser(user) {
    if(!user) return null;

    return {
        email: user.email,
    }

}

module.exports = {
    generateToken,
    getCleanUser
}