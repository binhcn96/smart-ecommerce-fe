import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { changePath } from "redux/slice"

const DashBoard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changePath('dashboard'))
  }, [dispatch])

  return (
    <div className="p-dashboard">
      DashBoard
    </div>
  )
}

export default DashBoard