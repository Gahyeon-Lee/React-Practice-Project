import React, {Component} from 'react';

class UpdateContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:this.props.data.id,
            title:this.props.data.title,
            dscr:this.props.data.dscr
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(e){
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        console.log(this.props.data);
        console.log('UpdateContent render');
        return(
            <article>
                <h2>Update</h2>
                <form action="/create_process" method="post"
                    onSubmit={function(e){
                        e.preventDefault();
                        this.props.onSubmit(
                            this.state.id,
                            this.state.title,
                            this.state.dscr
                        );
                    }.bind(this)}>
                    <input type="hidden" name="id" value={this.state.id}></input>
                    <p><input 
                        type="text" 
                        name="title" 
                        placeholder="title"
                        value={this.state.title}
                        onChange={this.inputFormHandler}></input>
                    </p>
                    <p><textarea onChange={this.inputFormHandler} 
                            name="dscr" 
                            placeholder="description" 
                            value={this.state.dscr}></textarea></p>
                    <p><input type="submit"></input></p>
                </form>
            </article>
        );
    }
}

export default UpdateContent;