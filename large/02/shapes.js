
function Shape(position) {
    this.position = position;
}

Shape.prototype.render = function() {
    // TODO - Needs to be implemented.
}

Shape.prototype.move = function(position) {
    this.position = position;
}

Shape.prototype.resize = function() {
    // TODO - Needs to be implemented.
}

// Rectangle
function Rectangle(position, width, height) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
}

Rectangle.prototype = Object.create(Shape.prototype);

Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function() {
    // TODO - Is this correct??
    drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
}

Rectangle.prototype.resize = function(x, y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
}
