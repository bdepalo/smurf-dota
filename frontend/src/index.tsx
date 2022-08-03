import * as React from "react";
import * as ReactDOM from "react-dom";
import BuildButtonComponent from "./components/BuildButtonComponent";
import ItemSelectionComponent from "./components/ItemSelectionComponent";


ReactDOM.render(
    <div>
        <h1>Hello, Welcome to 322</h1>
        <hr/>
        <BuildButtonComponent header="Full Random" endpoint="https://rollterps.duckdns.org/smurf/api/random"
                              text="Click Me"/>
        <BuildButtonComponent header="No Consumables"
                              endpoint="https://rollterps.duckdns.org/smurf/api/random/no-consumables" text="Click Me"/>
        <BuildButtonComponent header="Normal Random" endpoint="https://rollterps.duckdns.org/smurf/api/random/normal"
                              text="Click Me"/>
        <ItemSelectionComponent imageUrl="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_06/2746941/190208-stock-money-fanned-out-ew-317p.jpg" name="money1"/>
        <ItemSelectionComponent imageUrl="https://assets.entrepreneur.com/content/3x2/2000/1612466646-Affiliate-2000x1334.jpg?auto=webp&quality=95&crop=16:9&width=675" name="money2"/>
    </div>,
    document.getElementById("root")
);