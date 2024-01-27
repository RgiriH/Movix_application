import React ,{useState}from 'react'
import  './style.scss'

const SwitchTabs = (
    {
        data,
        onTabChange
    }
) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(0)

    const activeTab = (tab,ind) => {
      setLeft(ind * 100)
      setTimeout(() => {
        setSelectedTab(ind)
        console.log(tab)
        onTabChange(tab)
      },300)

    }
    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {data.map((tab,index) =>
                (<span key={index} className={`tabItem ${selectedTab === index ?"active":""}`
                }
                onClick={() => activeTab(tab,index)}>
                    {tab}
                </span>)
                )}
                <span className="movingBg" style = {{left}}/>
            </div>
        </div>
    )
}

export default SwitchTabs