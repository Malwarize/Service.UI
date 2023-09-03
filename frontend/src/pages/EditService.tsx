import '../App.css';
import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Header from "../components/Header";
import EditServiceForm from '../components/EditServiceForm';
import ErrorBox from "../components/ErrorBox";

function EditService(){
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
            <EditServiceForm showErrorMessage={showErrorMessage}/>
        </BaseLayout>
    );
}

export default EditService;