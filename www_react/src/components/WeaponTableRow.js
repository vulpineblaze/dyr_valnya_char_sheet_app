import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

import MagickaTableRow from './MagickaTableRow';
import EmptyTableRow from './EmptyTableRow';
import Select from 'react-select';

class WeaponTableRow extends Component {

  constructor(props) {
      super(props);
      this.compare = this.compare.bind(this);
      this.compareInverted = this.compareInverted.bind(this);
      this.delete = this.delete.bind(this);
      this.toggleRow = this.toggleRow.bind(this);
      this.tabMagickaRow = this.tabMagickaRow.bind(this);
      this.magickaSetter = this.magickaSetter.bind(this);
      this.onMagickaSubmit = this.onMagickaSubmit.bind(this);
      this.onChangeMagicka = this.onChangeMagicka.bind(this);
      this.tabEmptyRow = this.tabEmptyRow.bind(this);
      this.emptySetter = this.emptySetter.bind(this);
      this.onEmptySubmit = this.onEmptySubmit.bind(this);
      this.onChangeEmpty = this.onChangeEmpty.bind(this);
      this.state = {
        magicka: '',
        magickaTotalCost: "",
        hasMagicka: [],
        empty: '',
        emptyTotalCost: "",
        hasEmpty: [],
        showMoreText: "More ..",
        showMore: false
      }
  }
  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = parseInt(a.cost);
    const bandB = parseInt(b.cost);

    let comparison = 0;
    if (bandA > bandB) {comparison = 1;} 
    else if (bandA < bandB) {comparison = -1;}
    return comparison;
  }
  compareInverted(a, b) {
    const bandA = parseInt(a.cost);
    const bandB = parseInt(b.cost);
    let comparison = 0;
    if (bandA > bandB) {comparison = -1;} 
    else if (bandA < bandB) {comparison = 1;}
    return comparison;
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

    if(this.state.hasEmpty.length < 1){
      if(this.props.hMT.length > 0){
        var newArr = [];
        this.props.hMT.forEach(mt => {
          if(mt.sheet.includes(this.props.obj._id)){
            newArr.push(mt);
          }
        });
        if(newArr.length > 0){
          this.setState({
            hasEmpty: newArr
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
        this.setState({showMore: false, showMoreText: "More .."});
      }else{
        this.setState({showMore: true, showMoreText: ".. less"});
      }
    }

  onChangeMagicka(e) {
    console.log(" wep  onChangeMagicka:", e);
    this.setState({ magicka: e.value });
  }
  onChangeEmpty(e) {
    this.setState({
      empty: e.target.value
    });
  }

  tabMagickaRow(){
    const theSheet = this.props.obj._id;
    const theQS = this.magickaSetter;
      return this.state.hasMagicka.map(function(object, i){
          return <MagickaTableRow obj={object} key={i} index={i} sheet={theSheet} magickaSetter={theQS} mag={i+1}/>;
      });
    }
  tabEmptyRow(){
    const theSheet = this.props.obj._id;
    const theQS = this.emptySetter;
      return this.state.hasEmpty.map(function(object, i){
          return <EmptyTableRow obj={object} key={i} index={i} sheet={theSheet} emptySetter={theQS}/>;
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
  emptySetter(res){
    this.setState({
       hasEmpty: res
    }, () => {
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
  onEmptySubmit(e) {
    e.preventDefault();
    var obj = {
      sheet: this.props.obj._id,
      empty: this.state.empty
    };

    axios.defaults.baseURL = '';
    axios.post('/empty/add', obj, { baseUrl: "" })
        .then(res => console.log("Added empty:",res.data))
        .then(res => {
          console.log("getting emptys for sheet:", this.props.obj._id);
          axios.get('/empty/'+this.props.obj._id, { baseUrl: "" })
            .then(response => {
              this.emptySetter(response.data);
            })
            .catch(function (error) {
              console.log(error);
            })
        });
    
    this.setState({
      empty: '',
    });   
  }


  render() {
    const extra = "weapon";
    const title = extra.charAt(0).toUpperCase() + extra.substring(1);
    const addBtnText = "Add to ..";
    const hasArray = this.state["has"+title];

    const theRow = "tabMagickaRow";
    const selectArray = this.props.mSA;
    const onChange = this.onChangeMagicka;
    // const extraSubmit = ;
    var tally = 0, mag = 1, addlDam = 0, addlAP = 0;
    this.state.hasMagicka.sort(this.compare);
    this.state.hasMagicka.forEach(mgk => {
      // console.log("WeaponTableRow mgk:", mgk.damage, mgk);
      tally += parseInt(mgk.cost) * mag;
      if(mgk.damage){addlDam += parseInt(mgk.damage);}
      if(mgk.ap){addlAP += parseInt(mgk.ap);}
      
      mag += 1;
    });

    var wepName ="";
    if(this.state.hasEmpty && this.state.hasEmpty.length > 0){
      wepName = this.state.hasEmpty[0].empty;
    }

    return (
          <React.Fragment>

        <tr>
          <td>
            {wepName ? wepName : this.props.obj.name}
          </td>
          <td>
            {this.props.obj.cost +" + "+ tally}
          </td>
          <td>
            <button onClick={this.toggleRow} className="btn">{this.state.showMoreText}</button>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>

        { this.state.showMore &&
        <React.Fragment>
          <tr style={{display: this.props.obj.damage 
                                || this.props.obj.range 
                                || this.props.obj.ap ? "" : "none"}}>
            <th>Text Entries:</th>
            <th>Damage:</th>
            <th>AP:</th>
            <th>Range:</th>
          </tr>
          <tr style={{display: this.props.obj.damage 
                                || this.props.obj.range 
                                || this.props.obj.ap ? "" : "none"}}>
            <td></td>
            <td> {this.props.obj.damage} + {addlDam && addlDam.toString()}</td>
            <td> {this.props.obj.ap} + {addlAP && addlAP.toString()}</td>
            <td> {this.props.obj.range}</td>

          </tr>


          { this.tabEmptyRow() }


          <tr>
            <th>Magicka</th>
            <th>Cost</th>
            <th>Description</th>
            <th>Action</th>
          </tr>

          { this[theRow]() }

          <tr className="magickaItemDiv magickaItemDivBorderTop">
            <th align="center" colSpan="4">Add Magicka To Weapon ? </th>
          </tr>



          <tr className="magickaItemDiv magickaItemDivBorderSides">
            <td colSpan="2">
              <Select options={selectArray} 
                onChange={onChange} 
                placeholder="Pick one"
              />
            </td>
            <td>Tallied Cost: {tally}</td>
            <td>
              <button onClick={this.onMagickaSubmit} className="btn btn-primary">{addBtnText}</button>
            </td>
          </tr>




          <tr className="magickaItemDiv magickaItemDivBorderSides">
            <th align="center" colSpan="4">Add Text To Weapon ? </th>
          </tr>


          <tr className="magickaItemDiv magickaItemDivBorderBottom">
            <td colSpan="3">
              <textarea className="form-control" 
                rows = "2" cols = "60" name = "description"
                value={this.state.empty}
                onChange={this.onChangeEmpty}
              />
            </td>
            <td>
              <button onClick={this.onEmptySubmit} className="btn btn-primary">{addBtnText}</button>
            </td>
          </tr>

          <tr><th colSpan="4"></th></tr>

        </React.Fragment>
        }

            
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