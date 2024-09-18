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
         <th>State</th>
         <th>Country</th>
         <th>ZipCode</th>
       </tr>
     </thead>
     <tbody>
       {holidays.map((item,i) => (
       <tr key={i}>
         <td>{item.GeographyID}</td>
         <td>{item.County}</td>
         <td>{item.City}</td>
         <td>{item.State}</td>
         <td>{item.Country}</td>
         <td>{item.ZipCode}</td>
       </tr>
       ))}
       </tbody>
     </Table>
 )};