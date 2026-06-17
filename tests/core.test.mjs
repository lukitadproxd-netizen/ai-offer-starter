import assert from "node:assert/strict";
import test from "node:test";
import {
  buildOutreachMessage,
  calculateSimpleUnitEconomics,
  generatePricingTiers,
  scoreOfferReadiness,
  validateOffer
} from "../packages/core/dist/index.js";

test("scoreOfferReadiness marks a concrete ethical offer as ready", () => {
  const result = scoreOfferReadiness({
    customer: "independent tourism providers",
    pain: "manual follow-up after WhatsApp inquiries",
    outcome: "faster response workflow with reusable answer templates",
    price: 300,
    delivery: "setup, templates, training, and handoff checklist",
    salesChannel: "warm referrals and personalized outreach",
    claims: ["reduce repetitive manual work"],
    dependsOnSpam: false
  });

  assert.equal(result.ready, true);
  assert.equal(result.score, 100);
});

test("generatePricingTiers returns beta, standard, and pro tiers", () => {
  const tiers = generatePricingTiers({
    baseSetupFee: 500,
    baseMonthlyFee: 100
  });

  assert.deepEqual(
    tiers.map((tier) => tier.name),
    ["beta", "standard", "pro"]
  );
  assert.equal(tiers[1].setupFee, 500);
  assert.equal(tiers[2].monthlyFee, 175);
});

test("validateOffer rejects guaranteed income and spam dependency", () => {
  const result = validateOffer({
    customer: "",
    problem: "",
    salesMethod: "scrape emails and send mass dm blast",
    claims: ["guaranteed passive income money printer"]
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes("guaranteed income")));
  assert.ok(result.errors.some((error) => error.includes("spam")));
});

test("buildOutreachMessage creates a short ethical personalized message", () => {
  const message = buildOutreachMessage({
    recipientName: "Ana",
    businessName: "Hosteria Lago",
    observedProblem: "your booking replies repeat the same availability details",
    proposedOutcome: "turning common questions into a clearer response kit",
    proofOrContext: "your public FAQ and recent posts mention the same questions",
    callToAction: "Open to a 10-minute chat next week?"
  });

  assert.match(message.body, /Ana/);
  assert.match(message.body, /no-pressure|10-minute/);
  assert.equal(message.warnings.length, 0);
});

test("calculateSimpleUnitEconomics warns when the offer is underpriced", () => {
  const economics = calculateSimpleUnitEconomics({
    setupFee: 120,
    monthlyFee: 0,
    estimatedDeliveryHours: 10,
    minimumHealthyHourlyRate: 25
  });

  assert.equal(economics.setupRevenue, 120);
  assert.equal(economics.hourlyEquivalent, 12);
  assert.ok(economics.warnings.some((warning) => warning.includes("underpriced")));
});
