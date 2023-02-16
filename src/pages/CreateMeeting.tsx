import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import meeting1 from '../assets/meeting1.png'
import meeting2 from '../assets/meeting2.png'

const CreateMeeting = () => {
  const navigate = useNavigate()

  useAuth()
  return (
    <div>
        <div 
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
            }}
        >
            <Header />
            <EuiFlexGroup
            justifyContent="center"
            alignItems="center"
            style={{ margin: "5vh 10vw"}}
            >
                <EuiFlexItem>
                    <EuiCard
                    icon={<EuiImage size="5rem" alt="icon" src={meeting1} />}
                    title={`Create 1 on 1 Meeting`}
                    description="Create a personal single person meeting."
                    onClick={() => navigate('/create1on1')}
                    paddingSize="xl"
                    />
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiCard
                    icon={<EuiImage size="5rem" alt="icon" src={meeting2} />}
                    title={`Create Video Conference`}
                    description="Invite muliple persons to the meeting."
                    onClick={() => navigate('/videoconference')}
                    paddingSize="xl"
                    />
                </EuiFlexItem>
            </EuiFlexGroup>
        </div>
    </div>
  )
}

export default CreateMeeting