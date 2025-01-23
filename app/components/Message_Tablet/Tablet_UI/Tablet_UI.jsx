import Link from 'next/link'
import styles from './tablet_ui.module.scss'
import { useState } from 'react'

const posts = [
  {
    id: 1,
    name: 'So-n-so',
    message: "This is a test message and I'd like to go onabort.",
    emoji: '👍',
  },
  {
    id: 2,
    name: 'Dew Daddy',
    message: 'Dew Dad dropping a line',
    emoji: '🔥',
  },
  {
    id: 3,
    name: 'ThomasX',
    message: 'Riddle me this AND that.',
    emoji: '🔥',
  },
]

function Tablet_UI() {
  const [currentScreen, setCurrentScreen] = useState('welcome')

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Sign In':
        return (
          <div className={styles.uiContainer}>
            <SignInScreen setCurrentScreen={setCurrentScreen} />
          </div>
        )
      case 'Visitor Log':
        return (
          <div className={styles.uiContainer}>
            <ScreenLayout currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}>
              <VisitorLogPosts posts={posts} />
            </ScreenLayout>
          </div>
        )
      default:
        return (
          <div id='ui-border' className={styles.uiContainer}>
            <div id='ui-welcomeScreen-left' className={styles.uiWelcomeScreenLeft}></div>
            <div id='ui-welcomeScreen-right' className={styles.uiWelcomeScreenRight}>
              <ul className='text-5xl '>
                <li className={styles.link}>
                  <a onClick={() => setCurrentScreen('Sign In')}>Sign In</a>                  
                </li>
                <li className={styles.link}>
                  <a onClick={() => setCurrentScreen('Visitor Log')}>Visitor Log</a>
                </li>
                <li className={`${styles.link} ${styles.deactivated}`}>
                  <Link href={'#'}>Map</Link>
                </li>
                <li className={`${styles.link} ${styles.deactivated}`}>
                  <Link href={'#'}>New Arrivals</Link>
                </li>
                <li className={`${styles.link} ${styles.deactivated}`}>
                  <Link href={'#'}>Promotions</Link>
                </li>
              </ul>
            </div>
          </div>
        )
    }
  }

  return <>{renderScreen()}</>
}

export default Tablet_UI

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

const SignInScreen = ({ setCurrentScreen }) => {
  return (
    <>
      <div className={styles.uiSignInScreen}>
        {/* <div className={styles.screenContainer}> */}
        <div className={styles.screenTitleRow}>
          <div className='w-1/3'></div>
          <div className={styles.screenTitle}>Sign In</div>
          <div id='exit-button' className='flex justify-end w-1/3'>
            <ExitButton setCurrentScreen={setCurrentScreen} />
          </div>
        </div>
        <div className={styles.inputSection}>
          <div className={styles.avatarGroup}>
            <div className={styles.avatar}></div>
            <div className={styles.avatar}></div>
            <div className={styles.avatar}></div>
            <div className={styles.avatar}></div>
          </div>
          <div className={styles.inputGroup}>
            <div id='name-group' className='w-full flex'>
              <div className='w-1/3 text-right pr-1'>name:</div>
              <div className='w-2/3   pl-3'>
                <input type='text' className={styles.input} />
              </div>
            </div>
            <div id='message-group' className='w-full flex'>
              <div className='w-1/3 text-right pr-1'>message:</div>
              <div className='w-2/3  pl-3'>
                <input type='text' className={styles.input} maxLength={25} placeholder='max 25 characters' />
              </div>
            </div>
            <div id='emoji-group' className={styles.emojiGroup}>
              <div className={styles.emoji}>👍</div>
              <div className={styles.emoji}>🔥</div>
              <div className={styles.emoji}>💡</div>
            </div>
          </div>
        </div>
        <div className={styles.signInRow}>
          <div className={styles.postButton}>
            <button>Post in the Visitor Log </button>
          </div>
        </div>
      </div>
    </>
  )
}

/////////////////////////////////////////////////////////////////////

const ScreenLayout = ({ setCurrentScreen, currentScreen, children }) => {
  return (
    <>
      <div className={styles.screenLayout}>
        <div className={styles.screenTitleRow}>
          <div className='w-1/3'></div>
          <div style={{ paddingTop: '5px', paddingBottom: '5px' }} className={styles.screenTitle}>
            {currentScreen}
          </div>
          <div id='exit-button' className='flex justify-end w-1/3'>
            <ExitButton setCurrentScreen={setCurrentScreen} />
          </div>
        </div>
        <div className={styles.screenGrid}>
          <div className={styles.sideMenuSection}>
            <div></div>
            <SideMenu setCurrentScreen={setCurrentScreen} currentScreen={currentScreen} />
            <div></div>
          </div>
          <div className={styles.mainInfoSection}>
            <div className={styles.mainInfoDivider}>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

/////////////////////////////////////////////////////////////////////

const ExitButton = ({ setCurrentScreen }) => {
  return (
    <>
      <a className={styles.exitButton} onClick={() => setCurrentScreen('welcome')}>
        EXIT
      </a>
    </>
  )
}

const SideMenu = ({ setCurrentScreen, currentScreen }) => {
  return (
    <>
      <ul className={styles.sideMenu}>
        <li className={`${styles.sideMenuLink} ${currentScreen == 'visitorLog' ? '' : styles.sideMenuLinkSelected}`}>
          <a onClick={() => setCurrentScreen('Visitor Log')}>Vistor Log</a>
        </li>
        <li className={`${styles.sideMenuLink} ${styles.deactivated}`}>
          <Link href={'#'}>Map</Link>
        </li>
        <li className={`${styles.sideMenuLink} ${styles.deactivated}`}>
          <Link href={'#'}>New Arrivals</Link>
        </li>
        <li className={`${styles.sideMenuLink} ${styles.deactivated}`}>
          <Link href={'#'}>Promotions</Link>
        </li>
      </ul>
    </>
  )
}

///////////////////////////////////////////////////////////////////////

const VisitorLogPosts = ({ posts }) => (
  <div className={styles.visitorLogPosts}>
    {posts.map((post, index) => (
      <VisitorLogPostItem key={index} name={post.name} message={post.message} orientation={index} />
    ))}
  </div>
)

const VisitorLogPostItem = ({ name, message, orientation = 0 }) => {
  const gridTemplate = orientation % 2 ? 'avatar message emoji' : 'emoji message avatar'

  return (
    <div style={{ gridTemplateAreas: gridTemplate }} className={styles.visitorLogPostItem}>
      <div className={styles.visitorLogPostItemAvatarSection}>
        <div style={{ padding: '14px', transform: 'scale(1)', pointerEvents: 'none' }} className={styles.avatar}></div>
      </div>
      <div className={styles.visitorLogPostItemMessage}>
        <div className='font-bold'>
          {name}
          <span className='font-normal opacity-70'>&nbsp;says:</span>
        </div>
        <div >
          <span className='italic text-xl'>&quot;{message}&quot;</span>
        </div>
      </div>
      <div className={styles.visitorLogPostItemEmojiSection}>b</div>
    </div>
  )
}
