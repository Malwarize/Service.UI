import '../output.css';
import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Header from "../components/Header";
import AddGroupForm from "../components/AddGroupForm";
import ErrorBox from "../components/ErrorBox";
function AddGroup(){
    const [errorMessage, setErrorMessage] = React.useState('');
    const [errorVisible, setErrorVisible] = React.useState(false);
    function showErrorMessage(message : string){
        setErrorMessage(message)
        setErrorVisible(true)
        setTimeout(() => {
            setErrorVisible(false);
        }, 5000);
    }
    return (
        <BaseLayout>
            <Header  searchQuery={""} setSearchQuery={()=>{}}/>
            {errorVisible && <ErrorBox Error={errorMessage} onClose={() => setErrorVisible(false)} />}
            <AddGroupForm showErrorMessage={showErrorMessage}/>
        </BaseLayout>
    );
}

export default AddGroup;