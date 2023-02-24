const User = require('../src/User')

// User tests here
describe('User', () => {
    let user
    
    beforeEach(() => {
      user = new User('carmle', 'password123', 25)
    })

// test username
describe('username', () => {
    it('should be defined', () => {
      expect(user.username).toBeDefined()
    })

    it('should be a string', () => {
      expect(typeof user.username).toBe('string')
    })

    it('should be set to the correct value', () => {
      expect(user.username).toBe('carmle')
    })
  })

// test password
describe('password', () => {
    it('should be defined', () => {
      expect(user.password).toBeDefined()
    })

    it('should be a string', () => {
      expect(typeof user.password).toBe('string')
    })

    it('should be set to the correct value', () => {
      expect(user.password).toBe('password123')
    })
  })

// test age
describe('age', () => {
    it('should be defined', () => {
      expect(user.age).toBeDefined()
    })

    it('should be a number', () => {
      expect(typeof user.age).toBe('number')
    })

    it('should be set to the correct value', () => {
      expect(user.age).toBe(25)
    })
  })


// test login
describe('login', () => {
    it('should set loggedIn to true if the correct password is provided', () => {
      user.login('password123')
      expect(user.loggedIn).toBe(true)
    })

    it('should throw an error if an incorrect password is provided', () => {
      expect(() => {
        user.login('incorrectpassword')
      }).toThrow('Incorrect password')
    })

    it('should log a message to the console when the user logs in', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      user.login('password123')
      expect(consoleSpy).toHaveBeenCalledWith('User carmle logged in')
    })
  })

// test logout
describe('logout', () => {
    it('should set loggedIn to false', () => {
      user.login('password123')
      user.logout()
      expect(user.loggedIn).toBe(false)
    })

    it('should log a message to the console when the user logs out', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      user.logout()
      expect(consoleSpy).toHaveBeenCalledWith('User carmle logged out')
    })
  })
})
