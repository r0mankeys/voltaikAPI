import jwt from 'jsonwebtoken'
import 'dotenv/config'

// Used to create token
// const adminToken = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '30d' });

async function authenticateUser(request, response, next) {
    // Get the token from the request header
    const header = request.headers['authorization']
    const token = header && header.split(' ')[1]
    // If there is no token, return an error
    if (!token) {
        return response
            .status(401)
            .json({
                message:
                    'Access Denied, Authorization header either not formatted correctly or no token was provided',
            })
    }
    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        request.user = decoded
        next()
    } catch (error) {
        return response
            .status(400)
            .json({
                message: 'Access Denied, Invalid Token',
                error: error.message,
            })
    }
}

export default authenticateUser
