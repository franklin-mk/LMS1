import {useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Discussion from '../../components/Discussion';

const StudentDiscussion = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);
  const [role, setRole] = useState('student')

  const name = currentUser.name

  return (
    <div>
        {/* <div >
            <div>
                <p>Roll Number: {currentUser.rollNum}</p>
                <p>Role: {role}</p>
                <p>Name: {name}</p>
                <p>Class: {currentUser.sclassName?.sclassName}</p>
                <p>School: {currentUser.school?.schoolName}</p>
            </div>
        </div> */}
        <Discussion role={role}  name={name}/>
    </div>
  )
}

export default StudentDiscussion