import React, { Component } from 'react';

import corebook from '../json/corebook';

import aspectsJSON from '../json/aspects';
import aptitudesJSON from '../json/aptitudes';
import rangesJSON from '../json/ranges';
import magickaJSON from '../json/magicka';


export default class Corebook extends Component {

  constructor(props) {
      super(props);

      this.displayCBTabs = this.displayCBTabs.bind(this);
      this.displayOneTab = this.displayOneTab.bind(this);
      this.displayOneTag = this.displayOneTag.bind(this);
      this.displayOneAspect= this.displayOneAspect.bind(this);
      this.displayOneAptitude= this.displayOneAptitude.bind(this);
      this.parseIndexToColor = this.parseIndexToColor.bind(this);
      this.makeTitle = this.makeTitle.bind(this);

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

    makeTitle(str){
      return str.charAt(0).toUpperCase() + str.substring(1);
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
      const scopedThis = this;

      if(tag.h3){return(<h3>{tag.h3}</h3>);}
      if(tag.h1){return(<h1>{tag.h1}</h1>);}
      if(tag.p){return(<p>{tag.p}</p>);}
      if(tag.b1){return(<ul><li>{tag.b1}</li></ul>);}
      if(tag.ab1){return(<ul><li><a href={tag.ab1.link}>{tag.ab1.text}</a></li></ul>);}
      if(tag.ah3){return(<h3><a href={tag.ah3.link}>{tag.ah3.text}</a></h3>);}

      if(tag.aspects){
        return aspectsJSON.map(function(aspect) {
          return  scopedThis.displayOneAspect(aspect) ;
        });
      }
      if(tag.aptitudes){
        return aptitudesJSON.map(function(aptitude) {
          return  scopedThis.displayOneAptitude(aptitude) ;
        });
      }

      if(tag.table){
        var theTable = tag.table;
        if(theTable == "magicka"){
          return magickaJSON.map(function(row) {
            return  scopedThis.displayOneTableRow(row) ;
          });
        }
      }
    }

    displayOneAspect(aspect){
      return(<div><h3>{this.makeTitle(aspect.name)}</h3><p>{this.makeTitle(aspect.type)} : {this.makeTitle(aspect.trait)}</p><p>{aspect.desc}</p></div>);
    }
    displayOneAptitude(aptitude){
      return(<div><h3>{this.makeTitle(aptitude.name)}</h3><p>Type: {this.makeTitle(aptitude.type)}</p><p>{aptitude.desc}</p></div>);
    }


    displayOneTableRow(row){
      var name, armor, penalty, damage, ap, cost, desc = "";
      if (row.name){name=this.makeTitle(row.name)}
      if (row.armor){armor=row.armor}
      if (row.penalty){penalty=row.penalty}
      if (row.damage){damage=row.damage}
      if (row.ap){ap=row.ap}
      if (row.cost){cost=row.cost}
      if (row.desc){desc=row.desc}
      return(<div class="statDesc">
              <h3>{name}</h3>
              <div class="grid-container-4">
                <div class="grid-child minor-border">
                  Cost: {cost}
                </div>
                <div class="grid-child minor-border">
                </div>
                <div class="grid-child minor-border">
                </div>
                <div class="grid-child minor-border">
                </div>
              </div>
              <p>{desc}</p>
              <div class="grid-container-4">
                <div class="grid-child minor-border">
                  Armor: {armor}
                </div>
                <div class="grid-child minor-border">
                  Penalty: {penalty}
                </div>
                <div class="grid-child minor-border">
                  Damage: {damage}
                </div>
                <div class="grid-child minor-border">
                  AP: {ap}
                </div>
              </div>
            </div>);
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