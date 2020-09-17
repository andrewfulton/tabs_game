import * as react from 'react';

import TabRow from './TabRow';
import Browser from './Browser';

import {TabProps, newTab} from './Tab';

type GameIs = 'starting' | 'playing' | 'paused';

type GameState = {
  is: GameIs,
  timer: number,
  tabs: TabProps[],
}

type GameAction = 
  | {type: 'init'}
  | {type: 'startGame'}
  | {type: 'cycleTabs'}
  | {type: 'clickTab', id:string};

const initialState = ():GameState => {
  return {
    is: 'starting',
    timer: 500,
    tabs: [],
  }
}

const reducer:react.Reducer<GameState,GameAction> = (state, action) =>{
  switch(action.type){
    case 'init': 
      return { 
        ...state,
        is: 'paused',
        tabs: [
          newTab(),
          newTab(),
          newTab(),
          newTab(),
          newTab(),
        ]
      }
    case 'startGame':
      return {
        ...state,
        is: 'playing',
      }
    case 'cycleTabs':
      // add a new tab in.
      const atIndex = Math.floor(Math.random() * state.tabs.length);
      return {
        ...state,
        tabs: state.tabs.slice(0,atIndex).concat( newTab() ).concat( state.tabs.slice(atIndex) )
      };
    case 'clickTab':
      // remove the tab in question.
      return {
        ...state,
        tabs: state.tabs.filter(t => t.id !== action.id)
      }
    default:
      return state;
  }
}

const Game = () => {
  const [state, dispatch] = react.useReducer(reducer, initialState());

  const { is, timer, tabs } = state;
  
  react.useEffect(()=>{
    if (is === 'starting'){
      // set up initial tabs
      dispatch({type: 'init'})
    }
    if (is === 'playing'){
      // Set up a timer to cycle the tabs on an interval
      // when the game starts, or the timer length changes
      const tabTimer = setInterval(()=> dispatch({type:'cycleTabs'}), timer);
      return () => clearInterval(tabTimer);
    }
  }, [is, timer] );

  return (
    <div>
      <TabRow
        tabs={tabs}
        tabClick={(id)=> { dispatch({type:'clickTab', id})}}
      />
      <Browser>
        { is === 'paused' && (
          <button
            onClick={()=> dispatch({type: 'startGame'})}
          >
            Start
          </button>
        )}
        
      </Browser>
    </div>
  )
  
}

export default Game;