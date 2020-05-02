import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

import MagickaTableRow from './MagickaTableRow';
import Select from 'react-select';

class WeaponTableRow extends Component {

  constructor(props) {
      super(props);
      this.delete = this.delete.bind(this);
      this.toggleRow = this.toggleRow.bind(this);
      this.tabMagickaRow = this.tabMagickaRow.bind(this);
      this.magickaSetter = this.magickaSetter.bind(this);
      this.onMagickaSubmit = this.onMagickaSubmit.bind(this);
      this.onChangeMagicka = this.onChangeMagicka.bind(this);
      this.state = {
        magicka: '',
        magickaTotalCost: "",
        hasMagicka: [],
        showMore: false
      }
  }
  componentDidUpdate(prevProps, prevState) {

    // console.log("state n prop", this.state.player, this.props.player);
    if(this.state.hasMagicka.length < 1){
      if(this.props.hMGK.length > 0){
        var newArr = [];
        this.props.hMGK.forEach(mgk => {
          if(mgk.sheet.includes(this.props.obj._id)){
            newArr.push(mgk);
          }
        });
        if(newArr.length > 0){
          this.setState({
            hasMagicka: newArr
          }, () => {
            // console.log("found if GM:", this.state.isGM, email);
          });  
        }
      }
    }
  }
    delete(e) {
        e.preventDefault();

        axios.defaults.baseURL = '';
        axios.get('/weapon/delete/'+this.props.obj._id,{ baseUrl: "" })
            .then(console.log('Deleted for:', this.props.sheet))
            .then(res => {
                axios.get('/weapon/'+this.props.sheet,{ baseUrl: "" })
                  .then(response => {
                    this.props.weaponSetter(response.data);
                    // this.setState({ hasWeapons: response.data });
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
              })
            .catch(err => console.log(err));
        // window.open("/");
        // window.location = '/';
    }
    toggleRow(e){
      e.preventDefault();

      if(this.state.showMore){
        this.setState({showMore: false});
      }else{
        this.setState({showMore: true});
      }
    }

  onChangeMagicka(e) {
    console.log(" wep  onChangeMagicka:", e);
    this.setState({ magicka: e.value });
  }

  tabMagickaRow(){
    const theSheet = this.props.obj._id;
    const theQS = this.magickaSetter;
      return this.state.hasMagicka.map(function(object, i){
          return <MagickaTableRow obj={object} key={i} index={i} sheet={theSheet} magickaSetter={theQS} mag={i+1}/>;
      });
    }

  magickaSetter(res){
    var i, tally=0, overflow=0;
    for(i=0;i < res.length;i++){
      var item = res[i];
      tally += parseInt(item.cost);
    }
    // console.log("magickaSetter",res, tally, overflow);
    this.setState({
       hasMagicka: res, 
       magickaTotalCost: tally,
       magickaOverflow: overflow
    }, () => {
      // this.checkXP();
      // this.checkOverflow();
    });
  }

  onMagickaSubmit(e) {
    e.preventDefault();
    console.log("onMagickaSubmit:", this.state.magicka, this.props.magickaArray);

    const selectedMagicka = this.props.magickaArray[this.state.magicka];
    if(!selectedMagicka){return 1;}
    const obj = {
      sheet: this.props.obj._id,
      name: selectedMagicka.name,
      cost: selectedMagicka.cost,
      desc: selectedMagicka.desc,
      armor: selectedMagicka.armor,
      penalty: selectedMagicka.penalty,
      damage: selectedMagicka.damage,
      ap: selectedMagicka.ap
    };
    console.log("onMagickaSubmit:",  obj);

    axios.defaults.baseURL = '';
    axios.post('/magicka/add', obj, { baseUrl: "" })
        .then(res => console.log("Added magicka:",res.data))
        .then(res => {
          console.log("getting magickas for sheet:", this.props.obj._id);
          axios.get('/magicka/'+this.props.obj._id, { baseUrl: "" })
            .then(response => {
              this.magickaSetter(response.data);
            })
            .catch(function (error) {
              console.log(error);
            })
        });
    
    this.setState({
      magicka: '',
    });

  }


  render() {
    const extra = "weapon";
    const title = extra.charAt(0).toUpperCase() + extra.substring(1);
    const addBtnText = "Add to " + title;
    const hasArray = this.state["has"+title];

    const theRow = "tabMagickaRow";
    const selectArray = this.props.mSA;
    const onChange = this.onChangeMagicka;
    const totalCost = this.state.magickaTotalCost;
    // const extraSubmit = ;
    var tally = 0, mag = 1;
    this.state.hasMagicka.forEach(mgk => {
      tally += parseInt(mgk.cost) * mag;
      mag += 1;
    });

    return (
          <React.Fragment>

        <tr>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.cost +" + "+ tally}
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
          <td>
            <button onClick={this.toggleRow} className="btn">More..</button>
          </td>
        </tr>

        { this.state.showMore &&
        <React.Fragment>
          <tr style={{display: this.props.obj.damage 
                                || this.props.obj.range 
                                || this.props.obj.ap ? "" : "none"}}>
            <th>Damage:</th>
            <th>AP:</th>
            <th>Range:</th>
          </tr>
          <tr style={{display: this.props.obj.damage 
                                || this.props.obj.range 
                                || this.props.obj.ap ? "" : "none"}}>
            <td> {this.props.obj.damage}</td>
            <td> {this.props.obj.ap}</td>
            <td> {this.props.obj.range}</td>

          </tr>
        </React.Fragment>
        }
        <tr>
          <th>Name</th>
          <th>Cost</th>
          <th colSpan="2">Action</th>
        </tr>

        { this[theRow]() }

        <tr className="magickaItemDiv">
          <th align="center" colSpan="4">Add Magicka To Weapon ? </th>
        </tr>



        <tr>
          <td>
            <Select options={selectArray} 
              onChange={onChange} 
              placeholder="Pick one"
            />
          </td>
        </tr>

        <tr className="magickaItemDiv">
          <td>{this.state[extra]}</td>
          <td>Tallied Cost: {totalCost}</td>
          <td>
            <button onClick={this.onMagickaSubmit} className="btn btn-primary">{addBtnText}</button>
          </td>
        </tr>

            
        </React.Fragment>

    );
  }
}

export default WeaponTableRow;




      //   codaDisplayAndSelect(extra, theRow, selectArray, onChange, totalCost, onSubmit, secondArray=null, secondChange=null) {
        // { this.codaDisplayAndSelect("weapon", 
        //             "tabWeaponRow", 
        //             this.props.weaponSelectArray, 
        //             this.onChangeWeapon, 
        //             this.state.weaponTotalCost, 
        //             this.onWeaponSubmit) }