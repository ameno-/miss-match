export function getRandomIndex(min, max, exclude = null) {
    return Math.ceil(Math.random() * (max - min) + min);
}

export const shuffle = (array) => {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export const getRandomCollection = (exclude, totalNumbers) => {
    //dynamically generate based on numRepo size
    let numbersRepository = [0, 1, 2, 3, 4, 5],
        randomNumbersCollection,
        counter = totalNumbers,
        generatedNumber = 0;

    if (exclude != null) {
        randomNumbersCollection = [exclude];
        numbersRepository.splice(exclude, 1);
        counter--;
    } else {
        randomNumbersCollection = [];
    }

    while (counter--) {
        generatedNumber = Math.floor(Math.random() * (numbersRepository.length));
        randomNumbersCollection.push(numbersRepository[generatedNumber]);
        numbersRepository.splice(generatedNumber, 1);
    }
    let answerIndex = getRandomIndex(0,randomNumbersCollection.length);
    console.log(answerIndex);
    return {answerIndex: answerIndex, shuffledArray: shuffle(randomNumbersCollection)};
}