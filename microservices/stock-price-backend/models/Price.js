// Simple model (in-memory, no database)
class Price {
  constructor(symbol, price) {
    this.symbol = symbol;
    this.price = price;
    this.updatedAt = new Date();
  }
}

module.exports = Price;
