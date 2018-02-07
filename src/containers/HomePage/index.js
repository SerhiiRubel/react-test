import React, { Component } from 'react';

import {
  ActiveUser,
  UsersList,
} from '../../components';

import url from '../../data.txt';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      displayedUsers: null,
      activeUser: 0,
      isRepeat:false,
    };
  }

  handleClickHeader = (item, index) => {
    console.log(index);
  }

  componentWillMount() {

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          displayedUsers:data,
          data: data,
        })
      })

  }

  updateApp(config) {
    if(config.activeUser === this.state.activeUser.id) {
      console.log(this.state.activeUser.id);
      this.setState ({
        isRepeat: true,
      })
    }  else {
      const users = this.state.data;
      this.setState(config);
      users.length > 0 &&
        users.map(item => {
          if(item.id === config.activeUser) {
            this.setState({
              isRepeat:false,
              activeUser: item,
            })
          }
        });
    }
  }

  searchName (e) {
        // console.log(document.querySelector('.form-control') === e.target);
        var searchQuery = e.target.value.toLowerCase();
        var displayedUsers = this.state.displayedUsers.filter( el =>
          {
            var searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1
          });
        // if (displayedUsers == 0) {
        //   alert("Soryan' bratan");
        // }
      this.setState({
        data: displayedUsers
      })
  }

  render() {
    return (
      <div className='home'>
        <div className="home__header">
          <input className='form-control' placeholder='Search users' onInput = { this.searchName.bind(this) } />
        </div>
        <div className="home__content">
          <div className="home__sidebar">
            <ActiveUser
              activeUser={ this.state.activeUser }
              isRepeat = { this.state.isRepeat }
            />
          </div>
          <div className="home__wrapUsers">
            <div className="usersHeader">
              <h2 className='usersHeader__title'>Users</h2>
            </div>
            <UsersList
              data={this.state.data}
              updateApp={this.updateApp.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
