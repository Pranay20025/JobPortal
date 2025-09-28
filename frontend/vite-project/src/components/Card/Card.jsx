import React from 'react'
import "./Card.css"
import { useNavigate } from 'react-router-dom'
const Card = ({company, key}) => {

  const navigate = useNavigate();

const onClicked = () =>{
 navigate(`/getCompanies/${company._id}`);
}

  return (
    <div class="card" onClick={onClicked}>
    <h2>{company.name}</h2>
    <p><strong>Location:</strong>{company.location}</p>
    <p>{company.description}</p>
    <a href={company.website} target="_blank">Visit Website</a>
</div>
  )
}

export default Card;