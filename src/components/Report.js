import React from "react";

export default function Report({ table }) {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Job Title</th>
          <th>Twitter</th>
        </tr>
      </thead>
      <tbody>
        {table.map((tableData) => {
          return (
            <tr>
              <td data-column="First Name">{tableData.firstName}</td>
              <td data-column="Last Name">{tableData.lastName}</td>
              <td data-column="Job Title">{tableData.jobTitle}</td>
              <td data-column="Twitter">{tableData.Twitter}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
