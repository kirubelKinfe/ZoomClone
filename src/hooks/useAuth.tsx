import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../utils/FirebaseConfig"
import { setUser } from "../features/auth/authSlice"

const useAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(!currentUser) navigate("/login")
      else {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName
          })
        )
      }
    })
    return () => unsubscribe()
  }, [dispatch, navigate])
}

export default useAuth