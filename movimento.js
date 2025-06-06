// importa a maze que a matrix a funçao de desenha drawMaze para redesenhar a cada movimento 
import { maze, drawMaze, resizeCanvas } from "./renderMaze.js";

// variaveis global -playerPosition posiçao do jogador -pathStack pilha de posiçoes que o jogador visitou pata o backtraking --visited para celulas visitadas
let playerPosition = null;
let pathStack = [];
const visited = new Set();

//velocida do intervalo e variavel de pausa
let interval = null;
let speed = 300;

//variavel pra saber se esta em pause ou nao
let isRunning = false;

//variavel para pintura da celula 
export const visitedPintado = new Set();

export const visitedPintadoErrado = new Set();

// evento de redimensionamento da janela que chama funçao para redimencionar o canvas
window.addEventListener('resize', () => {
    resizeCanvas();
});



//funçao para começar com a maze desenhada
resizeCanvas()

//  funçao  para dimencionar o canvas 90% largura e altura ,que cham a funçao de movimento mivimenTototal e se mover ele chama a funçao de desenho da maze , essa funçao tem um setInterval de speed
function startLoop() {
    resizeCanvas();
    console.log(speed)
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
        const moved = movimentoTotal();
        if (moved) drawMaze(maze, visitedPintado,visitedPintadoErrado);
    }, speed);
};

//pega o id do butao para realizar funçoes com click

// aqui ele da play começando o loop
document.getElementById("playBtn").onclick = () => {
    startLoop(),
        isRunning = true
}

//aqui ele dar pause 
document.getElementById("pauseBtn").onclick = () => {
    clearInterval(interval),
        isRunning = false
}

//funçao de controle de velocidade do setInterval e do texto de span do butao de velocidade
document.getElementById("speedBtn").onclick = () => {
    const span = document.querySelector("#speedBtn span");
    if (speed === 300) {
        speed = 200;
        span.textContent = "x2";
    } else if (speed === 200) {
        speed = 100;
        span.textContent = "x3";
    } else if (speed === 100) {
        speed = 50;
        span.textContent = "x4";
    } else if (speed === 50) {
        speed = 25;
        span.textContent = "x5";
    } else if (speed === 25) {
        speed = 300;
        span.textContent = "x1";
    }
    if (isRunning) {
        startLoop();
    }
};


// funçao global do mivimento
function movimentoTotal() {

    // funçao para o achar o player virtual no caso o 2 na matrix
    function findInitialPosition() {
        for (let row = 0; row < maze.length; row++) {
            for (let col = 0; col < maze[row].length; col++) {
                if (maze[row][col] === 2) {
                    return { x: col, y: row };
                }
            }
        }
    };

    // funçao do movimento normal
    function movimento() {

        // para achar o jogador virtual apenas 1 vez colocamos essa verificaçao
        if (!playerPosition) {

            //atualiza a posiçao do jogador
            playerPosition = findInitialPosition();

            //atualiza a pilha de movimentos para o backtrking
            pathStack.push(playerPosition);

            //atualiza as casas visitadas
            visited.add(`${playerPosition.x},${playerPosition.y}`);

            //atualiza a pintura
            visitedPintado.add(`${playerPosition.x},${playerPosition.y}`);

        }


        // todos os movimentos posiveis do jogador virtual direita, esquerda, cima e baixo
        const directions = [
            { posX: -1, posY: 0 },
            { posX: 1, posY: 0 },
            { posX: 0, posY: -1 },
            { posX: 0, posY: 1 }
        ];

        // looop para os movimentos posiveis  visitedCel para quarda a posiçao 
        for (const { posX, posY } of directions) {
            const newPosX = playerPosition.x + posX;
            const newPosY = playerPosition.y + posY;

            //validaçao para fora do limite da maze
            if (
                newPosY >= 0 &&
                newPosY < maze.length &&
                newPosX >= 0 &&
                newPosX < maze[0].length) {

                //visitedCel para quarda a posiçao 
                const visitedCel = `${newPosX},${newPosY}`;

                // condiçao de movimento pelo caminhos nao visitados
                if (maze[newPosY]?.[newPosX] === 0 && !visited.has(visitedCel)) {

                    // atualiza o labirinto para o movimento do player
                    maze[playerPosition.y][playerPosition.x] = 0;
                    maze[newPosY][newPosX] = 2;

                    //atualiza a posiçao do jogador
                    playerPosition = { x: newPosX, y: newPosY };

                    //atualiza a pilha de movimentos para o backtrking
                    pathStack.push(playerPosition);

                    //atualiza as casas visitadas
                    visited.add(visitedCel);

                    //atualiza a pintura
                    visitedPintado.add(visitedCel);

                    //retorno para sinaliza que olve movimento
                    return true;
                };

                // condiçao para achar a porta
                if (maze[newPosY]?.[newPosX] === 3 && !visited.has(visitedCel)) {
                    playerPosition = { x: newPosX, y: newPosY };

                    // pausa o mivimento
                    clearInterval(interval);
                    isRunning = false;


                    // alerta de porta achada e renicia a pagina para novo labirinto com um tempo de 1s 
                    setTimeout(() => {
                        alert("Achou a saída! Recomeçando o labirinto...");
                        location.reload();
                    }, 1000);

                    return true;
                };

            }
        }
        // condiçao para retorna falso para ativa o backtraking
        return false;

    };
    function backtraking() {

        // condiçao caso nao tenha caminho de saida 
        if (pathStack.length <= 1) {
            clearInterval(interval);
            isRunning = false;
             setTimeout(() => {
                        alert("Não achou a saida! Recomeçando o labirinto...");
                        location.reload();
                    }, 1000);
            return false;
        }

        // removemos a posiçao atual da pilha de movimento e salvamos ela para despintar
        const removedPos = pathStack.pop();

        // usada para despintar a casa
        const { x: currentX, y: currentY } = removedPos;

        // remove essa celula da lista de pintadas
        visitedPintado.delete(`${currentX},${currentY}`);


        // para pinta a celular do caminho desfeito
        visitedPintadoErrado.add(`${currentX},${currentY}`);

        // constante da posiçao onde o player tem que ir para realiza a volta ,bactraking
        const prevPos = pathStack[pathStack.length - 1];

        // atualiza o labirinto para volta o player
        maze[playerPosition.y][playerPosition.x] = 0;
        maze[prevPos.y][prevPos.x] = 2;

        // atualiza a posiçao do jogador
        playerPosition = prevPos;


        return true;

    }

    // aqui ele verifica se o jogador nao moveu realiza o backtraking
    if (!movimento()) {
        return backtraking();
    }

    // retorna que a funçao foi realizada
    return true;
}

