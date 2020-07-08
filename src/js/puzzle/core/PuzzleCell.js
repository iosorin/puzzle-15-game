export class PuzzleCell {
    constructor({  col, row, width, height, id, border, empty = false } = {}) {
        this.id = id;
        this.col = col;
        this.row = row;
        this.width = width;
        this.height = height;
        this.border = border;
        this.empty = empty;

        this.x = this.col * this.width;
        this.y = this.row * this.height;

        this.vx = this.x;
        this.vy = this.y;

        this.originX = this.x;
        this.originY = this.y;

        this.speed = 20;
        this.shakeX = 35;

        this.fill = '#8AC858';
        this.bdc = '#D8FFBC'; // border color
        this.bdw = 3; // border width
    }

    draw(ctx) {
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.bdc;
        ctx.lineWidth = this.bdw;

        ctx.save();
        ctx.beginPath();
        ctx.rountRect(this.x, this.y, this.width, this.height, this.border);
        ctx.clip();

        if (!this.empty) {
            ctx.fill();

            if (PuzzleCell.image) {
                ctx.drawImage(
                    PuzzleCell.image,
                    this.originX, this.originY,
                    this.width, this.height,
                    this.x, this.y,
                    this.width, this.height
                );
            }

            ctx.stroke();
        }

        ctx.closePath();
        ctx.restore();
    }

    shake() {
        this.x -= this.shakeX;
        this.y -= this.shakeX;
    }

    update() {
        this.vx = Math.floor(this.col * this.width);
        this.vy = Math.floor(this.row * this.height);

        const inInterval = (int1, int2, size) => {
            return (int1 - int2) <= size && (int1 - int2) >= (~size + 1) || int1 === int2;
        };

        if (!inInterval(this.vx, this.x, this.speed)) {
            this.x += (this.x > this.vx) ? (~this.speed + 1) : this.speed;
        }
        else {
            this.x = this.vx;
        }

        if (!inInterval(this.vy, this.y, this.speed)) {
            this.y += (this.y > this.vy) ? (~this.speed + 1) : this.speed;
        }
        else {
            this.y = this.vy;
        }
    }

    isClicked(mouse) {
        return pointRectCollistion(mouse, this);
    }
}

function pointRectCollistion(point, rect) {
    const widthInterval = point.x >= rect.x && point.x <= (rect.x + rect.width);
    const heightInterval = point.y >= rect.y && point.y <= (rect.y + rect.height);

    return widthInterval && heightInterval;
}

CanvasRenderingContext2D.prototype.rountRect = function(x, y, width, height, rounded) {
    const halfRadians = (2 * Math.PI)/2;
    const quarterRadians = (2 * Math.PI)/4;

    // top left arc
    this.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true);

    // line from top left to bottom left
    this.lineTo(x, y + height - rounded);

    // bottom left arc
    this.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true);

    // line from bottom left to bottom right
    this.lineTo(x + width - rounded, y + height);

    // bottom right arc
    this.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true);

    // line from bottom right to top right
    this.lineTo(x + width, y + rounded);

    // top right arc
    this.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true);

    // line from top right to top left
    this.lineTo(x + rounded, y);
};
