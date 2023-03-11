import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import styles from "./styles.module.scss";
import GrayLogo from "../../assets/gray-btb-logo.svg";
import DashboardParticipantCard from '../../components/ParticipantCard/Dashboard';
import { GameType } from '../../types/GameType';
import { gameData } from '../../fakeData';
import ModalNewGame from '../../components/ModalNewGame';

function Dashboard() {
  const [game, setGame] = useState<GameType>()
  const [open, setOpen] = useState(false)

  function handleClose(){
    setOpen(false);
  }

  useEffect(()=>{
    if(gameData.isActive){
      setGame(gameData)
    }
  },[])

  return (
    <div className={styles.container}>
      <SideBar/>
        <div className={styles.content}>
          {!game ? (
            <div className={styles['content--new-vote']}>
              <img src={GrayLogo} alt="logo" />
              <strong>Nenhuma Votação Cadastrada</strong>
              <button className="btn-rounded--pink" onClick={() => setOpen(true)}>Criar nova votação</button>
            </div>
          ):(
            <div className={styles['content--participants-vote']}>
              <div>
                {game.gameParticipants.map((gameParticipant)=>(
                  <DashboardParticipantCard gameParticipant={gameParticipant}
                  key={gameParticipant.participant.id}
                  selected={gameParticipant.participant.eliminated}
                  />
                ))}
              </div>
            <div>
            <button className='btn-outline--gray'>Encerrar Votação</button>
            <button className='btn-outline--disabled'>http://localhost:3000</button>
          </div>
          </div>
          )}
        </div>
        <ModalNewGame open={open} handleClose={handleClose}/>
    </div>
  );
}

export default Dashboard;
