class Scooter{
  // scooter code here
  static nextSerial = 1
  
  constructor(station) {
    this.station = station
    this.user = null
    this.serial = Scooter.nextSerial++
    this.charge = 100
    this.isBroken = false
  }

  // rent(user)
  rent(user) {
    if (this.charge < 20) {
      throw new Error("Scooter needs to charge")
    } else if (this.isBroken) {
      throw new Error("Scooter needs repair")
    } else {
      this.user = user
      this.station = null
    }
  }

  // dock( station)
  dock(station) {
    this.station = station
    this.user = null
  }


  // recharge()
  async recharge() {
    console.log(`Starting charge for scooter ${this.serial}`)
    await new Promise(resolve => setTimeout(resolve, 2000)) // wait 2 seconds
    this.charge = 100
    console.log(`Charge complete for scooter ${this.serial}`)
  }

  

  // requestRepair()
  requestRepair() {
    console.log(`Scheduling repair for scooter ${this.serial}`)
    setTimeout(() => {
      this.isBroken = false
      console.log(`Repair completed for scooter ${this.serial}`)
    }, 5000)
  }
}

module.exports = Scooter
