var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth, // the actual render is RenderViewHeight, this is just the visual space occupied
            height: window.innerHeight, // the actual render is RenderViewWidth
            showAngleIndicator: true,
            wireframes: false,
        }
    });

    renderViewHeight = 600;
    renderViewWidth = 800;

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    let stackHeight = 15;
    let stackWidth = 20;

    let stackRectangleHeight = 20;
    let stackRectangleWidth = 20;

    let stackSpawnX = renderViewWidth / 2 - (stackWidth * stackRectangleWidth)/2;

    // add bodies
    var stack = Composites.stack(stackSpawnX, renderViewHeight - stackRectangleHeight / 2 - stackHeight * stackRectangleHeight, stackWidth, stackHeight, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, stackRectangleWidth, stackRectangleHeight);
    });

    let boundsThiccness = 50;
    let boundsHeight = renderViewHeight;
    let boundsWidth = renderViewWidth;
    let boundsOffsetX = (renderViewWidth/100 * 0.375) * 100; // take up 66% of window width
    //let boundsOffsetY = 100; // take up 66% of window width

    World.add(world, [
        stack,
        // walls
        Bodies.rectangle(renderViewWidth/2, 0, boundsWidth, boundsThiccness, { isStatic: true }), // top bound
        Bodies.rectangle(renderViewWidth, boundsOffsetX, boundsThiccness, boundsHeight, { isStatic: true }), // right bound
        Bodies.rectangle(0, boundsOffsetX, boundsThiccness, boundsHeight, { isStatic: true }), // left bound
        Bodies.rectangle(renderViewWidth/2, renderViewHeight, boundsWidth, boundsThiccness, { isStatic: true }) // bottom bound
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });
