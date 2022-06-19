const { UserModel, validate } = require("../models/users");


async function adminAuth(req, res, next)
{
    const user = await UserModel.findOne({_id: req.user._id});
    if(user.admin_offices.includes(req.params.officeID))
    {
        next();
    }
    else
    {
        return res.status(403).json({
            message: "Access denied. You are not an admin of this office.",
        });
    }
}

module.exports = adminAuth;