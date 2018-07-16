module.exports = {

    SYSTEM: {
        mongoose: {
            CONNECTION_SUCCESSFUL: "Connection to MongoDB established!",
            CONNECTION_FAILED: "Connection to MongoDB failed. Make sure MongoDB is running."
        },
        endpoints: {
            INVALID_ENDPOINT: "Invalid endpoint requested"
        },
        passport: {
            jwt: {
                TOKEN_VALID: "Token verification successful",
                TOKEN_INVALID: "This token is no longer valid",
                UNAUTHORIZED_USER: "Token associated with this user is no longer valid"
            },
            roles: {
                UNAUTHORIZED_ACCESS: "This user has not enough privileges to access this resource"
            },
            login: {
                MISSING_USERNAME: "Username can't be empty",
                MISSING_PASSWORD: "Password can't be empty",
                MISSING_CREDENTIALS: "Username or Password has not been specified",
                INVALID_USERNAME: "Wrong username",
                INVALID_PASSWORD: "Wrong password",
                AUTHENTICATION_SUCCESS: "User successfully authenticated",
            },
            register: {
                USERNAME_TAKEN: "This username is already in use",
                REGISTRATION_SUCCESSFUL: "User successfully registered"
            },
            secret: {
                NO_SECRET: "No secret has been specified",
                HALF_SECRET: "The sent secret is incomplete",
                INVALID_SECRET: "Invalid secret has been provided",
                SECRET_SUCCESS: "The sent secret matches the server secret"
            }
        }
    }

};