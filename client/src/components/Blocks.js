import React, {Component} from 'react';

class Blocks extends Component {
    state = {blocks:[]};

    componentDidMount(){
        fetch('/api/Blocks ')
        .then(response => response.json())
        .then(json => this.setState({blocks: json}))
    }

    render(){
        console.log("this.state", this.state);
        return (
            <div>
                <h3>Blocks</h3>
                {
                    this.state.blocks.map(blocks =>{
                        return (
                            <div key ={blocks.hash}>{blocks.hash}</div>
                        )
                    })
                }

            </div>
        );
    }
}

export default Blocks;