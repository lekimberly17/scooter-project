const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// ScooterApp tests here
describe("ScooterApp", () => {
    let scooterApp

    beforeEach(() => {
    scooterApp = new ScooterApp()
    })

// register user
describe("registerUser", () => {
    it("registers a new user", () => {
      const user = scooterApp.registerUser("carm_le", "password", 20)
      expect(user.username).toBe("carm_le")
      expect(user.password).toBe("password")
      expect(user.age).toBe(20)
      expect(user.loggedIn).toBe(false)
      expect(scooterApp.registeredUsers["carm_le"]).toBe(user)
    })

    it("throws an error if user is already registered", () => {
      scooterApp.registerUser("carm_le", "password", 20)
      expect(() => {
        scooterApp.registerUser("carm_le", "password2", 21)
      }).toThrowError("Already registered")
    })

    it("throws an error if user is too young", () => {
      expect(() => {
        scooterApp.registerUser("carm_le", "password", 17)
      }).toThrowError("Too young to register")
    })
  })

// log in
describe("loginUser", () => {
    it("logs in a registered user", () => {
      const user = scooterApp.registerUser("carm_le", "password", 20)
      scooterApp.loginUser("carm_le", "password")
      expect(user.loggedIn).toBe(true)
    })

    it("throws an error if username is incorrect", () => {
      expect(() => {
        scooterApp.loginUser("carm_le", "password")
      }).toThrowError("Username or password is incorrect")
    })

    it("throws an error if password is incorrect", () => {
      scooterApp.registerUser("carm_le", "password", 20)
      expect(() => {
        scooterApp.loginUser("carm_le", "wrong_password")
      }).toThrowError("Incorrect password")
    })
  })

// log out
describe("logoutUser", () => {
    it("logs out a logged-in user", () => {
      const user = scooterApp.registerUser("carm_le", "password", 20)
      scooterApp.loginUser("carm_le", "password")
      scooterApp.logoutUser("carm_le")
      expect(user.loggedIn).toBe(false)
    })

    it("throws an error if no such user is logged in", () => {
      expect(() => {
        scooterApp.logoutUser("carm_le")
      }).toThrowError("No such user is logged in")
    })
  })

// create scooter
describe("createScooter", () => {
    it("creates a new scooter", () => {
      const scooter = scooterApp.createScooter("Station A")
      expect(scooter.station).toBe("Station A")
      expect(scooter.user).toBe(null)
      expect(scooter.serial).toBe(1)
      expect(scooter.charge).toBe(100)
      expect(scooter.isBroken).toBe(false)
      expect(scooterApp.stations["Station A"]).toContain(scooter)
    })

    it("throws an error if no such station exists", () => {
      expect(() => {
        scooterApp.createScooter("Station D")
      }).toThrowError("No such station")
    })
  })

// rent scooter
describe("rentScooter", () => {
    let user, scooter

    beforeEach(() => {
      user = scooterApp.registerUser("carm_le", "password", 20)
      scooter = scooterApp.createScooter("Station A")
    })

    it("rents a scooter to a user", () => {
      scooterApp.rentScooter(scooter, user)
      expect(scooter.station).toBe(null)
      expect(scooter.user).toBe(user)
      expect(scooterApp.stations["Station A"]).not.toContain(scooter)
    })

    it("throws an error if the scooter is already rented", () => {
      scooterApp.rentScooter(scooter, user)
      expect(() => {
        scooterApp.rentScooter(scooter, user)
      }).toThrowError("Scooter already rented")
    })
  })

      


// dock scooter
describe("dockScooter", () => {
    let scooter

    beforeEach(() => {
      scooter = scooterApp.createScooter("Station A")
    })

    it("docks a scooter at a station", () => {
      scooterApp.dockScooter(scooter, "Station B")
      expect(scooter.station).toBe("Station B")
      expect(scooter.user).toBe(null)
      expect(scooterApp.stations["Station A"]).not.toContain(scooter)
      expect(scooterApp.stations["Station B"]).toContain(scooter)
    })

    it("throws an error if no such station exists", () => {
      expect(() => {
        scooterApp.dockScooter(scooter, "Station D")
      }).toThrowError("No such station")
    })

    it("throws an error if the scooter is already at the station", () => {
      scooterApp.dockScooter(scooter, "Station B")
      expect(() => {
        scooterApp.dockScooter(scooter, "Station B")
      }).toThrowError("Scooter already at station")
    })
  })


// print()
describe("print", () => {
    it("logs registered users and scooter stations", () => {
      scooterApp.registerUser("carm_le", "password", 20)
      scooterApp.createScooter("Station A")
      scooterApp.createScooter("Station B")
      scooterApp.createScooter("Station B")
      scooterApp.rentScooter(scooterApp.stations["Station A"][0], scooterApp.registeredUsers["carm_le"])
      const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {})
      scooterApp.print()
      expect(consoleSpy).toHaveBeenCalledWith("Registered users:")
      expect(consoleSpy).toHaveBeenCalledWith("- carm_le")
      expect(consoleSpy).toHaveBeenCalledWith("Stations:")
      expect(consoleSpy).toHaveBeenCalledWith("- Station A: 0 scooter(s)")
      expect(consoleSpy).toHaveBeenCalledWith("- Station B: 2 scooter(s)")
      expect(consoleSpy).toHaveBeenCalledWith("- Station C: 0 scooter(s)")
    })
  })

})  
