import React from 'react';
import { useState } from 'react'
import './Create.css'
const Create = (props) => {

    const [formData, setFormData] = useState({ grpName: ' ', color: ' ' });
  const setGroups = props.setGroups;
  const groups = props.groups;
  const color = [
    '#B38BFA',
    '#FF79F2',
    '#43E6FC',
    '#F19576',
    '#0047FF',
    '#6691FF',
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.grpName);
  };

  const handleChangeColor = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute('color'),
    });
    console.log(formData.color);
  };

  const handleSubmit = (e) => {
    if (formData.color === '') {
      alert('Please select a color');
      return;
    }
    let newGroup = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    setGroups(newGroup);
    localStorage.setItem('groups', JSON.stringify(newGroup));
    props.openCreate(false);
  };

  return (
    <>

    <div className='createcon'>

    <div className="box">
    <div className="modalContainer">
            <span>
              <button
                className="closeButton"
                onClick={() => props.openCreate(false)}
              >
                X
              </button>
            </span>
            <h2 className="modalHeading">Create New Group</h2>
            <label className="modalGrp">Group Name</label>
            <input
              type="text"
              className="modalText"
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <label className="modalColor">Choose Colour</label>
            {color.map((color, index) => (
              <button
                className={`colorButton  ${
                  formData.color === color ? 'selected' : ''
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  height: '40px',
                  width: '40px',
                  background: color,
                  borderRadius: '25px',
                  border: 'none',
                  marginRight: '10px',
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button className="modalCreate" onClick={handleSubmit}>
              Create
            </button>
          </div>
    </div>
     

    </div>

    </>
  );
}

export default Create;
