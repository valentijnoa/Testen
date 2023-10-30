class HypoCalculator {
  constructor(
    monthlyIncome,
    partnerIncome,
    rentePercentage,
    loanTermYears,
    hasStudiesDebt,
    postcode
  ) {
    this.monthlyIncome = monthlyIncome;
    this.partnerIncome = partnerIncome;
    this.rentePercentage = rentePercentage;
    this.loanTermYears = loanTermYears;
    this.hasStudiesDebt = hasStudiesDebt;
    this.postcode = postcode;
  }

  calculateMaxLoanAmount() {
    let maxLoanAmount =
      (this.monthlyIncome + this.partnerIncome) * this.rentePercentage;
    if (this.hasStudiesDebt) {
      maxLoanAmount *= 0.75; // Reduce loan amount by 25% for customers with studies debt
    }
    return maxLoanAmount;
  }

  calculateMonthlyPayment() {
    const monthlyInterest =
      this.calculateMaxLoanAmount() * (this.rentePercentage / 12);
    const totalMonths = this.loanTermYears * 12;
    return (this.calculateMaxLoanAmount() + monthlyInterest) / totalMonths;
  }

  calculateTotalPayment() {
    return this.calculateMonthlyPayment() * this.loanTermYears * 12;
  }

  isPostcodeAccepted() {
    const acceptedPostcodes = ["9679", "9681", "9682"];
    return !acceptedPostcodes.includes(this.postcode);
  }
}
module.exports = HypoCalculator;

const calculator = new HypoCalculator(5000, 3000, 0.035, 30, false, "9683");
console.log("Max Loan Amount:", calculator.calculateMaxLoanAmount());
console.log("Monthly Payment:", calculator.calculateMonthlyPayment());
console.log("Total Payment:", calculator.calculateTotalPayment());
console.log("Is Postcode Accepted:", calculator.isPostcodeAccepted());
