import React, { Component } from 'react';

class QuizOptions extends Component {
constructor(props){
    super(props);
    this.state={}
    this.callParentCheckOptions = this.callParentCheckOptions.bind(this);
}

callParentCheckOptions(){
    this.props.checkResults(this.props.options);
}
   
        render(){
            return(
                <div className="fields"><div onClick={this.callParentCheckOptions} className="field-block">{this.props.options}</div></div>);
        }
    }
    
    export default QuizOptions;