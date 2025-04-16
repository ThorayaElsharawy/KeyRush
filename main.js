const timesList = document.querySelectorAll('#time li')
const wordsList = document.querySelectorAll('#word li')
const quoteList = document.querySelectorAll('#quote li')
const timer = document.querySelector('.timer')
const resetBtn = document.querySelector('.reset')
const StartBtn = document.querySelector('.startBtn');
const wordsWrapper = document.querySelector('.words-wrapper')
const inputField = document.querySelector('input')
const options = document.querySelectorAll('#options-list li')
const menus = document.querySelectorAll('.option-menu')


const charElements = []
let userInputs = []
let letters = []
let selectedTime = 5;
let selectedWord = 10;
let selectedQuote = 'Short'
let timerId;
let counter = selectedTime
let type = 'time';

const resetInput = () => {
    inputField.value = '';
    userInputs = [];

}

const reset = () => {
    resetInput()
    generateWords()
    clearInterval(timerId)
    inputField.disabled = false
    inputField.focus()
}


timesList.forEach(item => {
    item.onclick = () => {
        timesList.forEach(time => time.classList.remove('active'))
        item.classList.add('active')
        selectedTime = +item.innerHTML
        timer.innerText = selectedTime
        counter = selectedTime;
        reset()
        counterFun()
    }
});

wordsList.forEach(word => {
    word.onclick = () => {
        wordsList.forEach(word => word.classList.remove('active'))
        word.classList.add('active')
        selectedWord = +word.innerHTML
        reset()
    }
})

quoteList.forEach(quote => {
    quote.onclick = () => {
        quoteList.forEach(quote => quote.classList.remove('active'))
        quote.classList.add('active')
        selectedQuote = quote.innerHTML
        reset()
    }
})

options.forEach(option => {
    option.onclick = () => {
        options.forEach(option => option.classList.remove('active-type'))
        option.classList.add('active-type');

        const dataType = option.getAttribute('data-type')
        type = dataType
        menus.forEach(menu => {
            menu.style.display = dataType === menu.id ? 'flex' : 'none'
        })
        reset()

        if (type === 'time') {
            counter = selectedTime
            timer.style.display = 'inline-block'
            timer.innerHTML = counter
            counterFun()
        }
    }
})

wordsWrapper.style.display = 'none'


const generateWords = () => {
    let p = `the quick brown fox jumps over the lazy dog. Typing tests help improve speed and accuracy. 
    Practice daily to build muscle memory and confidence.`

    const texts = {
        default: `the quick brown fox jumps over the lazy dog. Typing tests help improve speed and accuracy. 
                Practice daily to build muscle memory and confidence.`,
        word: {
            10: 'rain fell softly, calming the night with its gentle rhythm.',
            20: 'the sun dipped below the horizon, casting golden hues across the sky as waves gently kissed the shore in perfect rhythm.',
            30: 'as the sun set behind the mountains, the sky transformed into a canvas of vibrant colors. Birds returned to their nests, and a gentle breeze rustled the trees. The world seemed to pause for a moment, wrapped in peace, reminding everyone to slow down and appreciate life’s simple, beautiful moments.'
        },
        quote: {
            Short: "less is more.",
            Medium: "success is not final, failure is not fatal: it is the courage to continue that counts.",
            Long: "your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma — which is living with the results of other people's thinking."
        }
    }

    if (type === 'word') {
        p = texts.word[selectedWord] || texts.default
    }
    if (type === 'quote') {
        p = texts.quote[selectedQuote] || texts.default
    }
    const wordsContainer = document.querySelector('.words')
    charElements.length = 0
    wordsContainer.innerHTML = ''
    letters = p.split('')
    letters.forEach(item => {
        const charachter = document.createElement('span');
        charachter.innerText = item
        charElements.push(charachter)
    })

    wordsContainer.append(...charElements);


    if (type === 'word' || type === 'quote') {
        timer.style.display = 'none'
    }
}


StartBtn.onclick = () => {
    generateWords()
    if (type === 'time') {
        timer.style.display = 'inline-block'
        timer.innerHTML = counter
        counterFun()
    }
    charElements.forEach(item => item.className = '')
    StartBtn.style.display = 'none'
    wordsWrapper.style.display = 'block'
    inputField.focus()
    checkSpelling()
}


const counterFun = () => {
    timerId = setInterval(() => {
        timer.innerHTML = counter
        counter--
        if (counter < 0) {
            clearInterval(timerId)
            timer.innerHTML = 'Time is up'
            inputField.disabled = true
        }
    }, 1000)
}

const handleTyping = (e) => {
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
}

const checkSpelling = () => {
    inputField.removeEventListener('input', handleTyping)
    inputField.addEventListener('input', handleTyping)
}

resetBtn.onclick = () => {
    inputField.value = ''
    userInputs.length = 0
    charElements.forEach(item => item.className = '')
    StartBtn.style.display = 'block'
    wordsWrapper.style.display = 'none'
    clearInterval(timerId)
    inputField.disabled = false
    counter = selectedTime
    timer.innerHTML = counter
}