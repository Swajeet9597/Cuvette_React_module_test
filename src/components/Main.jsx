import React, { useState, useEffect } from 'react'
import './Main.css'
import create from '../assets/createbtn.png'
import bg from '../assets/bg.png'
import en from '../assets/encrypted.png'
import Create from './Create'
import Note from './Note'


const Main = () => {
    const [openCreate, setOpenCreate] = useState(false)

    function handleOnClick () {
        setOpenCreate(!openCreate)
        console.log(openCreate)
    }

    const handleClick = (group) => {
        setGroupSelect(group);
      };

    const [groupSelect, setGroupSelect] = useState( );
    const [groups, setGroups] = useState([]);


    useEffect(() => {
        const Screen = () => {
            setScreenSize(getScreen());
          };
          window.addEventListener('resize', Screen);
    
        const fetchGroup = async () => {
          let storedGroups = localStorage.getItem('groups');
          if (storedGroups) {
            let groups = await JSON.parse(storedGroups);
            setGroups(groups);
          }
        };
        fetchGroup();
      }, []);


      const getSize = () => {
        return {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      };
      const [screenSize, setScreenSize] = useState(getSize());

      function generateShortcut (groupgroupName) {
  
    const words = groupgroupName.trim().split(' ');
    if (words.length === 1) {
      return groupgroupName.slice(0, 2).toUpperCase(); 
    } else {
      const firstLetter = words[0][0].toUpperCase();
      const lastLetter = words[words.length - 1][0].toUpperCase();
      return firstLetter + lastLetter;
    }
      }


  return (
    
        <>

    <div className="maincon">
  
    <div className='sidebar'>
        <h1 className='heading' >Pocket Notes</h1>

        <img onClick={handleOnClick} className='create' src={create} alt="" />

        <div className="GroupList">
              {groups.map((group) => (
                  <div
                  key={group.id}
                  className={`groupItem ${
                      groupSelect === group ? 'selected' : ''
                    }`}
                    onClick={() => handleClick(group)}
                    >
                  <div
                    className="groupIcon"
                    style={{ background: group.color }}
                    >
                     {generateShortcut(group.groupName)}

                  </div>
                  <h2 className="groupName">{group.groupName}</h2>
                </div>
              ))}
            </div>
    </div>

    
    <div className={groupSelect ? "MessageAreaContainerr" : "msg"}>

    {
        groupSelect ? <Note groupSelect={groupSelect}
        groups={groups}
        setGroups={setGroups} /> :  <div className='messagecon'>
        <div className='imggg'>
        <img className='bg' src={bg}/>
        </div>
        <h1 className='heading1' >Pocket Notes</h1>
        <p className='desc' >Send and receive messages without keeping your phone online. <br />
Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

        <div className='en' >
            <img src={en} alt="" width={17} height={21} />
            <p>end-to-end encrypted</p>
        </div>
    </div>
    }

   
    </div>
    </div>
    {
        openCreate ? <Create  setGroups={setGroups}
        groups={groups} openCreate={setOpenCreate} /> : null
    }

    </>
  
  )
}

export default Main
