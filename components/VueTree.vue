<template>
  <canvas id="scene" height="500px" style="width: 100%; display: block; margin: 0 auto"></canvas>
</template>


<script>
const thetamin = 0
  const thetamax = 6 * Math.PI
  const period = 6
  const linespacing = 1 / 20
  const linelength = linespacing / 2
  const yscreenoffset = 300
  const xscreenoffset = 150
  const xscreenscale = 360
  const yscreenscale = 360
  const ycamera = 2
  const zcamera = -3

  const rate = 1 / (2 * Math.PI) // every rotation y gets one bigger
  const factor = rate / 3;

function run() {
  const ctx = document.getElementById('scene').getContext('2d')
  const spirals = [
    new Spiral({
      foreground: "#220000", // Second shadow for red spiral
      angleoffset: Math.PI * 0.92,
      factor: 0.90 * factor
    }),
    new Spiral({
      foreground: "#002211", // Second shadow for cyan spiral
      angleoffset: -Math.PI * 0.08,
      factor: 0.90 * factor
    }),
    new Spiral({
      foreground: "#660000", // red spiral shadow
      angleoffset: Math.PI * 0.95,
      factor: 0.93 * factor
    }),
    new Spiral({
      foreground: "#003322", // cyan spiral shadow
      angleoffset: -Math.PI * 0.05,
      factor: 0.93 * factor
    }),
    new Spiral({
      foreground: "#ff0000", // red Spiral
      angleoffset: Math.PI,
      factor,
    }),
    new Spiral({
      foreground: "#00ffcc", // cyan spiral
      angleoffset: 0,
      factor,
    })];

  renderFrame(); // animation loop starts here

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    spirals.forEach(renderSpiral);
  }

  function renderSpiral(spiral) {
    spiral.render(ctx);
  }

  function Spiral(config) {
    let offset = 0;
    const lineSegments = computeLineSegments();

    this.render = function(ctx) {
      offset -= 1;
      if (offset <= -period) {
        offset += period;
      }

      lineSegments[offset].forEach(drawLineSegment);
    };

    function drawLineSegment(segment) {
      stroke(config.foreground, segment.start.alpha);
      ctx.moveTo(segment.start.x, segment.start.y);
      ctx.lineTo(segment.end.x, segment.end.y);
    }

    function computeLineSegments() {
      const lineSegments = {};
      const factor = config.factor
      let thetanew = ''
      let thetaold = ''
      let lines = ''
      for (let offset = 0; offset > -period; offset--) {
        lineSegments[offset] = lines = [];
        for (let theta = thetamin + getdtheta(thetamin, offset * linespacing / period, rate, factor); theta < thetamax; theta += getdtheta(theta, linespacing, rate, factor)) {
          thetaold = (theta >= thetamin) ? theta : thetamin;
          thetanew = theta + getdtheta(theta, linelength, rate, factor);

          if (thetanew <= thetamin) {
            continue;
          }

          lines.push({
            start: getPointByAngle(thetaold, factor, config.angleoffset, rate),
            end: getPointByAngle(thetanew, factor, config.angleoffset, rate)
          });
        }
      }

      return lineSegments;
    }
  }

  function stroke(color, alpha) {
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
  }

  function getPointByAngle(theta, factor, angleoffset, rate) {
    const x = theta * factor *  Math.cos(theta + angleoffset);
    const z = - theta * factor * Math.sin(theta + angleoffset);
    const y = rate * theta;
    // now that we have 3d coorinates, project them into 2d space:
    const point = projectTo2d(x, y, z);
    // calculate point's color alpha level:
    point.alpha = Math.atan((y * factor / rate * 0.1 + 0.02 - z) * 40) * 0.35 + 0.65;

    return point;
  }

  function getdtheta(theta, lineLength, rate, factor) {
    return lineLength / Math.sqrt(rate * rate + factor * factor * theta * theta);
  }

  function projectTo2d(x, y, z) {
    return {
      x: xscreenoffset + xscreenscale * (x / (z - zcamera)),
      y: yscreenoffset + yscreenscale * ((y - ycamera) / (z - zcamera))
    };
  }

  // I actually want it to be slower then 60fps
  function requestAnimationFrame(callback) {
    window.setTimeout(callback, 1000 / 24);
  }
}

export default {
  mounted() {
    run()
  }
}
</script>
