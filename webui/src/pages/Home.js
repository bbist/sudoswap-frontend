import React from 'react';
import PoolCreator from '../components/PoolCreator';
import PoolsTable from '../components/PoolsTable';
import TokenSwapper from '../components/TokenSwapper';

const Home = () => {
  const [ pair, setPair ] = React.useState([])

  return (
    <React.Fragment>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
        <PoolCreator />
        <TokenSwapper selectedPair={pair} />
      </div>

      <PoolsTable
        onPairClick={pair => {
          setPair(pair.id)
        }} />

    </React.Fragment>
  )
}


export default Home;