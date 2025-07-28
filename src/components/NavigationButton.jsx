import React, { useMemo } from 'react'
import { ReactComponent as Message } from '../icons/message.svg'
import { ReactComponent as Chart } from '../icons/chart.svg'
import { ReactComponent as Login } from '../icons/login.svg'
import { ReactComponent as Logout } from '../icons/logout.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN } from '../redux/types'

function NavigationButton() {
  const { isLogin } = useSelector(state => state.app)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const buttonList = useMemo(()=>{
    const basicList = [
        { label: 'Threads', icon: Message, onClick: ()=>navigate('/')},
        { label: 'Leaderboards', icon: Chart, onClick: ()=>navigate('/leaderboards')},
    ]
    
    if (isLogin) return [...basicList, { label: 'Logout', icon: Logout, onClick: ()=>{
      dispatch({ type: LOGIN, payload: false })
      navigate('/')
    }}]

    return [...basicList, { label: 'Login', icon: Login, onClick: ()=>navigate('/login')} ]
},[isLogin])

  return (
    <div className='navigation-bottom'>
        <nav>
            {buttonList.map((btn, index)=>(
                <button key={index+btn.label} className='navigation-item' onClick={btn.onClick}>
                    <div className='navigation-item__icon'><btn.icon/></div>
                    <p className='navigation-item__label'>{btn.label}</p>
                </button>
            ))}
        </nav>
    </div>
  )
}

export default NavigationButton