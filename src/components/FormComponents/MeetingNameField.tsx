import { EuiFieldText, EuiFormRow } from "@elastic/eui"
import React from 'react'

const MeetingNameField = ({ label,placeholder,value,setMeetingName, isInvalid, error}:{
    label:string,
    placeholder:string,
    value:string,
    isInvalid: boolean,
    error: Array<string>,
    setMeetingName:React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
        <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
            <EuiFieldText 
                placeholder={placeholder} 
                value={value}
                onChange={e => setMeetingName(e.target.value)}
            />
        </EuiFormRow>
    </div>
  )
}

export default MeetingNameField