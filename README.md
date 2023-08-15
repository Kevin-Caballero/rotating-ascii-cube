# spinning-ascii-cube

## Animacion de consola

Este proyecto es un ejemplo de una animación 3D realizada en una consola de texto utilizando TypeScript y Node.js. El objetivo es demostrar cómo se pueden aplicar transformaciones de rotación y proyección para simular un efecto tridimensional en una pantalla bidimensional.

$$
\begin{bmatrix}
i & j & k
\end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 \\
0 & cos(A) & -sin(A) \\
0 & sin(A) & cos(A)  \\
\end{bmatrix}
\begin{bmatrix}
cos(B) & 0 & sin(B) \\
0 & 1 & 0 \\
-sin(B) & 0 & cos(B)  \\
\end{bmatrix}
\begin{bmatrix}
cos(C) & -sin(C) & 0 \\
sin(C) & cos(C) & 0 \\
0 & 0) & 1  \\
\end{bmatrix}
$$

## Requisitos

- Node.js

## Instrucciones

1. Asegúrate de tener Node.js instalado en tu sistema.
2. Clona este repositorio o descarga los archivos.
3. Abre una terminal y navega hasta la ubicación del proyecto.
4. Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

Para iniciar el proyecto ejecuta:

```bash
npm start
```

La animación se ejecutará en una ventana de la consola y mostrará cubos girando en 3D. Puedes ajustar los parámetros en el archivo index.ts para modificar el comportamiento de la animación.

Personalización
Puedes personalizar la velocidad de la animación, los ángulos de rotación y otros parámetros modificando las constantes en el archivo index.ts.
