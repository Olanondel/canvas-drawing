import {applyDrawingSettings, downloadCanvasAsImage} from "./tools.js";

const drawingSetting = {
    strokeStyle: 'black',
    lineWidth: 8,
    lineJoin: 'round',
    lineCap: 'round',
};
const drawingConfig = {
    isDrawing: false,
    isRendering: false,
    x: 0,
    y: 0,
};
let isButtonsDisabled = true;

const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

applyDrawingSettings(context, drawingSetting);

// Start drawing
canvas.addEventListener('mousedown', (e) => {
    if (isButtonsDisabled) unlockButtons();
    drawingConfig.isDrawing = true;
    [drawingConfig.x, drawingConfig.y] = [e.offsetX, e.offsetY];

    drawPoint(drawingConfig.x, drawingConfig.y);
});

// Stop drawing
canvas.addEventListener('mouseup', () => (drawingConfig.isDrawing = false));
canvas.addEventListener('mouseout', () => (drawingConfig.isDrawing = false));

// Draw on canvas
canvas.addEventListener('mousemove', (e) => {
    if (!drawingConfig.isDrawing || drawingConfig.isRendering) return;

    drawingConfig.isRendering = true;

    requestAnimationFrame(() => {
        context.beginPath();
        context.moveTo(drawingConfig.x, drawingConfig.y);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
        [drawingConfig.x, drawingConfig.y] = [e.offsetX, e.offsetY];
        drawingConfig.isRendering = false;
    })

});

function drawPoint(x, y) {
    context.beginPath();
    context.arc(x, y, context.lineWidth / 2, 0, Math.PI * 2); // Рисуем круг (точку)
    context.fillStyle = context.strokeStyle;
    context.fill();
}

function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    applyDrawingSettings(context, drawingSetting);
}

handleResize();
window.addEventListener('resize', handleResize);

// Actions
const resetButton = document.querySelector('.header__button--reset');
const saveButton = document.querySelector('.header__button--save');

lockButtons();

saveButton.addEventListener('click', downloadCanvasImage);
resetButton.addEventListener('click', clearCanvas );

function downloadCanvasImage() {
    downloadCanvasAsImage(canvas)
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    lockButtons();
}

function lockButtons() {
    saveButton.disabled = resetButton.disabled = true;
    isButtonsDisabled = true;
}

function unlockButtons() {
    saveButton.disabled = resetButton.disabled = false;
    isButtonsDisabled = false;
}

const colorButtons = document.querySelectorAll('.colors__button');

colorButtons.forEach(colorButton => {
    colorButton.addEventListener('click', () => {
        context.strokeStyle = colorButton.getAttribute('data-color');
    })
})


