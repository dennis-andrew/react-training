import type { FC } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SummaryCard from './components/SummaryCard'
import UserListing from './UserListing'

const App: FC = () => {
  return (
    <>
    <Header></Header>
    <main>
      <section className="summary-cards">
        <SummaryCard label="Total Users" value="6" note="4 active team members" />
        <SummaryCard label="Departments" value="6" note="Across product teams" />
        <SummaryCard label="Inactive Users" value="2" note="Need account review" />
      </section>
      <Sidebar></Sidebar>
      <UserListing></UserListing>
    </main>
    </>
  )
}

export default App
