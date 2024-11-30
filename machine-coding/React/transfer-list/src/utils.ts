export const intersection = (a: number[], b: number[]): number[] => {
    return a.filter((item) => b.indexOf(item) !== -1);
}

export const not = (a: number[], b: number[]): number[] => {
    return a.filter((item) => b.indexOf(item) === -1);
}