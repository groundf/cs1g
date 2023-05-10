import { test } from "./gl.min.js"
import { resizeCanvasToDisplaySize } from "./gl.min.js"

function main() { 
    let canvas = document.querySelector("#canvas");
    
    resizeCanvasToDisplaySize(canvas)
    
    let gl = canvas.getContext("webgl2")

    var status = false;
    var time = 0.01 // seconds

    // *******************************************************************
    // Shaders
    // *******************************************************************

    //1. Vertex shader
    var vertexShasderSource = document.getElementById("vertex-shader-2d").innerText.trim();
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShasderSource);
    gl.compileShader(vertexShader)
    status = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)
    if (!status) {
        console.log(gl.getShaderInfoLog(vertexShader));
    }
    //2. Fragment shader
    var fragmentShaderSource = document.getElementById("fragment-shader-2d").innerText.trim();
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    status = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if (!status) {
        console.log(gl.getShaderInfoLog(vertexShader));
    }
            
    // *******************************************************************         
    // 3. Shader program 
    // *******************************************************************
    var shaderProgram = gl.createProgram()
    
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    
    gl.linkProgram(shaderProgram)
    status = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
    if (!status) {
        console.log(gl.getprogramInfoLog(shaderProgram));
    }

    // ******************************************************************* 
    // Buffers (VBO)
    // *******************************************************************
    let vertices = new Float32Array([
        /*
           (0,1)    
        +----+----+ (1,1)
        |    |    |
        +----+----+ (1,0)
        |    |    |
        +----+----+ (1,-1)
           (0,-1)
        */
    
        0, 0,  
        1, 0, 
        0, 1,
        -1, 0,
        0,-1,
        -1,1,
        1,-1,
        1,1,
        -1,-1
    ]); // The typed array is must!
    let vertexBuffer = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    let positionPointer = gl.getAttribLocation(shaderProgram, "a_position");
    
    // vertexAttribPointer(index, size, type, normalized, stride, offset)
    const size = 2 // How many coordinates per vertex!
    gl.vertexAttribPointer(positionPointer,size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionPointer);

    // *******************************************************************         
    // Render 
    // *******************************************************************
    gl.useProgram(shaderProgram);
    
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(1, 1, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0,canvas.width,canvas.height);

    const type = gl.POINTS;
    const offset = 0;
    const count = 9 // How many *pairs* to render.
    gl.drawArrays(type, offset, count);

    // Cleanup
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteProgram(shaderProgram)

    // requestAnimationFrame(render);

}

window.onload = () => main()