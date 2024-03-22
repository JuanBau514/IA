var reinas = 0;

function crearTablero(n, queens) {
    var chessboard = document.getElementById("chessboard");
    var html = "";

    for (var i = 0; i < n; i++) {
        html += "<div class='row'>";
        for (var j = 0; j < n; j++) {
            var color = (i + j) % 2 === 0 ? "white" : "black";
            var hasQueen = queens[i] === j ? "<img src='./reina.png' class='queen'>" : "";
            html += "<div class='square " + color + "'>" + hasQueen + "</div>";
        }
        html += "</div>";
    }

    chessboard.innerHTML = html;
}

function movimientoReina(board, row, col, n) {
    // Verifica si hay alguna reina en la misma fila
    for (let i = 0; i < col; i++)
        if (board[row][i])
            return false;

    // Verifica la diagonal superior izquierda
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j])
            return false;

    // Verifica la diagonal inferior izquierda
    for (let i = row, j = col; j >= 0 && i < n; i++, j--)
        if (board[i][j])
            return false;

    return true;
}

function solucionNReinaUtil(board, col, n) {
    if (col >= n)
        return true;

    for (let i = 0; i < n; i++) { // recorre las filas
        if (movimientoReina(board, i, col, n)) { // Verifica si la reina puede ser colocada en la fila i y columna col
            board[i][col] = 1; // si se puede, coloca la reina en la posición (i, col)
            reinas++;

            if (solucionNReinaUtil(board, col + 1, n)) // Llamada recursiva para colocar el resto de las reinas
                return true;

            board[i][col] = 0; // (Backtrack) si no se puede colocar la reina en la posición (i, col) = 0 y prueba con la siguiente fila
            console.log(board);
        }
    }

    return false;
}

function solveNQueens(n) {
    const board = Array.from({ // Crea un tablero de ajedrez de tamaño n x n
        length: n // Crea un array de n elementos
    }, () => Array(n).fill(0)); // Cada elemento del array es un array de n elementos inicializados en 0

    if (!solucionNReinaUtil(board, 0, n)) {
        console.log("No hay solución");
        return false;
    }

    console.log("Solución encontrada:");
    alert("Solución encontrada:", reinas);
    console.log(board);
    crearTablero(n, board.map(row => row.indexOf(1)));
    return true;
}

var size = parseInt(prompt("Ingresa el tamaño del tablero a crear:"));
solveNQueens(size);