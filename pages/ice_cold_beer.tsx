import React from "react";
import { Header } from "../components/Header";
import Image from "next/image";
import Matter from "matter-js";

export default function IceColdBeer() {
  const [bar, setBar] = React.useState<Matter.Body | undefined>(undefined);
  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (!bar) return;
      switch (e.code) {
        case "KeyK": {
          console.log("right up");
          bar.angle += 1;
        }
        case "KeyJ":
          console.log("right down");
        case "KeyD":
          console.log("left up");
        case "KeyF":
          console.log("left down");
      }
    },
    [bar]
  );
  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const gameRef = React.useCallback((node) => {
    if (node !== null) {
      document.body.addEventListener("keydown", handleKeyDown);
      const engine = Matter.Engine.create();
      const render = Matter.Render.create({
        element: node,
        engine: engine,
      });

      const ball = Matter.Bodies.circle(400, 200, 20);
      const newBar = Matter.Bodies.rectangle(400, 590, 800, 10, {
        isStatic: true,
      });
      setBar(newBar);

      // add all of the bodies to the world
      Matter.Composite.add(engine.world, [ball, newBar]);

      // run the renderer
      Matter.Render.run(render);

      // create runner
      var runner = Matter.Runner.create();

      // run the engine
      Matter.Runner.run(runner, engine);
    }
  }, []);

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
      <div ref={gameRef} />
    </div>
  );
}
