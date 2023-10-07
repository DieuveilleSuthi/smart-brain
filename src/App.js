import React, {Component} from 'react';
import './App.css';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
//import Clarifai from 'clarifai';
import 'tachyons';
import Rank from './component/Rank/Rank';
import Signin from './component/signin/signin';
import Register from './component/Register/Register';
import FaceRecognetion from './component/FaceRecognetion.js/FaceRecognetion';

/*const app = new Clarifai.App({
  apiKey: '94452b931d65435b981ce1e0c39e2244'
})*/

const returnClarifaiJSONRequestOption = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '94452b931d65435b981ce1e0c39e2244';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'suthi';       
  const APP_ID = 'face';
  // Change these to whatever model and image URL you want to use
  //const MODEL_ID = 'face-detection';  
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
 });
 const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};

return requestOptions;

}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      route:'signin',
      isSignin: false
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
   // app.models.predict('face-detection', this.state.input)
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/versions/" + "/outputs", returnClarifaiJSONRequestOption(this.state.input))
      .then(response => response.json())
      .then(response => {
        console.log( response)})
      .catch(error => console.log('error', error))  
       /* if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            
        }
        //this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));*/
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignin: false});
    } else if(route === 'home'){
      this.setState({isSignin: true});
    }

    this.setState({route: route});
  }
  render(){

    const {isSignin, imageUrl, route} = this.state;
    return (
      <div className="App">
          <Navigation 
          isSignin={isSignin}
          onRouteChange = {this.onRouteChange}/>
          {route === 'home' ? 
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
            onInputChange = {this.onInputChange}
            onSubmit = {this.onSubmit}
            />
            <FaceRecognetion imageUrl = {imageUrl}/>
         </div> 
        : (route === 'signin' ? 
        <Signin  onRouteChange = {this.onRouteChange}/>:
        <Register  onRouteChange = {this.onRouteChange} />
        )
          }
       
      </div>
    );
  }
 
}

export default App;
