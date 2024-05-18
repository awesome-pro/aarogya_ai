/*
    an array of public routes that do not require authentication
    to access. This is used in the auth.tsx file to redirect
    users to the login page if they are not authenticated and
    try to access a private route.
    @type {string[]}
*/

export const publicRoutes = [
    "/"
]

/*
    the default redirect path after a user logs in. This is
    used in the social.tsx file to redirect users to the dashboard
    page after they log in using a social provider.
    @type {string}

*/
export const DEFAULT_LOGIN_REDIRECT = "/"
export const DEFAULT_LOGOUT_REDIRECT = "/"
export const DEFAULT_REGISTER_REDIRECT = "/dashboard"
export const DEFAULT_FORGOT_PASSWORD_REDIRECT = "/forgot-password"
export const DEFAULT_RESET_PASSWORD_REDIRECT = "/reset-password"


/**
 *  The prefix for API authentication routes. Thsese Routes starts 
 * with this prefix are used for API authentication purposes
 * @type {string}
*/
export const API_AUTH_PREFIX: string = "/api/auth"

/**
 *  An array of routes that are used for authentication
 * these routes will redirect logged in userd to /dashboard
 * @type {string[]}
*/
export const authRoutes: string[] = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password"
]