import { validateToken } from '../services/auth.js'

export function checkForAuthCookie(cookieName) {
    return (req, res, next) => {

        // 1. Check Authorization header (Bearer token) ← this is what frontend sends
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const userPayload = validateToken(token);
                req.user = userPayload;
            } catch (error) {}
            return next();
        }

        // 2. Fallback: check cookie
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {}

        return next();
    }
}