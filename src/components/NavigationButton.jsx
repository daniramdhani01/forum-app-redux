import React from 'react'
import { ReactComponent as Message } from '../icons/message.svg'
import { ReactComponent as Chart } from '../icons/chart.svg'
import { ReactComponent as Logout } from '../icons/logout.svg'
import { useNavigate } from 'react-router'

function NavigationButton() {
    const navigate = useNavigate()
    const buttonList = [
        { label: 'Threads', icon: Message, path: '/' },
        { label: 'Leaderboards', icon: Chart, path: 'leaderboards' },
        { label: 'Login', icon: Logout, path: 'login' },
    ]
  return (
    <div className='navigation-bottom'>
        <nav>
            {buttonList.map((btn, index)=>(
                <button key={index+btn.label} className='navigation-item' onClick={()=>navigate(btn.path)}>
                    <div className='navigation-item__icon'><btn.icon/></div>
                    <p className='navigation-item__label'>{btn.label}</p>
                </button>
            ))}
        </nav>
    </div>
  )
}

export default NavigationButton