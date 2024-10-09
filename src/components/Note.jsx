import React from 'react';
import { useState, useEffect } from 'react'
import senden from '../assets/senden.png'
import './Note.css'
const Note = (props) => {
    const [note, setNote] = useState('');
  
    let groupSelect = props.groupSelect;
    let notes = groupSelect.notes;
    let groups = props.groups;
    let setGroups = props.setGroups;
  
    const getScreen = () => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };
    const [screenSize, setScreenSize] = useState(getScreen());
  
    useEffect(() => {
      const Screen = () => {
        setScreenSize(getScreen());
      };
      window.addEventListener('resize', Screen);
    }, []);
  
    const handleChange = (e) => {
      setNote(e.target.value);
    };
  
    const handleSubmit = () => {
      let newGroup = [...groups];
  
      let Cgroup = newGroup[groupSelect.id];
  
      let time = `${new Date().toLocaleTimeString('en-us', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}`;
  
      let date = ` ${new Date().toLocaleDateString([], {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`;
  
      Cgroup['notes'].push({ date, time, note });
      localStorage.setItem('groups', JSON.stringify(newGroup));
      setGroups(newGroup);
    };
  
    const keypress = (e) => {
      if (e.code === 'Enter') {
        handleSubmit();
        setNote('');
      }
    };
  
    return (
      <>
          <div className="notesContainer">
            <div className="notesHeader">
              <div
                className="notesGroup"
                style={{ background: groupSelect.color }}
              >
                {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
              </div>
              <h2 className="groupNam">{groupSelect.groupName}</h2>
            </div>
            <div className="NotesAndDate">
              {notes.map((note) => (
                <div className="DateAndText">
               
                  <p className="Text">{note.note}</p>
                  <div className="DateAndTime">
                  <p className="Date">{note.date}</p>
                    <p className="Time">{note.time}</p>
                   
                  </div>
                </div>
              ))}
              </div>
            <div className="Textarea">
              <textarea
                className="TextInput"
                type="text"
                value={note}
                onChange={handleChange}
                placeholder="Enter your text here..."
                onKeyDown={keypress}
              ></textarea>
              <img
                src={senden}
                className="SendImg"
                alt="SendImg"
                onClick={handleSubmit}
              />
            </div>
            </div>
      </>
    );
}

export default Note;
