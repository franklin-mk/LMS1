import {useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Discussion from '../../components/Discussion';

const TeacherDiscussion = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);
  const [role, setRole] = useState('teacher')

  const name = `Tr. ${currentUser.name}`

  return (
    <div>
        <div >
            <div>
                <p>Name: {name}</p>
                <p>Role: {role}</p>
                <p>Email: {currentUser.email}</p>
                <p>Class: {currentUser.teachSclass?.sclassName}</p>
                <p>Subject: {currentUser.teachSubject?.subName}</p>
                <p>School: {currentUser.school?.schoolName}</p>
            </div>
        </div>
        <Discussion role={role} name={name}/>
    </div>
  )
}

export default TeacherDiscussion