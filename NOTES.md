# Poznámky

- Zkus použí programovací jazyk TypeScript (TS) transpilovaný do JavaScript (JS).
- TypeScript z příkazové řádky vyvolám pomocí `tsc gl.ts`. - Konfigirace je v souboru `tsconfig.json`. Pár typů pro práci s TS ve Visual Studio Code (VSC) https://code.visualstudio.com/docs/typescript/typescript-compiling


- Používám WebGL 2!

- *TODO* uzavírám v komentářích do `/.../`
  -  lze použít `@todo` z https://jsdoc.app/tags-todo.html?



Pokud máš chybu:
    
    Uncaught ReferenceError: exports is not defined
      at gl.js:2:1

Tak https://bobbyhadz.com/blog/typescript-uncaught-referenceerror-exports-is-not-defined

https://stackoverflow.com/questions/71454189/how-do-i-let-the-browser-allow-me-to-use-imports-typescript

## Workflow

- Kód píšu ve Visual Studio Code a dokumentuji pomocí JSDoc. 
- Výledné HTML lze prohlížet ve Visual Studio Code pomocí *live server* nebo stačí dát *show preview*. Samozřejmě lze stránku také otevřít v prohlížeči, ale výhoda *live server*/*show preview* je, že se automaticky provede refresh při změně kódu stránky.

## Příklady

### Vykreslení bodů

V OpenGL/WebGL velikost bodu definuje vertex shader.

```glsl
void main() {
    gl_PointSize = 20.0;    
}
```

## WebGL types and methods

- `HTMLCanvasElement`
  - `getContext()`, <https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext>
    
    Vytvoří WebGL2/WebGPU context.

- `WebGL2RenderingContext`, <https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext>
  - `getContextAttributes()`, <https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getContextAttributes>
     
     Vrací `WebGLContextAttributes` objekt nebo `null`, pokud byl kontext ztracen.

- `WebGLObject`
  - `WebGLShader`, <https://developer.mozilla.org/en-US/docs/Web/API/WebGLShader>
  - `WebGLProgram`, <https://developer.mozilla.org/en-US/docs/Web/API/WebGLProgram>

Typy definované skrze `WebGLRenderingContext` viz <https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Types>

- `GLboolean`
- `GLEnum`


## Pipeline

Klasicky pipeline obsahuje tyto kroky:

- vertex shaderu
  - načti zdrojový kód
  - kompiluj vertex shader program
  - zkontroluj výsledek kompilace pomocí ``
- fragment shader
  - načti zdrojový kód
  - kompiluj fragment shader program
  - zkontroluj výdledek kompilace
- shader program
  - linkuj vertex a fragment shader
  - zkontroluj výsledek linkování 
- buffers
  - připrav vertex array object (VAO) 
  - připrav vertex buffer objekt (VBO)

- Posíláme (streaming) vertexy na grafickou kartu.
- Zadáme jak je má grafická karta interpretovat.  

## Zdroje

- <https://www.khronos.org/opengl/wiki/Vertex_Specification>
- <https://jsdoc.app/>


# Development 


node 19

  node --watch

Build `gl.js` minified with source-map

  npm run build:dev


https://esbuild.github.io/api/#watch
https://esbuild.github.io/api/#live-reload