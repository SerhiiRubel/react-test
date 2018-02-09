import React from 'react';
import ItemUser from '../../components/ItemUser';
export default (props) => {
  const  {
    data,
    isHidePagination,
  } = props;
  return (
    <div className='usersList'>
      <div className="usersList__head">
        <div className='avatar'>
          <p>Avatar:</p>
        </div>
        <div>
          <p>Name:</p>
        </div>
        <div>
          <p>Age:</p>
        </div>
        <div>
          <p>Phone:</p>
        </div>
      </div>
      {
        data && data.length > 0 &&
        data.map((item, index) =>
        <ItemUser
          key={index}
          updateApp={props.updateApp}
          {...item}
        />)
      }
      { !isHidePagination && 
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className = { props.isDisabledLB ? 'disabled page-item' : 'page-item' }>
              <a
                href="#"
                className="page-link"
                onClick={() => props.handlePagination(-1)}
              >
                Prev
              </a>
            </li>
            <li className="page-item active" >
              <a className="page-link" href="#" onClick ={ () => props.handlePagination(props.currentPage + 1.1) }>
                {props.currentPage + 1}
              </a>
            </li>
            <li className="page-item" className = { props.isDisNumPage ? 'disabled page-item' : 'page-item' }>
              <a className="page-link" href="#" onClick = { () => props.handlePagination(props.currentPage + 2) }>
                {props.currentPage + 2}
              </a>
            </li>
            <li className="page-item" className = { props.isDisNum ? 'disabled page-item' : 'page-item' }>
              <a className="page-link" href="#" onClick = { () => props.handlePagination(props.currentPage + 3) }>
                {props.currentPage + 3}
              </a>
            </li>
            <li className= {props.isDisabledRB ? 'disabled page-item' : 'page-item'}>
              <a
                href="#"
                className="page-link"
                onClick={() => props.handlePagination(1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      } 
    </div>
  );
}
