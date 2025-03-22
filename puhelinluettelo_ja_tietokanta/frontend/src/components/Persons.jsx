const Persons = (props) => {
    const persons = props.personList
    return (
        <div>
            {persons.map(
                p => 
                <p key={p.id}> 
                    {p.name}
                    {` ${p.number} `}
                    <button onClick={() => props.idRemoval(p)}>
                        delete
                    </button>
                </p>
            )}
        </div>
        
    )
}

export default Persons