
var bird, footer, background, menu;

let activeScreen = {};
const screens = {
    menu: {
        draw() {
            background.drawImage();
            footer.drawImage();
            bird.drawImage();
            menu.drawImage();
        },
        click() {
            changeScreen(screens.game);
        },
        update() {

        }
    },
    game: {
        draw() {
            background.drawImage();
            footer.drawImage();
            bird.drawImage();
        },
        update() {
            bird.update();
        }
    }
};

function onload() {
    const sprites = new Image();
    sprites.src = 'sprites.png';

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    background = new Background(canvas, sprites, ctx);
    footer = new Footer(canvas, sprites, ctx);
    bird = new Bird(canvas, sprites, ctx);
    menu = new Menu(canvas, sprites, ctx);

    window.addEventListener('click', function() {
        if (activeScreen.click) {
            activeScreen.click();
        }
    })

    changeScreen(screens.menu)
    frame();
}

const changeScreen = (newScreen) => {
    activeScreen = newScreen;
};

const frame = () => {
    activeScreen.draw();
    activeScreen.update();

    requestAnimationFrame(frame);
}