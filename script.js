document.addEventListener('DOMContentLoaded', function () {
    const puzzleContainer = document.getElementById('puzzle-container');

    // Create the puzzle grid
    const gridSize = 3;
    const totalTiles = gridSize * gridSize;
    const tiles = Array.from({ length: totalTiles - 1 }, (_, index) => index + 1);

    // Add empty space at the end
    tiles.push(null);

    // Shuffle the tiles
    shuffleArray(tiles);

    // Populate the puzzle container with tiles
    tiles.forEach((value, index) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.textContent = value;
        tile.dataset.index = index;
        tile.addEventListener('click', () => onTileClick(index));
        puzzleContainer.appendChild(tile);
    });

    function onTileClick(index) {
        const emptyIndex = tiles.indexOf(null);
        if (isValidMove(index, emptyIndex)) {
            // Swap tiles
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];

            // Update the display
            updatePuzzleDisplay();
            
            // Check if the puzzle is solved
            if (isPuzzleSolved()) {
                alert('Congratulations! You solved the puzzle.');
            }
        }
    }

    function isValidMove(clickedIndex, emptyIndex) {
        const row = Math.floor(clickedIndex / gridSize);
        const col = clickedIndex % gridSize;

        const emptyRow = Math.floor(emptyIndex / gridSize);
        const emptyCol = emptyIndex % gridSize;

        return (
            (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
            (col === emptyCol && Math.abs(row - emptyRow) === 1)
        );
    }

    function isPuzzleSolved() {
        return tiles.every((value, index) => (value === null || value === index + 1));
    }

    function updatePuzzleDisplay() {
        const tileElements = document.querySelectorAll('.tile');
        tileElements.forEach((tile, index) => {
            tile.textContent = tiles[index];
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
