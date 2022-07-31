import * as React from "react";
import * as ReactDOM from "react-dom";
import BuildButtonComponent from "./components/BuildButtonComponent";

ReactDOM.render(
    <div>
        <h1>Hello, Welcome to 322</h1>
        <hr/>
        <BuildButtonComponent header="Full Random" endpoint="https://rollterps.duckdns.org/smurf/api/random" text="Click Me"/>
        <BuildButtonComponent header="No Consumables" endpoint="https://rollterps.duckdns.org/smurf/api/random/no-consumables" text="Click Me"/>
        <BuildButtonComponent header="Normal Random" endpoint="https://rollterps.duckdns.org/smurf/api/random/normal" text="Click Me"/>
    </div>,
    document.getElementById("root")
);