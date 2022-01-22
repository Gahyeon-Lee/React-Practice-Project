import React, {Component} from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Control from "./components/Control";
import './App.css';
import { __esModule } from '@testing-library/user-event';

class App extends Component{
    constructor(props){
        super(props);
        this.max_content_id = 3;
        this.state={
            mode:'welcome',
            seleted_content_id:2,
            subject:{title:"WEB", sub:"World wide web!"},
            welcome:{title:'Welcome', dscr:'Hello, React!!'},
            contents:[
                {id:1, title:'HTML', dscr:'HTML is for information'},
                {id:2, title:'CSS', dscr:'CSS is for design'},
                {id:3, title:'JavaScript', dscr:'JavaScript is for interactive'}
            ] 
        }
    }
    getReadContent(){
        var i = 0;
        while(i < this.state.contents.length){
            var data = this.state.contents[i];
            if(data.id === this.state.seleted_content_id){
                return data;
                break;
            }
            i = i + 1;
        }
    }
    getContent(){
        var _title, _dscr, _aritcle = null;
        if (this.state.mode === 'welcome'){
            _title = this.state.welcome.title;
            _dscr = this.state.welcome.dscr;
            _aritcle = <ReadContent title={_title} dscr={_dscr}></ReadContent>
        } else if (this.state.mode === 'read'){
            var _content = this.getReadContent();
            _aritcle = <ReadContent title={_content.title} dscr={_content.dscr}></ReadContent>
        } else if ( this.state.mode === 'create'){
            _aritcle = <CreateContent onSubmit={function(_title, _dscr){
                //add content to this.state.contents
                this.max_content_id = this.max_content_id + 1;
                var _contents = this.state.contents.concat(
                    {id:this.max_content_id, title:_title, dscr:_dscr}
                )
                this.setState({
                    contents:_contents,
                    mode: 'read',
                    seleted_content_id: this.max_content_id
                });
                console.log(_title, _dscr);
            }.bind(this)}></CreateContent>
        } else if ( this.state.mode === 'update'){
            _content = this.getReadContent();
            _aritcle = <UpdateContent data={_content} onSubmit={
                function(_id, _title, _dscr){
                    var _contents = Array.from(this.state.contents);
                    var i = 0;
                    while(i < _contents.length){
                        if(_contents[i].id === _id){
                            _contents[i] = {id:_id, title:_title, dscr:_dscr};
                            break;
                        }
                        i = i + 1;
                    }
                    this.setState({
                        contents:_contents,
                        mode:'read'
                    });
                    console.log(_title, _dscr);
                }.bind(this)}></UpdateContent
            >
        }
        return _aritcle;
    }
    render(){
        console.log('App render');
        return (
            <div className="App">
                <Subject 
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    onChangePage={function(){
                        this.setState({mode:'welcome'});
                    }.bind(this)}>            
                </Subject>
                <TOC 
                    onChangePage={function(id){
                        this.setState({
                            mode:'read',
                            seleted_content_id:Number(id)
                        });
                    }.bind(this)}
                    data={this.state.contents}>
                </TOC>
                <Control onChangePage={function(_mode){
                    if(_mode === 'delete'){
                        if(window.confirm('really?')){
                            var _contents = Array.from(this.state.contents);
                            var i = 0;
                            while(i < _contents.length){
                                if(_contents[i].id === this.state.seleted_content_id){
                                    _contents.splice(i, 1);
                                    break;
                                }
                                i = i + 1;
                            }
                            this.setState({
                                mode:'welcome',
                                contents:_contents
                            });
                            alert('deleted!');
                        }
                    } else{
                        this.setState({
                            mode:_mode
                        });
                    }
                }.bind(this)}></Control>
                {this.getContent()}
            </div>
        );
    }
}
export default App;
