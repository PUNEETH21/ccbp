import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {categoryOptions, searchInput, ratingsList, clearFilter} = props

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    console.log(6)
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeCategory = activeCategoryId => {
    const {changeCategory} = props
    changeCategory(activeCategoryId)
  }

  const renderClearFilter = () => (
    <button type="button" className="clear-btn" onClick={clearFilter}>
      Clear Filters
    </button>
  )

  return (
    <div className="filters-group-container">
      <div className="search-container">
        <input
          className="search-input"
          type="search"
          placeholder="search"
          htmlFor="category"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch />
      </div>
      <h1>Category</h1>
      <ul className="category-options-container">
        {categoryOptions.map(eachCategory => {
          const onClickCategory = () =>
            onChangeCategory(eachCategory.categoryId)

          return (
            <li
              onClick={onClickCategory}
              key={eachCategory.categoryId}
              className="category-option"
            >
              <p>{eachCategory.name}</p>
            </li>
          )
        })}
      </ul>
      <h1>Ratings</h1>

      <ul className="ratings-container">
        {ratingsList.map(eachRating => {
          const {changeRating} = props
          const onChangeRating = () => changeRating(eachRating.ratingId)
          return (
            <li className="rating-section" onClick={onChangeRating}>
              <img
                className="rating-img"
                src={eachRating.imageUrl}
                alt={`rating-${eachRating.ratingId}`}
              />
              <p className="ratingClassName">& up</p>
            </li>
          )
        })}
      </ul>

      {renderClearFilter()}
      {/* Replace this element with your code */}
    </div>
  )
}

export default FiltersGroup
