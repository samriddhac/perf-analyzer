import React, { useEffect } from 'react';
import * as Matter from 'matter-js';

export default () => {

    const Engine = Matter.Engine;
    const World = Matter.World;
    const Render = Matter.Render;
    const Runner = Matter.Runner;

    const Body = Matter.Body;
    const Bodies = Matter.Bodies;

    const Composites = Matter.Composites;
   
    const MouseConstraint = Matter.MouseConstraint;
    const Mouse = Matter.Mouse;

    const engine = Engine.create();
    const world = engine.world;
    const runner = Runner.create();

    useEffect(() => {
        const render = Render.create({
            element: document.querySelector('#physics-1'),
            engine: engine,
            options: {
                width: 640,
                height: 640,
                wireframes: false,
                background: '#fff'
            }
        });
        Render.run(render);
        Runner.run(runner, engine);

        const group = Body.nextGroup(true),
        particleOptions = { friction: 0.00001, collisionFilter: { group: group }, 
            render: { visible: true }},
        constraintOptions = { stiffness: 0.06 },
        cloth = Composites.softBody(200, 20, 20, 12, 5, 5, false, 8, particleOptions, 
            constraintOptions);

        for (var i = 0; i < 20; i++) {
            cloth.bodies[i].isStatic = true;
        }
        World.add(world, [
            cloth,
            Bodies.circle(300, 100, 80, { isStatic: false }),
            Bodies.rectangle(500, 380, 80, 80, { isStatic: false }),
            Bodies.rectangle(500, 500, 540, 50, { isStatic: true })
        ]);

        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse:mouse,
            constraint: {
                stiffness: 0.98,
                render: {
                    visible: false
                }
            }
        });

        World.add(world, mouseConstraint);
        render.mouse = mouse;

        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 640, y: 640 }
        });
        
    }, []);

    return(
        <div id='physics-1'></div>
    )
}