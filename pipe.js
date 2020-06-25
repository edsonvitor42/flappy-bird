
class Pipe {
    constructor(canvas, sprites, ctx, bird) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._bird = bird;
        this._sprites = sprites;

        this._listPipe = [];
        this._space = 90;
        this._width = 52; // A alrgura do recorte no aquivo { sprites.png }
        this._height = 400; // A altura do recorte no aquivo { sprites.png }
        this._widthOnCanvas = this._width; // A alrgura do desenho no canvas.
        this._heightOnCanvas = this._height; // A altura do desenho no canvas.

        this._source = {
            sky: {
                sourceX: 52, // Referente a posição X do desenho no arquivo { sprites.png }
                sourceY: 169, // Referente a posição Y do desenho no arquivo { sprites.png }
                positionX: 220, // Posição X onde o desenho aparecerá no canvas.
                positionY: 0, // Posição Y onde o desenho aparecerá no canvas.
            },
            footer: {
                sourceX: 0, // Referente a posição X do desenho no arquivo { sprites.png }
                sourceY: 169, // Referente a posição Y do desenho no arquivo { sprites.png }
                positionX: 220, // Posição X onde o desenho aparecerá no canvas.
                positionY: this._height + this._space, // Posição Y onde o desenho aparecerá no canvas.
            }
        };
    };

    get listPipes() {
        return this._listPipe;
    }

    get pipeSky() {
        return this._source.sky;
    }

    get pipeFooter() {
        return this._source.footer;
    }

    /**
     * Função responsável por desenhar o objeto na tela.
     */
    drawImage = () => {
        this._listPipe.forEach(pipe => {
            const yRandom = pipe.y;

            // Etapa: Cado do topo.
            this._ctx.drawImage(
                this._sprites,
                this._source.sky.sourceX,
                this._source.sky.sourceY,
                this._width,
                this._height,
                pipe.x,
                this._source.sky.positionY + yRandom,
                this._widthOnCanvas,
                this._heightOnCanvas,
            );
    
            // Etapa: Cado do chão.
            this._ctx.drawImage(
                this._sprites,
                this._source.footer.sourceX,
                this._source.footer.sourceY,
                this._width,
                this._height,
                pipe.x,
                this._source.footer.positionY + yRandom,
                this._widthOnCanvas,
                this._heightOnCanvas,
            );

            pipe.sky = {
                x: pipe.x,
                y: this._height + this._source.sky.positionY + yRandom
            };
            pipe.footer = {
                x: pipe.x,
                y: this._source.footer.positionY + yRandom
            }
        });
    }

    update = (frames) => {
        const frameInterval = 100;
        const passedTheBreak = frames % frameInterval === 0;

        if (passedTheBreak) {
            this._listPipe.push({
                x: this._canvas.width,
                y: -150 * (Math.random() + 1)
            });
        }
        
        this._listPipe.forEach(pipe => {
            pipe.x = pipe.x - 2;

            if (pipe.x + this._width <= 0) {
                this._listPipe.shift();
            }
        });
    }
};