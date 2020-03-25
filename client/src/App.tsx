import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { loadUser } from './flux/actions/authActions';
import { IItemReduxProps } from './types/interfaces';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShoppingList from './components/ShoppingList';

interface IProps {
  isAuthenticated: boolean,
  loadUser: () => {}
}

class App extends Component<IProps>  {

  public componentDidMount() {
    console.log("Did mount called")
    this.props.loadUser();
  }
  
  public shouldComponentUpdate(nextProps: IProps) {
    console.log("Should update called") 
    return true
  }

  public async componentDidUpdate() {
    await this.props.loadUser();
    console.log("Did Update called")
  }


  render() { 
    const { isAuthenticated } = this.props;
    console.log("Parent loaded")
  return (      
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          {isAuthenticated ? 
          <ShoppingList /> : null}          
        </Container>
      </div>
  )
} 
};

const mapStateToProps = (state: IItemReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch:any) => {
  return {
    loadUser: () => dispatch(loadUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
