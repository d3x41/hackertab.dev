import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { ReactComponent as StreakIcon } from 'src/assets/icons/fire_icon.svg'
import { Button, ConfirmModal } from 'src/components/Elements'
import { useAuth, User } from 'src/features/auth'
import { pluralize } from 'src/utils/String'

interface UserInfoProps {
  user: User
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const { logout, providerId } = useAuth()
  const providerName = providerId?.split('.')[0] || 'Unknown'
  const [showLogout, setShowLogout] = useState(false)

  return (
    <div className="userContent">
      <ConfirmModal
        showModal={showLogout}
        title="Confirm logout"
        description="Are you sure you want to logout?"
        onClose={() => setShowLogout(false)}
        onConfirm={logout}
      />
      {user?.imageURL && <img src={user.imageURL} className="userImage"></img>}
      <div className="userInfos">
        <div className="userName">{user.name}</div>
        <div className="sub">
          {providerId == 'github.com' ? (
            <FaGithub size={18} />
          ) : providerId == 'google.com' ? (
            <FcGoogle size={18} />
          ) : null}
          Connected with <span className="capitalize">{providerName}</span>
        </div>
        <div>
          <Button className="logoutBtn" onClick={() => setShowLogout(true)} size="small">
            Logout
          </Button>
        </div>
      </div>

      <div className="streaks">
        <p className="title">
          You're on{' '}
          <span className="highlight">
            <StreakIcon className="icon" /> {pluralize(user.streak || 1, 'day')} streak
          </span>
        </p>
        <div>
          <ul className="streaksWeek">
            {Array.from({ length: 5 }, (_, i) => {
              const streak = user.streak || 1
              if (i < streak) {
                return (
                  <li key={`day-${i}`} className="dayWrapper checked">
                    <span className="day">
                      <IoCheckmarkOutline />
                    </span>
                  </li>
                )
              } else {
                return (
                  <li key={`day-${i}`} className="dayWrapper">
                    <span className="day"></span>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
