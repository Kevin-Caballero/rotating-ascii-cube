const width = 160;
const height = 44;
const zBuffer: number[] = new Array(width * height).fill(0);
const buffer: string[] = new Array(width * height).fill(".");
const backgroundASCIICode = ".";
const distanceFromCam = 100;
let horizontalOffset: number;
const K1 = 40; //projection factor
const incrementSpeed = 1;

//rotation angles
let A = 0;
let B = 0;
let C = 0;

let x: number, y: number, z: number; //coordinates
let ooz: number; //inverse of z
let xp: number, yp: number; //projected coordinates
let idx: number; //buffer index

function calculateX(i: number, j: number, k: number): number {
  return (
    j * Math.sin(A) * Math.sin(B) * Math.cos(C) -
    k * Math.cos(A) * Math.sin(B) * Math.cos(C) +
    j * Math.cos(A) * Math.sin(C) +
    k * Math.sin(A) * Math.sin(C) +
    i * Math.cos(B) * Math.cos(C)
  );
}

function calculateY(i: number, j: number, k: number): number {
  return (
    j * Math.cos(A) * Math.cos(C) +
    k * Math.sin(A) * Math.cos(C) -
    j * Math.sin(A) * Math.sin(B) * Math.sin(C) +
    k * Math.cos(A) * Math.sin(B) * Math.sin(C) -
    i * Math.cos(B) * Math.sin(C)
  );
}

function calculateZ(i: number, j: number, k: number): number {
  return (
    k * Math.cos(A) * Math.cos(B) -
    j * Math.sin(A) * Math.cos(B) +
    i * Math.sin(B)
  );
}

/**
 * @param axis X, Y or Z
 * @param i
 * @param j
 * @param k
 * @description calculates the axis value
 * @returns the axis value
 * @example calculateAxis('X', 1, 2, 3) // 1
 *
 * it comes from the following equation: axis multiplied by the rotation matrixes
 * (x, y, z) *
 * ( (1, 0, 0), (0, cos(A), -sin(A)), (0, sin(A), cos(A)) ) *
 * ( (cos(B), 0, sin(B)), (0, 1, 0), (-sin(B), 0, cos(B)) ) *
 * ( (cos(C), -sin(C), 0), (sin(C), cos(C), 0), (0, 0, 1) )
 *
 * THX algebra de la UOC por tanto y por pedir tan poco (IRONIA) ¯\_(ツ)_/¯
 */
function calculateAxis(
  axis: "X" | "Y" | "Z",
  i: number,
  j: number,
  k: number
): number {
  switch (axis) {
    case "X":
      return calculateX(i, j, k);
    case "Y":
      return calculateY(i, j, k);
    case "Z":
      return calculateZ(i, j, k);
  }
}

/**
 * @description calculates the coordinates of the cube and then projects them
 * @param cubeX x coordinate of the cube
 * @param cubeY y coordinate of the cube
 * @param cubeZ z coordinate of the cube
 * @param ch character to be displayed
 * @example calculateForSurface(1, 2, 3, '@')
 * @returns void
 * on the screen
 */
function calculateForSurface(
  cubeX: number,
  cubeY: number,
  cubeZ: number,
  ch: string
): void {
  x = calculateAxis("X", cubeX, cubeY, cubeZ);
  y = calculateAxis("Y", cubeX, cubeY, cubeZ);
  z = calculateAxis("Z", cubeX, cubeY, cubeZ) + distanceFromCam;

  ooz = 1 / z;

  xp = Math.floor(width / 2 + horizontalOffset + K1 * ooz * x * 2);
  yp = Math.floor(height / 2 + K1 * ooz * y);

  idx = xp + yp * width;
  if (idx >= 0 && idx < width * height) {
    if (ooz > zBuffer[idx]) {
      zBuffer[idx] = ooz;
      buffer[idx] = ch;
    }
  }
}

/**
 * @description renders the frame
 * @returns void
 * @example renderFrame()
 */
function renderFrame(): void {
  console.clear();
  for (let i = 0; i < width * height; i++) {
    process.stdout.write(buffer[i]);
    if (i % width === width - 1) {
      process.stdout.write("\n");
    }
  }
}

/**
 * @description main loop
 * @returns void
 * @example main()
 */
setInterval(() => {
  // Clear buffers before calculating new values
  for (let k = 0; k < width * height; k++) {
    buffer[k] = backgroundASCIICode;
    zBuffer[k] = 0;
  }

  let cubeWidth = 20;
  horizontalOffset = -2 * cubeWidth;

  // Calculate the coordinates for each surface of the cube
  for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
    for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
      calculateForSurface(cubeX, cubeY, -cubeWidth, "@");
      calculateForSurface(cubeWidth, cubeY, cubeX, "$");
      calculateForSurface(-cubeWidth, cubeY, -cubeX, "~");
      calculateForSurface(-cubeX, cubeY, cubeWidth, "#");
      calculateForSurface(cubeX, -cubeWidth, -cubeY, ";");
      calculateForSurface(cubeX, cubeWidth, cubeY, "+");
    }
  }

  renderFrame();

  A += 0.05;
  B += 0.05;
  C += 0.01;
}, 100);
