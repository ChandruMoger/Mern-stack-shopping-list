import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../flux/actions/itemActions';
import { IItemReduxProps, IShoppingList } from '../types/interfaces';

const ShoppingList = (props: IShoppingList) => {
  let items = [];
  useEffect(() => {
    props.getItems();
  }, [props.getItems]);

  const handleDelete = (id: string) => {
    props.deleteItem(id); 
  };

  
  const { item, isAuthenticated} = props
  items = item.items;  
  console.log("Child loaded")  
  return (
    <Container>
      {isAuthenticated ? (
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(_id)}
                  >
                    &times;
                  </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
      ) : null}
    </Container>
  );
};

const mapStateToProps = (state: IItemReduxProps) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch:any) => {
  return {
    getItems: () => dispatch(getItems()),
    deleteItem: (id: any) => dispatch(deleteItem(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
