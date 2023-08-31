import '../output.css';
import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Header from "../components/Header";
import EditServiceForm from '../components/EditServiceForm';

function EditService(){
    return (
        <BaseLayout>
            <Header  searchQuery={""} setSearchQuery={()=>{}}/>
            <EditServiceForm/>
        </BaseLayout>
    );
}

export default EditService;