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
        let currentColor = square.style.backgroundColor;
        if (!currentColor) {
            // Generate a random color if the square has no color
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            square.style.backgroundColor = `#${randomColor}`;
        } else {
            // Darken the current color by 10%
            currentColor = currentColor.substring(1); // remove #
            let num = parseInt(currentColor, 16);
            
            let r = (num >> 16) - Math.floor(0.1 * 255);
            let g = ((num >> 8) & 0x00FF) - Math.floor(0.1 * 255);
            let b = (num & 0x0000FF) - Math.floor(0.1 * 255);

            r = r < 0 ? 0 : r;
            g = g < 0 ? 0 : g;
            b = b < 0 ? 0 : b;

            let newColor = (r << 16) | (g << 8) | b;
            let newColorStr = '#' + newColor.toString(16).padStart(6, '0');

            square.style.backgroundColor = newColorStr;
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