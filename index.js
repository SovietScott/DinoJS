const player = document.querySelector('.player');
const background = document.querySelector('.background');
const pontuacao = document.querySelector('.pontos');

let pontos = 0;
let isJumping = false;
let position = 0;

const handleKeyUp = (event) => {
  if(event.keyCode === 32) if(!isJumping) jump();
}

const jump = () => {
  isJumping = true;
  let upInterval = setInterval(() => {
    if(position >= 150){
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if(position <= 0){
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 15;
        player.style.bottom = position + 'px';
      },50);
    }else{
      position += 20;
      player.style.bottom = position + 'px';
    }
  }, 20);

}


const createCactus = () => {
  const cactus = document.createElement('div');
  let cactusPosition = 1870;
  let randomTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  cactus.style.left = 1870 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if(cactusPosition < -60){
      clearInterval(leftInterval);
      background.removeChild(cactus);
    }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
      clearInterval(leftInterval);
      background.removeChild(cactus);
      document.body.innerHTML = `<h1 class="game-over"> Fim de Jogo </h1>
      <button onClick="document.location.reload(true)"> Resetar </button>`;
    }else{
      cactusPosition -= 15;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20)

  let checkInterval = setInterval(() => {
    if(cactusPosition <= 80){
      clearInterval(checkInterval);
      pontos += 15;
      pontuacao.innerHTML = pontos;
    } 
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);