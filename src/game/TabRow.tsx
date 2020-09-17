import * as React from 'react';
import { AnimatePresence } from 'framer-motion';
import Tab, { TabProps } from './Tab';

type TabRowProps = {
  tabs: TabProps[],
  tabClick: TabProps['onClick'],
}

const TabRow:React.FC<TabRowProps> = ({tabs, tabClick}) => {
  return (
    <div style={{
      width: '600px',
      height: '50px',
      position: 'relative',
    }}>
      <AnimatePresence>
        { tabs.map((t,i) => {
          const maxTabWidth = 600 / tabs.length;
          return (
            <Tab
              key={t.id}
              onClick={tabClick}
              idx={i}
              tabWidth={maxTabWidth<50 ? maxTabWidth : 50}
              {...t}
            />
          )
        })}
      </AnimatePresence>
    </div>
    
  )
}

export default TabRow;