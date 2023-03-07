const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('scooter object', () => {
  

//Method tests
describe('scooter methods', () => {
  // tests here!
  let scooter
  let user
  //This is good, I like that you are not making new scooters for each individual test
  beforeEach(() => {
    scooter = new Scooter('Station A')
    user = new User('carm')
  })


    //rent method
    test('should not rent to user if not charged', () => {
      scooter.charge = 10
      expect(() => scooter.rent(user)).toThrow('Scooter needs to charge')
      expect(scooter.user).toBe(null)
      expect(scooter.station).toBe('Station A')
    })


    test('should not rent to user if broken', () => {
      scooter.isBroken = true
      expect(() => scooter.rent(user)).toThrow('Scooter needs repair')
      expect(scooter.user).toBe(null)
      expect(scooter.station).toBe('Station A')
    })
    

    //dock method
    test('should dock at station', () => {
      scooter.user = user
      scooter.dock('Station B')
      expect(scooter.station).toBe('Station B')
      expect(scooter.user).toBe(null)
    })
  

    //requestRepair method
    test('should throw error if Scooter needs repair', () => {
      scooter.isBroken = true
      const user = new User('carm Doe')
      expect(() => scooter.rent(user)).toThrow('Scooter needs repair')
    })


    //charge method
    test('should throw error if scooter needs to charge', () => {
      scooter.charge = 10
      const user = new User('carm Doe')
      expect(() => scooter.rent(user)).toThrow('Scooter needs to charge')
    })
  })
})

