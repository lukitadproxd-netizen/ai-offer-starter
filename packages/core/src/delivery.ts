export type DeliveryInput = {
  offerName: string;
  deliverables: string[];
  qualityChecks?: string[];
  handoffAssets?: string[];
  supportWindowDays?: number;
};

export type DeliveryChecklist = {
  title: string;
  items: string[];
};

export function createDeliveryChecklist(input: DeliveryInput): DeliveryChecklist {
  if (!input.offerName.trim()) {
    throw new Error("offerName is required.");
  }

  if (input.deliverables.length === 0) {
    throw new Error("At least one deliverable is required.");
  }

  const items = [
    "Confirm customer problem, success criteria, and scope in writing.",
    ...input.deliverables.map((deliverable) => `Prepare deliverable: ${deliverable}.`),
    ...(input.qualityChecks ?? ["Review accuracy, usability, and claim safety."]).map((check) => `QA: ${check}.`),
    ...(input.handoffAssets ?? ["Final files", "Usage notes"]).map((asset) => `Handoff: ${asset}.`),
    `Set support window: ${input.supportWindowDays ?? 7} days.`,
    "Ask for feedback after the customer has used the deliverable.",
    "Document improvements before proposing recurring support."
  ];

  return {
    title: `${input.offerName} delivery checklist`,
    items
  };
}
