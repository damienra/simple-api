// SELECTORS
const buttonSelector = document.querySelector('#button');
const inputSelector = document.querySelector('#input');
const answerSelector = document.querySelector('#answer');
const errorSelector = document.querySelector('#error');

// API
const API_ENDPOINT = 'https://yesno.wtf/api';

// FLAGS
let isRequestInProgress = false;

const setIsRequestInProgress = value => {
    isRequestInProgress = value;
};

const setDisableButtonState = isDisabling => {
    if (isDisabling) {
        buttonSelector.setAttribute('disabled', 'disabled');
    } else {
        buttonSelector.removeAttribute('disabled');
    }
};

const cleanupResponse = () => {
    setTimeout(() => {
        answerSelector.innerHTML = '';
        inputSelector.value = '';
        setIsRequestInProgress(false);
        setDisableButtonState(false);
    }, 3000);
};

const showAnswer = answer => {
    setTimeout(() => {
        answerSelector.innerHTML = `<img src=\"${answer}\" width=\"600px\" height=\"400px\">`;
        cleanupResponse();
    }, 3000);
};

const fetchAnswer = () => {
    setIsRequestInProgress(true);

    setDisableButtonState(true);

    fetch(API_ENDPOINT)
        .then(data => data.json())
        .then(data => showAnswer(data.image));
};

const showError = () => {
    errorSelector.innerHTML = 'Write Something First...';

    setTimeout(() => {
        errorSelector.innerHTML = '';
    }, 3000);
};

const getAnswer = () => {
    if (isRequestInProgress) return;
    if (!inputSelector.value) return showError();

    fetchAnswer();
};

const handleKeyEnter = e => {
    if (e.keyCode === 13) {
        getAnswer();
    }
};

buttonSelector.addEventListener('click', getAnswer);

//Colors

// Function to generate a random color in the purple-blue range
const generateRandomColor = () => {
    const purple = Math.floor(Math.random() * 100) + 155; // Random value between 155 and 255
    const blue = Math.floor(Math.random() * 100) + 155; // Random value between 155 and 255
    return `rgb(${purple}, 0, ${blue})`;
  };
  
  // Function to update the background color gradient
  const updateBackgroundColor = () => {
    const body = document.querySelector('body');
    const gradientColor1 = generateRandomColor();
    const gradientColor2 = generateRandomColor();
    body.style.background = `radial-gradient(circle, ${gradientColor1}, ${gradientColor2})`;
  };
  
  // Function to create and position the Y and N elements in the middle of the screen
  const createYNElements = () => {
    const container = document.querySelector('.container');
  
    // Create Y element
    const yElement = document.createElement('div');
    yElement.innerHTML = 'Y';
    yElement.style.fontSize = '10em';
    yElement.style.color = 'white';
    yElement.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
    yElement.style.position = 'absolute';
    yElement.style.top = '50%';
    yElement.style.left = '50%';
    yElement.style.transform = 'translate(-50%, -50%)';
    container.appendChild(yElement);
  
    // Create N element
    const nElement = document.createElement('div');
    nElement.innerHTML = 'N';
    nElement.style.fontSize = '10em';
    nElement.style.color = 'white';
    nElement.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
    yElement.style.position = 'absolute';
  yElement.style.top = 'calc(50% - 100px)';
  yElement.style.left = '50%';
    nElement.style.transform = 'translate(-50%, -50%)';
    container.appendChild(nElement);
  
    // Update the position and rotation of the Y and N elements
    const updateYNElements = () => {
      const rotation = Math.random() * 90 - 45; // Random rotation between -45 and 45 degrees
      yElement.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
      nElement.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    };
  
    updateYNElements();
    setInterval(updateYNElements, 3000); // Update the position and rotation every 3 seconds
  };
  
  // Call the functions to update the background color and create the Y and N elements
  updateBackgroundColor();
  createYNElements();