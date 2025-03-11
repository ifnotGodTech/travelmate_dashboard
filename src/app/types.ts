export interface BookingItem {
  id: string
  userName: string
  timeRange: string
  day: string
  time: string
  type: string
  details: {
    firstName: string
    lastName: string
    address: string
    phone: string
    email: string
    flight: {
      airline: string
      departure: string
      arrival: string
      departureTime: string
      arrivalTime: string
      class: string
      ticketNumber: string
      date: string
      flightNumber: string
      duration: string
      aircraft: string
      price: {
        base: string
        taxes: string
        total: string
      }
    }
  }
}

