const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next)
{
    const token = req.cookies['x-auth-token'];
    if(!token)
    {
        return res.status(401).json({
            message: 'Access denied. No token provided.'
        });
    }

        try
        {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            req.user = decoded;
            next();
        }
        catch(ex)
        {
            return res.status(401).json({
                message: 'Invalid token.'
            });
        }
}

module.exports = auth;