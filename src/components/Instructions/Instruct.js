import React, { Component } from 'react';
import "./modal.css";
class Instruct extends Component {
  // eslint-disable-next-line
  constructor(props){
    super(props);
  }

  render(){
    
    if(this.props.imageCSS){
      this.section="";
      this.showHideClassName = this.props.show ? this.props.imageCSS+" display-block" : this.props.imageCSS+" display-none";
    }
    else{
      this.section="modal-main";
      this.showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    }
    return (
      <div className={this.showHideClassName}>
        <section className={this.section}>
          {this.props.children}
          
        </section>
      </div>
    );
  }
};
export default Instruct;