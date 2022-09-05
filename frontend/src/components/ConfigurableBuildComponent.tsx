import * as React from "react";
import ConfigurableBuildInterface from "../interfaces/ConfigurableBuildInterface";
import ItemSelectionComponent from "../components/ItemSelectionComponent";

const {Map} = require('immutable');

export default class ConfigurableBuildComponent extends React.Component<ConfigurableBuildInterface, { build: string, conf: Map<string, number[]> }> {

    static defaultMinMax = [0, 6];

    constructor(props: ConfigurableBuildInterface) {
        super(props);

        this.state = {build: "none", conf: Map({"clarity": [1, 2], "iron_branch": [0, 3]})};
        this.plusMin = this.plusMin.bind(this);
        this.plusMax = this.plusMax.bind(this);
        this.minusMin = this.minusMin.bind(this);
        this.minusMax = this.minusMax.bind(this);
    }

    render() {

        return (
            <div>
                <h3>{this.props.header}</h3>
                <ItemSelectionComponent
                    imageUrl="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_06/2746941/190208-stock-money-fanned-out-ew-317p.jpg"
                    name="sentry_ward" plusMin={this.plusMin}
                    plusMax={this.plusMax} minusMin={this.minusMin} minusMax={this.minusMax}
                    items={this.state.conf}/>
                <ItemSelectionComponent
                    imageUrl="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_06/2746941/190208-stock-money-fanned-out-ew-317p.jpg"
                    name="iron_branch" plusMin={this.plusMin}
                    plusMax={this.plusMax} minusMin={this.minusMin} minusMax={this.minusMax}
                    items={this.state.conf}/>
                <ItemSelectionComponent
                    imageUrl="https://assets.entrepreneur.com/content/3x2/2000/1612466646-Affiliate-2000x1334.jpg?auto=webp&quality=95&crop=16:9&width=675"
                    name="clarity" plusMin={this.plusMin}
                    plusMax={this.plusMax} minusMin={this.minusMin} minusMax={this.minusMax}
                    items={this.state.conf}/>
                <ItemSelectionComponent
                    imageUrl="https://assets.entrepreneur.com/content/3x2/2000/1612466646-Affiliate-2000x1334.jpg?auto=webp&quality=95&crop=16:9&width=675"
                    name="quelling_blade" plusMin={this.plusMin}
                    plusMax={this.plusMax} minusMin={this.minusMin} minusMax={this.minusMax}
                    items={this.state.conf}/>
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
        console.log("plusMax")
        let curr = this.state.conf.get(name);
        if (curr === undefined) {
            this.setState(() => ({build: this.state.build, conf: this.state.conf.set(name, [0, 7])})); // TODO use default minmax
        } else {
            let currMin = curr[0];
            let currMax = curr[1];

            this.setState(() => ({build: this.state.build, conf: this.state.conf.set(name, [currMin, currMax + 1])}));
        }
    }

    plusMin(name: string) {
        console.log("plusMin")
        let curr = this.state.conf.get(name);
        if (curr === undefined) {
            this.setState(() => ({build: this.state.build, conf: this.state.conf.set(name, [1, 6])})); // TODO use default minmax
        } else {
            let currMin = curr[0];
            let currMax = curr[1];

            this.setState(() => ({
                build: this.state.build,
                conf: this.state.conf.set(name, [currMin + 1, Math.max(currMax, currMin + 1)])
            }));
        }
    }

    minusMax(name: string) {
        console.log("minusMax")
        let curr = this.state.conf.get(name);
        if (curr === undefined) {
            this.setState(() => ({
                build: this.state.build, conf: this.state.conf.set(name, [0, 5])
            })); // TODO use default minmax
        } else {
            let currMin = curr[0];
            let currMax = curr[1];

            this.setState(() => ({
                build: this.state.build,
                conf: this.state.conf.set(name, [Math.max(Math.min(currMax - 1, currMin), 0), Math.max(currMax - 1, 0)])
            }));
        }
    }

    minusMin(name: string) {
        console.log("minusMin")
        let curr = this.state.conf.get(name);
        if (curr === undefined) {
            this.setState(() => ({
                build: this.state.build,
                conf: this.state.conf.set(name, ConfigurableBuildComponent.defaultMinMax)
            }));
        } else {
            let currMin = curr[0];
            let currMax = curr[1];

            this.setState(() => ({
                build: this.state.build,
                conf: this.state.conf.set(name, [Math.max(currMin - 1, 0), currMax])
            }));
        }
    }
}