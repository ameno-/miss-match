export function getRandomIndex (min, max, exclude = null) {
    return Math.ceil(Math.random() * (max - min) + min);    
}