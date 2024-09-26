document.addEventListener('DOMContentLoaded', () => {
    let container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.width = '100vw';
    container.style.height = '100vw';



    const changeGridSizeButton = document.createElement('button');
    changeGridSizeButton.textContent = 'Change Grid Size';
    changeGridSizeButton.style.width = '100%';
    changeGridSizeButton.style.height = '30px';
    changeGridSizeButton.style.marginTop = '10px';
    changeGridSizeButton.style.border = 'none';
    changeGridSizeButton.style.backgroundColor = '#007bff';
    changeGridSizeButton.style.color = 'white';
    changeGridSizeButton.style.cursor = 'pointer';

    function colorSquare(square) {
        let currentOpacity = parseFloat(square.style.opacity) || 0;
        if (currentOpacity === 0) {
            // Generate a random color if the square has no color
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            square.style.backgroundColor = `#${randomColor}`;
            square.style.opacity = 0.1;
        } else {
            // Increase the opacity by 0.1
            currentOpacity += 0.1;
            if (currentOpacity > 1) currentOpacity = 1;
            square.style.opacity = currentOpacity;
        }
    }

    document.body.appendChild(changeGridSizeButton);

    changeGridSizeButton.addEventListener('click', () => {
        const gridSize = prompt('Enter the grid size (1 - 100)', '16');
        // Limit the grid size to max 100
        if (gridSize > 100) {
            alert('Grid size must be less than or equal to 100');
            return;
        }
        if (gridSize) {
            container.innerHTML = '';

            for (let i = 0; i < gridSize * gridSize; i++) {
                const square = document.createElement('div');
                square.style.border = '1px solid #ddd';
                square.style.width = `calc(100% / ${gridSize})`;
                square.style.height = `calc(100% / ${gridSize})`;
                container.appendChild(square);
            }

            squares = container.querySelectorAll('div');

        
            squares.forEach(square => {
                square.addEventListener('mouseover', () => {
                    if (isDrawing) {
                        colorSquare(square);
                    }
                });
            });
        }
    });

    for (let i = 0; i < 256; i++) {
        const square = document.createElement('div');
        square.style.border = '1px solid #ddd';
        square.style.width = 'calc(100% / 16)';
        square.style.height = 'calc(100% / 16)';
        container.appendChild(square);
    }

    let squares = container.querySelectorAll('div');


    document.body.appendChild(container);

    let isDrawing = false;

    container.addEventListener('mousedown', () => {
        isDrawing = true;
    });

    container.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            if (isDrawing) {
                colorSquare(square);
            }
        });
    });
});