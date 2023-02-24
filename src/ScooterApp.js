const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here
  constructor() {
    this.stations = {
      "Station A": [],
      "Station B": [],
      "Station C": []
    }
    this.registeredUsers = {}
  }

  // registerUser(username, password, age)
  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("Already registered")
    }
    if (age < 18) {
      throw new Error("Too young to register")
    }
    const user = new User(username, password, age)
    this.registeredUsers[username] = user
    console.log(`User ${username} has been registered`)
    return user
  }

  // loginUser(username, password)
  loginUser(username, password) {
    const user = this.registeredUsers[username]
    if (user) {
      user.login(password)
      console.log(`User ${username} has been logged in`)
    } else {
      throw new Error("Username or password is incorrect")
    }
  }

  // logoutUser(username)
  logoutUser(username) {
    const user = this.registeredUsers[username]
    if (user) {
      user.logout()
      console.log(`User ${username} has been logged out`)
    } else {
      throw new Error("No such user is logged in")
    }
  }

  // createScooter(station)
  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("No such station")
    }
    const scooter = new Scooter(station)
    this.stations[station].push(scooter)
    console.log(`Created new scooter: ${scooter.serial}`)
    return scooter
  }

  // dockScooter(scooter, station)
  dockScooter(scooter, stationName) {
    if (!this.stations[stationName]) {
      throw new Error("No such station")
    }
  
    if (scooter.station === stationName) {
      throw new Error("Scooter already at station")
    }
  
    const index = this.stations[scooter.station].indexOf(scooter)
    if (index !== -1) {
      this.stations[scooter.station].splice(index, 1)
    }
  
    this.stations[stationName].push(scooter)
    scooter.station = stationName
    
    console.log(`Scooter ${scooter.serial} is docked at ${stationName}`);
  }
  
  
  // rentScooter(scooter, user)
  rentScooter(scooter, user) {
    if (scooter.user) {
      throw new Error("Scooter already rented")
    }
    const stationKeys = Object.keys(this.stations)
    for (const stationKey of stationKeys) {
      const station = this.stations[stationKey]
      const index = station.indexOf(scooter)
      if (index >= 0) {
        station.splice(index, 1)
        break
      }
    }
    scooter.rent(user)
    console.log(`Scooter ${scooter.serial} is rented`)
  }

  // print()
  print() {
    console.log("Registered users:")
    for (const username in this.registeredUsers) {
      console.log(`- ${username}`)
    }
    console.log("Stations:")
    for (const stationName in this.stations) {
      const scooters = this.stations[stationName]
      console.log(`- ${stationName}: ${scooters.length} scooter(s)`)
    }
  }

}


module.exports = ScooterApp
