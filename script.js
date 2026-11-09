const audio = document.getElementById("bg-audio");

document.addEventListener("click", () => {
    audio.play();
}, { once: true });
const camera = document.getElementById("camera");

async function showCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });
        camera.srcObject = stream;
    } catch (error) {
        console.error("Camera access error:", error);
    }
}

showCamera();


const details = [
    {
        element: document.getElementById("age"),
        label: "Age",
        value: () => Math.floor(Math.random() * 13) + 18
    },
    {
       
    element: document.getElementById("height"),
    label: "Height",
    value: () => {
        let feet = Math.floor(Math.random() * 3) + 4;
        let inches = Math.floor(Math.random() * 12);

        return `${feet}' ${inches}"`;
    }

    },
    {
        element: document.getElementById("weight"),
        label: "Weight",
        value: () => Math.floor(Math.random() * 41) + 45 + " kg"
    },
    {
        element: document.getElementById("gender"),
        label: "Gender",
        value: () => gender(["Male","Transgender", "Female", "Alien"])
    },
    {
        element: document.getElementById("job"),
        label: "Job",
        value: () => randomItem(["Engineer", "Doctor", "Politician", "Buisness", "Begger"])
    },
    {
        element: document.getElementById("type"),
        label: "Type",
        value: () => randomItem(["Introvert", "Extrovert", "Shy", "Ambitious"])
    },
    {
        element: document.getElementById("hobbies"),
        label: "Hobbies",
        value: () => randomItem(["Reading", "Traveling", "Gaming", "Music", "Photography"])
    }
];

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function gender(array){
    let randNum = Math.floor(Math.random()*1000);
    if(randNum <= 250){
        return array[0];
    }
    else if(randNum <= 500){
        return array[1];
    }
    else if(randNum <= 750){
        return array[2];
    }
    else if(randNum <= 1000){
        return array[3];
    }
}

const steps = document.querySelectorAll(".step");
const progressFill = document.getElementById("progress-fill");
const startBtn = document.getElementById("start");

let currentStep = 0;
let progressInterval;

const totalSteps = steps.length;
const totalTime = 20000;
const intervalTime = totalTime / (totalSteps - 1);


function updateProgress() {

    steps.forEach((step, index) => {
        step.classList.toggle("active", index <= currentStep);
    });

    const progress = (currentStep / (totalSteps - 1)) * 100;

    progressFill.style.width = `${progress}%`;
}


function showDetail(index) {

    const detail = details[index];

    detail.element.innerText =
        detail.label + ": " + detail.value();
}


startBtn.addEventListener("click", () => {

    clearInterval(progressInterval);

    
    currentStep = 0;

    details.forEach(detail => {
        detail.element.innerText = detail.label;
    });

    updateProgress();

    
    showDetail(0);

    
    progressInterval = setInterval(() => {

        currentStep++;

        updateProgress();

        
        showDetail(currentStep);

        if (currentStep >= totalSteps - 1) {
            clearInterval(progressInterval);
        }

    }, intervalTime);

});

updateProgress();

