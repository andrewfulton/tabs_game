import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from "framer-motion"

export type TabProps = {
  kind: 'bitbucket' | 'jira',
  onClick?: (id:string) => void,
  id:string,
  tabWidth?: number,
  idx?: number,
}

export const newTab = ():TabProps => ({
  kind: Math.random() > 0.5 ? 'bitbucket' : 'jira',
  id: uuidv4(),
})

const typeToSymbol = (kind: TabProps['kind']):string => {
  switch (kind){
    case 'bitbucket':
      return '&#11031;'
    case 'jira':
      return '&#11032;'
  }
}

const Tab:React.FC<TabProps> = ({kind, onClick, id, idx, tabWidth}) => {
  const additionalMotionProps={
    width: tabWidth,
    height: 50,
    // 
    bottom: 0,
    left: `${idx*tabWidth}px`,
  }
  return (
    <motion.div
      key={id}
      style={{
        zIndex: idx,
        position: 'absolute',
        overflow: 'hidden',
        boxShadow: idx === 0 ? 'none' : '-5px 0px 3px #00000033',
        backgroundColor: '#eee',
        borderRadius: '10px 10px 0 0',
       
      }}
      initial={{ ...additionalMotionProps, height: 0 }}
      animate={{ ...additionalMotionProps }}
      exit={{ ...additionalMotionProps, height: 0 }}
    >
      <button
        style={{
          border:0,
          background:'none',
          width: '100%',
          height: '100%',
          fontSize: '36px',
          color: '#0052CC',
        }}
        onClick={()=>onClick(id)}
        dangerouslySetInnerHTML={{__html: typeToSymbol(kind)}}
      >
        
      </button>
    </motion.div>
  )
}

export default Tab;