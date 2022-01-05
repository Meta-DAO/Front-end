import React, { useEffect } from "react";
import "./background.scss";
import Cloud from "../../assets/images/cloud.png";

function Background() {
  let world: any, viewport: any;
  let worldXAngle = 0,
    worldYAngle = 0,
    d = 500,
    objects = [],
    layers: any[] = [],
    computedWeights: any[] = [];

  const textures = [
    { name: "white cloud", file: Cloud, opacity: 1, weight: 0 },
    // { name: "dark cloud", file: "darkCloud.png", opacity: 1, weight: 0 },
    // { name: "smoke cloud", file: "smoke.png", opacity: 1, weight: 0 },
  ];

  function initElements() {
    world = document.getElementById("world") as HTMLElement;
    viewport = document.getElementById("viewport") as HTMLElement;
  }

  useEffect(() => {
    initElements();
    setTextureUsage(0, "Lot");
    generate();
    generate();
    generate();
    // window.addEventListener("mousemove", function (e) {
    //   worldYAngle = -(0.5 - e.clientX / window.innerWidth) * 180;
    //   worldXAngle = (0.5 - e.clientY / window.innerHeight) * 180;
    //   updateView();
    // });

    update();
  }, []);

  /*
  Changes the transform property of world to be
  translated in the Z axis by d pixels,
  rotated in the X axis by worldXAngle degrees and
  rotated in the Y axis by worldYAngle degrees.
*/
  function updateView() {
    let t = "translateZ( " + d + "px ) rotateX( " + worldXAngle + "deg) rotateY( " + worldYAngle + "deg)";
    world.style.webkitTransform = world.style.MozTransform = world.style.oTransform = world.style.transform = t;
  }

  /*
  Clears the DOM of previous clouds bases
  and generates a new set of cloud bases
*/
  function generate() {
    objects = [];
    if (world.hasChildNodes()) {
      while (world.childNodes.length >= 1) {
        world.removeChild(world.firstChild);
      }
    }
    computedWeights = [];
    let total = 0;
    for (let j = 0; j < textures.length; j++) {
      if (textures[j].weight > 0) {
        total += textures[j].weight;
      }
    }
    let accum = 0;
    for (let j = 0; j < textures.length; j++) {
      if (textures[j].weight > 0) {
        let w = textures[j].weight / total;
        computedWeights.push({
          src: textures[j].file,
          min: accum,
          max: accum + w,
        });
        accum += w;
      }
    }
    for (let j = 0; j < 5; j++) {
      objects.push(createCloud());
    }
  }

  function setTextureUsage(id: number, mode: string) {
    let modes = ["None", "Few", "Normal", "Lot"];
    let weights: any = { None: 0, Few: 0.3, Normal: 0.7, Lot: 1 };
    for (let j = 0; j < modes.length; j++) {
      if (modes[j] == mode) {
        textures[id].weight = weights[mode];
      }
    }
  }

  /*
  Creates a single cloud base: a div in world
  that is translated randomly into world space.
  Each axis goes from -256 to 256 pixels.
*/
  function createCloud() {
    let div = document.createElement("div") as any;
    div.className = "cloudBase";
    let x = 256 - Math.random() * 512;
    let y = 256 - Math.random() * 512;
    let z = 256 - Math.random() * 512;
    let t = "translateX( " + x + "px ) translateY( " + y + "px ) translateZ( " + z + "px )";
    div.style.webkitTransform = div.style.MozTransform = div.style.oTransform = div.style.transform = t;
    world.appendChild(div);

    for (let j = 0; j < 5 + Math.round(Math.random() * 10); j++) {
      let cloud = document.createElement("img") as any;
      cloud.style.opacity = "0";
      let r = Math.random();
      let src = "troll.png";
      for (let k = 0; k < computedWeights.length; k++) {
        if (r >= computedWeights[k].min && r <= computedWeights[k].max) {
          (function (img) {
            img.addEventListener("load", function () {
              img.style.opacity = "0.8";
            });
          })(cloud);
          src = computedWeights[k].src;
        }
      }
      if (computedWeights.length === 0) {
        cloud.style.opacity = "0.8";
      }
      cloud.setAttribute("src", src);
      cloud.className = "cloudLayer";

      let x = 256 - Math.random() * 512;
      let y = 256 - Math.random() * 512;
      let z = 100 - Math.random() * 200;
      let a = Math.random() * 360;
      let s = 0.25 + Math.random();
      x *= 0.2;
      y *= 0.2;
      cloud.data = {
        x: x,
        y: y,
        z: z,
        a: a,
        s: s,
        speed: 0.1 * Math.random(),
      };
      let t =
        "translateX( " +
        x +
        "px ) translateY( " +
        y +
        "px ) translateZ( " +
        z +
        "px ) rotateZ( " +
        a +
        "deg ) scale( " +
        s +
        " )";
      cloud.style.webkitTransform = cloud.style.MozTransform = cloud.style.oTransform = cloud.style.transform = t;

      div.appendChild(cloud);
      layers.push(cloud);
    }

    return div;
  }

  function orientationhandler(e: any) {
    if (!e.gamma && !e.beta) {
      e.gamma = -(e.x * (180 / Math.PI));
      e.beta = -(e.y * (180 / Math.PI));
    }

    var x = e.gamma;
    var y = e.beta;

    worldXAngle = y;
    worldYAngle = x;
    updateView();
  }

  function update() {
    for (var j = 0; j < layers.length; j++) {
      var layer = layers[j];
      layer.data.a += layer.data.speed;
      var t =
        "translateX( " +
        layer.data.x +
        "px ) translateY( " +
        layer.data.y +
        "px ) translateZ( " +
        layer.data.z +
        "px ) rotateY( " +
        -worldYAngle +
        "deg ) rotateX( " +
        -worldXAngle +
        "deg ) rotateZ( " +
        layer.data.a +
        "deg ) scale( " +
        layer.data.s +
        ")";
      layer.style.webkitTransform = layer.style.MozTransform = layer.style.oTransform = layer.style.transform = t;
      //layer.style.webkitFilter = 'blur(5px)';
    }

    requestAnimationFrame(update);
  }

  return (
    <div id="viewport">
      <div id="world"></div>
    </div>
  );
}

export default Background;
