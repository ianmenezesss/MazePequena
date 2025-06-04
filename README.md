# Maze Game 🧠🕹️

-Jogo de labirinto em JavaScript onde o player se move sozinho até achar a saída.

## Integrantes
-Ian Freire Borges RA: 12723134698
-Ian Davi Menezes Alves Bomfim RA: 12723134435

## Como funciona
- Cor amarela e o caminho desfeito no backtracking
- Cor verde e a caminho certo percorrido
- cor azul e o jogador virtual
- cor vermelha e a porta
- O labirinto é desenhado no canvas (`<canvas>`).
- 0 para caminho 1 para parede.
- O personagem começa do ponto 2 e vai andando até achar o 3 (saída).
- Ele usa um algoritmo com backtracking pra achar o caminho.
- Se ficar preso, ele volta e tenta outro caminho.
- Quando chega na saída, um alerta aparece e depois de clicado um novo labirinto aparece automaticamente.

## Controles

- ▶️ **Play**: começa o movimento.
- ⏸️ **Pause**: pausa tudo.
- ⏩ **Velocidade**: vai de 1x até 5x. Só ir clicando que troca.

## Arquivos

- `index.html`: HTML principal.
- `index.css`: estilos .
- `renderMaze.js`: desenha o labirinto.
- `movimento.js`: lógica de movimento e backtracking.
- `allMaze.js`: onde ficam os labirintos.
- `README.md`: você tá lendo ele agora.

## Como usar
# acesse: maze-pequena.vercel.app ou
1. Abre o `index.html` no navegador.
2. Aperta **Play**.
3. Curte a viagem.
