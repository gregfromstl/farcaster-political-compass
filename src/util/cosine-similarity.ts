export default function cosineSimilarity(a: number[], b: number[]): number {
    let sumAB = 0;
    let sumA2 = 0;
    let sumB2 = 0;

    for (let i = 0; i < a.length; i++) {
        sumAB += a[i] * b[i];
        sumA2 += Math.pow(a[i], 2);
        sumB2 += Math.pow(b[i], 2);
    }

    return sumAB / (Math.sqrt(sumA2) * Math.sqrt(sumB2));
}
