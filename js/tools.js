export function downloadCanvasAsImage(canvas, type = 'image/png') {
    const dataUrl = canvas.toDataURL(type);

    createTempLink(dataUrl).click();
}

export function createTempLink(href, fileName = 'canvas-image') {
    const link = document.createElement('a');

    link.href = href;
    link.download = fileName;

    return link;
}

export function applyDrawingSettings(context, settings) {
    for (const [key, value] of Object.entries(settings)) {
        context[key] = value;
    }
}

export function checkIsCanvasEmpty(canvas) {
    const emptyCanvas = document.createElement('canvas');
    emptyCanvas.width = canvas.width;
    emptyCanvas.height = canvas.height;

    return canvas.toDataURL() === emptyCanvas.toDataURL();
}