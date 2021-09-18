import React from "react";
import { Header } from "../components/Header";
import Image from "next/image";
import Matter from "matter-js";

export default function IceColdBeer() {
  React.useEffect(initialize, []);
  return (
    <div className="page-container">
      <Header />
      <h2>Ice Cold Beer</h2>

      <p>
        <a href="https://en.wikipedia.org/wiki/Ice_Cold_Beer">Ice Cold Beer</a>{" "}
        is an arcade game by Taito. They have one at my local arcade and I love
        it so i wanted to try to recreate it on the web and try out{" "}
        <a href="https://brm.io/matter-js/">matter-js</a>
      </p>
      <Image
        src="/ice_cold_beer.jpeg"
        alt="Taito arcade game Ice Cold Beer"
        height={200}
        width={200}
      />
      <hr />
      <div id="game" />
    </div>
  );
}

const initialize = () => {
  const engine = Matter.Engine.create();
  const render = Matter.Render.create({
    element: window.document.getElementById("game"),
    engine: engine,
    options: {
      width: 400,
    },
  });

  const ball = Matter.Bodies.circle(200, 200, 10);
  const bar = Matter.Bodies.rectangle(400, 590, 800, 10, {
    isStatic: true,
  });

  // add all of the bodies to the world
  Matter.Composite.add(engine.world, [ball, bar]);

  // run the renderer
  Matter.Render.run(render);

  // create runner
  var runner = Matter.Runner.create();

  // run the engine
  Matter.Runner.run(runner, engine);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyK":
        {
          console.log("right up");
          console.log(bar);
          Matter.Body.rotate(bar, 0.02);
        }
        break;
      case "KeyJ":
        console.log("right down");
        Matter.Body.rotate(bar, -0.02);
        break;
      case "KeyD":
        console.log("left up");
        break;
      case "KeyF":
        console.log("left down");
        break;
    }
  };
  document.body.addEventListener("keydown", handleKeyDown);
};
