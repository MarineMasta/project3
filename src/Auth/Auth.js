import auth0 from "auth0-js"

export default class Auth {
  constructor(history) {
    this.history = history
    this.userProfile = null
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  }

  login = () => {
    this.auth0.authorize()
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        this.history.push("/dashboard")
      } else if (err) {
        this.history.push("/")
        alert(`Error: ${err.error}. You're not authorized to access this page!`)
        console.log(err)
      }
    })
  }

  setSession = (authResult) => {
    //Time is set for the token to expire
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )

    localStorage.setItem("access_token", authResult.accessToken)
    localStorage.setItem("id_token", authResult.idToken)
    localStorage.setItem("expires_at", expiresAt)
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"))
    return new Date().getTime() < expiresAt
  }

  logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("id_token")
    localStorage.removeItem("expires_at")
    this.userProfile = null
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      returnTo: "http://localhost:3000",
    })
  }

  getAccessToken = () => {
    const access_token = localStorage.getItem("access_token")
    if (!access_token) {
      throw new Error("No Access Token Found")
    }
    return access_token
  }

  getProfile = (callback) => {
    if (this.userProfile) return callback(this.userProfile)
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile
      callback(profile, err)
    })
  }
}
