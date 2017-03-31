import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux'

import storeFactory from './store'

import RouterApp from "./router"
import sampleData from "./initialState"

injectTapEventPlugin();

/*class App extends Component {
  render(){
    return (
      <h1>Hello World</h1>
    );
  }
}*/
const store = storeFactory(sampleData)
// Render the main app react component into the app div.

class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <RouterApp/>
            </Provider>
        )
    }
}
export default App;