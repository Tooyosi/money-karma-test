export const testDetailsCalculator = (originalValue, typedValue) => {
    let originalWordsArr = originalValue.split(" ").filter((word) => word)
    const wordsArr = typedValue.split(' ').filter((word) => word);
    const words = wordsArr.length;
    let pointsCount = 0
    for (let i = 0; i < wordsArr.length; i++) {
        const element = wordsArr[i];
        if (element === originalWordsArr[i]) {
            pointsCount += 1
        }
    }

    const characters = typedValue?.trim()?.replace(/\s/g, '').length;
    const mistakes = typedValue.split('').reduce((acc, typedChar, index) => {
        return typedChar !== originalValue[index] ? acc + 1 : acc
    }, 0)

    return { words, characters, mistakes, points: pointsCount }
}