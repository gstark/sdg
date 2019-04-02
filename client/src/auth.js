import auth0 from 'auth0-js'

const DOMAIN = 'gstark.auth0.com'
const CLIENTID = '0HxDF7HJ5DitIcdiqOSUePaEf7dM1Ia0'

class Auth {
  userProfile

  auth0 = new auth0.WebAuth({
    domain: DOMAIN,
    clientID: CLIENTID,
    redirectUri: `${window.location.protocol}//${
      window.location.host
    }/callback`,
    responseType: 'token id_token',
    scope: 'openid email profile'
  })

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
  }

  handleAuthentication(callback) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        if (callback) {
          callback()
        }
      } else if (err) {
        console.log(err)
      }
    })
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getIdToken() {
    const idToken = localStorage.getItem('id_token')
    if (!idToken) {
      throw new Error('No ID Token found')
    }
    return idToken
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('No Access Token found')
    }
    return accessToken
  }

  //...
  getProfile(cb) {
    let accessToken = this.getAccessToken()
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile
      }
      cb(err, profile)
    })
  }

  authorizationHeader() {
    return `Bearer ${this.getIdToken()}`
  }
}

const auth = new Auth()
export default auth
