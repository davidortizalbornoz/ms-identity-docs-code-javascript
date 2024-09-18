import React from "react";
 import ListGroup from 'react-bootstrap/ListGroup'; 
 import Table from 'react-bootstrap/Table';
 /**
  * Renders information about the user obtained from MS Graph 
  * @param props
  */
 export const ProfileData = (props) => {
   const holidays = props.graphqlData.data.geographies.items;
   return (
     <Table striped bordered hover responsive>
     <thead>
       <tr>
         <th>GeographyID</th>
         <th>County</th>
         <th>City</th>
       </tr>
     </thead>
     <tbody>
       {holidays.map((item,i) => (
       <tr key={i}>
         <td>{item.GeographyID}</td>
         <td>{item.County}</td>
         <td>{item.City}</td>
       </tr>
       ))}
       </tbody>
     </Table>
 )};