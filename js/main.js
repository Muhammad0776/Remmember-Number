const second = document.getElementById("second");
const secondContainer = document.getElementById("secondContainer");
const numbersRow = document.getElementById("numbersRow");
const gamePlayer = document.getElementById("gamePlayer");

const getRandomNumber = () => Math.floor(Math.random() * 100);

let seconds;
let numbers = [];
let sortedArray;
let activeIndex;
let game = true;
let level = 4;

const showNumber = (e) => {
    if (game == false) return;

    const box2 = e.target;
    box1 = box2.parentNode.children[0];

    box1.classList.remove("rotate");
    box2.classList.add("rotateMinus");

    console.log(box1, box2);

    const n = box1.children[0].innerHTML;

    if (n == sortedArray[activeIndex]) {
        box1.classList.add("success");

        if (activeIndex == sortedArray.length - 1) {
            showModal(status.success);
            level++;
            playAudio(false);
        }

        activeIndex++;
    } else {
        game = false;
        box1.classList.add("error");
        showModal(status.error);
        playAudio(false);
    }
};

const sortArray = (array) => array.sort((a, b) => a - b);

const initNumbers = () => {
    numbers = [];
    for (let i = 0; i < level; i++) numbers.push(getRandomNumber());

    sortedArray = sortArray([...numbers]);

    numbersRow.innerHTML = "";

    numbers.map((number, index) => {
        const col = document.createElement("div");
        col.className = `col-6 col-sm-3`;
        col.innerHTML = `
    <div class="position-relative board" >
    <div class="box box1">
      <span class="number">${number}</span>
    </div>
    <div class="box box2 rotateMinus absolute" onclick="showNumber(event)"></div>
  </div>
    `;

        numbersRow.appendChild(col);
    });
};

// Start panel
const startPanel = document.getElementById("startPanel");

const startGame = () => {
    playAudio(true);
    gamePlayer.volume = 1;

    seconds = 5 + level - 4;
    game = true;
    activeIndex = 0;

    second.innerHTML = seconds;
    startPanel.classList.add("d-none");
    secondContainer.classList.remove("d-none");
    myModal.classList.add("d-none");

    initNumbers();

    seconds--;
    const timer = setInterval(() => {
        console.log(seconds);
        if (seconds > 0) second.innerHTML = seconds--;
        else {
            clearInterval(timer);
            second.innerHTML = seconds;
            const boxes1 = document.getElementsByClassName("box1");
            const boxes2 = document.getElementsByClassName("box2");
            for (let i = 0; i < boxes1.length; i++) {
                const box1 = boxes1[i];
                const box2 = boxes2[i];
                console.log(box1);
                box1.classList.add("rotate");
                box2.classList.remove("rotateMinus");
            }
        }
    }, 1000);
};

const playBtn = document.getElementById("playBtn");
let isPlay = true;

const playStopAudio = () => {
    playAudio(!isPlay);
};

const playAudio = (value) => {
    if (value) {
        gamePlayer.play();
        playBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    } else {
        gamePlayer.pause();
        gamePlayer.currentTime = 0;
        playBtn.innerHTML = `<i class="fas fa-volume-mute    "></i>`;
    }

    isPlay = value;
};

//modal
const myModal = document.getElementById("myModal");
const succesModal = document.getElementById("succesModal");
const errorModal = document.getElementById("errorModal");
const gameOver = document.getElementById("gameOver");
const player = document.getElementById("player");

const reload = () => {
    window.location.reload();
};

const status = {
    success: "success",
    error: "error",
    warning: "warning",
};

const showModal = (winner) => {
    setTimeout(() => show(winner), 1000);
};

const show = (winner) => {
    myModal.classList.remove("d-none");

    succesModal.classList.add("d-none");
    errorModal.classList.add("d-none");
    gameOver.classList.add("d-none");

    switch (winner) {
        case status.success: {
            succesModal.classList.remove("d-none");
            player.src = "./audio/win.mp3";
            break;
        }
        case status.error: {
            errorModal.classList.remove("d-none");
            player.src = "./audio/over.mp3";
            break;
        }
        case status.warning: {
            gameOver.classList.remove("d-none");
            player.src = "./audio/over.mp3";
            break;
        }
    }

    player.play();
};
