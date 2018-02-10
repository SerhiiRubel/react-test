import React, { Component } from 'react';

import {
  Dropdown,
} from '../../components';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: null,
      isOpenDropdown: [],
    };
  }

  componentWillMount () {
    const users = fetch('https://jsonplaceholder.typicode.com/users')
    .then( response => response.json())
    .then( usersData =>
      this.setState({
        usersList: usersData,
      }) 
    );
  }

  isContentDropdown = (id) => {
    if (this.state.isOpenDropdown.length > 0 && this.state.isOpenDropdown.includes(id) ) {
      this.setState({
        isOpenDropdown: this.state.isOpenDropdown.filter(item => item !== id)
      });
    } else if (!this.state.isOpenDropdown.includes(id)) {
      this.setState({
        isOpenDropdown: [...this.state.isOpenDropdown,id],
      });
    }
  }


  render() {
    // console.log('-------', this.state.isOpenDropdown);
    console.log(this.state.usersList);
    return (
      <div className='about'>
        <div className="about__header">
          <h1>About Page</h1>
        </div>
        <div className="content">
        {
          this.state.usersList && this.state.usersList.length > 0 &&
          this.state.usersList.map((item, index) => 
            <Dropdown
              key={item.id}
              id={item.id}
              name={item.name}
              phone={item.phone}
              username={item.username}
              website={item.website}
              title={item.name}
              isContentDropdown={() => this.isContentDropdown(item.id)}
              {...this.state}
            />
           )
        }
        </div>
      </div>
    );
  }
}

export default About;