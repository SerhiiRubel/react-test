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
      isDisabledRB: false, // правая кнопка
      isDisabledLB: true, // левая кнопка
      isDisNumPage: false, // последняя цыфра
      isDisNum:false, // предпоследняя цыфра
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
    // e.preventDefault();
    const current = this.state.currentPage;
    if(number > 1 && number <= Math.ceil(this.state.data.length / 15)) {
      this.updateApp({ 
        currentPage: Math.round(number) - 1,
       })
    this.hideNumberPage (number - 1);
    } else {
      if(current + number >= 0 && current + number < Math.ceil(this.state.data.length  / 15)) {
        this.updateApp(prev => ({
          currentPage: prev.currentPage + number,
        }
      ));
    this.hideNumberPage(current + number);    
  }
    }
  }

  hideNumberPage = (prev) => {
    console.log(prev);
    // проверка на прев и некст
    prev < 1  ? this.updateApp({ isDisabledLB: true }) : this.updateApp({ isDisabledLB: false });
    prev + 1 == Math.ceil(this.state.data.length / 15) ? this.updateApp ({ isDisabledRB: true }) : this.updateApp({isDisabledRB: false});
    // проверка на намбер
    prev + 1 >= Math.ceil(this.state.data.length / 15) ? this.updateApp({ isDisNumPage: true, }) : this.updateApp({isDisNumPage: false,});
    prev + 2 >= Math.ceil(this.state.data.length / 15) ? this.updateApp({ isDisNum: true, }) : this.updateApp({isDisNum: false,});
  }

  hidePagination = fillter => fillter.length < 15 ? this.updateApp({ isHidePagination: true, }) : this.updateApp({ isHidePagination: false, })

  splitUsers = () =>  this.state.data && this.state.data.slice(this.state.currentPage * 15, this.state.currentPage * 15 + 15)

  sort = (type) => {
    const data = this.state.data;
    const sorted = data.sort((a, b) => {
      return a[type] > b[type] ? 1 : -1;
    });
    this.updateApp({
      data: sorted,
    })
  }

  reset = () => {
    this.updateApp({
      data: this.initialData,
      activeUser: this.state.data[0],
    });
  }

  render() {
    return (
      <div className='home'>
        <div className="home__header">
          <SearchInput
            searchValue={this.search.bind(this)}
            isError={this.state.errorSearch}
          />
          <div className='rowSorting'>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => this.sort('name')}
            >
                <i class="fa fa-users"></i>
                <p className='btnName'>Name</p>
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => this.sort('age')}
            >
              <i class="fa fa-sort-amount-desc"></i>
              <p className='btnName'>Age</p>
            </button>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => this.reset()}
            >
              <i class="fa fa-ban"></i>
              <p className='btnName'>Reset</p>
            </button>
          </div>
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
