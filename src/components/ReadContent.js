import React, {Component} from 'react';

class ReadContent extends Component {
    render(){
        console.log('Content render');
        return(
            <article>
                <h2>{this.props.title}</h2>
                {this.props.dscr}
            </article>
        );
    }
}

export default ReadContent;