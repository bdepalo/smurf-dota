import * as React from "react";
import * as ReactDOM from "react-dom";
import BuildButtonComponent from "./components/BuildButtonComponent";

ReactDOM.render(
    <div>
        <h1>Hello, Welcome to 322</h1>
        <hr/>
        <BuildButtonComponent header="Full Random" endpoint="http://rollterps.duckdns.org:32280/random" text="Click Me"/>
        <BuildButtonComponent header="No Consumables" endpoint="http://rollterps.duckdns.org:32280/random/no-consumables" text="Click Me"/>
        <BuildButtonComponent header="Normal Random" endpoint="http://rollterps.duckdns.org:32280/random/normal" text="Click Me"/>
    </div>,
    document.getElementById("root")
);