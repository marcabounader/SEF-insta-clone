import { useState } from "react";
import NavBar from "../../components/NavBar";
import Search from "../../components/Search";

const Dashboard = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const handleOpenAddModal = () => setIsAddModalOpen(true)
    const handleCloseAddModal = () => setIsAddModalOpen(false)
    return ( 
        <div className="side-container flex-column">
        <NavBar/>
        <Search isOpen={isAddModalOpen} handleCloseAddModal={handleCloseAddModal}/>
        </div>
    );
}
 
export default Dashboard;