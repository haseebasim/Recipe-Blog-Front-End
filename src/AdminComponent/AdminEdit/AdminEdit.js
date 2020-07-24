import React from 'react'
import AddPost from '../AddPost/AddPost'

function AdminEdit(props) {
    return (
        <div>
            <AddPost calledFrom='edit' id={props.match.params.id}/>            
        </div>
    )
}

export default AdminEdit
