
class Background {
    constructor(canvas, sprites, ctx) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._sprites = sprites;

        this._sourceX = 390; // Referente a posição X do desenho no arquivo { sprites.png }
        this._sourceY = 0; // Referente a posição Y do desenho no arquivo { sprites.png }
        this._width = 275; // A alrgura do recorte no aquivo { sprites.png }
        this._height = 204; // A altura do recorte no aquivo { sprites.png }
        this._positionX = 0; // Posição X onde o desenho aparecerá no canvas.
        this._positionY = this._canvas.height - 204; // Posição Y onde o desenho aparecerá no canvas.
        this._widthOnCanvas = this._width; // A alrgura do desenho no canvas.
        this._heightOnCanvas = this._height; // A altura do desenho no canvas.
        this._gravity = 0.1;
        this._velocity = 0;
    }

    /**
     * Função responsável por desenhar o objeto na tela.
     */
    drawImage = () => {
        this._ctx.fillStyle = '#70c5ce';
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

        this._ctx.drawImage(
            this._sprites,
            this._sourceX,
            this._sourceY,
            this._width,
            this._height,
            this._positionX,
            this._positionY,
            this._widthOnCanvas,
            this._heightOnCanvas,
        );
        this._ctx.drawImage(
            this._sprites,
            this._sourceX,
            this._sourceY,
            this._width,
            this._height,
            (this._positionX + this._height),
            this._positionY,
            this._widthOnCanvas,
            this._heightOnCanvas,
        );
    }

    update() {
        this._velocity += this._gravity;
        this._positionX += this._velocity;
    }
};