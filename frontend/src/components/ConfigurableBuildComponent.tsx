import * as React from "react";
import ConfigurableBuildInterface from "../interfaces/ConfigurableBuildInterface";
import ItemSelectionComponent from "../components/ItemSelectionComponent";

export default class ConfigurableBuildComponent extends React.Component<ConfigurableBuildInterface, { build: string, conf: Map<string, number[]> }> {

    static defaultMinMax = [0, 6];

    constructor(props: ConfigurableBuildInterface) {
        super(props);
        this.state = {build: "none", conf: new Map<string, number[]>([["clarity", [1, 2]], ["iron_branch", [0, 3]]])};
        this.plusMin = this.plusMin.bind(this);
    }

    render() {

        return (
            <div>
                <h3>{this.props.header}</h3>
                <ItemSelectionComponent
                    imageUrl="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_06/2746941/190208-stock-money-fanned-out-ew-317p.jpg"
                    name="iron_branch" plusMin={this.plusMin}
                    plusMax={this.plusMax} minusMin={this.minusMin} minusMax={this.minusMax}
                    min={this.getMin("iron_branch")} max={this.getMax("iron_branch")}/>
                <ItemSelectionComponent
                    imageUrl="https://assets.entrepreneur.com/content/3x2/2000/1612466646-Affiliate-2000x1334.jpg?auto=webp&quality=95&crop=16:9&width=675"
                    name="clarity" plusMin={this.plusMin}
                    plusMax={this.plusMax} minusMin={this.minusMin} minusMax={this.minusMax}
                    min={this.getMin("clarity")} max={this.getMax("clarity")}/>
                <button onClick={() => this.getConfiguredRandom().then(res => {
                        this.setState(() => ({build: res}))
                    }
                )}>
                    {this.props.text}
                </button>
                <h3>The Build</h3>
                <p>{this.state.build}</p>
                <hr/>
            </div>
        );
    }

    getMax(item: string): number {
        let itemMinMax = this.state.conf.get(item) ?? [0, 6];
        return itemMinMax[0];
    }

    getMin(item: string): number {
        let itemMinMax = this.state.conf.get(item) ?? [0, 6];
        return itemMinMax[0];
    }

    getConfiguredRandom(): Promise<string> {
        return fetch("https://rollterps.duckdns.org/smurf/api/random/with-cap", {
            referrerPolicy: "origin-when-cross-origin",
            mode: "cors",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.conf)
        })
            .then(res => res.text())
    }

    plusMax(name: string) {
        let curr = this.state.conf.get(name);
        if (curr === undefined)
            this.state.conf.set(name, [0, 7]); // TODO use default minmax
        else {
            let currMin = curr[0];
            let currMax = curr[1];

            this.state.conf.delete(name);
            this.state.conf.set(name, [currMin, currMax + 1])
        }
    }

    plusMin(name: string) {
        let curr = this.state.conf.get(name); // TODO use default minmax
        if (curr === undefined)
            this.state.conf.set(name, [1, 6]);
        else {
            let currMin = curr[0];
            let currMax = curr[1];

            this.state.conf.delete(name);
            this.state.conf.set(name, [currMin + 1, Math.max(currMax, currMin + 1)])
        }
    }

    minusMax(name: string) {
        let curr = this.state.conf.get(name);
        if (curr === undefined)
            this.state.conf.set(name, [0, 5]); // TODO use default minmax
        else {
            let currMin = curr[0];
            let currMax = curr[1];

            this.state.conf.delete(name);
            this.state.conf.set(name, [Math.max(Math.min(currMax - 1, currMin), 0), Math.max(currMax - 1, 0)])
        }
    }

    minusMin(name: string) {
        let curr = this.state.conf.get(name);
        if (curr === undefined)
            this.state.conf.set(name, ConfigurableBuildComponent.defaultMinMax);
        else {
            let currMin = curr[0];
            let currMax = curr[1];

            this.state.conf.delete(name);
            this.state.conf.set(name, [Math.max(currMin - 1, 0), currMax]);
        }
    }
}