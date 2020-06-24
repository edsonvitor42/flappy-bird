

const som_hit = new Audio();
som_hit.src = './effect-sounds/hit.wav';

const globais = {
    frames: 0
}

let activeScreen = {};
let screens = {
    menu: {
        draw() {
            globais.background.drawImage();
            globais.footer.drawImage();
            globais.bird.drawImage();
            globais.menu.drawImage();
        },
        click() {
            changeScreen(screens.game);
        },
        update() {

        }
    },
    game: {
        draw() {
            globais.background.drawImage();
            globais.footer.drawImage();
            globais.bird.drawImage(globais.frames);
        },
        click() {
            globais.bird.jump();
        },
        update() {
            if (globais.bird.collision(globais.bird.positionY + globais.bird.height, globais.footer.positionY)) {
                som_hit.play();

                setTimeout(() => {
                    changeScreen(screens.menu);
                }, 150);
            
                return;
            }

            globais.bird.update();
            globais.footer.update();
        }
    }
};

function onload() {
    globais.sprites = new Image();
    globais.sprites.src = 'sprites.png';

    globais.canvas = document.querySelector('canvas');
    globais.ctx = globais.canvas.getContext('2d');

    globais.background = new Background(globais.canvas, globais.sprites, globais.ctx);
    globais.footer = createFooter();
    globais.menu = new Menu(globais.canvas, globais.sprites, globais.ctx);
    globais.bird = createBird();

    window.addEventListener('click', function () {
        if (activeScreen.click) {
            activeScreen.click();
        }
    })

    changeScreen(screens.menu)
    frame();
}

const createBird = () => {
    const obj = new Bird(globais.canvas, globais.sprites, globais.ctx);

    return obj;
}

const createFooter = () => {
    const obj = new Footer(globais.canvas, globais.sprites, globais.ctx);

    return obj;
}

const changeScreen = (newScreen) => {
    activeScreen = newScreen;

    globais.bird = createBird();
    globais.footer = createFooter();
};

const frame = () => {
    activeScreen.draw();
    activeScreen.update();

    globais.frames++;
    requestAnimationFrame(frame);
}