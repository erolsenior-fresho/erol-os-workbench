export type DomainCandidate = {
  name: string;
  tld: string;
  length: number;
  hasHyphen: boolean;
  searchIntent: "brand" | "local" | "product" | "unknown";
};

export function scoreDomain(candidate: DomainCandidate): number {
  let score = 50;

  if (candidate.tld === ".com") score += 20;
  if (candidate.tld === ".net") score += 8;
  if (candidate.length <= 8) score += 10;
  if (candidate.length > 14) score -= 8;
  if (candidate.hasHyphen) score -= 12;

  if (candidate.searchIntent === "brand") score += 12;
  if (candidate.searchIntent === "product") score += 7;
  if (candidate.searchIntent === "unknown") score -= 5;

  return Math.max(0, Math.min(100, score));
}

