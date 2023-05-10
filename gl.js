//"use strict";


export function test() {
    console.log("It works")
}


/**
 *
 * WebGL types and functions.
 
*  WebGLRenderingContextBase
*/

/**
 * Create shader of a given type from GLSL source.
 *  
 * @param {WebGL2RenderingContext} context The WebGL rendering context.
 * @param {WebGL2RenderingContext.VERTEX_SHADER | WebGL2RenderingContext.FRAGMENT_SHADER} shaderType The shader type numeric constant.
 * @param {String} shaderSource The GLSL shader source.
 * @throws Will throw error message when shader was not compiled.
 * @returns {WebGLShader} The compiled vertex or fragment shader which can be attached to WebGLProgram.
 */
export function createShader(context, shaderType, shaderSource) {
    let shader = context.createShader(shaderType);
    
    if (shader == null) {
        throw "Could not create shader!";
    }
    context.shaderSource(shader, shaderSource);
    context.compileShader(shader);
    
    // Check the compilation errors.  
    let status = context.getShaderParameter(shader, context.COMPILE_STATUS);
    if (!status) {
        var info = context.getShaderInfoLog(shader);
        context.deleteShader(shader);
        throw "Could not compile shader! ".concat(info);
    }
    return shader;
}

/**
 * Create shader program from given vertex and fragment shaders.
 * 
 * @param {WebGL2RenderingContext}
 * @param {WebGLShader} vertexShader The vertex shader.
 * @param {WebGLShader} fragmentShader The fragment shader.
 * @throws Will throw erro message when program was not linded. 
 * @returns {WebGLProgram}
 */
export function createShaderProgram(context, vertexShader, fragmentShader) {
    let program = context.createProgram();
    
    if (program == null) {
        throw "Could not create shader program!";
    }

    /* /Check vertex shader types/ */
    context.attachShader(program, vertexShader);
    context.attachShader(program, fragmentShader);
    context.linkProgram(program);
    
    let status = context.getProgramParameter(program, context.LINK_STATUS);
    
    if (!status) {
        context.deleteProgram(program);
        throw "Could not link shader program!";
    }

    return program;
}

/**
 * Create shader program from given vertex and fragment shader sources.
 */
export function createShaderProgramFromSources(context, vertexShaderSource, fragmentShaderSource) {
    let vertexShader = createShader(context, context.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(context, context.FRAGMENT_SHADER, fragmentShaderSource);
    let shaderProgram = createShaderProgram(context, vertexShader, fragmentShader);

    return shaderProgram;
}

/**
 * Resize canvas to the display size (pixels).
 */
export function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    var displayWidth = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;
    // Check if the canvas is not the same size.
    var needResize = canvas.width !== displayWidth ||
        canvas.height !== displayHeight;
    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
    return needResize;
}

export function setup(selector) {
    var canvas = document.querySelector(selector);
    if (canvas == null) {
        throw "Could not find canvas!";
    }
    var context = canvas.getContext("webgl2", { alpha: false });
    if (context == null) {
        throw "Could not create context!";
    }
    return context;
}

// Render the scene graph.
export function _render() {
}

/* ----------------------------------------------------------------------- */ 

/** Camera */
/** Entity */
/** Light  */
/** Ray    */
/** Transform  */


/**
 * Shader holds the fragment or vertex shader source.
 */
export class Shader {

    type: Fragment | Vertex;

    constructor(type: Fragment | Vertex) {
        this.type = type
    }
}


export type ShaderProgram = {
    id: number
    type: string
    source: string
}


export const compileShader = () =>  {
    return 0
}

/**
 * Math module
 * 
 */

/** 
 * Calculate the square of number. 
 * 
 * @param {Number} x The number to be squared.
 * @returns {Number} The squred number.
 */
export function square(x) { return x * x; };

/**
 * Calculate squared Euclidean distance (SED) between points/vectors.
 *
 * @param {Number} a The input point/vector
 * @param {Number} b The input point/vector
 * @returns {Number} The squared Euclidean distance between points/vectors. 
*/
export function distanceSquared(a, b) {
    return square(a.x - b.x) + square(a.y - b.y); 
}

/**
 * Calculate Euclidean distance (ED) between points/vectors.
 *
 * @param {Number} a the input point/vector
 * @param {Number} b the input point/vector
 * @returns {Number} The Euclidean distance between points/vectors. 
 */
export function distance(a, b) {
    return Math.sqrt(distanceSquared(a, b));
}

// Old school class definition.
var Cursor = /** @class */ (function () {
    function Cursor(x, y) {
        this.x = x;
        this.y = y;
    }
    return Cursor;
})


export class Point2 { }
export class Point3 { }

export class Vector2 {	
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

export class Vector3 {
   	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;	
	}
}

export class Vector4 {
	constructor(x, y, z, w) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;	
	}
}
