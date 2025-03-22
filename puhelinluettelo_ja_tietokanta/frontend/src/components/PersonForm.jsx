const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
        <div>
          name: 
            <input 
              value ={props.nameInput}
              onChange = {props.nameChange}
            />
        </div>
        <div>
          number: 
            <input 
              value ={props.numberInput}
              onChange = {props.numberChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm