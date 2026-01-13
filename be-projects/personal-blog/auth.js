import base64 from "base-64"

function decodeCredentials(authHeader) {
    
    const encodedCredentials = authHeader
        .trim()
        .replace(/Basic\s+/i, "")

    const decodedCredentials = base64.decode(encodedCredentials)

    return decodedCredentials.split(":")
}

export default function authMiddleware(req, res, next) {
    const [username, password] = decodeCredentials(req.headers.authorization || "")

    if(username === "admin" && password === "admin") {
        return next()
    }

    res.set('WWW-Authenticate', 'Basic realm="user_pages"')
    res.status(401).send("Authentication required.")
}