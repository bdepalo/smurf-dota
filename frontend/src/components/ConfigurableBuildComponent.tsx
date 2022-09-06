import * as React from "react";
import ConfigurableBuildInterface from "../interfaces/ConfigurableBuildInterface";
import ItemSelectionComponent from "../components/ItemSelectionComponent";
import DotaItem from "../interfaces/DotaItem";

const {Map} = require('immutable');

export default class ConfigurableBuildComponent extends React.Component<ConfigurableBuildInterface, { build: string, conf: Map<string, number[]>, items: DotaItem[] }> {

    static defaultMinMax = [0, 6];

    constructor(props: ConfigurableBuildInterface) {
        super(props);

        this.state = {build: "none", conf: Map({}), items: []};

        this.plusMin = this.plusMin.bind(this);
        this.plusMax = this.plusMax.bind(this);
        this.minusMin = this.minusMin.bind(this);
        this.minusMax = this.minusMax.bind(this);

        this.fetchItems();
    }

    render() {

        let items: DotaItem[] = this.state.items;

        return (
            <div>
                <h3>{this.props.header}</h3>
                {items.map(
                    ({name, cost, image, link}) => (
                        <ItemSelectionComponent
                            key={name}
                            imageUrl={image}
                            name={name} plusMin={this.plusMin}
                            plusMax={this.plusMax} minusMin={this.minusMin} minusMax={this.minusMax}
                            items={this.state.conf}/>
                    )
                )}
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

    fetchItems(): void {

        this.getItems().then(res => {
            this.setState({items: JSON.parse(res)});
        });

        console.log(this.state.items)
    }

    getItems(): Promise<string> {
        // return fetch("http://127.0.0.1:8080/items", {
        return fetch("https://rollterps.duckdns.org/smurf/api/items", {
            referrerPolicy: "origin-when-cross-origin",
            mode: "cors",
            method: 'GET'
        })
            .then(res => res.text())
    }

    getConfiguredRandom(): Promise<string> {
        // return fetch("http://127.0.0.1:8080/random/with-cap", {
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