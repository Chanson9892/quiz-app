// rearranges the answers so the answer is not always in the same place
export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);