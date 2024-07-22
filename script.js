const word = document.getElementById('word');
const userWord = document.getElementById('user-word');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const settingBtn = document.getElementById('setting-btn');
const settingCon = document.getElementById('setting');
const settingForm = document.getElementById('form');
const difficultyDropdown = document.getElementById('difficulty');
const gameover = document.getElementById('gameover');

let randomWord;

let score = 0;

let time = 10;

let addtime = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

difficultyDropdown.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

userWord.focus();

function generateWord(){
    fetch(`https://random-word.ryanrk.com/api/en/word/random/?minlength=5&maxlength=9`)
    .then(res => res.json())
    .then(data => {
        word.innerHTML = data;
        randomWord = word.innerText;
    })
};

function incrementScore(){
    score++;
    scoreElement.innerHTML = score;
};

function decrementTimer(){
    time--;
    timeElement.innerHTML = `${time}s`;
    if(time === 0){
        clearInterval(timerInterval);
        gameOver();
    }
};

function gameOver(){
    gameover.style.display = 'flex';
    gameover.innerHTML = `
        <h1>Time up!</h1>
        <p>Well played! your score is: ${score}</p>
        <button onclick="location.reload()">Play Again</button>
    `;
};

const timerInterval = setInterval(decrementTimer, 1000);

userWord.addEventListener('input', e => {
    const userInput = e.target.value;
    if(userInput === randomWord){
        generateWord();
        incrementScore();
        e.target.value = '';
        if(difficulty === 'easy'){
            time = addtime;
        } 
        else if(difficulty === 'medium'){
            addtime = 6;
            time = addtime;
        } 
        else {
            addtime = 4;
            time = addtime;
        }
        timeElement.innerHTML = `${time}s`;
    }
});

settingBtn.addEventListener('click', () => settingCon.classList.toggle('hide'));

difficultyDropdown.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);

})

generateWord();