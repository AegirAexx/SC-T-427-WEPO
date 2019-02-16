
window.drawio = {
    shapes: [],
    selectedShape: 'rectangle',
    canvas: document.getElementById('mainCanvas'),
    ctx: document.getElementById('mainCanvas').getContext('2d'),
    selectedElement: null,
    color: null,
    availableShapes: {
        RECTANGLE: 'rectangle',
        CIRCLE: 'circle',
        LINE: 'line',
        TEXT: 'text',
        STAR: 'star'
    }
};

(function () {

    const clear = document.getElementById('clear');
    const rect = document.getElementById('rect');
    const circle = document.getElementById('circle');
    const line = document.getElementById('line');
    const draw = document.getElementById('draw');

    function drawCanvas(){
        if(drawio.selectedElement){
            console.log(drawio.selectedElement +  ' is selected');
            drawio.selectedElement.render();
        }
        console.log('-----');
        for(let i = 0; i < drawio.shapes.length; i++){
            console.log(drawio.shapes[i] +  ' is selected');
            drawio.shapes[i].render();
        }
    };

    clear.addEventListener('click', function(e) {
       console.log('Clear event: ' + e);
    });

    rect.addEventListener('click', function(e) {
        console.log('Rectangle event: ' + e);
    });

    circle.addEventListener('click', function(e) {
        console.log('Circle event: ' + e);
    });

    line.addEventListener('click', function(e) {
        console.log('Line event: ' + e);
    });

    draw.addEventListener('click', function(e) {
        console.log('Draw event: ' + e);
    });

})();