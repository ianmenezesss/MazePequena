import { visitedPintado } from './movimento.js';
import { mazes } from './allMaze.js';

// pega o canvas
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

// Matriz do labirinto (1 = parede, 0 = caminho)
 const index = Math.floor(Math.random() * mazes.length);
  export const mazeMatrix = mazes[index];


export let maze = mazeMatrix.map(row => [...row]);


export function drawMaze(matrix,visitedPintado) {
    const cellSize = Math.min(
        canvas.width / matrix[0].length,
        canvas.height / matrix.length
    );

    const offsetX = (canvas.width - (matrix[0].length * cellSize)) / 2;
    const offsetY = (canvas.height - (matrix.length * cellSize)) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    //loop para pintar a matrix
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const x = offsetX + col * cellSize;
            const y = offsetY + row * cellSize;

           
            if (visitedPintado.has(`${col},${row}`) && matrix[row][col] === 0) {
                ctx.fillStyle = '#aaf'; // uma cor para visitado,
                ctx.fillRect(x, y, cellSize, cellSize);
            } else {
            if (matrix[row][col] === 1) {
                ctx.fillStyle = '#333';  // pinta o numero 1 parede
                ctx.fillRect(x, y, cellSize, cellSize);
            } else if (matrix[row][col] === 2) {
                ctx.fillStyle = '#0077ff';  // pinta o numero 2 player
                ctx.fillRect(x, y, cellSize, cellSize);
            } else if (matrix[row][col] === 3) { 
                ctx.fillStyle = '#ff0000';  // pinta o numero 3 porta 
                ctx.fillRect(x, y, cellSize, cellSize);
            }else {
                ctx.fillStyle = '#fff';  // pinta o numero 0 caminho
                ctx.fillRect(x, y, cellSize, cellSize);
            }
            ctx.strokeStyle = '#999';
            ctx.strokeRect(x, y, cellSize, cellSize);
        }
    }
    }
}

// funçao para redimencionar o canvas com base na tela 90% largura e altura
export function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9;;
    canvas.height = window.innerHeight * 0.9;;
    drawMaze(maze,visitedPintado);
}


