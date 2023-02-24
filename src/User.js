class User {
  // User code here
  constructor(username, password, age) {
    this.username = username
    this.password = password
    this.age = age
    this.loggedIn = false
  }

  // login(password)
  login(password) {
    if (password === this.password) {
      this.loggedIn = true
      console.log(`User ${this.username} logged in`)
    } else {
      throw new Error('Incorrect password')
    }
  }

  // logout()
  logout() {
    this.loggedIn = false
    console.log(`User ${this.username} logged out`)
  }

}

module.exports = User
