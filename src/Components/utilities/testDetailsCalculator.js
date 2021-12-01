export const testDetailsCalculator = (originalValue, typedValue) => {
    let originalWordsArr = originalValue.split(" ").filter((word) => word)
    const wordsArr = typedValue.split(' ').filter((word) => word);
    const words = wordsArr.length;
    let pointsCount = 0
    let mistakes = 0
    
    for (let i = 0; i < wordsArr.length; i++) {
        const element = wordsArr[i];
        if (element === originalWordsArr[i]) {
            pointsCount += 1
        } else {
            mistakes += 1
        }
    }

    const characters = typedValue?.trim()?.replace(/\s/g, '').length;

    return { words, characters, mistakes, points: pointsCount }
}