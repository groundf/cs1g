"use strict";
exports.__esModule = true;
var gl_1 = require("./gl");
function main() {
    var canvas = document.querySelector("#canvas");
    // resizeCanvasToDisplaySize(canvas)
    var gl = canvas.getContext("webgl2");
    var status = false;
    var time = 0.01; // seconds
    // *******************************************************************
    // Shader Program
    // *******************************************************************
    var vertexShaderSource = document.getElementById("vertex-shader-2d").innerText.trim();
    var fragmentShaderSource = document.getElementById("fragment-shader-2d").innerText.trim();
    var shaderProgram = (0, gl_1.createShaderProgramFromSources)(gl, vertexShaderSource, fragmentShaderSource);
    // ******************************************************************* 
    // Buffers (VBO)
    // *******************************************************************
    var vertices = new Float32Array([
        -0.5, -0.5,
        +0.0, +0.5,
        +0.5, -0.5,
    ]); // The typed array is must!
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var sizePointer = gl.getAttribLocation(shaderProgram, "a_size");
    var positionPointer = gl.getAttribLocation(shaderProgram, "a_position");
    // vertexAttribPointer(index, size, type, normalized, stride, offset)
    var size = 2; // How many coordinates per vertex!
    gl.vertexAttribPointer(positionPointer, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionPointer);
    // *******************************************************************         
    // Render 
    // *******************************************************************
    function render() {
        gl.useProgram(shaderProgram);
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(1, 1, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);
        var type = gl.POINTS;
        var offset = 0;
        var count = 3; // How many *pairs* to render.
        gl.drawArrays(type, offset, count);
        requestAnimationFrame(render);
    }
    render();
    // Cleanup
    // gl.deleteShader(vertexShader);
    // gl.deleteShader(fragmentShader);
    // gl.deleteProgram(shaderProgram)
}
