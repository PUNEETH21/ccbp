import './index.css'

const TodoItem = props => {
  const {todoItem, deleteItem} = props
  const {title, id} = todoItem
  const onDelete = () => {
    deleteItem(id)
  }
  return (
    <li className="item-container">
      <h1 className="title">{title}</h1>
      <button className="delete-button" type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
