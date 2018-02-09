import React, { Component } from 'react';

import {
  ActiveUser,
  UsersList,
  SearchInput,
} from '../../components';

import url from '../../data.txt';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      activeUser: null,
      errorMessage: false,
      errorSearch: false,
      activeNumber: 0,
      currentPage: 0,
      isHidePagination: false,
      isDisabledRB: false,
      isDisabledLB: true,
      isDisNumPage: false,
      isDisNum:false,
    };
  }

  handleClickHeader = (item, index) => {

  }

  componentWillMount() {

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.initialData = data;
        this.setState({
          data: this.initialData,
          activeUser: data[0],
        })
      })

  }

  updateApp(config) {
    const users = this.state.data;
    this.setState(config);
    if (config.activeUser) {
      if (config.activeUser.id === this.state.activeUser.id) {
        this.setState({
          errorMessage: true,
        })
      } else {
        this.setState({
          errorMessage: false,
        })
      }
    }
  }

  search = (e) => {
    const value = e.target.value.toLowerCase();
    const fillter = this.initialData.filter(user => {
      return user.name.toLowerCase().includes(value);
    })
    this.updateApp({
      data: fillter,
    });
    if(fillter.length > 0) {
      this.setState({
        errorSearch: false,
      })
    } else {
      this.setState({
        errorSearch: true,
      });
    }
    this.hidePagination(fillter);
    /*---Если кто-то что-то ищет обнулил счетчик страницы и бага нет---*/
    this.updateApp({
      currentPage: 0,
    })
  }

  handlePagination = (number) => {
    if(number > 1 && number <= Math.ceil(this.state.data.length / 15)) {
      this.updateApp({ 
        currentPage: Math.round(number) - 1,
       })
    } else {
      const current = this.state.currentPage;
      if(current + number >= 0 && current + number < Math.ceil(this.state.data.length  / 15)) {
        this.updateApp(prev => ({
          currentPage: prev.currentPage + number,
        }
      )
    );
      }
    }
    this.hideNumberPage();
  }

  hideNumberPage = () => {
    // проверка на прев и некст
    this.state.currentPage < 1  ? this.updateApp({ isDisabledLB: true }) : this.updateApp({ isDisabledLB: false });
    this.state.currentPage >= Math.ceil(this.state.data.length / 15) - 1 ? this.updateApp ({ isDisabledRB: true }) : this.updateApp({isDisabledRB: false});
    // проверка на намбер
    this.state.currentPage >= Math.ceil(this.state.data.length / 15) ? this.updateApp({ isDisNumPage: true, }) : this.updateApp({isDisNumPage: false,});
    this.state.currentPage + 1 >= Math.ceil(this.state.data.length / 15) ? this.updateApp({ isDisNum: true, }) : this.updateApp({isDisNum: false,});
  }

  hidePagination = filter => filter.length < 15 ? this.updateApp ({ isHidePagination:true }) : this.updateApp({ isHidePagination:false })

  splitUsers = () => this.state.data && this.state.data.slice(this.state.currentPage * 15, this.state.currentPage * 15 + 15)
  
  // sort = type => {
  //   const data = this.state.data;
  //   const sorted = data.sort((a,b) => {
  //     return a[type] > b[type] ? 1 : -1;
  //   });
  //   this.updateApp({
  //     data:sorted,
  //   })
  // } 

  render() {
    return (
      <div className='home'>
        <div className="home__header">
          <SearchInput
            searchValue={this.search.bind(this)}
            isError={this.state.errorSearch}
          />
        {/* <div className='rowSorting'>
          <button 
            className='btn btn-primary'
            onClick={this.sort('name')}
          >
            <p>Name</p>
          </button>
          <button
            className='btn btn-primary'
            onClick={this.sort('age')}
          >
            <p>Name</p>
          </button>
        </div> */}
        </div>
        <div className="home__content">
          <div className="home__sidebar">
            <ActiveUser
              activeUser={this.state.activeUser}
            />
            {
              this.state.errorMessage &&
                <h1>
                  Error
                </h1>
            }
          </div>
          <div className="home__wrapUsers">
            <div className="usersHeader">
              <h2 className='usersHeader__title'>Users</h2>
            </div>
            <UsersList
              data={this.splitUsers()}
              handlePagination={this.handlePagination}
              updateApp={this.updateApp.bind(this)}
              isHidePagination={this.state.isHidePagination}
              currentPage={this.state.currentPage}
              isDisabledLB={this.state.isDisabledLB}
              isDisabledRB={this.state.isDisabledRB}
              isDisNumPage={this.state.isDisNumPage}
              isDisNum={this.state.isDisNum}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
