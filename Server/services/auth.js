import JWT from 'jsonwebtoken'

export function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImgURL: user.profileImgURL,
        role: user.role,
    };
    const token = JWT.sign(payload, process.env.JWT_SECRET)
    return token;
}

export function validateToken(token) {
    const payload = JWT.verify(token, process.env.JWT_SECRET)
    return payload;
}