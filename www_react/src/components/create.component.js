import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeConcept = this.onChangeConcept.bind(this);
    this.onChangeVirtue = this.onChangeVirtue.bind(this);
    this.onChangeVice = this.onChangeVice.bind(this);
    this.onChangeRacial = this.onChangeRacial.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeIntelligence = this.onChangeIntelligence.bind(this);
    this.onChangeWits = this.onChangeWits.bind(this);
    this.onChangeResolve = this.onChangeResolve.bind(this);
    this.onChangeStrength = this.onChangeStrength.bind(this);
    this.onChangeDexterity = this.onChangeDexterity.bind(this);
    this.onChangeStamina = this.onChangeStamina.bind(this);
    this.onChangePresence = this.onChangePresence.bind(this);
    this.onChangeManipulation = this.onChangeManipulation.bind(this);
    this.onChangeComposure = this.onChangeComposure.bind(this);
    this.onChangeAthletics = this.onChangeAthletics.bind(this);
    this.onChangeCrafts = this.onChangeCrafts.bind(this);
    this.onChangeCulture = this.onChangeCulture.bind(this);
    this.onChangeEmpathy = this.onChangeEmpathy.bind(this);
    this.onChangeExpression = this.onChangeExpression.bind(this);
    this.onChangeIntimidation = this.onChangeIntimidation.bind(this);
    this.onChangeInvestigation = this.onChangeInvestigation.bind(this);
    this.onChangeLarceny = this.onChangeLarceny.bind(this);
    this.onChangeLuck = this.onChangeLuck.bind(this);
    this.onChangeMagicka = this.onChangeMagicka.bind(this);
    this.onChangeMedicine = this.onChangeMedicine.bind(this);
    this.onChangeObservation = this.onChangeObservation.bind(this);
    this.onChangePersuasion = this.onChangePersuasion.bind(this);
    this.onChangePortaelogy = this.onChangePortaelogy.bind(this);
    this.onChangeRiding = this.onChangeRiding.bind(this);
    this.onChangeStealth = this.onChangeStealth.bind(this);
    this.onChangeStreetwise = this.onChangeStreetwise.bind(this);
    this.onChangeSubterfuge = this.onChangeSubterfuge.bind(this);
    this.onChangeSurvival = this.onChangeSurvival.bind(this);
    this.onChangeTechnika = this.onChangeTechnika.bind(this);
    this.onChangeAstrylose = this.onChangeAstrylose.bind(this);
    this.onChangeWillpower = this.onChangeWillpower.bind(this);
    this.onChangeVitality = this.onChangeVitality.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeSpeed = this.onChangeSpeed.bind(this);
    this.onChangeInitiative = this.onChangeInitiative.bind(this);
    this.onChangeDefense = this.onChangeDefense.bind(this);
    this.onChangetemp_text_box = this.onChangetemp_text_box.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        name: '',
		owner: '',
		concept: '',
		virtue: '',
		vice: '',
		racial: '',
		description: '',
		intelligence: 1,
		wits: 1,
		resolve: 1,
		strength: 1,
		dexterity: 1,
		stamina: 1,
		presence: 1,
		manipulation: 1,
		composure: 1,
		athletics: 0,
		crafts: 0,
		culture: 0,
		empathy: 0,
		expression: 0,
		intimidation: 0,
		investigation: 0,
		larceny: 0,
		luck: 1,
		magicka: 0,
		medicine: 0,
		observation: 1,
		persuasion: 0,
		portaelogy: 1,
		riding: 0,
		stealth: 0,
		streetwise: 0,
		subterfuge: 0,
		survival: 0,
		technika: 0,
		astrylose: 0,
		willpower: 0,
		vitality: 0,
		size: 0,
		speed: 0,
		initiative: 0,
		defense: 0,
		temp_text_box: ''
    }
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeOwner (e) {
    var val="";
  	try {
		  val = this.props.user.getEmail();
		}
		catch(err) {
			console.log(err);
		}
    this.setState({
      owner: val
    }) 
  }
  onChangeConcept(e) {
    this.setState({
      concept: e.target.value
    });
  }
  onChangeVirtue(e) {
    this.setState({
      virtue: e.target.value
    });
  }
  onChangeVice(e) {
    this.setState({
      vice: e.target.value
    });
  }
  onChangeRacial(e) {
    this.setState({
      racial: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeIntelligence(e) {
    this.setState({
      intelligence: e.target.value
    });
  }
  onChangeWits(e) {
    this.setState({
      wits: e.target.value,
      defense: Math.min(e.target.value , this.state.dexterity)
    });
  }
  onChangeResolve(e) {
    this.setState({
      resolve: e.target.value,
      astrylose: parseInt(e.target.value) + parseInt(this.state.size),
      willpower: parseInt(e.target.value) + parseInt(this.state.composure)
    });
  }
  onChangeStrength(e) {
    this.setState({
      strength: e.target.value,
      speed: parseInt(e.target.value) + parseInt(this.state.dexterity) + parseInt(this.state.size)
    });
  }
  onChangeDexterity(e) {
    this.setState({
      dexterity: e.target.value,
      speed: parseInt(e.target.value) + parseInt(this.state.strength) + parseInt(this.state.size),
      initiative: parseInt(e.target.value) + parseInt(this.state.composure),
      defense: Math.min(e.target.value , this.state.wits)
    });
  }
  onChangeStamina(e) {
    this.setState({
      stamina: e.target.value,
      vitality: parseInt(e.target.value) + parseInt(this.state.size)
    });
  }
  onChangePresence(e) {
    this.setState({
      presence: e.target.value
    });
  }
  onChangeManipulation(e) {
    this.setState({
      manipulation: e.target.value
    });
  }
  onChangeComposure(e) {
    this.setState({
      composure: e.target.value,
      willpower: parseInt(e.target.value) + parseInt(this.state.resolve),
      initiative: parseInt(e.target.value) + parseInt(this.state.dexterity)
    });
  }
  onChangeAthletics(e) {
    this.setState({
      athletics: e.target.value
    });
  }
  onChangeCrafts(e) {
    this.setState({
      crafts: e.target.value
    });
  }
  onChangeCulture(e) {
    this.setState({
      culture: e.target.value
    });
  }
  onChangeEmpathy(e) {
    this.setState({
      empathy: e.target.value
    });
  }
  onChangeExpression(e) {
    this.setState({
      expression: e.target.value
    });
  }
  onChangeIntimidation(e) {
    this.setState({
      intimidation: e.target.value
    });
  }
  onChangeInvestigation(e) {
    this.setState({
      investigation: e.target.value
    });
  }
  onChangeLarceny(e) {
    this.setState({
      larceny: e.target.value
    });
  }
  onChangeLuck(e) {
    this.setState({
      luck: e.target.value
    });
  }
  onChangeMagicka(e) {
    this.setState({
      magicka: e.target.value
    });
  }
  onChangeMedicine(e) {
    this.setState({
      medicine: e.target.value
    });
  }
  onChangeObservation(e) {
    this.setState({
      observation: e.target.value
    });
  }
  onChangePersuasion(e) {
    this.setState({
      persuasion: e.target.value
    });
  }
  onChangePortaelogy(e) {
    this.setState({
      portaelogy: e.target.value
    });
  }
  onChangeRiding(e) {
    this.setState({
      riding: e.target.value
    });
  }
  onChangeStealth(e) {
    this.setState({
      stealth: e.target.value
    });
  }
  onChangeStreetwise(e) {
    this.setState({
      streetwise: e.target.value
    });
  }
  onChangeSubterfuge(e) {
    this.setState({
      subterfuge: e.target.value
    });
  }
  onChangeSurvival(e) {
    this.setState({
      survival: e.target.value
    });
  }
  onChangeTechnika(e) {
    this.setState({
      technika: e.target.value
    });
  }
  onChangeAstrylose(e) {
    // this.setState({
    //   astrylose: e.target.value
    // });
  }
  onChangeWillpower(e) {
    // this.setState({
    //   willpower: e.target.value
    // });
  }
  onChangeVitality(e) {
    // this.setState({
    //   vitality: e.target.value
    // });
  }
  onChangeSize(e) {
    this.setState({
      size: e.target.value,
      astrylose: parseInt(e.target.value) + parseInt(this.state.resolve),
      speed: parseInt(e.target.value) + parseInt(this.state.dexterity) + parseInt(this.state.strength)
    });
  }
  onChangeSpeed(e) {
    // this.setState({
    //   speed: e.target.value
    // });
  }
  onChangeInitiative(e) {
    // this.setState({
    //   initiative: e.target.value
    // });
  }
  onChangeDefense(e) {
    // this.setState({
    //   defense: e.target.value
    // });
  }
  onChangetemp_text_box(e) {
    this.setState({
      temp_text_box: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var val="";
    try {
	  val = this.props.user.getEmail();
	}
	catch(err) {
		console.log(err);
	}
    const obj = {
      	name: this.state.name,
		owner: val,
		concept: this.state.concept,
		virtue: this.state.virtue,
		vice: this.state.vice,
		racial: this.state.racial,
		description: this.state.description,
		intelligence: this.state.intelligence,
		wits: this.state.wits,
		resolve: this.state.resolve,
		strength: this.state.strength,
		dexterity: this.state.dexterity,
		stamina: this.state.stamina,
		presence: this.state.presence,
		manipulation: this.state.manipulation,
		composure: this.state.composure,
		athletics: this.state.athletics,
		crafts: this.state.crafts,
		culture: this.state.culture,
		empathy: this.state.empathy,
		expression: this.state.expression,
		intimidation: this.state.intimidation,
		investigation: this.state.investigation,
		larceny: this.state.larceny,
		luck: this.state.luck,
		magicka: this.state.magicka,
		medicine: this.state.medicine,
		observation: this.state.observation,
		persuasion: this.state.persuasion,
		portaelogy: this.state.portaelogy,
		riding: this.state.riding,
		stealth: this.state.stealth,
		streetwise: this.state.streetwise,
		subterfuge: this.state.subterfuge,
		survival: this.state.survival,
		technika: this.state.technika,
		astrylose: this.state.astrylose,
		willpower: this.state.willpower,
		vitality: this.state.vitality,
		size: this.state.size,
		speed: this.state.speed,
		initiative: this.state.initiative,
		defense: this.state.defense,
		temp_text_box: this.state.temp_text_box
    };
    axios.post('sheet/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      	name: '',
		owner: '',
		concept: '',
		virtue: '',
		vice: '',
		racial: '',
		description: '',
		intelligence: 1,
		wits: 1,
		resolve: 1,
		strength: 1,
		dexterity: 1,
		stamina: 1,
		presence: 1,
		manipulation: 1,
		composure: 1,
		athletics: 0,
		crafts: 0,
		culture: 0,
		empathy: 0,
		expression: 0,
		intimidation: 0,
		investigation: 0,
		larceny: 0,
		luck: 1,
		magicka: 0,
		medicine: 0,
		observation: 1,
		persuasion: 0,
		portaelogy: 1,
		riding: 0,
		stealth: 0,
		streetwise: 0,
		subterfuge: 0,
		survival: 0,
		technika: 0,
		astrylose: 0,
		willpower: 0,
		vitality: 0,
		size: 0,
		speed: 0,
		initiative: 0,
		defense: 0,
		temp_text_box: ''
    })
  }


  componentDidMount() {
    var coll = document.getElementsByClassName("collapsible");
    var active = document.getElementsByClassName("active");
	var i;

	for (i = 0; i < coll.length; i++) {
	  coll[i].addEventListener("click", function() {
	    this.classList.toggle("active");
	    var content = this.nextElementSibling;
	    if (content.style.maxHeight){
	      content.style.maxHeight = null;
	    } else {
	      console.log("content: ",content);
	      content.style.maxHeight = content.scrollHeight + "px";
	    } 
	  });
	}
	for(i = 0; i < active.length; i++){
		var content = active[i].nextElementSibling;
		console.log("content: ",content);
		content.style.maxHeight = content.scrollHeight + "px";
	}
  }


 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Add New Character Sheet</h3>
            <form onSubmit={this.onSubmit}>

            	<article class="tabs">

					<section id="tab1">
						<h2><a href="#tab1">Character Desc</a></h2>
						<p> Name and description of your character - No rules are tied to this section, so it's up to you what you make!</p>
						<div className="form-group">
		                    <label>Name:  </label>
		                    <input 
		                      type="text" 
		                      className="form-control" 
		                      value={this.state.name}
		                      onChange={this.onChangeName}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Concept:  </label>
		                    <input 
		                      type="text" 
		                      className="form-control" 
		                      value={this.state.concept}
		                      onChange={this.onChangeConcept}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Virtue:  </label>
		                    <input 
		                      type="text" 
		                      className="form-control" 
		                      value={this.state.virtue}
		                      onChange={this.onChangeVirtue}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Vice:  </label>
		                    <input 
		                      type="text" 
		                      className="form-control" 
		                      value={this.state.vice}
		                      onChange={this.onChangeVice}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Racial:  </label>
		                    <input 
		                      type="text" 
		                      className="form-control" 
		                      value={this.state.racial}
		                      onChange={this.onChangeRacial}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Description: </label>
		                    <textarea className="form-control" 
		                    rows = "5" cols = "60" name = "description"
		                    value={this.state.description}
		                      onChange={this.onChangeDescription}
		                      />
		                </div>
		                
		                <p className="tabnav"><a href="#tab2">next &#10151;</a></p>
					</section>
					
					<section id="tab2">
						<h2><a href="#tab2">Aspects</a></h2>
						<p> Use 5|4|3 rule in the coda to select your Aspects.</p>
						<div className="form-group">
		                    <label>Intelligence: {this.state.intelligence}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.intelligence}
		                      min="0" max="5"
		                      onChange={this.onChangeIntelligence}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Wits: {this.state.wits}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.wits}
		                      min="0" max="5"
		                      onChange={this.onChangeWits}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Resolve: {this.state.resolve}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.resolve}
		                      min="0" max="5"
		                      onChange={this.onChangeResolve}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Strength: {this.state.strength}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.strength}
		                      min="0" max="5"
		                      onChange={this.onChangeStrength}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Dexterity: {this.state.dexterity}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.dexterity}
		                      min="0" max="5"
		                      onChange={this.onChangeDexterity}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Stamina: {this.state.stamina}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.stamina}
		                      min="0" max="5"
		                      onChange={this.onChangeStamina}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Presence: {this.state.presence}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.presence}
		                      min="0" max="5"
		                      onChange={this.onChangePresence}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Manipulation: {this.state.manipulation}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.manipulation}
		                      min="0" max="5"
		                      onChange={this.onChangeManipulation}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Composure: {this.state.composure}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.composure}
		                      min="0" max="5"
		                      onChange={this.onChangeComposure}
		                      />
		                </div>
						<p class="tabnav"><a href="#tab3">next &#10151;</a></p>
					</section>
					
					<section id="tab3">
						<h2><a href="#tab3">Aptitudes</a></h2>
						<p> You get 20 points to spend here, on top of the items already at +1. </p>
						<div className="form-group">
		                    <label>Athletics: {this.state.athletics}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.athletics}
		                      min="0" max="5"
		                      onChange={this.onChangeAthletics}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Crafts: {this.state.crafts}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.crafts}
		                      min="0" max="5"
		                      onChange={this.onChangeCrafts}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Culture: {this.state.culture}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.culture}
		                      min="0" max="5"
		                      onChange={this.onChangeCulture}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Empathy: {this.state.empathy}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.empathy}
		                      min="0" max="5"
		                      onChange={this.onChangeEmpathy}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Expression: {this.state.expression}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.expression}
		                      min="0" max="5"
		                      onChange={this.onChangeExpression}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Intimidation: {this.state.intimidation}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.intimidation}
		                      min="0" max="5"
		                      onChange={this.onChangeIntimidation}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Investigation: {this.state.investigation}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.investigation}
		                      min="0" max="5"
		                      onChange={this.onChangeInvestigation}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Larceny: {this.state.larceny}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.larceny}
		                      min="0" max="5"
		                      onChange={this.onChangeLarceny}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Luck: {this.state.luck}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.luck}
		                      min="0" max="5"
		                      onChange={this.onChangeLuck}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Magicka: {this.state.magicka}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.magicka}
		                      min="0" max="5"
		                      onChange={this.onChangeMagicka}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Medicine: {this.state.medicine}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.medicine}
		                      min="0" max="5"
		                      onChange={this.onChangeMedicine}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Observation: {this.state.observation}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.observation}
		                      min="0" max="5"
		                      onChange={this.onChangeObservation}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Persuasion: {this.state.persuasion}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.persuasion}
		                      min="0" max="5"
		                      onChange={this.onChangePersuasion}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Portaelogy: {this.state.portaelogy}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.portaelogy}
		                      min="0" max="5"
		                      onChange={this.onChangePortaelogy}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Riding: {this.state.riding}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.riding}
		                      min="0" max="5"
		                      onChange={this.onChangeRiding}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Stealth: {this.state.stealth}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.stealth}
		                      min="0" max="5"
		                      onChange={this.onChangeStealth}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Streetwise: {this.state.streetwise}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.streetwise}
		                      min="0" max="5"
		                      onChange={this.onChangeStreetwise}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Subterfuge: {this.state.subterfuge}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.subterfuge}
		                      min="0" max="5"
		                      onChange={this.onChangeSubterfuge}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Survival: {this.state.survival}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.survival}
		                      min="0" max="5"
		                      onChange={this.onChangeSurvival}
		                      />
		                </div>
		                <div className="form-group">
		                    <label>Technika: {this.state.technika}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.technika}
		                      min="0" max="5"
		                      onChange={this.onChangeTechnika}
		                      />
		                </div>
		                <p class="tabnav"><a href="#tab4">next &#10151;</a></p>
					</section>


					
					<section id="tab4">
						<h2><a href="#tab4">Composite Stats</a></h2>
						<p> Mostly for after Character Creation, but some stats don't fit elsewhere. </p>
						<p> These stats are editable. </p>
						<div className="form-group">
		                    <label>Size: {this.state.size}</label>
		                    <input type="range" 
		                      className="form-control"
		                      value={this.state.size}
		                      min="1" max="6"
		                      onChange={this.onChangeSize}
		                      />
		                </div>
						<p> These stats are not editable. </p>
						<div className="form-group">
		                    <label>Astrylose: {this.state.astrylose}</label>
		                    <input type="range" 
		                      className={["tennerRed","form-control","noedit"].join(' ')}
		                      value={this.state.astrylose}
		                      min="0" max="10"
		                      onChange={this.onChangeAstrylose}
		                      />
		                </div>
						<div className="form-group">
		                    <label>Willpower: {this.state.willpower}</label>
		                    <input type="range" 
		                      className={["tennerBlue","form-control","noedit"].join(' ')}
		                      value={this.state.willpower}
		                      min="0" max="10"
		                      onChange={this.onChangeWillpower}
		                      />
		                </div>
						<div className="form-group">
		                    <label>Vitality: {this.state.vitality}</label>
		                    <input type="range" 
		                      className={["tennerGreen","form-control","noedit"].join(' ')}
		                      value={this.state.vitality}
		                      min="0" max="10"
		                      onChange={this.onChangeVitality}
		                      />
		                </div>
						<div className="form-group">
		                    <label>Speed: {this.state.speed}</label>
		                    <input type="range" 
		                      className={["tennerCyan","form-control","noedit"].join(' ')}
		                      value={this.state.speed}
		                      min="0" max="10"
		                      onChange={this.onChangeSpeed}
		                      />
		                </div>
						<div className="form-group">
		                    <label>Initiative: {this.state.initiative}</label>
		                    <input type="range" 
		                      className={["tennerYellow","form-control","noedit"].join(' ')}
		                      value={this.state.initiative}
		                      min="0" max="10"
		                      onChange={this.onChangeInitiative}
		                      />
		                </div>
						<div className="form-group">
		                    <label>Defense: {this.state.defense}</label>
		                    <input type="range" 
		                      className={["noedit","form-control"].join(' ')}
		                      value={this.state.defense}
		                      min="0" max="10"
		                      onChange={this.onChangeDefense}
		                      />
		                </div>
						
		                <p class="tabnav"><a href="#tab5">next &#10151;</a></p>
					</section>


					
					<section id="tab5">
						<h2><a href="#tab5">Specialties</a></h2>
						<p>The feature is Coming SOON(tm)!</p>
						<p class="tabnav"><a href="#tab6">next &#10151;</a></p>
					</section>


					
					<section id="tab6">
						<h2><a href="#tab6">Quirks|Magicka|Technika</a></h2>
						<p> Right now this is a big empty text box with only 10 lines. The full feature is Coming SOON(tm)!</p>
						<div className="form-group">
		                    <label>temp_text_box: </label>
		                    <textarea className="form-control" 
		                    rows = "10" cols = "60" name = "description"
		                    value={this.state.temp_text_box}
		                      onChange={this.onChangetemp_text_box}
		                      />
		                </div>
		                <div className="form-group">
		                    <input type="submit" 
		                      value="Save Character" 
		                      className="btn btn-primary"/>
		                </div>
					</section>




				</article>


                
                
                



                
                




                
                






                








                


                
            </form>
        </div>
    )
  }
}