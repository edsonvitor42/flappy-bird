

const sounds = {};
sounds.hit = new Audio();
sounds.hit.src = './effect-sounds/hit.wav';

sounds.jump = new Audio();
sounds.jump.src = './effect-sounds/jump.wav';

const global = {
    frames: 0
};

let activeScreen = {};
let screens = {
    menu: {
        draw() {
            global.background.drawImage();
            global.footer.drawImage();
            global.bird.drawImage(global.frames);
            global.menu.drawImage();
        },
        click() {
            changeScreen(screens.game);
        },
        update() {
            global.footer.update();
        }
    },
    game: {
        draw() {
            global.background.drawImage();
            global.pipe.drawImage();
            global.footer.drawImage();
            global.bird.drawImage(global.frames);
        },
        click() {
            global.bird.jump();
            sounds.jump.play();
        },
        update() {
            if (global.bird.collisionFooter(global.bird.positionY + global.bird.height, global.footer.positionY) ||
                global.bird.collisionPipe(global)) {
                sounds.hit.play();

                setTimeout(() => {
                    changeScreen(screens.menu);
                }, 150);
                return;
            }

            global.bird.update();
            global.pipe.update(global.frames);
            global.footer.update();
        }
    }
};

function onload() {
    global.sprites = new Image();
    global.sprites.src = 'sprites.png';

    global.canvas = document.querySelector('canvas');
    global.ctx = global.canvas.getContext('2d');

    global.background = createBackground();
    global.footer = createFooter();
    global.menu = createMenu();
    global.bird = createBird();
    global.pipe = createPipe();

    window.addEventListener('click', function () {
        if (activeScreen.click) {
            activeScreen.click();
        }
    })

    changeScreen(screens.menu)
    frame();
};

const createBird = () => {
    const obj = new Bird(global.canvas, global.sprites, global.ctx);

    return obj;
};

const createFooter = () => {
    const obj = new Footer(global.canvas, global.sprites, global.ctx);

    return obj;
};

const createPipe = () => {
    const obj = new Pipe(global.canvas, global.sprites, global.ctx, global.bird)

    return obj;
};

const createBackground = () => {
    const obj = new Background(global.canvas, global.sprites, global.ctx);

    return obj;
};

const createMenu = () => {
    const obj = new Menu(global.canvas, global.sprites, global.ctx);

    return obj;
}

const changeScreen = (newScreen) => {
    activeScreen = newScreen;

    global.bird = createBird();
    global.footer = createFooter();
    global.background = createBackground();
    global.pipe = createPipe();
    global.menu = createMenu();
};

const frame = () => {
    activeScreen.draw();
    activeScreen.update();

    global.frames++;
    requestAnimationFrame(frame);
};