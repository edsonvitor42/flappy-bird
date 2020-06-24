
class Menu {
    constructor(canvas, sprites, ctx) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._sprites = sprites;

        this._sourceX = 134; // Referente a posição X do desenho no arquivo { sprites.png }
        this._sourceY = 0; // Referente a posição Y do desenho no arquivo { sprites.png }
        this._width = 174; // A alrgura do recorte no aquivo { sprites.png }
        this._height = 152; // A altura do recorte no aquivo { sprites.png }
        this._positionX = (this._canvas.width / 2) - 174 / 2; // Posição X onde o desenho aparecerá no canvas.
        this._positionY = 50; // Posição Y onde o desenho aparecerá no canvas.
        this._widthOnCanvas = this._width; // A alrgura do desenho no canvas.
        this._heightOnCanvas = this._height; // A altura do desenho no canvas.
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
    }
};