import range from "array-range";

// a row of a pascal table with ends chopped off
export default function coefficients(weights) {
  if (weights.length % 2 === 0) {
    throw new Error("only supports odd table");
  }

  console.log("taps", weights.length);
  const mid = Math.floor((weights.length - 1) / 2);

  const sum = weights.reduce((a, b) => a + b, 0);

  weights = weights.slice(mid);

  const weightDiv = weights.map(w => w / sum);

  const offsets = range(mid + 1);

  const linearWeights = weightDiv.slice(0, 1);
  const linearOffsets = [0];
  for (let i = 1; i < offsets.length - 1; i += 2) {
    const off1 = offsets[i];
    const off2 = offsets[i + 1];
    const weight1 = weights[i];
    const weight2 = weights[i + 1];

    const wsum = weight1 + weight2;
    const t = (off1 * weight1 + off2 * weight2) / wsum;
    linearOffsets.push(t);
    linearWeights.push(wsum / sum);
  }
  console.log("offsets", linearOffsets);
  console.log("weights", linearWeights);
}

export const weights = "28    56    70    56    28" // 5 taps
  // var weights = '45    120   210   252   210   120   45' // 7 taps
  // var weights = '66    220    495    792    924    792    495    220    66' // 9 taps
  // var weights = '120    560    1820    4368    8008    11440    12870    11440    8008    4368    1820    560    120'
  .split(/\s+/)
  .map(a => parseInt(a, 10));
