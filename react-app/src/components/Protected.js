
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Protected() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      navigate("/login");
    }
  }, [])
  return (
   <>
   </>
  );
}

export default Protected;