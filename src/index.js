// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
});

// create two boxes and a ground
var boxA = Bodies.rectangle(window.innerWidth / 2, 200, 80, 80);
var boxB = Bodies.rectangle(window.innerWidth / 2 + 50, 50, 80, 80);

groundWidth = window.innerWidth / 4;
var ground = Bodies.rectangle(
  window.innerWidth / 2,
  600,
  groundWidth,
  60,
  { isStatic: true }
);

console.log(ground)

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
