// main function that inits the physics engine, the render and runner etc
// it also has all of the methods related to creation of bodies (like in the stack and the bounds)
function doPhysics() {
  // create engine
  var engine = Matter.Engine.create(),
    world = engine.world;

  // create renderer
  var render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: window.innerWidth, // the actual render is RenderViewHeight, this is just the visual space occupied
      height: window.innerHeight, // the actual render is RenderViewWidth
      showAngleIndicator: true,
      wireframes: false,
    },
  });

  Matter.Render.run(render);

  // create runner
  var runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);

  // add mouse control
  var mouse = Matter.Mouse.create(render.canvas),
    mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

  Matter.World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Matter.Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 },
  });

  let renderViewHeight = 600;
  let renderViewWidth = 800;

  createBounds(renderViewHeight, renderViewWidth, world);

  Matter.Events.on(mouseConstraint, "mousedown", () => {
    const angle = Math.floor(Math.random() * Math.floor(15) + 15);
    Matter.World.add(
      world,
      Matter.Bodies.polygon(
        mouseConstraint.mouse.mousedownPosition.x,
        mouseConstraint.mouse.mousedownPosition.y,
        3, // polygon sides
        50, // radius aka size
        {
          angle: angle,
          mass: 50,
        }
      )
    );
  });
}

function createBounds(renderViewHeight, renderViewWidth, world) {
  let boundsThiccness = 50;
  let boundsHeight = renderViewHeight;
  let boundsWidth = renderViewWidth;
  let boundsOffsetX = (renderViewWidth / 100) * 0.375 * 100; // take up 66% of window width

  Matter.World.add(world, [
    getStack(renderViewHeight, renderViewWidth, world), // 15 high, 20 wide stack of rectangles
    // bounds to limit where the boxes can fly
    Matter.Bodies.rectangle(
      renderViewWidth / 2,
      0,
      boundsWidth,
      boundsThiccness,
      { isStatic: true }
    ), // top bound
    Matter.Bodies.rectangle(
      renderViewWidth,
      boundsOffsetX,
      boundsThiccness,
      boundsHeight,
      { isStatic: true }
    ), // right bound
    Matter.Bodies.rectangle(0, boundsOffsetX, boundsThiccness, boundsHeight, {
      isStatic: true,
    }), // left bound
    Matter.Bodies.rectangle(
      renderViewWidth / 2,
      renderViewHeight,
      boundsWidth,
      boundsThiccness,
      { isStatic: true }
    ), // bottom bound
  ]);
}

function getStack(renderViewHeight, renderViewWidth) {
  // how many elements the stack contains
  let stackHeight = 15;
  let stackWidth = 20;

  // dimensions of individual bodies in the stack
  let stackRectangleHeight = 20;
  let stackRectangleWidth = 20;

  // where to spawn the stack. Accounts for the width and height of the bodies in the stack
  let stackSpawnX =
    renderViewWidth / 2 - (stackWidth * stackRectangleWidth) / 2;
  let stackSpawnY =
    renderViewHeight -
    stackRectangleHeight / 2 -
    stackHeight * stackRectangleHeight;

  // add bodies
  var stack = Matter.Composites.stack(
    stackSpawnX,
    stackSpawnY,
    stackWidth,
    stackHeight,
    0,
    0,
    function (x, y) {
      return Matter.Bodies.rectangle(
        x,
        y,
        stackRectangleWidth,
        stackRectangleHeight
      );
    }
  );

  return stack;
}
