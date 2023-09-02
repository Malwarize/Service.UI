import React from "react";
import {AddGroup} from "../../wailsjs/go/main/App";
import {useNavigate} from "react-router-dom";

interface props {
    showErrorMessage : (message : string) => void
}
export default function AddGroupForm(props : props){
    const [groupName, setGroupName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const navigate = useNavigate();
    function handleAddGroup(name : string, description : string) {
        AddGroup(name, description).then(response => {
            const data = JSON.parse(response);
            if(data?.Error){
                props.showErrorMessage(data.Error)
            }else{
                navigate(`/groups/`)
            }
        }).catch((error) => {
            props.showErrorMessage(error.toString())
        });
    }

    return<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-10">
    <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-bold text-gray-500">
            Name
        </label>
        <input
            type="text"
            placeholder="WebServicesCollection"
            className="border border-gray-300 rounded-md p-2 m-2"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
        />
    </div>
    <div className="flex flex-col">
        <label htmlFor="description" className="text-sm font-bold text-gray-500">
            Description
        </label>
        <input
            type="text"
            placeholder="group for all services for web"
            className="border border-gray-300 rounded-md p-2 m-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    </div>
    <button
            className="bg-primary-purple text-white rounded-md p-2 m-2 hover:bg-deep-gray"
            onClick={() => handleAddGroup(groupName, description)}>
            Save
    </button>
</div>
}