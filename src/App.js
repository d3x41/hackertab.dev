import React, { useState, useEffect } from 'react'
import './App.css'
import { Footer } from 'src/components/Layout'
import Header from 'src/components/Header'
import { BookmarksSidebar } from 'src/features/bookmarks'
import { MarketingBanner } from 'src/components/Elements/MarketingBanner'
import ScrollCardsNavigator from './components/ScrollCardsNavigator'
import AppContentLayout from './components/AppContentLayout'
import 'react-contexify/dist/ReactContexify.css'
import { setupAnalytics, trackPageView, setupIdentification } from 'src/lib/analytics'
import { useRemoteConfigStore } from 'src/features/remoteConfig'

function App() {
  const [showSideBar, setShowSideBar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const {
    remoteConfig: { marketingBannerConfig },
  } = useRemoteConfigStore()

  useEffect(() => {
    setupAnalytics()
    setupIdentification()
    trackPageView('home')
  }, [])

  return (
    <div className="App">
      <Header
        setShowSideBar={setShowSideBar}
        showSideBar={showSideBar}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <ScrollCardsNavigator />
      <MarketingBanner {...marketingBannerConfig} />
      <AppContentLayout setShowSettings={setShowSettings} />
      <BookmarksSidebar showSidebar={showSideBar} onClose={() => setShowSideBar(false)} />

      <Footer />
    </div>
  )
}

export default App
