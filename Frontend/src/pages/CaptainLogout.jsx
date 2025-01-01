import React from 'react'

const CaptainLogout = () => {
    const token= localStorage.getItem('captain-token');
    const navigate = useNavigate();

    axious.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('captain-token');
            navigate('/captain-login');
        }
    }).catch((error) => {
        console.error("Logout failed:", error);
        localStorage.removeItem('captain-token'); // Ensure token is removed
        navigate('/captain-login');
    });

    return (
        <div>
            CaptainLogout
        </div>
    )
}

export default CaptainLogout
