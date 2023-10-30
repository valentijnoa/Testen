const chai = require("chai");
const HypoCalculator = require("./hypo_calculator"); // Assuming your HypoCalculator is in hypo_calculator.js

const { expect } = chai;

describe("HypoCalculator Integration Tests", () => {
  it("should calculate max loan amount, monthly payment, and total payment correctly", () => {
    const calculator = new HypoCalculator(6000, 4000, 0.035, 30, false, "9683");

    expect(calculator.calculateMaxLoanAmount()).to.be.closeTo(420000, 0.01);
    expect(calculator.calculateMonthlyPayment()).to.be.closeTo(1673.25, 0.01);
    expect(calculator.calculateTotalPayment()).to.be.closeTo(602350, 0.01);
  });

  it("should handle studies debt correctly", () => {
    const calculatorWithStudiesDebt = new HypoCalculator(
      6000,
      4000,
      0.035,
      30,
      true,
      "9683"
    );
    const calculatorWithoutStudiesDebt = new HypoCalculator(
      6000,
      4000,
      0.035,
      30,
      false,
      "9683"
    );

    expect(calculatorWithStudiesDebt.calculateMaxLoanAmount()).to.be.closeTo(
      315000,
      0.01
    );
    expect(calculatorWithoutStudiesDebt.calculateMaxLoanAmount()).to.be.closeTo(
      420000,
      0.01
    );
  });

  it("should check postcode acceptance", () => {
    const calculatorAcceptedPostcode = new HypoCalculator(
      6000,
      4000,
      0.035,
      30,
      false,
      "9681"
    );
    const calculatorRejectedPostcode = new HypoCalculator(
      6000,
      4000,
      0.035,
      30,
      false,
      "9679"
    );

    expect(calculatorAcceptedPostcode.isPostcodeAccepted()).to.be.true; // 9681 is in the accepted postcodes
    expect(calculatorRejectedPostcode.isPostcodeAccepted()).to.be.false; // 9679 is not in the accepted postcodes
  });
});
