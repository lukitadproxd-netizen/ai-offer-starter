export type OutreachInput = {
  recipientName?: string;
  businessName?: string;
  observedProblem: string;
  proposedOutcome: string;
  proofOrContext?: string;
  callToAction?: string;
};

export type OutreachMessage = {
  subject: string;
  body: string;
  warnings: string[];
};

const bannedPattern = /\b(guaranteed|garantizado|limited time|act now|only today|money printer|passive income|10x)\b/i;

export function buildOutreachMessage(input: OutreachInput): OutreachMessage {
  if (!input.observedProblem.trim()) {
    throw new Error("observedProblem is required.");
  }

  if (!input.proposedOutcome.trim()) {
    throw new Error("proposedOutcome is required.");
  }

  const greeting = input.recipientName ? `Hi ${input.recipientName},` : "Hi,";
  const business = input.businessName ? ` for ${input.businessName}` : "";
  const context = input.proofOrContext ? ` I noticed this because ${input.proofOrContext.trim()}.` : "";
  const callToAction = input.callToAction?.trim() || "Would it be useful if I sent a short, no-pressure outline?";
  const body = `${greeting}\n\nI noticed ${input.observedProblem.trim()}${business}.${context} I help with ${input.proposedOutcome.trim()} in a small, reviewable scope.\n\n${callToAction}\n\nEither way, I hope this is useful.`;
  const warnings: string[] = [];

  if (bannedPattern.test(body)) {
    warnings.push("Message contains hype, artificial urgency, or income-promise language.");
  }

  return {
    subject: `Idea${business}`,
    body,
    warnings
  };
}
