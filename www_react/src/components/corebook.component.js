import React, { Component } from 'react';


export default class Corebook extends Component {

  constructor(props) {
      super(props);
      this.state = {
        player: {},
        sheet: []
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


    render() {
      if(!this.state.player.email) return null
      return (
        <div>
          <h3 align="center">Corebook demo</h3>
           <article className="sidebar">

            <section id="sidebar1">
              <h2><a href="#sidebar1">sidebar one</a></h2>
              <p> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum tincidunt lorem laoreet molestie. Donec justo justo, hendrerit vel est et, convallis posuere diam. Aenean ut pulvinar arcu. Nunc vel est blandit, gravida diam sit amet, auctor diam. Aliquam quis sodales est, at scelerisque velit. Nullam quis mi ac tortor commodo euismod. Integer convallis purus ut arcu volutpat, malesuada aliquet sem efficitur. Pellentesque arcu purus, commodo in ultrices laoreet, ullamcorper non nulla.
              </p>
              
              <p className="tabnav"><a href="#sidebar2">next &#10151;</a></p>
            </section>

            <section id="sidebar2">
              <h2><a href="#sidebar2">sidebar two</a></h2>
              <p> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum tincidunt lorem laoreet molestie. Donec justo justo, hendrerit vel est et, convallis posuere diam. Aenean ut pulvinar arcu. Nunc vel est blandit, gravida diam sit amet, auctor diam. Aliquam quis sodales est, at scelerisque velit. Nullam quis mi ac tortor commodo euismod. Integer convallis purus ut arcu volutpat, malesuada aliquet sem efficitur. Pellentesque arcu purus, commodo in ultrices laoreet, ullamcorper non nulla.
              </p>
              
              <p className="tabnav"><a href="#sidebar3">next &#10151;</a></p>
            </section>

            <section id="sidebar3">
              <h2><a href="#sidebar3">sidebar three</a></h2>
              <p> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum tincidunt lorem laoreet molestie. Donec justo justo, hendrerit vel est et, convallis posuere diam. Aenean ut pulvinar arcu. Nunc vel est blandit, gravida diam sit amet, auctor diam. Aliquam quis sodales est, at scelerisque velit. Nullam quis mi ac tortor commodo euismod. Integer convallis purus ut arcu volutpat, malesuada aliquet sem efficitur. Pellentesque arcu purus, commodo in ultrices laoreet, ullamcorper non nulla.
              </p>
              
              <p className="tabnav"><a href="#sidebar4">next &#10151;</a></p>
            </section>

            <section id="sidebar4">
              <h2><a href="#sidebar4">sidebar four</a></h2>
              <p> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum tincidunt lorem laoreet molestie. Donec justo justo, hendrerit vel est et, convallis posuere diam. Aenean ut pulvinar arcu. Nunc vel est blandit, gravida diam sit amet, auctor diam. Aliquam quis sodales est, at scelerisque velit. Nullam quis mi ac tortor commodo euismod. Integer convallis purus ut arcu volutpat, malesuada aliquet sem efficitur. Pellentesque arcu purus, commodo in ultrices laoreet, ullamcorper non nulla.
              </p>
              
              <p className="tabnav"><a href="#sidebar1">next &#10151;</a></p>
            </section>
            



          </article>
        </div>
      );
    }
  }