const times = document.querySelectorAll('li')
const timerContainer = document.querySelector('.timer-container')
let selectedTime = 5;
const wpmValue = document.querySelector('.wpm-value')
const AccValue = document.querySelector('.accuracy-value')
const resetBtn = document.querySelector('.reset')

let timerId;

timerContainer.innerHTML = selectedTime

times.forEach(item => {
    item.addEventListener('click', () => {
        times.forEach(time => time.classList.remove('active'))
        item.classList.add('active')
        selectedTime = item.innerHTML

        timerContainer.innerHTML = selectedTime
    })

    document.querySelector('.time-value').innerHTML = selectedTime
    
})


const typingBtn = document.querySelector('.typing-btn');
const container = document.querySelector('.container')
const inputField = document.querySelector('input')
const p = `The quick brown fox jumps over the lazy dog. Typing tests help improve speed and accuracy. 
Practice daily to build muscle memory and confidence.`
const letters = p.split('')
const text = document.createElement('p')

const charElements = []

letters.forEach(item => {
    const charachter = document.createElement('span');
    charachter.innerText = item
    charElements.push(charachter)
})

text.className = 'typing'
const target = container.children[3]
text.append(...charElements)
const userInputs = []
let counter;

resetBtn.onclick = () => {
    console.log('here');

    inputField.value = ''
    userInputs.length = 0
    charElements.forEach(item => item.className = '')
    typingBtn.style.display = 'inline-block'
    text.style.display = 'none'
    AccValue.innerHTML = '0%'
    wpmValue.innerHTML = 0;
    clearInterval(timerId)
    inputField.disabled = false
    counter = selectedTime
    timerContainer.innerHTML = counter
}


typingBtn.onclick = () => {
    counter = selectedTime

    text.style.display = 'block'

    inputField.value = ''
    userInputs.length = 0
    charElements.forEach(item => item.className = '')

    timerContainer.innerHTML = counter

    timer()

    typingBtn.style.display = 'none'
    container.insertBefore(text, target)
    document.querySelector('input').focus()

    inputField.addEventListener('input', (e) => {
        if (e.inputType === 'deleteContentBackward') {
            userInputs.pop()
            charElements[userInputs.length].className = ''
            return
        }
        userInputs.push(e.data)

        let currIdx = 0
        while (currIdx < userInputs.length && currIdx < letters.length) {
            const state = letters[currIdx] === userInputs[currIdx] ? 'correct' : 'wrong'
            charElements[currIdx].className = state
            currIdx++
        }
    })


}


const timer = () => {
    timerId = setInterval(() => {
        timerContainer.innerHTML = counter
        counter--
        if (counter < 0) {
            clearInterval(timerId)
            timerContainer.innerHTML = 'Time is up'
            inputField.disabled = true

            const correctChars = userInputs.filter((char, index) => char === letters[index])

            const wpm = (correctChars.length * 60) / (selectedTime * 5)
            const accuracy = (correctChars.length / userInputs.length) * 100

            wpmValue.innerHTML = wpm
            AccValue.innerHTML = `${isNaN(accuracy) ? '0' : Math.round(accuracy)}%`
            console.log(accuracy);

        }
    }, 1000)
}