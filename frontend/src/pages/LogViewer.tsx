import Header from "../components/Header";
import ErrorBox from "../components/ErrorBox";
import BaseLayout from "../layouts/BaseLayout";
import LogViewerService from "../components/LogViewerServiceTable";
import React from "react";

export default  function LogViewer(){
    const [errorMessage, setErrorMessage] = React.useState('');
    const [errorVisible, setErrorVisible] = React.useState(false);
    const service = window.location.hash.split("/")[2]
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
            <h1 className="flex text-2xl font-bold text-deep-gray mb-5">Logs for <p className="font-bold ml-1 capitalize text-primary-purple">{window.location.hash.split("/")[2]}</p></h1>
            <LogViewerService service={service} showErrorMessage={showErrorMessage}/>
        </BaseLayout>
    )
}