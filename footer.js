
class Footer {
    constructor(canvas, sprites, ctx) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._sprites = sprites;

        this._sourceX = 0; // Referente a posição X do desenho no arquivo { sprites.png }
        this._sourceY = 610; // Referente a posição Y do desenho no arquivo { sprites.png }
        this._width = 224; // A alrgura do recorte no aquivo { sprites.png }
        this._height = 112; // A altura do recorte no aquivo { sprites.png }
        this._positionX = 0; // Posição X onde o desenho aparecerá no canvas.
        this._positionY = this._canvas.height - 112; // Posição Y onde o desenho aparecerá no canvas.
        this._widthOnCanvas = this._width; // A alrgura do desenho no canvas.
        this._heightOnCanvas = this._height; // A altura do desenho no canvas.
    }

    get positionY() {
        return this._positionY;
    }

    /**
     * Função responsável por desenhar o objeto na tela.
     */
    drawImage = () => {
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
            (this._positionX + this._width),
            this._positionY,
            this._widthOnCanvas,
            this._heightOnCanvas,
        );
    }

    update = () => {
        const repeatAt = this._width / 2;
        const move = this._positionX - 1;

        this._positionX = move % repeatAt;
    }
};