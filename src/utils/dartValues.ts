// All possible values a dart throw can result in
export const dartValues = [
  0, // Miss
  ...Array.from({ length: 20 }, (_, i) => i + 1), // Singles 1-20
  ...Array.from({ length: 20 }, (_, i) => (i + 1) * 2), // Doubles 2-40
  ...Array.from({ length: 20 }, (_, i) => (i + 1) * 3), // Triples 3-60
  25, // Single Bullseye
  50, // Double Bullseye
].sort((a, b) => a - b); // Sort numerically for easier reference 