export type OfferValidationInput = {
  customer?: string;
  problem?: string;
  outcome?: string;
  salesMethod?: string;
  claims?: string[];
  offerName?: string;
};

export type OfferValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

const guaranteedIncomePattern = /\b(guarantee|guaranteed|garantizado|garantiza|asegurado|money printer|dinero facil|dinero fácil|10x revenue|passive income)\b/i;
const spamPattern = /\b(spam|scrape emails|mass dm|cold blast|blast|autodm|auto dm|bulk unsolicited)\b/i;
const genericPattern = /\b(ai solution|ai tool|automation|chatbot|dashboard|marketing help)\b/i;

function blank(value?: string): boolean {
  return !value || value.trim().length < 3;
}

export function validateOffer(input: OfferValidationInput): OfferValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const claims = input.claims ?? [];
  const text = [input.offerName, input.outcome, input.salesMethod, ...claims].filter(Boolean).join(" ");

  if (claims.some((claim) => guaranteedIncomePattern.test(claim)) || guaranteedIncomePattern.test(text)) {
    errors.push("Do not promise guaranteed income, effortless results, or money-printer outcomes.");
  }

  if (blank(input.customer)) {
    errors.push("Define a clear customer before selling the offer.");
  }

  if (blank(input.problem)) {
    errors.push("Define a clear customer problem before building the offer.");
  }

  if (input.salesMethod && spamPattern.test(input.salesMethod)) {
    errors.push("Do not depend on spam, scraping, or bulk unsolicited outreach.");
  }

  if (!blank(input.offerName) && genericPattern.test(input.offerName ?? "") && blank(input.customer)) {
    warnings.push("The offer sounds generic; make the customer and problem more specific.");
  }

  if (!blank(input.outcome) && genericPattern.test(input.outcome ?? "")) {
    warnings.push("The outcome is broad; define the concrete business or operational change.");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
