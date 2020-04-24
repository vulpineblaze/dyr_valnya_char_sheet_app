import React, { Component } from 'react';
import corebook from '../json/corebook';


export default class Corebook extends Component {

  constructor(props) {
      super(props);

      this.displayCBTabs = this.displayCBTabs.bind(this);
      this.displayOneTab = this.displayOneTab.bind(this);
      this.displayOneTag = this.displayOneTag.bind(this);
      this.parseIndexToColor = this.parseIndexToColor.bind(this);

      this.state = {
        player: {},
        sheet: [],
        cb: corebook  
      };
    }
    componentDidMount(){
      
      
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.sheet !== this.state.sheet) {
        console.log("corebook; does not equal:", prevState.sheet,this.state.sheet);
        if(prevState.sheet.name !== this.state.sheet.name){
          console.log("corebook; name not equal:", prevState.sheet.name , this.state.sheet.name);
        }
      }else{
        console.log("corebook; sheets are equal:", prevState.sheet,this.state.sheet);

      }
      // console.log("state n prop", this.state.player, this.props.player);
      if(!this.state.player.email){
        console.log("not player state", this.state.player);
        if(this.props.player.email){
          console.log("player prop exists", this.props.player);
          this.setState({
            player: this.props.player
          }, () => {
            var fixedEmail = encodeURI(this.state.player.email);
            console.log("corebook get email:", fixedEmail, this.props.player, this.props.user);

          });  
        }
      }
    }

    parseIndexToColor(i){
      const charB = 98;
      var first = i % 3 + charB;
      var second = (i/3) % 3  + charB;
      var third = (i/9) % 3  + charB;

      return "#" + String.fromCharCode(first, second, third) ;
    }

    displayCBTabs(){
      const tabs = this.state.cb.corebook.tabs;
      const scopedThis = this;
      var showTabs = tabs.map(function(tab, i) {
        return  scopedThis.displayOneTab(tab, i) ;
      });
      return <div>{showTabs}</div>;
    }

    displayOneTab(tab, i){
      const scopedThis = this;
      const emStart = 0.6;
      const emMult = 2.1;
      const color = this.parseIndexToColor(i);
      var emIndex = emStart + emMult * i;
      const mystyle = {
        top: emIndex+"em",
        backgroundColor: color
      };
      var showTags = tab.tags.map(function(tag) {
        return  scopedThis.displayOneTag(tag) ;
      });
      return (

        <section id={tab.id}>
          <h2 style={mystyle}><a href={"#"+tab.id}>{tab.name}</a></h2>
          <div>{showTags}</div>
          
        </section>

      );
    }

    displayOneTag(tag){

      if(tag.h3){return(<h3>{tag.h3}</h3>);}
      if(tag.p){return(<p>{tag.p}</p>);}
      if(tag.b1){return(<ul><li>{tag.b1}</li></ul>);}
      if(tag.ab1){return(<ul><li><a href={tag.ab1.link}>{tag.ab1.text}</a></li></ul>);}
    }

    render() {
      if(!this.state.player.email) return null
      return (
        <div>
          <h3 align="center">{this.state.cb.corebook.header}</h3>
           <article className="sidebar">

            { this.displayCBTabs() } 


          </article>
        </div>
      );
    }
  }