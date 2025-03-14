import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function User({choix, description}) {

  //les states
  const navigate = useNavigate();
  
  //const [reponse,setReponse] = useState(false)



  //les comportements
  const handleClick = () => {
    console.log(choix);
    navigate("/Connexion", { state: { who:  choix  } });
  }





  return (
    <div style={style}>
      <div style={{display:"flex",justifyContent:"center"}}>
        <button type="button" onClick={handleClick} style={{width:"60%", border:"none", color:"#3742fa"}}>
          <h3>{choix}</h3>
        </button>
      </div>
      <div>
        <p>
          {description}
        </p>
      </div>
    </div>
  )
}


const style = {
  width : "30%"
}