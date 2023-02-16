import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui"
import MeetingNameField from "../components/FormComponents/MeetingNameField"
import Header from "../components/Header"
import { useState } from 'react'
import MeetingUsersField from "../components/FormComponents/MeetingUsersField"
import useAuth from "../hooks/useAuth"
import useFetchUsers from "../hooks/useFetchUsers"
import moment from 'moment'
import MeetingDateField from "../components/FormComponents/MeetingDateField"
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons"
import { FieldErrorType, UserType } from "../utils/Types"
import { addDoc } from "firebase/firestore"
import { meetingsRef } from "../utils/FirebaseConfig"
import { generateMeetingID } from "../utils/generateMeetingID"
import { useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router-dom"
import useToast from "../hooks/useToast"

const OneOnOneMeeting = () => {
  useAuth()
  const navigate = useNavigate()
  const [users] = useFetchUsers()
  const [createToast] = useToast()
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid)

  const [meetingName, setMeetingName] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([])
  const [startDate, setStartDate] = useState(moment())
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType
    meetingUser: FieldErrorType
  }>({
    meetingName: {
        show: false,
        message: []
    },
    meetingUser: {
        show: false,
        message: []
    }
  })

  const validateForm = () => {
    let errors = false;
    const clonedShowErrors = {...showErrors}
    if(!meetingName.length) {
        clonedShowErrors.meetingName.show = true;
        clonedShowErrors.meetingName.message = ["Please Enter Meeting Name"]
        errors = true
    } else {
        clonedShowErrors.meetingName.show = false;
        clonedShowErrors.meetingName.message = []
    }

    if(!selectedUsers.length) {
        clonedShowErrors.meetingUser.show = true;
        clonedShowErrors.meetingUser.message = ["Please Select a User"]
        errors = true
    } else {
        clonedShowErrors.meetingUser.show = false;
        clonedShowErrors.meetingUser.message = []
    }
    setShowErrors(clonedShowErrors)
    return errors
  }

  const onUserChange = (selsectedOptions: Array<UserType>) => {
    setSelectedUsers(selsectedOptions)
  }

  const createMeeting = async () => {
    if(!validateForm()) {
        const meetingID = generateMeetingID()
        await addDoc(meetingsRef, {
            createdBy: uid,
            meetingID,
            meetingName,
            meetingType: "1-on-1",
            inviteUsers: [selectedUsers[0].uid],
            meetingDate: startDate.format("L"),
            maxUsers: 1,
            status: true
        })
        createToast({
            title: "One on One Meeting Created Successfully.",
            type: "success"
        })
        navigate('/')
    }
  }

  return (
    <div
        style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
        }}
    >
        <Header />
        <EuiFlexGroup justifyContent="center" alignItems="center">
            <EuiForm>
                <MeetingNameField
                    label="Meeting Name"
                    placeholder="Meeting Name"
                    value={meetingName}
                    setMeetingName={setMeetingName}
                    isInvalid={showErrors.meetingName.show}
                    error={showErrors.meetingName.message}
                />
                <EuiSpacer />
                <MeetingUsersField 
                    label="Invite User"
                    options={users}
                    placeholder="Select a user"
                    onChange={onUserChange} 
                    selectedOptions={selectedUsers}
                    singleSelection={{asPlainText:true}}
                    isClearable={false}
                    isInvalid={showErrors.meetingUser.show}
                    error={showErrors.meetingUser.message}
                />
                <EuiSpacer />
                <MeetingDateField 
                    selected={startDate}
                    setStartDate={setStartDate}
                />
                <EuiSpacer />
                <CreateMeetingButtons 
                    createMeeting={createMeeting} 
                />
            </EuiForm>
        </EuiFlexGroup>
    </div>
  )
}

export default OneOnOneMeeting